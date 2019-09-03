window.onload=function(){
	console.log(window.location)
	document.getElementById("LOGIN").onclick= function(){
		var account=document.getElementById("ID")//账户
		var password=document.getElementById("PASSWORD")//密码
		var type = $("input[name='type']:checked").val();
		// alert(type);
		if(account.value.length==0||password.value.length==0)
			{
			alert("账号或密码未输入");
			}
		else if (type == '管理员') {
			$.ajax({
				type: "post",
				async: false,
				url: url + "loginAdmin",
				data: JSON.stringify({
					username:account.value,
					password:password.value
				}),
				dataType: "json",
				jsonp: "jsoncallback",
				jsonpCallback: "success_jsonpCallback",
				contentType: "application/json",
				success: function (json) {
					console.log(json)
					if(json.message){
						alert("账号或密码有误");
					}
					else{
						setStorge("user",JSON.stringify(json),3);
						window.location.href="../student.html";
					}

				}
			})
		}
		else if (type == '普通用户'){
				/**
				 *
				 */
				$.ajax({
					type: "post",
					async: false,
					url: url + "login",
					data: JSON.stringify({
						username:account.value,
						password:password.value
					}),
					dataType: "json",
					jsonp: "jsoncallback",
					jsonpCallback: "success_jsonpCallback",
					contentType: "application/json",
					success: function (json) {
						console.log(json)
						if(json.message){
							alert("账号或密码有误");
						}
						else{
							setStorge("user",JSON.stringify(json),3);
							window.location.href="../../manager/dishInfo.html";
						}

					}
				})
			}
	}
}