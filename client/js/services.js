// services
angular.module('phrasebookService', [])
.factory('GlobalService', function($rootScope) { 
   var service = {};
   service.username = "GUEST"; 
   service.adminlogon = false;

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

.factory('PhrasebookService', function($resource) {
  return $resource('/api/phrases/:id', {id: '@id'}, {update: {method: 'PUT'}});
});

