module.exports = function(grunt) {
    grunt.config('watch', {
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                // one level
                '*.html', //'{,*/}*.html',  
                '*.css', //'{,*/}*.css',
                // '*.js', //'{,*/}*.js'  see bundle below
                'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
            files: ['Gruntfile.js'],
            tasks: ['hint:gruntfile']
        },
        markup: {
            files: ['index.html', 'ccs/*.css'],
            options: {
                livereload: true
            }
        }
    });
}
