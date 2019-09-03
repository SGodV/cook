//全局变量
var serviceList=[];
//广告管理
window.onload=function(){
	/**
	向后台请求数据把相应的广告东西找到
	*/
	getList();
	
    /**
    对其中的按钮进行添加事件
    */
     //启用
    document.getElementById("add").onclick=function(){
    	
    	getList();
    }
    //禁用
    document.getElementById("delete").onclick=function(){
    	/*获取到选中的按钮上的id
    	请求后台将对应点给删除
		*/
		var checkList=document.getElementsByName("check");
		var idList=[];
		for(var b=0;b<checkList.length;b++)
		{
			if(checkList[b].checked)
			{
				idList[idList.length]=checkList[b].getAttribute("value");
			}
		}
		if(idList.length==0)
		{
			alert("请选择后再点击禁用");
		}
		else
		{
//			if(confirm("请确认是否要禁用选中的用户"))
//		 	{
//		 		alert(idList);
//		 		getList();
//		 	}
			alert("暂不支持")
		}
    }
    //刷新
    document.getElementById("refresh").onclick=function(){
    	getList();
    }

    document.getElementById("search").onclick=function(){
      	 var phone=document.getElementById("phone").value;
      	 var orderId=document.getElementById("addr").value;
      	 var order=[];
      	 for(var i=0;iserviceList.length;i++)
      		 {
      		 if(serviceList[i].phone==phone||serviceList[i].addr==addr)
      			 {
      			 order[order.length]=serviceList[i]
      			 }
      		 }
      	 if(order.length!=0)
      		 {
      		 createTable(order)
      		 }
      	 else
      		 {
      		 alert('没有相关信息');
      		 }
       }

   /**
    * 审核的通过与不通过
    * 
    */
    document.getElementById("pass").onclick=function(){
    	if(confirm("请确认是否通过当前服务商的认证"))
    		{
    		var id=this.getAttribute("openid")
    		request("Pass?id="+id,function(data){
    			 document.getElementById("idcard").setAttribute("style", "display:none;");
    			if(data==1)
    				{
    				alert("更新成功")
    				getList();
    				}
    			else
    				{
    				alert("更新失败")
    				}
    		})
    		}
    }
    document.getElementById("n-pass").onclick=function(){
    	if(confirm("请确认是否拒绝当前服务商的认证"))
    		{
    		var id=this.getAttribute("openid")
    		request("NPass?id="+id,function(data){
    			 document.getElementById("idcard").setAttribute("style", "display:none;");
    			if(data==1)
    				{
    				alert("更新成功")
    				getList();
    				}
    			else
    				{
    				alert("更新失败")
    				}
    		})
    		}
    }
    document.getElementById("close").onclick=function(){
    	document.getElementById("idcard").setAttribute("style", "display:none;");
    }
}

