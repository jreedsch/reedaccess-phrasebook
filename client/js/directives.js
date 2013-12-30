PhrasebookApp.directive('formfield', function() {
  return {
    restrict: 'E', //could be E, A, C (class), M (comment)
    scope: {
      prop: '@',
      data: '=ngModel'
    },
    templateUrl: '/partials/formfield.html'
  }
})