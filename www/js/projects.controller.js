angular.module('portfolioCompanion').controller('projectsController', function($scope, skillService, userService, projectService){
  var vm = $scope;
  var platforms = [{
    _id: '56af8557d4c6d6ab92278548',
    icon: 'ion-iphone',
    isActive: false
  },{
    _id: '56af85a1d4c6d6ab9227854a',
    icon: 'ion-ios-monitor-outline',
    isActive: false
  },{
    _id: 'xxx',
    icon: 'ion-ipad',
    isActive: false
  }];
  function getUser(){
    userService.getUser().then(
      function(user){
        vm.user = user;
      }
    )
  }
  getUser()
  function getSkills(){
    skillService.getSkills().then(
      function(skills){
        vm.techs = skills.map(function(skill){
          skill.isActive = false;
          return skill
        });
      }
    )
  }
  getSkills()
  function resetPlatforms(){
    vm.platforms = [];
    platforms.forEach(function(platform){
      vm.platforms.push(platform)
    })
  }
  resetPlatforms()
  vm.selectedTechs = [];
  vm.selectedPlatforms = [];
  vm.newProject = {};
  vm.selectTech = function(tech){
    tech.isActive = !tech.isActive;
    vm.selectedTechs.indexOf(tech._id) === -1 ? vm.selectedTechs.push(tech._id) : vm.selectedTechs.splice(vm.selectedTechs.indexOf(tech._id), 1)
  }
  vm.selectPlatform = function(platform){
    platform.isActive = !platform.isActive;
    vm.selectedPlatforms.indexOf(platform._id) === -1 ? vm.selectedPlatforms.push(platform._id) : vm.selectedPlatforms.splice(vm.selectedPlatforms.indexOf(platform._id), 1)
    console.log(vm.selectedPlatforms);
  }
  vm.submitProject = function(){
    var project = vm.newProject;
    project.platforms = vm.selectedPlatforms;
    project.technologies = vm.selectedTechs;
    console.log(project);
    projectService.addProject(project).then(
      function(result){
        getSkills();
        resetPlatforms();
        vm.newProject = {};
      }
    )
  }
})
