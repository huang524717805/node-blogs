angular.module('blog').controller('indexCtrl', ['$scope', 'bolgService', '$routeParams', function ($scope, service, $routeParams) {
  $scope.maxPage = 1
  $scope.page = $routeParams.page || 1  ////当前页码
  $scope.type = $routeParams.type || 0  ///当前分类
  $scope.showLoadMore = true
  service.getTypeData().then(function (res) {

    $scope.typeData = res.data
  })

  service.getDataByPage($scope.type, $scope.page).then(function (res) {
    res.data.data = res.data.data.map(function (item) {
      if (!!!item.img) {
        item.img = '/images/chilinglin.jpg'
      }
      if (!!!item.title) {
        item.title = '这个人很懒,忘记输入标题了...'
      }
      return item
    })
    $scope.blogData = res.data.data
    $scope.maxPage = res.data.pageCount /////最大页码数
  })

  /////加载更多
  $scope.loadMore = function () {
    if ($scope.page < $scope.maxPage) {
      $scope.page++
      service.getDataByPage($scope.type, $scope.page).then(function (res) {
        res.data.data = res.data.data.map(function (item) {
          if (!!!item.img) {
            item.img = '/images/chilinglin.jpg'
          }
          if (!!!item.title) {
            item.title = '这个人很懒,忘记输入标题了...'
          }
          return item
        })
        $scope.blogData = $scope.blogData.concat(res.data.data)
        // $scope.maxPage.data.pageCount
      })
    }
    else {
      $scope.showLoadMore = false
    }

  }
}])
