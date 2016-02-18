(function () {
  'use strict';

  angular.module('ngSpRestApi', [
    'ngRoute',
    'AdalAngular'
  ])
    .config([
      '$routeProvider',
      '$httpProvider',
      'adalAuthenticationServiceProvider',
      appConfig
    ]);

  /**
   * Configure the application's routing & authentication settings.
   * 
   * @param  {Object} $routeProvider - Angular's route provider
   * @param  {Object} $httpProvider  - Angular's $http provider
   * @param  {Object} adalProvider   - ADAL JS' provider
   */
  function appConfig($routeProvider, $httpProvider, adalProvider) {
    configRoutes($routeProvider);
    configAuth($httpProvider, adalProvider);
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
        controllerAs: 'vm',
        requireADLogin: true
      })
      .when('/missions/:itemId', {
        templateUrl: 'app/mission/item.html',
        controller: 'ngSpRestApi.missionController',
        controllerAs: 'vm',
        requireADLogin: true
      })
      .otherwise({ redirectTo: '/' });
  }

  /**
   * Configure authencation for the application.
   * 
   * @param  {Object} $httpProvider - Angular's $http provider
   * @param  {Object} adalProvider  - ADAL JS' provider
   */
  function configAuth($httpProvider, adalProvider) {
    adalProvider.init({
      tenant: 'c24e6842-5db7-45ee-8afc-af300fb3e1cd',
      clientId: '140b4dd0-9fb0-4e5c-b681-173b4b4428a6',
      postLogoutRedirectUrl: 'http://localhost:3000',
      endpoints: {
        'https://aconn.sharepoint.com/sites/devshowcase/_api': 'https://aconn.sharepoint.com'
      }
    }, $httpProvider);
  }

})();