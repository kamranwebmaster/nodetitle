'use strict';

// App Module: the name AngularStore matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var storeApp = angular.module('AngularStore', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/store', {
        templateUrl: 'partials/store.htm',
        controller: storeController 
      }).
      when('/products/:productSku', {
        templateUrl: 'partials/product.htm',
        controller: storeController
      }).
      otherwise({
        redirectTo: '/store'
      });
}]);



storeApp
	.service("GetCrudService", function($http,getBrowserService) {
	//reference https://www.c-sharpcorner.com/article/angularjs-crud-create-read-update-delete-operation-using-mvc/
	
		//get All    
		this.getAllList = function(url) {  
			return $http.get(url);  
		};  
		// Adding Record  
		this.AddNewStudent = function(url,tbl_Student) {  
				return $http({  
					method: "post",  
					url: url,  
					data: JSON.stringify(tbl_Student),  
					dataType: "json"  
				});  
			}  
			// Updating record  
		this.UpdateStudent = function(url,tbl_Student) {  
				return $http({  
					method: "post",  
					url: url,  
					data: JSON.stringify(tbl_Student),  
					dataType: "json"  
				});  
			}  
			// Deleting records  
		this.deleteStudent = function(url,Id) {  
			return $http.post(url + Id)  
		}  
		
		this.Postdata = function(path,dataa) {  
				var atoken = '';//$cookieStore.get('AuthenticationToken')//'YWU4NGtCRmVkVzNXcWxUUWM3VjFNUT09.TURhc3pIOVEza2NOcEwvakFjYWV1UT09',
				var headerSet = getBrowserService.IssetIE(atoken);	
				var Senddata =new Object();
				Senddata=dataa;
				Senddata.token = atoken;

          //  if (!atoken )$state.go('login');

				 console.log(Senddata);
				return  $http({
                    method: "POST",
                    url: path,
					data: JSON.stringify(Senddata), 
					//params: {   action: "add"  }, 
					dataType: "json"  ,
					headers:headerSet
                })
				// $http.post(url, {token:atoken} )
		} 
		 this.crossdata = function(path,dataa) {  
		 
		 
		 
				var atoken ='';// $cookieStore.get('AuthenticationToken')//'YWU4NGtCRmVkVzNXcWxUUWM3VjFNUT09.TURhc3pIOVEza2NOcEwvakFjYWV1UT09',
				var headerSet = getBrowserService.IssetIE(atoken);	
				var Senddata =new Object();
				Senddata=dataa;
				Senddata.token = atoken;

          //  if (!atoken )$state.go('login');

				 console.log(Senddata);
				return  $http({
                    method: "GET",
                    url: path,
					data: JSON.stringify(Senddata), 
					//params: {   action: "add"  }, 
					dataType: "json"  ,
					headers:headerSet
                })
				// $http.post(url, {token:atoken} )
		} 
	}) 
    .service('getBrowserService', [function ($window,$cookieStore) {
        this.loggedIn = false;
        return {
            IssetIE: function (token) {
				
				  
                var browser;

                // Opera 8.0+
                var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                // Firefox 1.0+
                var isFirefox = typeof InstallTrigger !== 'undefined';
                // Safari 3.0+ "[object HTMLElementConstructor]" 
                var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;
                // Edge 20+
                var isEdge = !isIE && !!window.StyleMedia;
                // Chrome 1+
                var isChrome = !!window.chrome && !!window.chrome.webstore;
                // Blink engine detection
                var isBlink = (isChrome || isOpera) && !!window.CSS;
                browser =
                  isOpera ? 'Opera' :
                  isFirefox ? 'Firefox' :
                  isSafari ? 'Safari' :
                  isChrome ? 'Chrome' :
                  isIE ? 'IE' :
                  isEdge ? 'Edge' :
                  "Don't know";
               // if (browser) this.loggedIn = true;
                //var userAgent = window.navigator.userAgent;// $window.navigator.userAgent; 
                //userAgent = $window.navigator.userAgent;
                //ieReg = /msie|Trident.*rv[ :]*11\./gi;
                //return this.loggedIn = ieReg.test(userAgent); 
                //var browsers = { chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i };
                //for (var key in browsers) {
                //    if (browsers[key].test(userAgent)) this.loggedIn =key; 
                //};
                
                if (browser === 'IE') this.loggedIn = {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            "x-zumo-auth": token,
                            "Cache-Control": 'no-cache', //  no-store, must-revalidate,private, max-age=0, proxy-revalidate, s-maxage=0,max-stale=0,post-check=0,pre-check=0
                             'Pragma': 'no-cache',
                            'Expires': '0'

                }
                else this.loggedIn = { 'Content-Type': 'application/json', 'Accept': 'application/json', "x-zumo-auth": token };
                 
                return this.loggedIn;
                // return 'unknown';
            }
        }
    }])
    .service('detectBrowser', [
        '$window',
        function($window) {
            // http://stackoverflow.com/questions/22947535/how-to-detect-browser-using-angular
            return function() {
                var userAgent = $window.navigator.userAgent,
                    browsers  = {
                        chrome  : /chrome/i,
                        safari  : /safari/i,
                        firefox : /firefox/i,
                        ie      : /internet explorer/i
                    };

                for ( var key in browsers ) {
                    if ( browsers[key].test(userAgent) ) {
                        return key;
                    }
                }
                return 'unknown';
            }
        }
    ])


storeApp
	.factory("$exceptionHandler", function () {
    return function (exception, cause) {

        console.log("Exception   ", exception);
        console.log("Cause ", cause);

        //var $rootScope = $inject = ["$rootScope"];
        //$rootScope.errors=$rootScope.errors ||[];
        //$rootScope.errors.push(exception.message);
        //console.log($rootScope.errors);

        //   logErrorsToBackend(exception, cause);
        //   $log.warn(exception, cause);

    }
});
