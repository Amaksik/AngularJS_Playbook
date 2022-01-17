
(function() {
  'use strict';

  var app = angular.module('myApp', ["ngRoute"]);

  app.component("main",{
    templateUrl : "./lib/partials/main_template.html" ,
    controller: function($http) {
      this.username = localStorage.getItem("username");
    },
    bindings: {
      name: '<'
    },

  });


  app.component("sidebarWithMenu",{
    templateUrl: "./lib/partials/sidebar_template.html" ,
    controller: function($http) {/**/
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
    controller: function($http) {

    },
    controller: function($http, $window) {
      var promise = $http.get('https://angularjs-api.herokuapp.com/countries');
      this.countries = promise.then(function(response){
        return response.data;
      });
      this.submit = (name)=>{
        localStorage.setItem("username",name);
        $window.location.reload();


      }
      this.IsAllFilled = ()=>{
        if(this.name){

        }
        else{return true}
      }
    }
  });

})();

