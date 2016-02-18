(function () {
  'use strict';

  angular.module('ngSpRestApi')
    .controller('ngSpRestApi.navbar', [
      '$route',
      '$location',
      navbarController
    ]);
    
  /**
   * @constructor
   * @param  {Object} $route    - Angular's route service
   * @param  {Object} $location - Angular's location service
   */
  function navbarController($route, $location) {
    var vm = this;

    // collection of routes to show in nav
    vm.routes = [];
    // utility to determine if route is current page
    vm.isCurrentRoute = isCurrentRoute;

    // activate the controller
    _init();

    /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    /**
     * Intialize the controller.
     */
    function _init() {
      vm.routes = _populateRoutes();
    }

    /**
     * Populate the route collection.
     * 
     * @returns {Object[]}  routes - Collection of routes to show in nav.
     */
    function _populateRoutes() {
      var routes = [];
      
      // loop though all routes
      angular.forEach($route.routes, function (config, route) {
        // if the route is supposed to be shown in the nav...
        if (!angular.isUndefined(config.showInNav) && config.showInNav === true) {
          // add it to the collection
          routes.push({
            title: config.title,
            appUrl: route,
            sortOrder: config.sortOrder
          });
        }
      });

      return routes;
    }

    /**
     * Determines if the provided route is the current page.
     * 
     * @param  {Object} route - Angular route.
     * @returns {Boolean}     - Flag if route is the current page.
     */
    function isCurrentRoute(route) {
      return $location.path() == route.appUrl;
    }

  } // function navbarController()

})();