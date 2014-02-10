module.exports = function (grunt) {
    'use strict';

    grunt.config('watch', {


        less: {
            options: {
                spawn: false
            },
            files: ['<%= yeoman.app %>/less/{,*/}*.less'],
            tasks: ['less']
        },
        changes: {
            options: {
                livereload: true,
            },
            files: [
                '<%= yeoman.app %>/{,*/}*.html',
                '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
                '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
        },

        // bundle: {
        //     files: '*.js', //'{,*/}*.js'
        //     tasks: ['browserify'],
        //     options: {
        //         livereload: true,
        //         spawn: false
        //     }
        // },

        gruntfile: {
            files: ['Gruntfile.js']
        }
    });
};
