/* global module */

(function () {
    'use strict';

    module.exports = function(config) {
        config.set({
            basePath: '',
            frameworks: ['jasmine'],
            files: [
                'node_modules/angular/angular.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'qipp-services-utils.js',
                'test/spec.js'
            ],
            exclude: [],
            preprocessors: {
                'qipp-services-utils.js': ['coverage']
            },
            reporters: [
                'coverage',
                'dots'
            ],
            coverageReporter: {
                type: 'html',
                dir: 'coverage'
            },
            port: 1337,
            colors: true,
            logLevel: config.LOG_INFO,
            autoWatch: false,
            browsers: [
                'Chrome',
                'Firefox'
            ],
            singleRun: true
        });
    };

}());
