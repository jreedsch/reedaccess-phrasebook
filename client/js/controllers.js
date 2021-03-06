function PhrasebookBodyCtrl ($scope, GlobalService, $rootScope) { 
   $scope.adminlogon = false;
   $scope.userstate = {
     user_language: "XYZ", //this is updated by the dropdown automatically (model)
     user_language_ndx: 0, //index into the display languages tables
                                              
     languages : [
        {name: 'ENGLISH',  displayname: 'English', searchcolumn: "english", value: '0', display: true, languagelist: ['English', 'Japanese', 'Vietnamese', 'Chinese', 'Russian', 'Spanish', 'German']},
        {name: 'JAPANESE', displayname: '日本語', searchcolumn: "japanese", value: '1', display: false, languagelist: ['英語', '日本語', 'ベトナム語', '中国語', 'ロシア語', 'スペイン語', 'ドイツ語']},
        {name: 'VIETNAMESE', displayname: 'Tiếng Việt', searchcolumn: "vietnamese", value: '2', display: false, languagelist: ['Tiếng Anh', 'Tiếng Nhật', 'Tiếng Việt', 'Tiếng Hoa', 'Tiếng Nga', 'Tiếng Tây Ban Nha', 'Tiếng Đức']},
        {name: 'CHINESE', displayname: '中文', searchcolumn: "chinese", value: '3', display: false, languagelist: ['英语', '日本语', '越南语', '中文', '俄语', '西班牙语', '德语']},
        {name: 'RUSSIAN', displayname: 'русский', searchcolumn: "russian", value: '4', display: false, languagelist: ['английский язык', 'японский язык', 'вьетнамский язык', 'китайский язык', 'русский язык', 'испанский язык', 'Германия язык']},
        {name: 'SPANISH', displayname: 'español', searchcolumn: "spanish", value: '5', display: false, languagelist: ['idioma inglés', '	idioma japonés', 'idioma vietnamita', 'idioma chino', 'idioma ruso', 'español','idioma alemán']},
        {name: 'GERMAN', displayname: 'Deutsch', searchcolumn: "german", value: '6', display: false, languagelist: ['Englisch', 'Japanisch', 'Vietnamesisch', 'Chinesisch', 'Russisch', 'Spanisch', 'Deutsch']},
     ],  

     screenvalues : [
        {name: 'ENGLISH', maintitle: 'International Phrasebook', 
         langselector: 'Language',
         userlabel: 'User',
         adminlabel: 'Admin',
         searchlabel: 'Search',
         masterlistlabel: 'Master List',
         showlabel: 'Show',
         editlabel: 'Edit',
         dellabel: 'Delete',
         flag: '/images/EN.jpg'
        },

        {name: 'JAPANESE', maintitle: 'おくさいフレースリスト', 
         langselector: 'JLanguage',
         userlabel: 'ﾕｰｻﾞ',  //ユーザ
         adminlabel: '行政',
         searchlabel: 'けんさく',
         masterlistlabel: 'プライマリリスト',
         showlabel: '見して',
         editlabel: '変',
         dellabel: '抹消',
         flag: '/images/JP.jpg'
        },

        {name: 'VIETNAMESE', maintitle: 'quốc tế nhóm từ', 
         langselector: 'VLanguage',
         userlabel: 'người dùng',
         adminlabel: 'quản trị',
         searchlabel: 'tìm ra',
         masterlistlabel: 'danh sách chính',
         showlabel: 'xem',
         editlabel: 'đổi',
         dellabel: 'xoá',
         flag: '/images/VN.jpg' 
        },
 
        {name: 'CHINESE', maintitle: '国际惯用语词典', 
         langselector: 'CLanguage',
         userlabel: '用户',
         adminlabel: '行政',
         searchlabel: '寻找',
         masterlistlabel: '正列',  
         showlabel: '选',
         editlabel: '更改',
         dellabel: '删',
         flag: '/images/CH.jpg' 
        },
        {name: 'RUSSIAN', maintitle: 'международный　фразы', 
         langselector: 'RLanguage',
         userlabel: 'пользователь',
         adminlabel: 'администрация',
         searchlabel: 'поиск',
         masterlistlabel: 'основной список',
         showlabel: 'показывать',
         editlabel: 'изменение',
         dellabel: 'удалять',
         flag: '/images/RU.jpg'
        },
        {name: 'SPANISH', maintitle: 'frases internacionales', 
         langselector: 'SLanguage',
         userlabel: 'usuario',
         adminlabel: 'administración ',
         searchlabel: 'buscar',
         masterlistlabel: 'lista principal',
         showlabel: 'mostrar',
         editlabel: 'corregir',
         dellabel: 'borrar',
         flag: '/images/SP.jpg' 
        },
        {name: 'GERMAN', maintitle: 'internationalen Sätze', 
         langselector: 'GLanguage',
         userlabel: 'benutzer',
         adminlabel: 'verwaltung',
         searchlabel: 'suche',
         masterlistlabel: 'hauptliste',
         showlabel: 'aufweisen',
         editlabel: 'edieren',
         dellabel: 'löschen',
         flag: '/images/GE.jpg'
        }
     ]
   }
  
   $scope.username = GlobalService.getUserName();

   //default display language
   $scope.userstate.user_language = $scope.userstate.languages[0];
   $scope.userstate.user_language_ndx = 0;
   console.log("MAINTITLE :"+$scope.userstate.screenvalues[$scope.userstate.user_language_ndx].maintitle);
 

// http://www.objectpartners.com/2013/08/21/using-services-and-messages-to-share-data-between-controllers-in-angularjs/

   $scope.$on('valuesUpdated', function() { 
      console.log("PhrasebookBodyCtrl received broadcast update");
      $scope.adminlogon = GlobalService.getAdminLogon(); 
      $scope.username = GlobalService.getUserName(); 
   });

   // $scope.$on('valuesUpdated', function() { 
   //   console.log("PhrasebookHeaderCtrl received broadcast update");
   //  $scope.username = GlobalService.getUserName(); 
   // }); 

   // called from language dropdown
   $scope.languageChanged = function() {

	 console.log("Language changed to #" + $scope.userstate.user_language.value);
      $scope.userstate.user_language_ndx = $scope.userstate.user_language.value;

      //reset all languages to false
      for (var i = 0; i < $scope.userstate.languages.length; i++) {
         $scope.userstate.languages[i].display = false;
      }
      // set new language to displayable
      $scope.userstate.languages[$scope.userstate.user_language_ndx].display = true;

    //$$$debug
    //  for (var i = 0; i < $scope.userstate.languages.length; i++) {
    //     console.log(objToString($scope.userstate.languages[i]));
    //  } 
      console.log("LANG :"+objToString($scope.userstate.user_language));
      console.log("MAINTITLE :"+$scope.userstate.screenvalues[$scope.userstate.user_language_ndx].maintitle);
   }

}

