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

	$.get(url + 'foodInfo', {}, function (data) {
		var $html = "";
		if (data.list != null) {
			$.each(data.list, function (index, item) {
				if (item.name) {
					$html += "<option value='" + item.id + "'>" + item.name + "</option>";
				} else {
					$html += "<option value='" + item.id + "'>" + item.name + "</option>";
				}
			});
			$("select[name='category']").append($html);
			//反选
			// $("select[name='???']").val($("#???").val());
			//append后必须从新渲染
			// form.render('select');
		}
	})

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

	//添加
	document.getElementById("add").onclick=function(){
		document.getElementById("confirm").innerText="确定";
		document.getElementById("addCon").setAttribute("style", "display:block");
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
		$("#addCon").attr("style","display:none")
	})
	$("#confirm").click(function() {
		var objType = $("#category").find("option:selected");
		var foodNum = $("#foodNum").val();

		if (foodNum.length == 0) {
			alert("请输入完整数据");
			return;
		}

		if (objType.val() == '') {
			alert("请选择采购食材");
			return;
		}

		if (isNaN(foodNum)) {
			alert("数量格式错误");
			return false;
		}
		if(confirm("请确认是否保存此条数据")){
			$.ajax({
				type: "post",
				async: false,
				url: url + "foodPur",
				data: JSON.stringify({
					foodid:objType.val(),
					num:foodNum,
					status:'下单'
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

	})
}

//用于请求后台获取数据
var getList=function(page,id,name){
	$.getJSON(url+"foodPur",{
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
	var splice=["140","100","100","100","200"];
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

	var headList=["采购单编号","食材名称","数量","状态"];
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
	for(var g=0;g<4;g++)
	{
		tdList[tdList.length]=document.createElement("td");
		tdList[g].setAttribute("style","text-align:center");
		trb.appendChild(tdList[g])
	}
	tdList[0].innerText=data[k].id;
	tdList[1].innerText=data[k].foodName;
	tdList[2].innerText=data[k].num;
	tdList[3].innerText=data[k].status;

	//操作按钮部分
	var tdm=document.createElement("td");
	tdm.setAttribute("class","text-center");
    var div=document.createElement("div");
    div.setAttribute("class","t-button");
    tdm.appendChild(div);
    var buttonList=[];
    for(var i=0;i<1;i++)
    {
    	buttonList[buttonList.length]=document.createElement("button");
    	div.appendChild(buttonList[i]);    
    }
    //编辑按钮
    buttonList[0].setAttribute("class","base");
    buttonList[0].setAttribute("id",data[k].id);
	buttonList[0].setAttribute("data",JSON.stringify(data[k]));
    buttonList[0].setAttribute("style","background-color: #FF5722;");
   	buttonList[0].innerHTML="删除";
	trb.appendChild(tdm);

	//添加点击事件
	(function(){
		//删除
		buttonList[0].onclick=function(){
			var id=this.getAttribute("id");
			//通过此id进行删除
			if(confirm("请确认是否要删除"))
			{
				$.ajax({
					type : "DELETE",
					async:true,
					url : url+"foodPur?id="+parseInt(id),
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
						}
					}
				})
			}
		}

	})()

}
}