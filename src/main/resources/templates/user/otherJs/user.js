//全局变量
var feedList=[];
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
	getList();
	
    /**
    对其中的按钮进行添加事件
    */
    
    //刷新
    document.getElementById("refresh").onclick=function(){
    	getList();
    }



    //关于添加的按钮处理事件

}

//用于请求后台获取数据
var getList=function(){
	$.getJSON(url+"phone",{

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
	//假数据
//	feedList=[
//	{
//		id:0,
//		user:"超级大杰哥",
//		text:'痘印许大夫',
//		time:"2018-08-27 14:20:30"
//	},
//	{
//		id:1,
//		user:"超级大杰哥",
//		text:'经常受到攻击大夫',
//		time:"2018-08-28 14:20:30"
//	}
//	]
//	createTable(feedList);
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
	var splice=["200"];
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

	trh.appendChild(th1);
	var headList=["电话号码","创建时间","姓名","考试类型","区域","学段科目","分数"];
	for(var i=0;i<headList.length;i++)
	{
		var th=document.createElement("th");
		th.innerText=headList[i];
		th.setAttribute("style","text-align:center;");
		trh.appendChild(th)
	}
	// var th2=document.createElement("th");
	// th2.setAttribute("style","text-align:center;");
	// th2.innerText="操作"
	// trh.appendChild(th2);

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
	trb.appendChild(td1);

	//中间是不一样的需要替换的地方
	var tdList=[];
	for(var g=0;g<7;g++)
	{
		tdList[tdList.length]=document.createElement("td");
		tdList[g].setAttribute("style","text-align:center");
		trb.appendChild(tdList[g])
	}
	tdList[0].innerText=data[k].phone;
	if(data[k].sunburnInfo){
		tdList[1].innerText=data[k].sunburnInfo.created;
		tdList[2].innerText=data[k].sunburnInfo.name;
		tdList[3].innerText=data[k].sunburnInfo.type;
		tdList[4].innerText=data[k].sunburnInfo.area;
		tdList[5].innerText=data[k].sunburnInfo.subject;
		tdList[6].innerText=data[k].sunburnInfo.score;
	}


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
    // buttonList[0].setAttribute("class","base");
    // buttonList[0].setAttribute("id",data[k].id);
    // buttonList[0].setAttribute("style","background-color: #1E9FFF;");
   	// buttonList[0].innerHTML="<i>&#xe642;</i>回复";
   	//删除按钮
    // buttonList[1].setAttribute("class","base");
    // buttonList[1].setAttribute("id",data[k].id);
    // buttonList[1].setAttribute("style","background-color: #FF5722;");
   	// buttonList[1].innerHTML=" <i>&#xe640;</i>删除";
	// trb.appendChild(tdm);

	//添加点击事件
	(function(){
		//编辑
		 buttonList[0].onclick=function(){
		 	var id=this.getAttribute("id");
		 	//alert(id)
		 	//通过此id将数据渲染到编辑里面
		 	document.getElementById("addCon").setAttribute("style","display:block");
		 	//将数据渲染上去
		 	document.getElementById("confirm").setAttribute("mysqlId",id)
		 	
		 }
		 //删除
		 buttonList[1].onclick=function(){
		 	var id=this.getAttribute("id");
		 	//通过此id进行删除
		 	if(confirm("请确认是否要删除本条反馈"))
		 	{
		 		request("DeleteFeed?id=("+id+")",function(data){
		 			if(data==1)
		 				{
		 				alert("删除成功")
		 				getList();
		 				}
		 			else
		 				{
		 				alert("删除失败")
		 				}
		 		})
		 		
		 	}
		 }
	})()

}
}