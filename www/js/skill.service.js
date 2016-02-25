angular.module('portfolioCompanion').service('skillService', function($http, $q, baseUrl){
  var userId = '56af7da8d4c6d6ab9227851e'
  this.getSkills = function(){
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: baseUrl.url + 'api/skills/all/'
    }).then(function(result){
      dfd.resolve(result.data);
    })
    return dfd.promise;
  }
  this.addNewSkill = function(skill){
    var dfd = $q.defer();
    $http({
      method: 'POST',
      url: baseUrl.url + 'api/skills/',
      data: skill
    }).then(function(result){
      dfd.resolve(result.data)
    })
    return dfd.promise;
  }
  this.addLearning = function(userId, data){
    var dfd = $q.defer();
    $http({
      method: 'PATCH',
      url: baseUrl.url + 'api/user/' + userId + '/learning',
      data: data
    }).then(function(result){
      dfd.resolve(result.data);
    })
    return dfd.promise;
  }
  this.upgradeLearning = function(userId, data){
    var dfd = $q.defer();
    $http({
      method: 'PATCH',
      url: baseUrl.url + 'api/user/' + userId + '/upgrade',
      data: {learningId: data._id, skillId: data.skill._id}
    }).then(function(result){
      dfd.resolve(result.data)
    })
    return dfd.promise;
  }
  this.removeLearning = function(userId, data){
    var dfd = $q.defer();
    $http({
      method: 'DELETE',
      url: baseUrl.url + 'api/user/' + userId + '/learning/' + data.learning,
    }).then(function(result){
      dfd.resolve(result.data)
    })
    return dfd.promise;
  }
  this.updateProgress = function(learning){
    var dfd = $q.defer();
    $http({
      method: 'PATCH',
      url: baseUrl.url + 'api/learning/' + learning._id,
      data: {progress: learning.progress}
    }).then(function(result){
      dfd.resolve(result.data)
    })
    return dfd.promise;
  }
})
