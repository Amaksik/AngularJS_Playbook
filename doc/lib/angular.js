(function() {
  'use strict';

  var app = angular.module('myApp', ["ngRoute"]);

  app.component("main",{
    templateUrl : "./lib/partials/main_template.html" ,
    controller: function($http) {
      this.username = localStorage.getItem("username");
      this.id = localStorage.getItem("userid");
      this.componentsconfig = {
        showlogin : true
      }
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
      //console.log("parentscope" + main.componentsconfig.showlogin)
      $http.defaults.headers

      var promise = $http.get('https://angularjs-api.herokuapp.com/countries');
      this.countries = promise.then(function(response){
        return response.data;
      });
      this.submit = ()=>{
        //console.log(this.IsAllFilled());
        if(this.IsAllFilled()){

          var user = {
            name: this.firstname,
            surname: this.lastname,
            email:this.email,
            password:this.password,
            age:19,
            gender: "other"
          };
          localStorage.setItem("username",user.name);
          $http.post('https://angularjs-api.herokuapp.com/users', JSON.stringify(user))
          .then(function (response) {
            console.log("ok -> " + response.data);
            localStorage.setItem("userid",response.data);
            localStorage.setItem("userid",response.data);
            $window.location.reload();
          }, 
          function (response) 
          {
            console.log("eror -> " + response.data);
            localStorage.removeItem("username");
          });

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

  app.component("loginForm",{
    templateUrl: './lib/partials/login_template.html',
    bindings: {
      email: '@',
      password: '@',
    },
    controller: function($http, $window) {
      $http.defaults.headers

      this.login = ()=>{

        var credentials = {
          email:this.email,
          password:this.password
        };

        $http.post('https://angularjs-api.herokuapp.com/users', JSON.stringify(credentials))
        .then(function (response) {
          console.log("ok -> " + response.data);
          localStorage.setItem("userid",response.data);
          //$window.location.reload();
        }, 
        function (response) 
        {
          console.log("eror -> " + response.data);
        });

      }
    }
  });

  app.component("userPage",{
    templateUrl:"./lib/partials/userpage_template.html",
    controller: function( $http, $window){
      this.id = localStorage.getItem("userid");
      this.correct = true;
      var promise = $http.get(`https://angularjs-api.herokuapp.com/users/${parseInt(this.id)}`);
      
      this.user = promise.then(function(response){
        return response.data;
      });;

      this.logout = ()=>{
        var id = localStorage.getItem("userid");
        if(id) {

          var promise = $http.delete(`https://angularjs-api.herokuapp.com/users/${parseInt(this.id)}`);
          promise.then(function(response){
            console.log(response.data);          
            localStorage.removeItem("userid");
            localStorage.removeItem("username");
            $window.location.reload();
          });
        }
        else
        {$window.location.reload();}
      }
    }
  })

})();

