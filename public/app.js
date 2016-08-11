//console.log(angular)
angular.module('blog', ['ngRoute', 'ngAnimate', 'ngSanitize'])

angular.module('blog').config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/',{
          templateUrl: 'app/tpl/index.html',
          controller: 'indexCtrl'
        })
        .when('/:type/:page', {
            templateUrl: 'app/tpl/index.html',
            controller: 'indexCtrl'
        })
        .when('/blog/detail/:id', {
            templateUrl: 'app/tpl/detail.html',
            controller: 'detailCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}])
