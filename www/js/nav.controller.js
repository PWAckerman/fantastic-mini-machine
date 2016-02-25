angular.module('portfolioCompanion').controller('navController', function($scope, $state){
  var vm = $scope;
  vm.state = {
    entries: true,
    learnings: false,
    projects: false
  }
  vm.goLearnings = function(){
    console.log("we're going!");
    $state.go('learnings');
    vm.state.learnings = true;
    vm.state.projects = false;
    vm.state.entries = false;
  }
  vm.goEntries = function(){
    $state.go('entries');
    vm.state.entries = true;
    vm.state.projects = false;
    vm.state.learnings = false;
  }
  vm.goProjects = function(){
    $state.go('projects');
    vm.state.projects = true;
    vm.state.entries = false;
    vm.state.learnings = false;
  }
})
