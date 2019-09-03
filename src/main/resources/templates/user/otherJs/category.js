//全局变量
var page = 1;
var id = "";
var name = "";
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
		if(studentUsername.length==0||studentPassword.length==0){
			alert("请输入完整数据");
			return;
		}

		var id = $("#confirm").attr("sId")
		var type =  $("#confirm").text().trim();
		console.log(type)
		if(type=="确定"){
			if(confirm("请确认是否保存此条数据")){
				$.ajax({
					type: "post",
					async: false,
					url: url + "category",
					data: JSON.stringify({
						name:studentUsername,
						desc:studentPassword
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
					url: url + "category",
					data: JSON.stringify({
						id:id,
						name:studentUsername,
						desc:studentPassword
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
	$.getJSON(url+"category",{
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
	var splice=["50","100","100","150","290"];
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

	var headList=["类别编号","类别名称","类别描述"];
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

	var tdList=[];
	for(var g=0;g<3;g++)
	{
		tdList[tdList.length]=document.createElement("td");
		tdList[g].setAttribute("style","text-align:center");
		trb.appendChild(tdList[g])
	}
	tdList[0].innerText=data[k].id;
	tdList[1].innerText=data[k].name;
	tdList[2].innerText=data[k].desc;
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
		 	//通过此id将数据渲染到编辑里面
			 $("#confirm").text("修改")
			 $("#confirm").attr("sId",id);
			 $("#studentUsername").val(data.name);
			 $("#studentPassword").val(data.desc);
		 	document.getElementById("addCon").setAttribute("style","display:block");
		 	//将数据渲染上去

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
					url : url+"category?id="+parseInt(id),
					dataType:"json",
					success : function(json) {
						console.log(json)
						if(json.message=="success")
						{
							alert("删除成功");
							getList(page,null,null);
						}
						else{
							alert(json.message);
						}
					}
				})
		 	}
		 }
	})()

}
}