angular.module('portfolioCompanion').controller('learningsController', function($scope, userService, entryService, $ionicModal, skillService){
  var vm = $scope;
  vm.user = {}
  vm.learnings = [];
  vm.newSkill = {};
  vm.learningfilter = [];
  function filterSkills(userLearnings, userSkills, allSkills){
    return allSkills.filter(function(skill){
       return userLearnings.every(function(learning){
         return learning.skill._id !== skill._id
       })
    }).filter(function(skill){
      return userSkills.every(function(presentSkill){
        return presentSkill._id !== skill._id;
      })
    })
  }
  function getUser(){
    userService.getUser().then(
      function(user){
        vm.user = user;
        user.learnings.forEach(function(learning){
          console.log(vm.learningfilter.indexOf(learning._id));
          if(vm.learningfilter.indexOf(learning._id) === -1){
            console.log('pushing!');
            vm.learnings.push(learning);
            vm.learningfilter.push(learning._id);
          }
        })
        vm.selectedLearning = vm.learnings[0] || '';
        skillService.getSkills().then(
          function(skills){
            vm.skills = filterSkills(user.learnings, user.skills, skills);
          }
        )
      }
    )
  }
  getUser();
  vm.selectLearning = function(learning){
    vm.selectedLearning = learning;
  }

  $ionicModal.fromTemplateUrl('partials/learnings.modal.html', {
      scope: vm,
      animation: 'slide-in-up'
    }).then(function(modal) {
      console.log('modal?')
      vm.modal = modal;
    });

  vm.addLearning = function(skillId){
    var skill = {
      skill: skillId
    }
    vm.closeModal();
    console.log('bout to do this');
    skillService.addLearning(vm.user._id, skill).then(
      function(result){
        getUser();
      }
    )
  }
  vm.upgradeLearning = function(learning){
    var spliceIndex = vm.learningfilter.indexOf(learning._id);
    vm.learningfilter.splice(spliceIndex, 1);
    vm.learnings.splice(spliceIndex, 1);
    skillService.upgradeLearning(vm.user._id, learning).then(
      function(result){
        getUser();
      }
    )
  }
  vm.addNewSkill = function(skill){
    skillService.addNewSkill(skill).then(
      function(result){
        vm.newSkill = {};
        vm.closeModal2();
        getUser();
      }
    )
  }
  vm.removeLearning = function(learningId){
    var learning = {
      learning: learningId
    }
    var spliceIndex = vm.learningfilter.indexOf(learningId);
    vm.learningfilter.splice(spliceIndex, 1);
    vm.learnings.splice(spliceIndex, 1);
    skillService.removeLearning(vm.user._id, learning).then(
      function(result){
        getUser();
      }
    )
  }
  vm.updateProgress = function(learning){
    skillService.updateProgress(learning).then(
      function(result){
        getUser();
      }
    )
  }
  $ionicModal.fromTemplateUrl('partials/skills.modal.html', {
      scope: vm,
      animation: 'slide-in-up'
    }).then(function(modal) {
      console.log('modal?')
      vm.modal2 = modal;
    });

    vm.openModal = function() {
      vm.modal.show();
    };
    vm.closeModal = function() {
      vm.modal.hide();
    };
    vm.openModal2 = function() {
      vm.modal2.show();
    };
    vm.closeModal2 = function() {
      vm.modal2.hide();
    };
    //Cleanup the modal when we're done with it!
    vm.$on('$destroy', function() {
      vm.modal.remove();
      vm.modal2.remove();
    });
    // Execute action on hide modal
    vm.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    vm.$on('modal.removed', function() {
      // Execute action
    });
})
