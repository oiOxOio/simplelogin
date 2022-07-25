let nextbut = document.getElementById("next");
let wenzi = document.getElementById("wenzi");
let login = document.querySelectorAll(".login")[1];
let fanhui = document.getElementById("fanhui");
nextbut.onclick = function () {
	let className = document.querySelectorAll(".login")[1].getAttribute("class");
	if (className.search("flag2") === -1) {
		login.setAttribute("class", className + " flag2");
	}
	wenzi.innerText = "输入密码";

}
fanhui.onclick = function () {
	let className = document.querySelectorAll(".login")[1].getAttribute("class");
	if (className.search("flag2") !== -1) {
		login.removeAttribute("class");
		login.setAttribute("class", "login flag1");
	}
	wenzi.innerText = "账号登录";

}