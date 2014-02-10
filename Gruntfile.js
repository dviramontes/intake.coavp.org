/*global module:false*/
module.exports = function (grunt) {

    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Project configuration.

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.

        // pending...
        //

    });
    // Load per-task config from separate files.
    grunt.loadTasks('tasks');
    // register the server task with watcher
    grunt.registerTask('server', ['connect:server', 'watch']);
    // Default task.
    grunt.registerTask('default', ['server']);

};
