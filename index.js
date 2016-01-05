'use strict';

module.exports = function(kbox) {

  // Modules
  var path = require('path');
  var fs = require('fs');
  var _ = require('lodash');

  // "Constants"
  var PLUGIN_NAME = 'kalabox-plugin-drupal-console';

  var globalConfig = kbox.core.deps.get('globalConfig');
  var events = kbox.core.events.context('bff70713-19f0-4fe2-90d9-371fc303508c');
  var engine = kbox.engine;
  var Promise = kbox.Promise;

  kbox.ifApp(function(app) {

    // Grab the clients
    var DrupalConsole = require('./lib/console.js');
    var console = new DrupalConsole(kbox, app);

    // Events
    // Install the drush container for our things
    events.on('post-install', function(app, done) {
      // If profile is set to dev build from source
      var opts = {
        name: 'drupalConsole',
        srcRoot: path.resolve(__dirname)
      };
      engine.build(opts, done);
    });

    // Tasks
    // drush wrapper: kbox drush COMMAND
    kbox.tasks.add(function(task) {
      task.path = [app.name, 'drupalConsole'];
      task.category = 'appCmd';
      task.description = 'Run Drupal Console commands.';
      task.kind = 'delegate';
      // task.func = function(done) {
      //   var opts = drush.getOpts(this.options);
      //   var cmd = this.payload;
      //   cmd.unshift('@dev');
      //   drush.cmd(cmd, opts, done);
      // };
    });

  });

};
