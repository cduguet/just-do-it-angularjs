/**
 * Created by cristian on 1/4/16.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

    //    Grunt Copy
        copy: {
            images: {
                src: 'images/*',
                dest: 'public/'
            }
        },
        concat: {
            css: {
                files: [{
                    options: {
                        separator: '\n'
                    },
                    src: [
                        'css/**/*.css',
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
                    ],
                    dest: 'public/css/all.css'
                }]
            },
            js: {
                files: [{
                    options: {
                        separator: '\n'
                    },
                    src: [
                    'bower_components/angular/angular.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/ngstorage/ngStorage.min.js',
                    'bower_components/angular-google-analytics/dist/angular-google-analytics.js',
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    'node_modules/angular-retina/dist/angular-retina.min.js',
                    'ng/**/*.js',
                    'views/**/*.js'
                    ],
                    dest: 'public/js/all.js'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            minify: {
                expand: true,
                cwd: 'public/css',
                src: 'all.css',
                dest: 'public/css'
            }
        },
        uglify: {
            script: {
                expand: true,
                cwd: 'public/js',
                src: 'all.js',
                dest: 'public/js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('build-test', ['concat:js', 'concat:css', 'copy:images']);
    grunt.registerTask('build-prod', ['concat:js', 'concat:css', 'cssmin', 'copy:images', 'uglify']);
};