//用于请求后台获取数据
var getList=function(){
	var manager=JSON.parse(getStorge("manager"));
	 request("GetService?account="+manager.account+"&password="+manager.password,function(data){
		 serviceList=JSON.parse(data);
	 	if(typeof serviceList=="object")
	 		{
	 		createTable(serviceList);
	 		}
	 	console.log(serviceList)
	 })
	//假数据
//	serviceList=[
//	{
//		id:0,
//		zh:'4555646315',
//		phone:15892003499,
//		addr:'成都',
//		time:"2018-08-27 14:20:30",
//		type:"修理工"
//	},
//	{
//		id:1,
//		zh:'4555646315',
//		phone:15892003499,
//		addr:'成都',
//		time:"2018-08-28 14:20:30",
//		type:"修理工"
//	}
//	]
//	createTable(serviceList);
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
	var splice=["100","250","250","250","250","250"," "];
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
	var headList=["账户","电话","地址","关注时间","服务类型"];
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
	trb.appendChild(td1);

	//中间是不一样的需要替换的地方
	var tdList=[];
	for(var g=0;g<5;g++)
	{
		tdList[tdList.length]=document.createElement("td");
		tdList[g].setAttribute("style","text-align:center");
		trb.appendChild(tdList[g])
	}
	tdList[0].innerText=data[k].name;
	tdList[1].innerText=data[k].phone||"未知";
	tdList[2].innerText=data[k].addr||"未知";
	tdList[3].innerText=data[k].time;
	tdList[4].innerText=data[k].type||"未知";
	//操作按钮部分
	var tdm=document.createElement("td");
	tdm.setAttribute("class","text-center");
    var div=document.createElement("div");
    div.setAttribute("class","t-button");
    tdm.appendChild(div);
    var buttonList=[];
    for(var i=0;i<3;i++)
    {
    	buttonList[buttonList.length]=document.createElement("button");
    	div.appendChild(buttonList[i]);    
    }
    if(data[k].disabled==0)
	{
//编辑按钮
buttonList[0].setAttribute("class","base");
buttonList[0].setAttribute("id",data[k].id);
buttonList[0].setAttribute("style","background-color: #1E9FFF;");
	buttonList[0].innerHTML="<i>&#xe642;</i>启用";
	}
else
	{
	//删除按钮
buttonList[1].setAttribute("class","base");
buttonList[1].setAttribute("id",data[k].id);
buttonList[1].setAttribute("style","background-color: #FF5722;");
	buttonList[1].innerHTML=" <i>&#xe640;</i>禁用";
	}
  //认证按钮
    buttonList[2].setAttribute("class","base");
    buttonList[2].setAttribute("id",data[k].id);
    buttonList[2].setAttribute("style","background-color: blue;");
    buttonList[2].setAttribute("name",data[k].worker_name);
    buttonList[2].setAttribute("idCard",data[k].card_id);
    buttonList[2].setAttribute("status",data[k].shnehe);
    buttonList[2].setAttribute("image",JSON.stringify(data[k].card_image));
    	buttonList[2].innerHTML=" <i>&#xe640;</i>认证";
    
	trb.appendChild(tdm);

	//添加点击事件
	(function(){
		//编辑
		 buttonList[0].onclick=function(){
		 	var id=this.getAttribute("id");
		 	//alert(id)
		 	//通过此id将数据渲染到编辑里面
		 	//将数据渲染上去
		 	if(confirm("请确认是否要禁用此用户"))
		 	{
		 		request("SetServiceDisabled?disabled=1&id="+id,function(data){
			 		if(data==1)
			 			{
			 			alert("启用成功")
			 			getList();
			 			}
			 		else
			 			{
			 			alert('启用失败')
			 			}
			 	});
		 		
		 	}
		 }
		 //删除
		 buttonList[1].onclick=function(){
		 	var id=this.getAttribute("id");
		 	//通过此id进行删除
		 	if(confirm("请确认是否要禁用此用户"))
		 	{
		 		request("SetServiceDisabled?disabled=0&id="+id,function(data){
			 		if(data==1)
			 			{
			 			alert("禁用成功")
			 			getList();
			 			}
			 		else
			 			{
			 			alert('禁用失败')
			 			}
			 	});
		 	}
		 }
		 
		 //认证
		 buttonList[2].onclick=function(){
			 if(this.getAttribute("idCard")=="undefined")
				 {
				 alert("当前服务商还未提交信息");
				 }
			 else
				 {
				 var id=this.getAttribute("id");
			 document.getElementById("name").innerText="姓名："+this.getAttribute("name")
			 document.getElementById("idCard").innerText="姓名："+this.getAttribute("idCard")
			 document.getElementById("status").innerText="审核状态："+this.getAttribute("status")
			 var imageList=document.getElementsByName("imgList");
			 var imagePath=JSON.parse(this.getAttribute("image"));
			 //console.log(imagePath)
			 for(var i=0;i<imageList.length;i++)
				 {
				 imageList[i].src=url+"idCardImage/"+imagePath[i];
				 }
			 document.getElementById("pass").setAttribute("openid",id);
			 document.getElementById("n-pass").setAttribute("openid",id);
			 document.getElementById("idcard").setAttribute("style", "display:block;");
		 }
		 }
		 
	})()

}
}