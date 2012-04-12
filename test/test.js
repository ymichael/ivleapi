$(function(){
	var apikey = "ba1ge5NQ9cl76KQNI1Suc";
	var myapp = new ivle(apikey);

	//TEST AUTH
	var re = /(.*)\/.*/;
	myapp.auth($('#login'), window.location.origin + re.exec(window.location.pathname)[1] + "/apitest.html");	
});