# Qunit Fixtures Loader

This is a plugin for the QUnit test framework which allows to load HTML
fragments to be used for testing.

The plugin uses deferred/promises implementation from jQuery, in combination
with 'when' and 'ajax' asyncronous resolvers.

Given an array of urls the plugin will make an ajax request for each. On
successful completion of all requests, the HTML responses will get extracted
from each ajax result and passed as arguments to the resolve to be returned to
the caller in the same order as the urls given.

## Usage

Using the plugin is fairly easy.
Given a classic QUnit tests setups, we need to add the script to load the
Fixtures Loader plugin in the test HTML setup.

```HTML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>QUnit Example</title>
        <link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.15.0.css">
    </head>
    <body>
        <div id="qunit"></div>
        <div id="qunit-fixture"></div>

        <!-- The QUnit Test Framework -->
        <script src="//code.jquery.com/qunit/qunit-1.15.0.js"></script>

        <!-- The Fixtures Loader Plugin -->
        <script src="qunit-load-fixture.js"></script>

        <!-- Our Test Scripts -->
        <script src="tests.js"></script>
    </body>
</html>
```

Then, the test script which need to load some fixtures (HTML fragments) can use
the plugin like so:

```JavaScript
$(function mainTest(){
  'use strict';
  // Loads test fixtures, and executes the tests on load success
  QUnit.loadFixtures([
      '/tests/components/html/fixture-1.html',
      '/tests/components/html/fixture-2.html',
      '/tests/components/html/fixture-3.html'
    ]).done(function testSuite(fixture1, fixture2, fixture3){

        //
        // Omitted code contains classic test setup and test cases which can
        // now use the HTML fragments received as arguments.
        //

    });

});
```