(function() {
  'use strict';

  angular
    .module('quickSight')
    .run(mockFeed);

  mockFeed.$injector = ['feedConnectors', '$log', '$q'];

  function mockFeed(feedConnectors, $log, $q) {
    var service = {
      name: "mock",
      count: 500,
      fetch: fetch
    };

    feedConnectors.register(service);

    return service;

    ///////////

    function fetch(offset, size) {
      var deferred = $q.defer();

      var thumbnails = [];

      var max = offset + size < service.count ? offset + size : service.count;
      for (var i = offset; i < max; i++) {
        var id = i % 135; // 135 images available as samples
        thumbnails.push(getThumbnail(id));
      }

      deferred.resolve(thumbnails);

      return deferred.promise;
    }

    function getThumbnail(id) {
      return {
        image: 'assets/images/samples/img' + id + '.jpg',
        source: 'mock',
        title: 'Image ' + id
      };
    }
  }
})();
