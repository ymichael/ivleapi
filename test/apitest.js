$(function(){
	var apikey = "ba1ge5NQ9cl76KQNI1Suc";
	var myapp = new ivle(apikey);

	// //FOR DEMO PURPOSES ONLY.
	var re = new RegExp('token=(.+)');
	var token = re.exec(window.location.href);
	if (!token){
		// //go to test.html
		var re = /(.*)\/.*/;
		window.location.href = window.location.origin + re.exec(window.location.pathname)[1] + "/test.html";
	} else {
		var user = new myapp.user(token[1]);
		$mainel = $("#main_container");
		//run tests here.
		var next, modid;



		//validate
		var testvalidate = function(){
			var result = {};
			result.name = "user.validate(success, error) method";
			$mainel.append(ich.loading(result));
			user.validate(function(data){
				result.status = "success";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			}, function(data){
				result.status = "error";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			});
		}
		//modules
		var testmodules = function(){
			var result = {};
			result.name = "user.modules(success, error) method";
			$mainel.append(ich.loading(result));
			user.modules(function(data){
				result.status = "success";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));

				//capture one moduleid
				modid = data.Results[0].ID;

				next();
			}, function(data){
				result.status = "error";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			});
		}
		//workbin
		var testworkbin = function(){
			var result = {};
			result.name = "user.workbin(courseId, success, error) method";
			$mainel.append(ich.loading(result));
			user.workbin(modid, function(data){
				result.status = "success";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			}, function(data){
				result.status = "error";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			});
		}

		//announcements
		var testannouncements = function(){
			var result = {};
			result.name = "user.announcements(courseId, success, error) method";
			$mainel.append(ich.loading(result));
			user.announcements(modid, function(data){
				result.status = "success";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			}, function(data){
				result.status = "error";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			});
		}

		//forum
		var testforum = function(){
			var result = {};
			result.name = "user.forum(courseId, success, error) method";
			$mainel.append(ich.loading(result));
			user.forum(modid, function(data){
				result.status = "success";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			}, function(data){
				result.status = "error";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			});
		}

		//gradebook
		var testgradebook = function(){
			var result = {};
			result.name = "user.gradebook(courseId, success, error) method";
			$mainel.append(ich.loading(result));
			user.gradebook(modid, function(data){
				result.status = "success";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			}, function(data){
				result.status = "error";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			});
		}

		//webcasts
		var testwebcasts = function(){
			var result = {};
			result.name = "user.webcasts(courseId, success, error) method";
			$mainel.append(ich.loading(result));
			user.webcasts(modid, function(data){
				result.status = "success";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			}, function(data){
				result.status = "error";
				result.response = JSON.stringify(data, undefined, 2);
				$mainel.children().last().remove();
				$mainel.append(ich.test(result));
				next();
			});
		}

		//queue api calls
		var tests = [testvalidate, testmodules, testworkbin, testannouncements, testforum, testgradebook, testwebcasts]
		var next = function(){
			if (tests.length === 0){
				//end test
				$mainel.append(ich.done());
			} else {
				tests.shift().call();
			}
		}
		next();

		//click to reveal more..
		$('.test').live('click', function(){
			if ($(this).hasClass('view')) {
				return $('.view').removeClass('view');	
			}
			$('.view').removeClass('view');
			$(this).addClass('view');
		});
	}		
});