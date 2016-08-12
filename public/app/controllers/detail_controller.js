angular.module('blog').controller('detailCtrl',['$scope','bolgService','$routeParams',function($scope,service,$routeParams){
  

  service.getBlogDetail($routeParams.id).then(function(res){
    $scope.blogData = res.data
  })
}])
