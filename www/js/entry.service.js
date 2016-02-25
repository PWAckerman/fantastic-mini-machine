angular.module('portfolioCompanion').service('entryService', function($http, $q, baseUrl){
  var userId = '56af7da8d4c6d6ab9227851e'
  this.postEntry = function(entry){
    var dfd = $q.defer();
    $http({
      method: 'POST',
      url: baseUrl.url + 'api/entry/' + userId,
      data: entry
    }).then(function(result){
      dfd.resolve(result.data);
    })
    return dfd.promise;
  }
})
