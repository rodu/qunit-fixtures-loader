/* global QUnit: true */
$(function fixturesLoader(){
  'use strict';

  QUnit.extend(QUnit, {

    loadFixtures: function loadFixtures(urls){
        var deferred = $.Deferred();
        // When all requests will complete...
        $.when.apply(this, $.map(urls, function mapUrls(url){
          return $.ajax(url);

        })).done(function doneFn(){ // once all $.ajax complete
          // Resolves the promise returning the HTML for fixtures in order
          deferred.resolve.apply(this,
            $.map(Array.prototype.slice.apply(arguments), function mapArgs(arg){
              // The arg parameter received is an array of data items created
              // with the results returned by each $.ajax for each url. That
              // will sit at the position 0 of the arg array. If we requested a
              // single url, arg will be the result retrieved for that url.
              return $.isArray(arg) ? arg[0] : arg;
          }));

        }).fail(deferred.reject);

      return deferred.promise();
    }
  });
});
