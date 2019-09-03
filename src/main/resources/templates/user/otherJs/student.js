//全局变量
var newsList=[];
var fileName=""
var page = 1;
var id = "";
var name = "";
//广告管理
window.onload=function(){

	var da = getStorge("user")||"";
	if(da != "") {
		var user = JSON.parse(da);
		$("#userName").html(user.name);
	}

	isLogin();
	/**
	向后台请求数据把相应的广告东西找到
	*/
	getList(page,id,name);
	
    /**
    对其中的按钮进行添加事件
    */
    //添加
    document.getElementById("add").onclick=function(){
		document.getElementById("confirm").innerText="确定";
		document.getElementById("addCon").setAttribute("style", "display:block");
    }
    //刷新
    document.getElementById("refresh").onclick=function(){
    	getList(page,id,name);
    }

	//查询
	$("#search").click(function(){
		id = $("#studentId").val()||"";
		name = $("#studentName").val()||"";
		//console.log(two)
		page = $("#page").val()==""?1:parseInt( $("#page").val());
		getList(page,id,name);
	})
	//前一页
	$("#front").click(function(){
		page = page - 1;
		getList(page,id,name);
	})
	//下一页
	$("#next").click(function(){
		page = page +1;
		getList(page,id,name);
	})
	$("#cancel").click(function(){
		//console.log(1)
		$("#addCon").attr("style","display:none")
	})

	$("#confirm").click(function(){
		var studentUsername = $("#studentUsername").val();
		var studentPassword = $("#studentPassword").val();
		var stuName = $("#stuName").val();
		var stuSex = $("#stuSex").val();
		var stuPhone = $("#stuPhone").val();
		var stuEmail = $("#stuEmail").val();
		var stuCity = $("#stuCity").val();
		if(studentUsername.length==0||studentPassword.length==0||stuName.length==0||stuSex.length==0||stuPhone.length==0
			||stuEmail.length==0||stuCity.length==0){
			alert("请输入完整数据");
			return;
		}
		if (studentUsername.search(/^[a-zA-Z]{1}[A-Z|a-z|0-9]{5,29}/) == -1){
			alert("用户名格式错误");
			return false;
		}

		if (studentPassword.search(/[A-Za-z]+[0-9]+/) == -1) {
			alert("密码格式错误");
			return false;
		}

		if (stuPhone.search(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/) == -1){
			alert("电话格式错误");
			return false;
		}


		if (stuPhone.search(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/) == -1){
			alert("电话格式错误");
			return false;
		}

		if (stuSex!= '男' && stuSex!='女'){
			alert("性别错误");
			return false;
		}

		var id = $("#confirm").attr("sId")
		var type =  $("#confirm").text().trim();
		console.log(type)
		if(type=="确定"){
			if(confirm("请确认是否保存此条数据")){
				$.ajax({
					type: "post",
					async: false,
					url: url + "user",
					data: JSON.stringify({
						username:studentUsername,
						password:studentPassword,
						name:stuName,
						sex:stuSex,
						phone:stuPhone,
						email:stuEmail,
						city:stuCity
					}),
					dataType: "json",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback",
					contentType: "application/json",
					success: function (json) {
						if(json.message){
							alert(json.message)
						}
						else{
							alert("保存成功");
							getList(page,null,name);
							$("#addCon").attr("style","display:none")
						}
					}
				})
			}

		}
		else{
			//console.log(id)
			if(confirm("请确认是否修改此条数据")){
				$.ajax({
					type: "put",
					async: false,
					url: url + "user",
					data: JSON.stringify({
						id:id,
						username:studentUsername,
						password:studentPassword,
						name:stuName,
						sex:stuSex,
						phone:stuPhone,
						email:stuEmail,
						city:stuCity
					}),
					dataType: "json",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback",
					contentType: "application/json",
					success: function (json) {
						console.log(json)
						if(json.message){
							alert(json.message)
						}
						else{
							alert("修改成功");
							getList(page,null,name);
							$("#addCon").attr("style","display:none")
						}
					}
				})
			}
		}
	})
}

//用于请求后台获取数据
var getList=function(page,id,name){
	$.getJSON(url+"user",{
		page:page,
		id:id,
		name:name
	},function(json){

		console.log(1)
		console.log(json)
		if(json.list){
			$("#page").val(json.pageNum);
			createTable(json.list);
		}
		else{
			alert("未找到数据");
		}

	})
	//假数据
//	newsList=[
//	{
//		id:0,
//		path:'1.png',
//		text:'痘印许大夫',
//		time:"2018-08-27 14:20:30"
//	},
//	{
//		id:1,
//		path:'1.png',
//		text:'经常受到攻击大夫',
//		time:"2018-08-28 14:20:30"
//	}
//	]
//	createTable(newsList);
}

