// Generated on 2013-07-11 using generator-angular 0.3.0
'use strict';
var LIVERELOAD_PORT = 35729;
var path = require('path');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // show elapsed time at the end
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.loadNpmTasks('grunt-express');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            less: {
                options: {
                    spawn: false
                },
                files: ['<%= yeoman.app %>/less/{,*/}*.less'],
                tasks: ['less']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        express: {
            options: {
                port: 3000,
                hostname: '*'
            },
            livereload: {
                options: {
                    livereload: true,
                    server: path.resolve('app.js'),
                    bases: [path.resolve('./.tmp'), path.resolve(__dirname, yeomanConfig.app)]
                }
            },
            test: {
                options: {
                    server: path.resolve('app.js'),
                    bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'test')]
                }
            },
            dist: {
                options: {
                    server: path.resolve('app.js'),
                    bases: path.resolve(__dirname, yeomanConfig.dist)
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
      dist: {}
    },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/css/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/css/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            // By default, your `index.html` <!-- Usemin Block --> will take care of
            // minification. This option is pre-configured if you do not wish to use
            // Usemin blocks.
            // dist: {
            //   files: {
            //     '<%= yeoman.dist %>/css/main.css': [
            //       '.tmp/css/{,*/}*.css',
            //       '<%= yeoman.app %>/css/{,*/}*.css'
            //     ]
            //   }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'bower_components/**/*',
                        'images/{,*/}*.{gif,webp,svg}',
                        'css/fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                'coffee:dist'
            ],
            test: [
                'coffee'
            ],
            dist: [
                'coffee',
                'imagemin',
                'htmlmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },
        less: {
            options: {
                strictImports: true, // force evaluation of @imports
                banner: '/*<%= pkg.name %> \n CSS Baked on <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
            },
            build: {
                files: {
                    '<%= yeoman.app %>/css/main.css': '<%= yeoman.app %>/less/main.less'
                }
            }
        },
        jasmine_node: {
            specNameMatcher : "_spec",
            projectRoot : "./test/spec/databases"
        },

    });

    grunt.registerTask('server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'express:dist', 'express-keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'express:livereload',
            'open',
            'watch'
        ]);

    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'express:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'copy',
        'cdnify',
        'ngmin',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
