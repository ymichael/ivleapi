# IVLE LAPI javascript wrapper

An abstraction layer over NUS IVLE LAPI inspired by [darora/IVLE-Fix](https://github.com/darora/IVLE-Fix)

**A Live app using this api can be found at [http://modivle.yrmichael.com/](http://modivle.yrmichael.com/)**  


##README Contents
 - [Purpose](#a1)

 - [Dependencies](#a2)  

 - [Public Methods](#a3)
 
 - [Others](#a4)


<a name='a1'/>
### Purpose
The purpose of this library is to abstract away from the very comprehensive api endpoints to simple method calls.

<a name='a2'/>
## Dependencies
Currently, the only dependency is `jQuery`.

Basically, to get started just include the following in your html file:

```html
<script type="text/javascript" src='path/to/jquery.js'></script>
<script type="text/javascript" src='path/to/ivle.js'></script>
```

<a name='a3'/>
## Public Methods

### Application Initialization

The library exposes a `ivle` global variable.

To begin, create an instance of the `ivle` object with you [LAPI KEY](http://wiki.nus.edu.sg/display/ivlelapi/IVLE+LAPI+Overview)

```js
var myApiKey = "xxxxxxxxxxxxxxxxxxxxx";
var myApp = new ivle(myApiKey);
```

### User Authentication

A convenience method is included to do user authentication:

```js
var $el = $('#tag');
var callbackurl = "http://example.com/redirect"; 

myApp.auth($el, callbackurl);
// a click event listener will be bounded to the $el tag
// upon successful authentication, the user will be directed back to `callbackurl` 
// token=xxxxxxxxxx is added to the url query string
```

### User Creation

Once you have the `token` you create a `user` object which will be where we will be calling most of our API endpoints

```js
var token = 'xxxxxxxxxxxxxxxxxxxxxx';

//create new user
var user = new myApp.user(token);
```

### API Endpoints

With the `user` object, you can now make calls to the api with the following methods:

**Validate user token**

this is used for returning users (use their old token)

The validate method takes in two parameters. A `success` callback and a `error` callback.

```js
var success = function(data, textStatus, jqXHR){
	//do smth with the data.
}

var error = function(jqXHR, textStatus, errorThrown){
	//handle error
}

user.validate(success, err); 
```

**Modules**

This returns the modules that are taken by the user.

```js
var success = function(data, textStatus, jqXHR){
	//do smth with the data.
}

var error = function(jqXHR, textStatus, errorThrown){
	//handle error
}

user.modules(success, error);
```

**Workbin**

This returns the workbin for a particular `courseId` (taken from the data returned by the modules api endpoint)

```js
var success = function(data, textStatus, jqXHR){
	//do smth with the data.
}

var error = function(jqXHR, textStatus, errorThrown){
	//handle error
}

var courseId = "xxxxxxxx"; 
// NOTE: this is not the module code eg. CS1101S
// this is the id that was return from the earlier api call

user.workbin(courseId, success, error);
```

**File Download**

This downloads the file given the `fileId` (again from the previous api call)

```js
var fileId = 'xxxxxxxx'
user.file(fileId));
```

<a name='a4'/>
## Others

For more infomation, look at the [examples](https://github.com/ymichael/ivleapi/tree/master/example) folder

Suggestions and Feedback greatly appreciated!
