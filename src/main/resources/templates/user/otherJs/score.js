//全局变量
var newsList=[];
var fileName=""
var page = 1;
var area = "";
var subjectS = "";
//广告管理
window.onload=function(){

	var da = getStorge("user")||"";
	if(da != "") {
		var user = JSON.parse(da);
		$("#userName").html(user.name);
	}

}
