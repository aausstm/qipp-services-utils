/* global angular */

(function () {
    'use strict';

    angular.module('qipp-services-utils', [])

        .factory('analytics', [
            '$window',
            function (
                $window
            ) {
            return function (method) {
                var analytics = $window.analytics;
                return analytics[method].apply(
                    analytics,
                    [].slice.call(arguments, 1)
                );
            };
        }])

        .factory('cssProperties', function () {
            return function (element) {
                var properties = {};
                angular.forEach(['webkitTrans', 'MozTrans', 'trans'], function (prop) {
                    if (element[0].style[prop + 'itionDuration'] !== undefined) {
                        properties.transitionDuration = prop + 'itionDuration';
                        properties.transitionEnd = prop === 'webkitTrans' ?
                            'webkitTransitionEnd' : 'transitionend';
                        if (element[0].style[prop + 'form'] !== undefined) {
                            properties.transform = prop + 'form';
                        }
                    }
                });
                return properties;
            };
        })

        .factory('windowLocation', [
            '$window',
            function (
                $window
            ) {
            return $window.location;
        }]);

}());