//用于将数据渲染到表格中
var createTable=function(data)
{
	//获取到table
	var table=document.getElementById("table");
	table.innerHTML="";
	//各部分比例安排
	var colgroup=document.createElement("colgroup");
	table.appendChild(colgroup);
	var splice=["100","100","80","100","100","160","80","80","180"];
	for(var i=0;i<splice.length;i++)
	{
		var col=document.createElement("col");
		col.setAttribute("width",splice[i]);
		colgroup.appendChild(col)
	}

	//头部名称安排
	var thead=document.createElement("thead");
	table.appendChild(thead)
	var trh=document.createElement("tr");
	table.appendChild(thead);
	thead.appendChild(trh);
	var th1=document.createElement("th");
	th1.setAttribute("class","selectAll");
	var input=document.createElement("input");
	th1.appendChild(input);
	input.setAttribute("type","checkbox");
	input.setAttribute("class","check");
	input.setAttribute("id","selectAll");
	//用于全选的的点击事件
	input.onclick=function(){
		var ischeck=this.checked;
		var checkList=document.getElementsByName("check");
		for(var b=0;b<checkList.length;b++)
		{
			checkList[b].checked=ischeck
		}
	}

	// trh.appendChild(th1);
	var headList=["用户编号","姓名","性别","用户名","密码","手机号码","邮箱","城市","注册时间"];
	for(var i=0;i<headList.length;i++)
	{
		var th=document.createElement("th");
		th.innerText=headList[i];
		th.setAttribute("style","text-align:center;");
		trh.appendChild(th)
	}
	var th2=document.createElement("th");
	th2.setAttribute("style","text-align:center;");
	th2.innerText="操作"
	trh.appendChild(th2);

//主体部分放置数据
	for(var k=0;k<data.length;k++)
	{
	var tbody=document.createElement("tbody");
	table.appendChild(tbody)
	var trb=document.createElement("tr");
	tbody.appendChild(trb);
	var td1=document.createElement("td");
	var input=document.createElement("input");
	td1.appendChild(input);
	input.setAttribute("type","checkbox");
	input.setAttribute("name","check");
	input.setAttribute("value",data[k].id);
	input.setAttribute("class","check");
	// trb.appendChild(td1);

	//中间是不一样的需要替换的地方
	// var td2=document.createElement("td");
	// td2.innerHTML="<div class=\"image\"><img src=\"../adImg/"+data[k].path+"\" class=\"image-s\"></div>";
	// trb.appendChild(td2)
	var tdList=[];
	for(var g=0;g<9;g++)
	{
		tdList[tdList.length]=document.createElement("td");
		tdList[g].setAttribute("style","text-align:center");
		trb.appendChild(tdList[g])
	}
	tdList[0].innerText=data[k].id;
	tdList[1].innerText=data[k].name;
	tdList[2].innerText=data[k].sex;
	tdList[3].innerText=data[k].username;
	tdList[4].innerText=data[k].password;
	tdList[5].innerText=data[k].phone;
	tdList[6].innerText=data[k].email;
	tdList[7].innerText=data[k].city;
	tdList[8].innerText=data[k].createdate;
	//操作按钮部分
	var tdm=document.createElement("td");
	tdm.setAttribute("class","text-center");
    var div=document.createElement("div");
    div.setAttribute("class","t-button");
    tdm.appendChild(div);
    var buttonList=[];
    for(var i=0;i<2;i++)
    {
    	buttonList[buttonList.length]=document.createElement("button");
    	div.appendChild(buttonList[i]);
    }
    //编辑按钮
   buttonList[0].setAttribute("class","base");
   buttonList[0].setAttribute("id",data[k].id);
   buttonList[0].setAttribute("data",JSON.stringify(data[k]));
   buttonList[0].setAttribute("style","background-color: #1E9FFF;");
  	buttonList[0].innerHTML="编辑";
   	//删除按钮
    buttonList[1].setAttribute("class","base");
    buttonList[1].setAttribute("id",data[k].id);
    buttonList[1].setAttribute("style","background-color: #FF5722;");
   	buttonList[1].innerHTML="删除";
	trb.appendChild(tdm);

	//添加点击事件
	(function(){
		//编辑
		 buttonList[0].onclick=function(){
		 	var id=this.getAttribute("id");
			 var data = JSON.parse(this.getAttribute("data"))
		 	//alert(id)
		 	//通过此id将数据渲染到编辑里面
			 $("#confirm").text("修改")
			 $("#confirm").attr("sId",id);
			 $("#studentUsername").val(data.username);
			 $("#studentPassword").val(data.password);
			 $("#stuName").val(data.name)
			 $("#stuSex").val(data.sex);
			 $("#stuDate").val(data.createdate);
			 $("#stuPhone").val(data.phone);
			 $("#stuEmail").val(data.email);
			 $("#stuCity").val(data.city);
		 	document.getElementById("addCon").setAttribute("style","display:block");
		 	//将数据渲染上去

		 	//getList(page,area,subjectS);
		 }
		 //删除
		 buttonList[1].onclick=function(){
		 	var id=this.getAttribute("id");
		 	//通过此id进行删除
		 	if(confirm("请确认是否要删除"))
		 	{
				$.ajax({
					type : "DELETE",
					async:true,
					url : url+"user?id="+parseInt(id),
					dataType:"json",
					success : function(json) {
						console.log(json)
						if(json.message=="success")
						{
							alert("删除成功");
							getList(page,null,null);
						}
						else{
							alert("删除失败");
							//console.log(json)
						}
					}
				})
		 	}
		 }
	})()

}
}