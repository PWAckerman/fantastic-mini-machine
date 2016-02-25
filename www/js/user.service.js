angular.module('portfolioCompanion').service('userService', function($http, $q, baseUrl){
  var userId = '56af7da8d4c6d6ab9227851e'
  this.getUser = function(){
    var dfd = $q.defer();
    $http({
      method: 'GET',
      url: baseUrl.url + 'api/user/' + userId
    }).then(function(user){
      dfd.resolve(user.data);
    })
    return dfd.promise;
  }
})
