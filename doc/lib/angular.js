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
    bindings: {
      email: '@',
      password: '@',
      firstname: '@',
      lastname: '@'
    },
    controller: function($http, $window) {
      $http.defaults.headers

      var promise = $http.get('https://angularjs-api.herokuapp.com/countries');
      this.countries = promise.then(function(response){
        return response.data;
      });
      this.submit = ()=>{
        console.log(this.IsAllFilled());
        if(this.IsAllFilled()){

          var user = {
            name: this.firstname,
            surname: this.lastname,
            email:this.email,
            password:this.password,
            age:23,
            "gender":"other"
          };

          var req = {
            method: 'POST',
            url: 'https://angularjs-api.herokuapp.com/users',
            headers: {
              'Content-Type': "application/json",
              'Authorization':"none"
            },
            data: JSON.stringify(user)
          }
           
          $http(req).then(function (response) {
            console.log("ok sended" + response.data);
            localStorage.setItem("username",this.firstname);
            $window.location.reload();
          }, 
          function (response) 
          {
            console.log("sended" + response.data);
          });

          /*$http.post('https://angularjs-api.herokuapp.com/users', JSON.stringify(user))
          .then(function (response) {
            console.log("sended" + response);
            localStorage.setItem("username",this.firstname);
            $window.location.reload();
          }, 
          function (response) 
          {
            console.log("sended" + response);
          });*/

        }
        else{alert("failed")}


      }
      this.IsAllFilled = ()=>{
        if(this.email && this.password && this.firstname && this.lastname){
          console.log("all filled");
          return true;
        }
        else{
          console.log("not all filled");
          return false}
      }
    }
  });

})();

