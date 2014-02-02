module.exports = function(grunt) {
    grunt.config('concat',{
        options: {
            banner: '<%= banner %>',
            stripBanners: true
        },
        dist: {
            src: ['lib/<%= pkg.name %>.js'],
            dest: 'dist/<%= pkg.name %>.js'
        }
});
}
