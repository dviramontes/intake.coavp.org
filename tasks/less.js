module.exports = function (grunt) {
    'use strict';
    grunt.config('less', {
        options: {
            strictImports: true, // force evaluation of @imports
            banner: '/*<%= pkg.name %> \n CSS Baked on <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
        },
        build: {
            files: {
                '<%= yeoman.app %>/css/main.css': '<%= yeoman.app %>/less/main.less'
            }
        }
    });
};
