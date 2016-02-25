angular.module('portfolioCompanion').controller('entryController', function($scope, userService, entryService){
  var vm = $scope;
  vm.newEntry = {};
  userService.getUser().then(
    function(user){
      vm.user = user;
    }
  )
  function getWords(str) {
    var arr = [];
    str.replace(/#[a-z]+/g, function(m) {
      arr.push(m.slice(1));
    });
    return arr;
  }
  vm.tags = [];
  vm.findTags = function(newEntry){
    vm.tags = getWords(newEntry)
  }
  vm.submitEntry = function(entry){
    entryService.postEntry({text: entry.text}).then(
      function(result){
        vm.newEntry.text = '';
        console.log(result);

      }
    )
    vm.tags = [];
  }
})
