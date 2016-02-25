angular.module('portfolioCompanion', ['ionic'])
.constant({
  baseUrl: {
    url: "http://www.patrickackerman.io/"
  }
})
// .constant({
//   baseUrl: {
//     url: "http://localhost:8080/"
//   }
// })
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('entries', {
    url: '/',
    controller: 'entryController',
    templateUrl: 'partials/entries.html'
  })
  $stateProvider.state('learnings', {
    url: '/learnings',
    controller: 'learningsController',
    templateUrl: 'partials/learnings.html'
  })
  $stateProvider.state('projects', {
    url: '/projects',
    controller: 'projectsController',
    templateUrl: 'partials/projects.html'
  })
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
