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
              return arg[0];
          // arguments of the doneFn is an array of data returned by each $.ajax
          // for each url
          }));

        }).fail(deferred.reject);

      return deferred.promise();
    }
  });
});
