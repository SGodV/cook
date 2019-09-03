//全局变量
var page = 1;
var id = "";
var name = "";
var da;
//广告管理
window.onload=function(){

	da = getStorge("user")||"";
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
    
    //刷新
    document.getElementById("refresh").onclick=function(){
    	getList();
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

}

//用于请求后台获取数据
var getList=function(page,id,name){
	$.getJSON(url+"foodOrder/",{
		page:page,
		id:id,
		name:name
	},function(json){

		console.log(1)
		console.log(json)
		if(json.list){
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
	var splice=["80","100","120","80","140","80","200"];
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

	var headList=["订单编号","用户姓名","送达时间","配送地址","联系电话","订单状态"];
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

	//中间是不一样的需要替换的地方
	var tdList=[];
	for(var g=0;g<6;g++)
	{
		tdList[tdList.length]=document.createElement("td");
		tdList[g].setAttribute("style","text-align:center");
		trb.appendChild(tdList[g])
	}
	tdList[0].innerText=data[k].id;
	tdList[1].innerText=data[k].userName;
	tdList[2].innerText=data[k].time;
	tdList[3].innerText=data[k].adress;
	tdList[4].innerText=data[k].phone;
	tdList[5].innerText=data[k].status;


	//操作按钮部分
	var tdm=document.createElement("td");
	tdm.setAttribute("class","text-center");
    var div=document.createElement("div");
    div.setAttribute("class","t-button");
    tdm.appendChild(div);
    var buttonList=[];
    for(var i=0;i<4;i++)
    {
    	buttonList[buttonList.length]=document.createElement("button");
    	div.appendChild(buttonList[i]);    
    }
    //编辑按钮
    buttonList[0].setAttribute("class","base");
    buttonList[0].setAttribute("id",data[k].id);
	buttonList[0].setAttribute("data",JSON.stringify(data[k]));
    buttonList[0].setAttribute("style","background-color: #1E9FFF;");
   	buttonList[0].innerHTML="详情";
   	//删除按钮
    buttonList[1].setAttribute("class","base");
    buttonList[1].setAttribute("id",data[k].id);
	buttonList[1].setAttribute("data",JSON.stringify(data[k]));
    buttonList[1].setAttribute("style","background-color: #1E9FFF;");
   	buttonList[1].innerHTML=" 配送";
	//删除按钮
	buttonList[2].setAttribute("class","base");
	buttonList[2].setAttribute("id",data[k].id);
	buttonList[2].setAttribute("data",JSON.stringify(data[k]));
	buttonList[2].setAttribute("style","background-color: #1E9FFF;");
	buttonList[2].innerHTML=" 送达";
	//删除按钮
	buttonList[3].setAttribute("class","base");
	buttonList[3].setAttribute("id",data[k].id);
	buttonList[3].setAttribute("data",JSON.stringify(data[k]));
	buttonList[3].setAttribute("style","background-color: #FF5722;");
	buttonList[3].innerHTML=" 删除";
	trb.appendChild(tdm);

	//添加点击事件
	(function(){
		//编辑
		 buttonList[0].onclick=function(){
			 //通过此id将数据渲染到编辑里面
			 var data = JSON.parse(this.getAttribute("data"));
			 var id=this.getAttribute("id");
			 //渲染
			 $("#infoName").html(data.id);
			 $("#infoUser").html(data.time);
			 $("#infoDesc").html(data.adress);
			 $("#infoStep").html(data.phone);
			 $("#infoEva").html(data.status);


			 //用料
			 $.ajax({
				 type : "get",
				 async:true,
				 url : url+"dishHas?dishId="+parseInt(data.dishid),
				 dataType:"json",
				 success : function(json) {
					 if(json[0] != undefined)
					 {
						 var hasString = '';
						 for(k in json){
							 hasString = hasString.concat(json[k].foodName + ' ');
						 }
						 $("#infoHas").html(hasString);
					 }
					 else{
						 $("#infoHas").html("暂无数据");
					 }
				 }
			 })

			 layer.open({
				 type:1,
				 area:['500px','450px'],
				 title: '详情',
				 content: $("#info"),
				 shade: 0,
				 cancel: function(layero,index){
					 layer.closeAll();
				 }

			 });
		 	
		 }
		 //删除
		 buttonList[1].onclick=function(){
			 //通过此id将数据渲染到编辑里面
			 var data = JSON.parse(this.getAttribute("data"));
			 var id=this.getAttribute("id");
			 if (data.status == '退货'){
			 	alert('已经退货');
			 	return;
			 }
		 	//通过此id进行删除
		 	if(confirm("是否确认配送"))
		 	{
				$.ajax({
					type : "put",
					url : url+"foodOrder",
					dataType:"json",
					data: JSON.stringify({
						id:id,
						status:'配送'
					}),
					dataType: "json",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback",
					contentType: "application/json",
					success : function(json) {
						if(json.message){
							alert(json.message)
						}
						else{
							alert("配送成功");
							window.location.reload();
						}
					}
				})
		 	}
		 }

		//删除
		buttonList[2].onclick=function(){
			//通过此id将数据渲染到编辑里面
			var data = JSON.parse(this.getAttribute("data"));
			var id=this.getAttribute("id");
			if (data.status == '退货'){
				alert('已经退货');
				return;
			}
			//通过此id进行删除
			if(confirm("是否确认送达"))
			{
				$.ajax({
					type : "put",
					url : url+"foodOrder",
					dataType:"json",
					data: JSON.stringify({
						id:id,
						status:'送达'
					}),
					dataType: "json",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback",
					contentType: "application/json",
					success : function(json) {
						if(json.message){
							alert(json.message)
						}
						else{
							alert("送达成功");
							window.location.reload();
						}
					}
				})
			}
		}
		//删除
		buttonList[3].onclick=function(){
			var id=this.getAttribute("id");
			//通过此id进行删除
			if(confirm("请确认是否要删除"))
			{
				$.ajax({
					type : "DELETE",
					async:true,
					url : url+"foodOrder?id="+parseInt(id),
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