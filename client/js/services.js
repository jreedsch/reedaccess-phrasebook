// services
angular.module('phrasebookService', [])
.factory('GlobalService', function($rootScope) { 
   var service = {};
   service.username = "GUEST"; 
   service.adminlogon = false;

   console.log("in init() of GlobalService" );
   service.setUserName = function(strname) {
     console.log("in service.setUserName() to: "+strname);
     this.username = strname;  
     service.adminlogon = true;
     $rootScope.$broadcast("valuesUpdated"); 
   };
   service.getUserName = function() {
     console.log("in service.getUserName()");
     return this.username;
	//return { name : 'anonymous' };
   };
   service.getAdminLogon = function() {
      return this.adminlogon;
   }
   return service;
})


//http://stackoverflow.com/questions/17160771/angularjs-a-service-that-serves-multiple-resource-urls-data-sources

.factory('PhrasebookDetailService', function($resource) {
  return $resource('/api/phrases/:id', {id: '@id'}, {update: {method: 'PUT'}});
})
.factory('PhrasebookSearchService', function($resource) {
  return $resource('/api/phrases/:id', {id: '@id'}, {update: {method: 'PUT'}});
});

