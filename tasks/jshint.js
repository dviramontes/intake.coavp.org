module.exports = function(grunt) {
    grunt.config('jshint', {
        options: {
            curly: true,
            expr : true,  // for mocha-cli task
            eqeqeq: true,
            immed: true,
            latedef: true,
            node: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            unused: true,
            boss: true,
            eqnull: true,
            browser: true,
            globals: {
                /* MOCHA */
                "describe": false,
                "it": false,
                "before": false,
                "beforeEach": false,
                "after": false,
                "afterEach": false
            }
        },
        gruntfile: {
            src: 'Gruntfile.js'
        },
        lib_test: {
            // src: ['lib/**/*.js', 'test/**/*.js', 'test/client/*.js', 'test/server/*.js']
            // src: ['lib/**/*.js', 'test/client/*.js', 'test/server/*.js']
            src: ['lib/**/*.js', 'test/*.js', 'test/server/*.js']
        }
    });
}