function PhrasebookHeaderCtrl ($scope, GlobalService) { 
   $scope.today = new Date();
   //$scope.username = "GUEST";
   //$scope.username = GlobalService.getUserName();

  // $scope.$on('valuesUpdated', function() { 
  //    console.log("PhrasebookHeaderCtrl received broadcast update");
  //    $scope.username = GlobalService.getUserName(); 
  // }); 

//   $scope.$watch('username', function() { 
//      GlobalService.updateTopValue($scope.topValue); 
//   }); 

};

function PhrasebookAdminCtrl ($scope, $http, GlobalService) {  

  console.log("in PhrasebookAdminCtrl");
   $scope.today = new Date();
   $scope.userinput = {};
   $scope.userinput.username = GlobalService.getUserName();
   $scope.userinput.password = "";
   
   $scope.setUserName = function(userInput) {
      console.log("PhrasebookAdminCtrl.setUserName() , name: "+userInput.username+", password: "+userInput.password);
 
      GlobalService.setUserName(userInput.username);
      $scope.username = userInput.username;

     $http.get('/api/phrases/login?username='+userInput.username+'&password='+userInput.password).success(function(body) {
           if (body.login) {
              console.log("login record from server: "+  objToString(body.login));
              GlobalService.setAdminLogon(true); 
           } else { 
              console.log("no login record returned from server ");
              GlobalService.setAdminLogon(false); 
           }
     
      } );
   };

};

