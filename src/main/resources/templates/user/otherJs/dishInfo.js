//全局变量
var page = 1;
var id = "";
var name = "";
var da;
window.onload=function(){

	da = getStorge("user")||"";
	if(da != "") {
		var user = JSON.parse(da);
		$("#userName").html(user.name);
	}

	$.get(url + 'foodInfo', {}, function (data) {
		var category=document.getElementById("category");
		category.innerHTML="";
		if (data.list != null) {
			$.each(data.list, function (index, item) {
				if (item.name) {
					var checkBox=document.createElement("input");
					checkBox.setAttribute("type","checkbox");
					checkBox.setAttribute("name","dishHas");
					checkBox.setAttribute("title",item.name);
					checkBox.setAttribute("value",item.id);
					category.appendChild(checkBox);
				} else {
					var checkBox=document.createElement("input");
					checkBox.setAttribute("type","checkbox");
					checkBox.setAttribute("name","dishHas");
					checkBox.setAttribute("title",item.name);
					checkBox.setAttribute("value",item.id);
					category.appendChild(checkBox);
				}
			});

		}
		//重新渲染
		layui.use('form', function () {
			var form = layui.form;
			form.render();
		});
	})

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
		layer.open({
			type:1,
			area:['500px','550px'],
			title: '添加',
			content: $("#test"),
			shade: 0,
			btn: ['提交', '重置']
			,btn1: function(index, layero){
				var dishName = $("#dishName").val();
				var dishDesc = $("#dishDesc").val();
				var dishStep = $("#dishStep").val();

				var obj = document.getElementsByName("dishHas");
				var check_val = [];
				for(k in obj){
					if(obj[k].checked)
						check_val.push(parseInt(obj[k].value));
				}

				if(dishName.length==0||dishDesc.length==0||dishStep.length==0){
					alert("请输入完整数据");
					return;
				}
				if (check_val == ''){
					alert("请选择用料");
					return;
				}

				if(confirm("请确认是否保存此条数据")){
					$.ajax({
						type: "post",
						async: false,
						url: url + "dishInfo",
						data: JSON.stringify({
							name:dishName,
							desc:dishDesc,
							stepDesc:dishStep,
							userid:JSON.parse(da).id,
							hasList:check_val
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
								$("#test")[0].reset();
								layui.form.render();
								layer.closeAll();
								// document.getElementById("test").style.display = "none";
							}
						}
					})
				}

			},
			btn2: function(index, layero){
				$("#test")[0].reset();
				layui.form.render();
			},
			cancel: function(layero,index){
				layer.closeAll();
			}

		});
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
}

//用于请求后台获取数据
var getList=function(page,id,name){
	$.getJSON(url+"dishInfo",{
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
	var splice=["120","120","120","220","290"];
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

	var headList=["菜谱编号","菜谱名称","贡献用户","菜谱描述"];
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
		for(var g=0;g<4;g++)
		{
			tdList[tdList.length]=document.createElement("td");
			tdList[g].setAttribute("style","text-align:center");
			trb.appendChild(tdList[g])
		}
		tdList[0].innerText=data[k].id;
		tdList[1].innerText=data[k].name;
		tdList[2].innerText=data[k].userName;
		tdList[3].innerText=data[k].desc;
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
		buttonList[0].innerHTML="详情";
		//删除按钮
		buttonList[1].setAttribute("class","base");
		buttonList[1].setAttribute("id",data[k].id);
		buttonList[1].setAttribute("style","background-color: #FF5722;");
		buttonList[1].innerHTML="删除";
		trb.appendChild(tdm);

		//添加点击事件
		(function(){
			//详情
			buttonList[0].onclick=function(){

				//通过此id将数据渲染到编辑里面
				var data = JSON.parse(this.getAttribute("data"));
				var id=this.getAttribute("id");
				//渲染
				$("#infoName").html(data.name);
				$("#infoUser").html(data.userName);
				$("#infoDesc").html(data.desc);
				$("#infoStep").html(data.stepDesc);

				//用料
				$.ajax({
					type : "get",
					async:true,
					url : url+"dishHas?dishId="+parseInt(id),
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

				//评论
				$.ajax({
					type : "get",
					async:true,
					url : url+"dishEva?dishId="+parseInt(id),
					dataType:"json",
					success : function(json) {
						if(json[0] != undefined)
						{
							var hasString = '';
							for(k in json){
								hasString = hasString.concat(json[k].content + ' &nbsp;&nbsp;&nbsp;' + '来源:' + json[k].userName + '<br>');
							}
							$("#infoEva").html(hasString);
						}
						else{
							$("#infoEva").html("暂无数据");
						}
					}
				})

				layer.open({
					type:1,
					area:['500px','550px'],
					title: '详情',
					content: $("#info"),
					shade: 0,
					btn: ['提交评论', '重置']
					,btn1: function(index, layero){
						var dishEva = $("#dishEva").val();
						if(dishEva.length==0){
							alert("请输入完整数据");
							return;
						}

						if(confirm("请确认是否提交此条数据")){
							$.ajax({
								type: "post",
								async: false,
								url: url + "dishEva",
								data: JSON.stringify({
									dishid:id,
									user:JSON.parse(da).id,
									content:dishEva
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
										$("#info")[0].reset();
										layui.form.render();
										layer.closeAll();
										// document.getElementById("test").style.display = "none";
									}
								}
							})
						}
					},
					btn2: function(index, layero){
						$("#info")[0].reset();
						layui.form.render();
					},
					cancel: function(layero,index){
						layer.closeAll();
					}

				});



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
						url : url+"dishInfo?id="+parseInt(id),
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