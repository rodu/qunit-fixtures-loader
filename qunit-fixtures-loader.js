/* This is a plugin for the QUnit test framework which allows to load HTML
fragments for testing.

The plugin uses deferred/promises implementation from jQuery, in combination
with 'when' and 'ajax' asyncronous resolvers.

Given an array of urls the plugin will make an ajax request for each. On
successful completion of all requests, the HTML responses are extracted from
each ajax results and passed as arguments to the resolve to be returned to the
caller in the same order as the urls given.
*/
/* global QUnit: true */
$(function fixturesLoader(){
  'use strict';

  QUnit.extend(QUnit, {

    loadFixtures: function loadFixtures(urls){
        var deferred = $.Deferred();
        // When all requests will complete...
        $.when.apply(this, $.map(urls, function mapUrls(url){
          return $.ajax(url);

        })).then(function success(){ // once all $.ajax complete
          // Resolves the promise returning the HTML for fixtures in order
          deferred.resolve.apply(this,
            // arguments to the success function is an array of data returned by
            // each $.ajax for each url
            $.map(Array.prototype.slice.apply(arguments), function mapArgs(arg){
              return $.isArray(arg) ? arg[0] : arg;
          }));

        },
        function fail(xhr){
          var errorMessage = 'Fixture load failed! ' +
                              (xhr.responseText || this.url);
          console.error(errorMessage);
          deferred.reject(errorMessage);
        }
      );

      return deferred.promise();
    }
  });
});
