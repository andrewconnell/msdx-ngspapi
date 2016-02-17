(function () {
  'use strict';

  angular.module('ngSpRestApi')
    .controller('ngSpRestApi.missionController', [
      '$location',
      '$routeParams',
      'ngSpRestApi.spRestService',
      missionController
    ]);

  function missionController($location, $routeParams, dataService) {
    var vm = this;

    // collection of items
    vm.items = [];
    // currently selected item
    vm.selectedItem = {};
    
    // events
    vm.onSelectItem = onSelectItem;
    vm.onSave = onSave;
    vm.onReset = onReset;

    // activate the controller
    init();

    /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    /**
     * Init the controller.
     */
    function init() {
      // try to get the current item
      var itemId = +$routeParams.itemId;
      
      // if item specified, get it
      //  else get all the items
      if (!angular.isUndefined(itemId) && itemId > 0) {
        getItem(itemId).then(function (item) {
          vm.selectedItem = item;
        });
      } else {
        getItems().then(function (items) {
          vm.items = items;
        });
      }
    }

    /**
     * Retrieve a list of items form SharePoint's REST API.
     * 
     * @returns {Promise}    - Angular promise
     * @resolves {Object[]}  - Collection of items from the SharePoint REST API
     */
    function getItems() {
      return dataService.getItems()
        .then(function (items) {
          return items;
        });
    }

    /**
     * Gets the specified item by the provided ID.
     * 
     * @param  {Number} itemId  - Item ID to retreive
     * @returns {Promise}       - Angular promise
     * @resolves {Object}       - Item requested from the SharePoint REST API
     */
    function getItem(itemId) {
      return dataService.getItem(itemId)
        .then(function (item) {
          return item;
        });
    }

    /**
     * Takes user to the detail page for the selected item.
     * 
     * @param  {Object} item  - Item to view details for
     */
    function onSelectItem(item) {
      if (!angular.isUndefined(item)) {
        $location.path('/missions/' + item.Id);
      }
    }

    /**
     * Sales the changes to the currently selected item.
     * 
     * @returns   {Promise} - Angular promise
     */
    function onSave() {
      return dataService.saveItem(vm.selectedItem)
        .then(function () {
          onReset();
        })
    }

    /**
     * Takes user back to the listing page.
     */
    function onReset() {
      vm.selectedItem = {};
      $location.path('/missions');
    }

  } // function missionController()

})();