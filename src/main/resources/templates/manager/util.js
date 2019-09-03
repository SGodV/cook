var username="";
//用于判断是否登陆
var isLogin = function(){
	//console.log(getStorge("manager"))
	var da = getStorge("user")||"";
	if(da != ""){
		// var manager = JSON.parse(da);
		// $.ajax({
		// 	type: "post",
		// 	async: true,
		// 	url: url + "login",
		// 	data: JSON.stringify({
		// 		username:manager.account,
		// 		password:manager.password
		// 	}),
		// 	dataType: "json",
		// 	jsonp: "jsoncallback",
		// 	jsonpCallback: "success_jsonpCallback",
		// 	contentType: "application/json",
		// 	success: function (json) {
		// 		console.log(json)
		// 		if(json.message){
		// 			alert("当前并未登陆，请前往登陆");
		// 			window.location.href = "/login/index.html";
		// 		}
		// 		else{
		// 			setStorge("user",json,3);
		// 		}
		// 	}
		// })
	}
	else{
		//console.log(2);
		alert("当前并未登陆，请前往登陆!!");
		window.location.href = "/index.html";
	}


}


// window.confirm('你确定要取消交易吗？')
/*
create header event
*/
var createHeaderEvent=function()
{
	document.getElementById("logout").onclick=function(){
		window.location.href("../JSP/login.jsp");
	}
}

//用于请求网址 异步
var request=function(url,callback)
	{
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4)
				{
				if(xhr.status==200)
					{
					//alert(xhr.responseText);
					//document.getElementById("mytext").innerHTML=xhr.responseText;
					callback(xhr.responseText);
					}
				}
		}
		xhr.open("GET",url,true);
		 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(null);
		}

//用于请求网址 同步
var requestSysc=function(url,callback)
	{
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4)
				{
				if(xhr.status==200)
					{
					//alert(xhr.responseText);
					//document.getElementById("mytext").innerHTML=xhr.responseText;
					callback(xhr.responseText);
					}
				}
		}
		xhr.open("GET",url,false);
		 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(null);
		}


//划分地址
function getQueryString(name) { 
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	  var r = window.location.search.substr(1).match(reg); 
	  if (r != null) return decodeURI(r[2]); return null; 
}
//缓存
var setStorge=function(name,value,days)
{
	var d=new Date();
	d.setTime(d.getTime()+(days*24*60*60*1000));
	var expires="expires"+d.toUTCString();
	document.cookie=name+"="+value+"; "+expires+";path=/";
}
//获取缓存
var getStorge=function(cname)
{
	var name=cname+"=";
	var ca=document.cookie.split(';');
	for(var i=0;i<ca.length;i++)
		{
		var c=ca[i];
		while(c.charAt(0)==' ')c=c.substring(1);
		if(c.indexOf(name)!=-1)return c.substring(name.length,c.length);
		}
}


