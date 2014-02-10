module.exports = function (grunt) {
    'use strict';
    grunt.config('connect', {
        server: {
            options: {
                open: true,
                port: 9000,
                livereload:true,
                hostname: '*',   // makes domain accessable to vms and world
                base: '<%= yeoman.app %>',
            }
        },
    });
};
