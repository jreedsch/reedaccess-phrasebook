function PhrasebookBodyCtrl ($scope, GlobalService) { 
   $scope.adminlogon = false;
   $scope.userstate = {
     user_language: "XYZ", //this is updated by the dropdown automatically (model)
     user_language_ndx: 0, //index into the display languages tables
                                              
     languages : [
        {name: 'ENGLISH',  displayname: 'English', value: '0', display: true, languagelist: ['English', 'Japanese', 'Vietnamese', 'Chinese', 'Russian', 'Spanish', 'German']},
        {name: 'JAPANESE', displayname: '日本語', value: '1', display: false, languagelist: ['英語', '日本語', 'ベトナム語', '中国語', 'ロシア語', 'スペイン語', 'ドイツ語']},
        {name: 'VIETNAMESE', displayname: 'Tiếng Việt', value: '2', display: false, languagelist: ['Tiếng Anh', 'Tiếng Nhật', 'Tiếng Việt', 'Tiếng Hoa', 'Tiếng Nga', 'Tiếng Tây Ban Nha', 'Tiếng Đức']},
        {name: 'CHINESE', displayname: '中文', value: '3', display: false, languagelist: ['英语', '日本语', '越南语', '中文', '俄语', '西班牙语', '德语']},
        {name: 'RUSSIAN', displayname: 'русский', value: '4', display: false, languagelist: ['английский язык', 'японский язык', 'вьетнамский язык', 'китайский язык', 'русский язык', 'испанский язык', 'Германия язык']},
        {name: 'SPANISH', displayname: 'español', value: '5', display: false, languagelist: ['idioma inglés', '	idioma japonés', 'idioma vietnamita', 'idioma chino', 'idioma ruso', 'español','idioma alemán']},
        {name: 'GERMAN', displayname: 'Deutsch', value: '6', display: false, languagelist: ['Englisch', 'Japanisch', 'Vietnamesisch', 'Chinesisch', 'Russisch', 'Spanisch', 'Deutsch']},
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

   $scope.$on('valuesUpdated', function() { 
      console.log("PhrasebookBodyCtrl received broadcast update");
      $scope.adminlogon = GlobalService.getAdminLogon(); 
      $scope.username = GlobalService.getUserName(); 
   });

// http://www.objectpartners.com/2013/08/21/using-services-and-messages-to-share-data-between-controllers-in-angularjs/

   $scope.$on('valuesUpdated', function() { 
      console.log("PhrasebookHeaderCtrl received broadcast update");
      $scope.username = GlobalService.getUserName(); 
   }); 

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

function PhrasebookAdminCtrl ($scope, GlobalService) { 

   console.log("in PhrasebookAdminCtrl");
   $scope.today = new Date();
   $scope.username = GlobalService.getUserName();

   
   $scope.setUserName = function(userNameInput) {
      console.log("set user name to "+userNameInput);
      GlobalService.setUserName(userNameInput);
      $scope.username = userNameInput;
   } 
};

function PhraseListCtrl ($scope, $http, $location, PhrasebookService, GlobalService) {
   var index = -1;

    //for pagination and searching
  // $scope.limit = 10;
  // $scope.offset = 0; //this is the same as: (current page - 1)
  // $scope.total = 0;
  // $scope.pageCount = 0;

   $scope.index = index; //currently selected element
   $scope.selectedId = -1; //actual id of selected phrase

   // 1st DB I/O  
   //now runs on internal data
   //var phs = eval ("(" + data1 + ")");
   //$scope.phrases = phs;
   // console.log("Scope.phrases2: "+ objToString($scope.phrases2[0]));
   $scope.phrases = PhrasebookService.query();


   $scope.currentPage = 0;
   $scope.pageSize = 10;
   
   $scope.numberOfPages=function(){
       return Math.ceil($scope.phrases.length/$scope.pageSize);              
   }

   $scope.username = GlobalService.getUserName();

   $scope.orderProp = 'id'; 


   //$http.get('/api/phrases/total').success(function(body) {
   //   $scope.total = body.total
   //   console.log("Total DB rowcount: "+$scope.total);
   //   $scope.pageCount = Math.floor($scope.total / $scope.limit) 
   //   if ($scope.total % $scope.limit !== 0)
   //     $scope.pageCount += 1
   //     for(var i = 0; i < $scope.photos.length; i++) { var obj = $scope.photos[i]; console.log(objToString(obj)); }
   //})

    // click on one row
   $scope.select = function(i) {   

      $scope.index = index
      index = i
      $scope.selectedId = $scope.phrases[index]._id
      $scope.selectedEnglish = $scope.phrases[index].english;
      console.log("selected index: "+index+" : "+objToString($scope.phrases[index]));
      //alert("You have selected word: "+$scope.selectedEnglish);
             // this works but overrides edit and delete button
             // $location.path('/edit/'+$scope.selectedId); 


   };

   $scope.loadPage = function (pg) {
      console.log("loadPage: "+pg)
      $scope.offset = pg - 1
      $scope.phrases = PhrasebookService.query({offset: $scope.offset, limit: $scope.limit})
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
      PhrasebookService.delete({id: id})
      $scope.phrases.splice(index, 1)
      alert("phrase deleted, id: "+id+", index: "+index);
   }; 

};


function PhraseCreateCtrl ($scope, $location, PhrasebookService) {
   $scope.action = 'Add';

   $scope.save = function() {
      console.log("in controllers.PhraseCreateCtrl.save, $scope.photo: "+objToString($scope.phrase)); 

      PhrasebookService.save($scope.phrase, function() {
         $location.path('/')
      })
   }  
}

function PhraseEditCtrl ($scope, $location, $routeParams, PhrasebookService) {
  var id = $routeParams.id
  
  console.log("PhraseEditCtrl get, id: "+id);

  $scope.displayLanguage = $scope.userstate.user_language.displayname;

  PhrasebookService.get({id: id}, function(resp) {
    console.log("PhraseEditCtrl response: "+objToString(resp.content[0]));
    $scope.phrase = resp.content[0];  

  })

  //$scope.photo = PhotosService.get({id: id})
  $scope.action = "Update"

  $scope.save = function() {
    PhrasebookService.update({id: id}, $scope.phrase, function(resp) {
      $location.path('/');
      //$$$  $scope.serverresponse = resp.content[0]; 
      alert("phrase saved");
    })
  }
}

function PhraseShowCtrl ($scope, $location, $routeParams, PhrasebookService) {


  var id = $routeParams.id
  
  console.log("PhraseShowCtrl get, id: "+id);
  $scope.displayLanguage = $scope.userstate.user_language.displayname;

  PhrasebookService.get({id: id}, function(resp) {
    console.log("PhraseEditCtrl response: "+objToString(resp.content[0]));
    $scope.phrase = resp.content[0];  
  }) 

  $scope.action = "Show"

}
