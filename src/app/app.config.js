(function () {
  'use strict';

  angular.module('ngSpRestApi', [
    'ngRoute'
  ])
    .config(['$routeProvider',
      appConfig
    ]);

  /**
   * Configure the application's settings.
   * 
   * @param  {Object} $routeProvider - Angular's route provider
   */
  function appConfig($routeProvider) {
    configRoutes($routeProvider);
  }

  /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

  /**
   * Configure the app's routes.
   * 
   * @param  {Object} $routeProvider - Angular's route provider
   */
  function configRoutes($routeProvider) {
    // setup routes in the app
    $routeProvider
      .when('/', {
        title: 'Home',
        showInNav: true,
        sortOrder: 0,
        templateUrl: 'app/dashboard/dashboard.html',
      })
      .when('/missions', {
        title: 'Missions',
        showInNav: true,
        sortOrder: 1,
        templateUrl: 'app/mission/list.html',
        controller: 'ngSpRestApi.missionController',
        controllerAs: 'vm'
      })
      .when('/missions/:itemId', {
        templateUrl: 'app/mission/item.html',
        controller: 'ngSpRestApi.missionController',
        controllerAs: 'vm'
      })
      .otherwise({ redirectTo: '/' });
  }

})();