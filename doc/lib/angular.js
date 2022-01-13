
(function() {
  'use strict';

  var app = angular.module('myApp', ["ngRoute"]);

  app.component("sidebarWithMenu",{
    template: '<p>Hello World and {{$ctrl.name}} ! I`m {{$ctrl.myName}}! </p>'+
              '<br>'+
              'list below\n'+
              '<ul> <li ng-repeat="user in users">{{user.name}}</li></ul>',
    controller: function($http) {/*
      var promise = $http.get('https://angularjs-api.herokuapp.com/users');
      var users = promise.then(function(response){
        $scope.users = response.data;
        console.log("inner ctrl"+ $scope.users);
      });*/
    },
    bindings: {
      name: '<'
    },
      controller: function($http){
        this.myName = 'Alain';
        var promise = $http.get('https://angularjs-api.herokuapp.com/users');
        var users = promise.then(function(response){
        $scope.users = response.data;
        console.log("outer ctrl"+ $scope.users);
      });
      }
})

})();

