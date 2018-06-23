'use strict';
function storeController($scope, $routeParams ,GetCrudService) {
 
	$scope.pdata={};
	$scope.getallRecord = function () {
						//localStorage.setItem('defualt_array', '');
   
                        var Url = 'https://api.github.com/users/simonjefford/followers';//'https://api.github.com/users?since=135';
                        GetCrudService.crossdata(Url, {all: ''})
                            .then(function success(res, status, headers, config) {
                                if (res.data.length >0) 
								{
									$scope.pdata =res.data;
								
		localStorage.setItem('defualt_array', JSON.stringify($scope.pdata));
								  localStorage.setItem('users1',$scope.pdata);
								  }
                               // else  toaster.pop('error', 'Info', 'Record cannot be Deleted.');
                                 
                                //logger.log(res) ;
                            },
                            function error(err, data, status, headers, config) {
                               
                                //logger.log(err) ;
                            })
                            

					
            };
	$scope.product={};
  	if ($routeParams.productSku != null)   {
		var pdata=JSON.parse(localStorage.getItem('defualt_array'));
	
		 angular.forEach(pdata, function (obj) {
			if (obj.login == $routeParams.productSku)   
			  return $scope.product = obj;
		});  


				/*var Url = 'https://api.github.com/users/:'+$routeParams.productSku;//'https://api.github.com/users?since=135';
                        GetCrudService.crossdata(Url, {all: ''})
                            .then(function success(res, status, headers, config) {
                                if (res.data.length >0) product =res.data;
                               // else  toaster.pop('error', 'Info', 'Record cannot be Deleted.');
                                 
                                //logger.log(res) ;
                            },
                            function error(err, data, status, headers, config) {
                               
                                //logger.log(err) ;
                            })
                           
				*/   
				
	}
	 else $scope.getallRecord();
   

}
