(function() {
  'use strict';

  var app = angular.module('myApp', ["ngRoute"]);

  app.component("sidebarWithMenu",{
    template: '<p>Hello World and {{$ctrl.name}} ! I`m {{$ctrl.myName}}! </p>',
    controller: function() {},
    bindings: {
      name: '<'
    },
      controller: function(){
        this.myName = 'Alain';
      }
})

})();

