var PhrasebookApp = angular.module('PhrasebookApp', ['ngResource', 'ui.bootstrap', 'phrasebookService', ]);

PhrasebookApp.constant('config', { adminRoot: '/admin' }); 

PhrasebookApp.config(['$routeProvider' , '$locationProvider', 'config', function( $routeProvider, $locationProvider, config) {

  //console.log("config: "+objToString(config));
  $routeProvider

      // show admin logon screen
     .when( config.adminRoot, {controller: PhrasebookAdminCtrl, templateUrl: '/partials/phrasebook-admin.html'})

      // main list controller
     .when('/', {controller: PhraseListCtrl, templateUrl: '/partials/phrase-list.html'})
      
	 // add a new phrase
     .when('/new', {controller: PhraseCreateCtrl, templateUrl: '/partials/phrase-detail-admin.html'})

      // show existing phase details
     .when('/show/:id', {controller: PhraseShowCtrl, templateUrl: '/partials/phrase-detail.html'})
     .when('/:id', {controller: PhraseShowCtrl, templateUrl: '/partials/phrase-detail.html'})

      // edit existing phrase
     .when('/edit/:id', {controller: PhraseEditCtrl, templateUrl: '/partials/phrase-detail-admin.html'})

     .otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);

}]);

// http://www.masnun.com/2013/08/28/rest-access-in-angularjs-using-ngresource.html

//PhrasebookApp.factory('PhrasebookService', function($resource) {
//  return $resource('/api/phrases/:id', {id: '@id'}, {update: {method: 'PUT'}})
//})

PhrasebookApp.run( function($rootScope) {
    console.log("in app.run()");
          $rootScope.appdata = {savedSearchTerm: "", savedOffset: 0, savedPageNbr: 1}; 

});

//$$$ not used
//startFrom filter for pagination
PhrasebookApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
 }
});     

PhrasebookApp.filter('range', function() {
  return function(input) {
      var lowBound, highBound;
      switch (input.length) {
      case 1:
          lowBound = 0;
          highBound = parseInt(input[0]) - 1;
          break;
      case 2:
          lowBound = parseInt(input[0]);
          highBound = parseInt(input[1]);
          break;
      default:
          return input;
      }
      var result = [];
      for (var i = lowBound; i <= highBound; i++)
          result.push(i);
      return result;
  };
})

//
//   utility functions
//
function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}
