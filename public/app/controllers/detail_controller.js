angular.module('blog').controller('detailCtrl',['$scope','blogService','$routeParams',function($scope,service,$routeParams){
  

  service.getBlogDetail($routeParams.id).then(function(res){
    $scope.blogData = res.data
  })
}])
