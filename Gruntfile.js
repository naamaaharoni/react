'use strict';

module.exports = function (grunt) {

    grunt.config.init({
        eslint: {
            target: ['src/*.js']
        },
        csslint: {
            src: ['styles/*.css']
        },
        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['eslint']
            },
            css: {
                files: ['styles/*.css'],
                tasks: ['csslint']
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['*.jsx'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('check', ['eslint', 'csslint']);
    grunt.registerTask('default', ['babel', 'check']);
};
