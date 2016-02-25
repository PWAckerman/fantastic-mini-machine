angular.module('portfolioCompanion').service('projectService', function($http, $q, baseUrl){
  var userId = '56af7da8d4c6d6ab9227851e'
  this.addProject = function(project){
    var dfd = $q.defer();
    $http({
      method: 'POST',
      url: baseUrl.url + 'api/user/' + userId + '/project',
      data: project
    }).then(function(result){
      dfd.resolve(result.data);
    })
    return dfd.promise;
  }
})
