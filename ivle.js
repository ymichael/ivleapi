//main library obj
var ivle = (function($){
	//private stuff.
	var baseurl = "https://ivle.nus.edu.sg/api/Lapi.svc/";

	var jsonp = function(url, params, success, error, proxyurl){
		$.ajax({
			type: 'GET',
			dataType: 'jsonp',
			data: params,
			contentType:"application/x-javascript",
			url: url,
			xhrFields: { withCredentials: false },
			success: success,
			error: function(xhr, err, errobj){
				//console.log('revert to proxy');
				var request = url + "?" +  decodeURIComponent($.param(params));
				//console.log(request);
				if (proxyurl){
					$.ajax({
						type: 'GET',
						dataType: 'json',
						data:{request: request},
						url: proxyurl,
						dataFilter: function(data){
							return $.parseJSON(data);
						},
						success: success,
						error: error
					});
				} else {
					if (error){
						error.apply(this,arguments);
					}
				}
			}
		});
	};
	//public
	var ivle = function(apikey, proxy){
		this.apikey = apikey;
		this.proxy = proxy;
		
		this.auth = function($el, callbackurl){
			$el.click(function(){
				var authUrl = "https://ivle.nus.edu.sg/api/login/?apikey=" + apikey + "&url=" + encodeURIComponent(callbackurl);
				window.location.href = authUrl;
			});
		};

		//create user with auth token
		this.user = function(authtoken){
			this.authtoken = authtoken;
			/*
			*	APICALLS (work in progress)
			*/

			//set auth token
			this.setauthtoken = function(newauthtoken){
				this.authtoken = newauthtoken;
			};



			//validate user
			this.validate = function(success, error){
				var endpoint = 'Validate';
				var params = {
					"APIKey" : apikey,
					"Token" : this.authtoken,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//modules
			this.modules = function(success, error){
				var endpoint = 'Modules';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"Duration" : 0,
					//whether to display basic info or all or it.
					"IncludeAllInfo" : false,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//workbin
			this.workbin = function(courseId, success, error){
				var endpoint = 'Workbins';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"CourseId" : courseId,
					"Duration" : 0,
					//"WorkbinID" : 0, // undefined means all
					//whether to display basic info or all or it.
					// "TitleOnly" : true,
					"TitleOnly" : false,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};

			//file download
			this.file = function(fileId){
				//dont like this. but it works
				var url = "https://ivle.nus.edu.sg/api/downloadfile.ashx?APIKey=" + apikey + "&AuthToken=" + this.authtoken + "&ID=" + fileId + "&target=workbin";
				window.location.href = url;
			};
			
			//announcements
			this.announcements = function(courseId, success, error){
				var endpoint = 'Announcements';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"CourseId" : courseId,
					"Duration" : 0,
					//whether to display basic info or all or it.
					// "TitleOnly" : true,
					"TitleOnly" : false,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};
			
			//gradebook
			this.gradebook = function(courseId, success, error){
				var endpoint = 'Gradebook_ViewItems';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"CourseId" : courseId,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};
			
			//forums
			this.forum = function(courseId, success, error){
				var endpoint = 'Forums';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"CourseId" : courseId,
					"Duration" : 0,
					"IncludeThreads" : true, //whether to display threads
					//whether to display basic info or all or it.
					// "TitleOnly" : true,
					"TitleOnly" : false,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};
			
			//webcasts
			this.webcasts = function(courseId, success, error){
				var endpoint = 'Webcasts';
				var params = {
					"APIKey" : apikey,
					"AuthToken" : this.authtoken,
					"CourseId" : courseId,
					"Duration" : 0,
					"output" : "json"
				};
				var url = baseurl + endpoint;
				jsonp(url, params, success, error, proxy);
			};
		};
	};
	return ivle;
})($);