(function () {
  'use strict';

  angular.module('ngSpRestApi')
    .service('ngSpRestApi.spRestService', [
      '$q',
      spRestService
    ]);

  /**
   * @constructor
   * @param  {Object} $q    - Angular's promise service
   */
  function spRestService($q) {
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

      deferred.resolve({
        Id: 3,
        Title: 'Mercury 3',
        Rocket: 'Redstone',
        Pilot: 'Shepard',
        LaunchDate: '1961-05-05T00:00:00'
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

      deferred.resolve([
        {
          Id: 1,
          Title: 'Mercury 1',
          Rocket: 'Redstone',
          Pilot: '',
          LaunchDate: '1960-07-29T00:00:00'
        },
        {
          Id: 2,
          Title: 'Mercury 2',
          Rocket: 'Redstone',
          Pilot: '',
          LaunchDate: '1961-01-31T00:00:00'
        },
        {
          Id: 3,
          Title: 'Mercury 3',
          Rocket: 'Redstone',
          Pilot: 'Shepard',
          LaunchDate: '1961-05-05T00:00:00'
        },
        {
          Id: 4,
          Title: 'Mercury 4',
          Rocket: 'Redstone',
          Pilot: 'Grissom',
          LaunchDate: '1961-07-21T00:00:00'
        },
        {
          Id: 6,
          Title: 'Mercury 6',
          Rocket: 'Atlas',
          Pilot: 'Glenn',
          LaunchDate: '1962-02-20T00:00:00'
        },
        {
          Id: 7,
          Title: 'Mercury 7',
          Rocket: 'Atlas',
          Pilot: 'Carpenter',
          LaunchDate: '1962-05-24T00:00:00'
        },
        {
          Id: 8,
          Title: 'Mercury 8',
          Rocket: 'Atlas',
          Pilot: 'Schirra',
          LaunchDate: '1962-10-03T00:00:00'
        },
        {
          Id: 9,
          Title: 'Mercury 9',
          Rocket: 'Atlas',
          Pilot: 'Cooper',
          LaunchDate: '1963-05-15T00:00:00'
        }
      ]);

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

      deferred.resolve();

      return deferred.promise;
    }

  } // function spRestService()

})();