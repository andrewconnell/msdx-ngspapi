(function () {
  'use strict';

  angular.module('ngSpRestApi')
    .service('ngSpRestApi.spRestService', [
      '$http',
      '$q',
      spRestService
    ]);

  var listUrl = "https://aconn.sharepoint.com/sites/devshowcase/_api/web/lists/getByTitle('Apollo Missions')/items";

  /**
   * @constructor
   * @param  {Object} $http - Angular's $http service
   * @param  {Object} $q    - Angular's promise service
   */
  function spRestService($http, $q) {
    return {
      getItem: getItem,
      getItems: getItems,
      saveItem: saveItem
    };
  
    /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    /**
     * Return the specified item for the ID specified.
     * 
     * @param  {Number} itemId  - ID of the item to retrieve
     * @returns  {Promise}      - Angular promise
     * @resolves {Object}       - Item requested from the SharePoint list
     */
    function getItem(itemId) {
      var deferred = $q.defer();

      var query = listUrl +
        '(' + itemId + ')' +
        '?$select=Id,Title,Rocket,Commander,SrPilotCmPilot,PilotLmPilot,LaunchDate';
      var getOptions = {
        url: query,
        headers: {
          'Accept': 'application/json;odata=verbose'
        }
      };
      
      $http(getOptions)
        .success(function (response) {
          deferred.resolve(response.d);
        });

      return deferred.promise;
    }

    /**
     * Returns a collection of items.
     * 
     * @returns   {Promise}      - Angular promise
     * @resolves  {Object[]} 	   - Collection of items from the SharePoint list
     */
    function getItems() {
      var deferred = $q.defer();

      var query = listUrl +
        '?$select=Id,Title,Rocket,Commander,SrPilotCmPilot,PilotLmPilot,LaunchDate' +
        '&$orderby=LaunchDate';
      var getOptions = {
        url: query,
        headers: {
          'Accept': 'application/json;odata=verbose'
        }
      };
      
      $http(getOptions)
        .success(function (response) {
          deferred.resolve(response.d.results);
        });

      return deferred.promise;
    }
    
    /**
     * Saves the provided item.
     * 
     * @param  {Object} item  - Item to update
     * @returns {Promise}     - Angular promise
     * @resolves {Object}     - Updated object as returned by update call
     */
    function saveItem(item) {
      var deferred = $q.defer();

      var query = listUrl + '(' + item.Id + ')';
      var saveOptions = {
        url: query,
        method: 'patch',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
          'If-Match': item.__metadata.etag
        },
        data: JSON.stringify(item)
      }

      // remove id, launch date & other medata
      delete item.Id;
      delete item.ID;
      delete item.__metadata.id;
      delete item.__metadata.uri;

      // issue HTTP request
      $http(saveOptions)
        .success(function(response){
          console.log(response);
          deferred.resolve(response);
        });

      return deferred.promise;
    }

  } // function spRestService()

})();