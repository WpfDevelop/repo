(function(window) {

	var inited = false;
	var initValidator = function(){
		//add method to validator framework of jquery, the effect of method is according regular exception to validate data
		if(jQuery.validator!=null){
			jQuery.validator.addMethod("reg", function(value, element, regular) {
				if(Array.isArray(regular)){
					return this.optional(element) 
						|| new RegExp(regular[0],regular[1]).test(value);
				}else{
					return this.optional(element) 
						|| new RegExp(regular).test(value);
				}
			});
		}
	}
	
	function BaseClass() {
		
	}

	var util = {
		//for info convenience
		info: function(string) {
			console.info(string);
		},
		//for debug convenience
		debug: function(string) {
			console.debug(string);
		},
		//for log convenience
		log: function(string) {
			console.log(string);
		}
	};

	var base = {
		version: "mjs-0.1",
		init : function(){
			if(inited)
				return;
			initValidator();
			inited = true;
		},
		extend: function() {
			if (arguments.length > 0) {//object extend argument
				for (var i = 0; i < arguments.length; i++) {
					window.jQuery.extend(this, arguments[i]);
				}
			}
			return this;
		},
		context: function(mjs) {//get context of application
			return mjs.context ? mjs.context : (function() {
				var basepath = webroot = document.location.href;
				webroot = webroot.substring(webroot.indexOf('//') + 2, webroot.length);
				webroot = webroot.substring(webroot.indexOf('/') + 1, webroot.length);
				webroot = webroot.substring(0, webroot.indexOf('/'));
				var rootpath = "/" + webroot;
				mjs.context = basepath.substring(0, basepath.indexOf(rootpath) + rootpath.length);
				return mjs.context;
			})();
		}(this)
	};

	var layer = {
		//alert window
		alert: function(msg, num, t) {
			if (num == null)
				num = 0;
			if (t == null)
				t = '信息';
			window.layer.alert(msg, {
				icon: num,
				title: t
			});
		}
	};

	BaseClass.prototype = base;
	var mjs = new BaseClass();
	window.v = mjs.extend(util, layer);


})(window);