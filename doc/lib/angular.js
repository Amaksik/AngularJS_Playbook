
(function() {
  'use strict';

  var app = angular.module('myApp', ["ngRoute"]);

  app.component("main",{
    template: `
            <div class="wrapper"><!--main container-->
                
              <!--side info-->
              <aside class="sidebar">
                
                <sidebar-with-menu name="'amaksik'" > </sidebar-with-menu>

              </aside>

              <!--about me container-->
              <div class="about-main">

                <registration-form ng-hide="$ctrl.username" name="'amaksik'" > </registration-form >
              </div>

            </div>`,
    controller: function($http) {
      this.username = localStorage.getItem("username");
    },
    bindings: {
      name: '<'
    },

  });


  app.component("sidebarWithMenu",{
    template: '<p>Hello World and {{$ctrl.name}} ! I`m {{$ctrl.myName}}! </p>'+
              '<br>'+
              'list below\n'+
              '<ul> <li ng-repeat="user in $ctrl.users.$$state.value">{{user.name}}</li></ul>',
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
      this.users = promise.then(function(response){
        return response.data;
      });
    }
  });


  app.component("registrationForm",{
    templateUrl: './lib/partials/register_template.html',

    controller: function($http) {},

    bindings: {
      name: '<'
    }
  });

})();