function PhraseListCtrl ($scope, $http, $location, PhrasebookDetailService, PhrasebookSearchService, GlobalService, $rootScope) {


    // should have an init() function so only call this stuff once

    //for pagination and searching
    var index = -1;
    $scope.queryval = '';
    $scope.pageSize = 10;
    $scope.offset = 0;    //this is the same as: (current page - 1)
    $scope.currentPage = 1;
    $scope.numberOfPages = 1;
    $scope.dbrowcount = 0;

    $scope.index = index; //currently selected element
    $scope.selectedId = -1; //actual id of selected phrase

    $scope.username = GlobalService.getUserName();
    $scope.orderProp = 'id'; 



    // 1st DB I/O  
    //see if we are returning from the phrase detail page 
    //$$$ in that case should use cache instead of doing a new search 
    console.log("in PhrasebookListCtrl $rootScope.appdata, savedSearchTerm: "+ $rootScope.appdata.savedSearchTerm+", savedOffset: "+$rootScope.appdata.savedOffset);

   // if we already have a searchterm or a savedOffset, it means that we are returning from the detail page
   // so we need to scroll to the same location in the list that we left off at

  if ($rootScope.appdata.savedSearchTerm.length > 0 || $rootScope.appdata.savedOffset > 0) {
     $scope.queryval = $rootScope.appdata.savedSearchTerm;
     $scope.offset = $rootScope.appdata.savedOffset;
   $scope.currentPage =  $rootScope.appdata.savedPageNbr;
     console.log(" Restoring previous list position to offset: "+ $scope.offset+" and page number: "+ $scope.currentPage +" with search term: "+ $scope.queryval );
 }

  getPageCount();

   // $scope.phrases = PhrasebookSearchService.query({ searchterm: $scope.queryval ,offset: $scope.offset, limit: $scope.pageSize, searchlang: $scope.userstate.user_language.searchcolumn});
    $scope.phrases = PhrasebookSearchService.query({ searchterm: $scope.queryval ,offset: $scope.offset, limit: $scope.pageSize, searchlang: $scope.userstate.user_language.searchcolumn}, function() {   
        console.log("query returned row count: "+$scope.phrases.length);
        //$scope.numberOfPages = Math.ceil($scope.phrases.length/$scope.pageSize) + 1;  
    });
    


    // click on one row
    //$$$ not used, only for clicking on row, but row clicks override row button clicks 
   $scope.select = function(i) {  
      $scope.index = index
      index = i
      $scope.selectedId = $scope.phrases[index]._id
      $scope.selectedEnglish = $scope.phrases[index].english;

      //alert("You have selected word: "+$scope.selectedEnglish);
      // this works but overrides edit and delete button
      // $location.path('/edit/'+$scope.selectedId); 
      
   };

   $scope.pageForward = function () {
      $scope.currentPage++;

      $scope.offset = ($scope.currentPage -1) * $scope.pageSize;
      $scope.phrases = PhrasebookSearchService.query({ searchterm: $scope.queryval ,offset: $scope.offset, limit: $scope.pageSize, searchlang: $scope.userstate.user_language.searchcolumn}), function() {   
        console.log("page forward returned row count: "+$scope.phrases.length);
      };
       //save current list state before possibly going off to detail page
       $rootScope.appdata.savedOffset  = $scope.offset;
       $rootScope.appdata.savedPageNbr = $scope.currentPage;

      console.log("pageForward: "+$rootScope.appdata.savedPageNbr+", $rootScope.appdata.savedOffset: "+$rootScope.appdata.savedOffset )
   }

   $scope.pageBack = function () {
      $scope.currentPage--;
      $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;

     //$$$ use cache when paging back, not another DB i/o
     $scope.phrases = PhrasebookSearchService.query({ searchterm: $scope.queryval ,offset: $scope.offset, limit: $scope.pageSize, searchlang: $scope.userstate.user_language.searchcolumn})

       //save current list state before possibly going off to detail page
       $rootScope.appdata.savedOffset  = $scope.offset;
       $rootScope.appdata.savedPageNbr = $scope.currentPage;

      console.log("pageBack: "+$rootScope.appdata.savedPageNbr+", $rootScope.appdata.savedOffset: "+$rootScope.appdata.savedOffset )
   }

   $scope.showPhrase = function (id) { 
      console.log("Scope.phrases: "+ objToString($scope.phrases[id]));

      //alert("edit phrase, id: "+id);
      $location.path('/show/'+id); 

      //$location.path('/'+id); 

   };

   $scope.editPhrase = function (id) { 
      //alert("edit phrase, id: "+id);
      $location.path('/edit/'+id); 
   }; 

   $scope.deletePhrase = function (id, index) { 
      PhrasebookDetailService.delete({id: id})
      $scope.phrases.splice(index, 1)
      alert("phrase deleted, id: "+id+", index: "+index);
   }; 

   $scope.searchDB = function () { 
      var qq = $scope.queryval;
      console.log("search for : "+qq);

      //$$$ we're doing 2 DB I/o's here in order to keep the list itself and the page counters in sync
      //$$$ which is way bogus, but the alternative right now requires 2 async i/o's so leave it alone for now
      getPageCount();  

      $scope.phrases = PhrasebookSearchService.query({ searchterm: qq ,offset: $scope.offset, limit: $scope.pageSize, searchlang: $scope.userstate.user_language.searchcolumn}, function() {  

         if ($scope.phrases.length > 0) {
            $rootScope.appdata.savedSearchTerm = qq;
         
         } else {

         //$$$ gotta do other stuff here, like not change anything on the screen?
         // and send alert?   maymess up later steps
            alert("Sorry, no rows matched the search term: "+qq);

            $scope.dbrowcount = 0;
            $scope.numberOfPages = 1;
         }

         //$$$getPageCount();    this never gets called from here!
         $scope.currentPage = 1;
         $rootScope.appdata.savedPageNbr = 1;
    }); 
  }

  function getPageCount() {
   //$http.get('/api/phrases/dbrowcount?searchterm='+searchterm+'&searchlang='+searchlang).success(function(body) {
  //$scope.queryval 
//$scope.userstate.user_language.searchcolumn
  
   //$http.get('/api/phrases/dbrowcount').success(function(body) {

   $http.get('/api/phrases/dbrowcount?searchterm='+$scope.queryval+'&searchlang='+$scope.userstate.user_language.searchcolumn).success(function(body) {
        $scope.dbrowcount = body.total;
       
        if ( $scope.dbrowcount > 0) {
            // one last page for leftover rows
           $scope.numberOfPages = Math.floor($scope.dbrowcount / $scope.pageSize);
           if ( ($scope.dbrowcount  %  $scope.pageSize) > 0)   {
               $scope.numberOfPages += 1;
           } 
       } else {     //no rows were returned
       
           $scope.numberOfPages = 1;
       }
       console.log("getPageCount() query rowcount: "+$scope.dbrowcount+", pageCount: "+$scope.numberOfPages);
   });
  } 
};  //end of PhraseListCtrl


function PhraseCreateCtrl ($scope, $location, PhrasebookDetailService, GlobalService) {
   $scope.action = 'Add';

   $scope.save = function() {
      console.log("in controllers.PhraseCreateCtrl.save, $scope.phrase: "+objToString($scope.phrase)); 

     var  adddata = {};
     adddata.phrase = $scope.phrase;
     adddata.adminuser = GlobalService.getAdminLogon(); 

      PhrasebookDetailService.save(adddata, function(resp) {
          $location.path('/')
           console.log("resp: "+objToString(resp));
            if (adddata.adminuser) {
                   alert("phrase committed to DB:");   
            } else {
                   alert("New phrase sent to admin, it will appear later in list");
            }
      });
   }   
}

function PhraseEditCtrl ($scope, $location, $routeParams, PhrasebookDetailService, GlobalService) {
  var id = $routeParams.id
  
  console.log("PhraseEditCtrl get, id: "+id);

  $scope.displayLanguage = $scope.userstate.user_language.displayname;

  PhrasebookDetailService.get({id: id}, function(resp) {
    console.log("PhraseEditCtrl response: "+objToString(resp.content[0]));
    $scope.phrase = resp.content[0];  

  })

  $scope.action = "Update"

  // admin users send updates direct to DB
  $scope.save = function() {
    var updatedata = {};
    updatedata.phrase = $scope.phrase;
    updatedata.adminuser = GlobalService.getAdminLogon(); 
    //PhrasebookDetailService.update({id: id}, $scope.phrase, function(resp) {
    PhrasebookDetailService.update({id: id}, updatedata, function(resp) {
      $location.path('/');
      //$$$  $scope.serverresponse = resp.content[0]; 
      alert("phrase committed to DB");
    })
  }
}

function PhraseShowCtrl ($scope, $location, $routeParams, PhrasebookDetailService, GlobalService) {

var id = $routeParams.id
  $scope.action = "Show"
  $scope.buttonaction = "Send"
  
  console.log("PhraseShowCtrl get, id: "+id);
  $scope.displayLanguage = $scope.userstate.user_language.displayname;

  PhrasebookDetailService.get({id: id}, function(resp) {
    console.log("PhraseEditCtrl response: "+objToString(resp.content[0]));
    $scope.phrase = resp.content[0];  
  }) 

  // regular users udates are sent to admins via email
  $scope.emailer = function() {
    var  updatedata = {};
    updatedata.phrase = $scope.phrase;
    updatedata.adminuser = GlobalService.getAdminLogon(); 

    console.log("in PhraseShowCtrl emailer()");
    PhrasebookDetailService.update({id: id}, updatedata, function(resp) {
      $location.path('/');
      alert("Changes sent to admin, they will appear later in list.");
    });
  }

}




