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
            }
        ])

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

        .factory('deepExtend', function () {
            // This service provide a method to deep extend objects or array,
            // like the jQuery extend method with the deep option:
            // http://api.jquery.com/jquery.extend
            return function () {
                var output = [],
                    args = [].slice.call(arguments);
                // Use a custom method for arrays
                if(angular.isArray(arguments[0])) {
                    args
                        .filter(function (arg) {
                            // Clean the array by removing
                            // the undefined element.
                            return !!arg;
                        })
                        .forEach(function (arg) {
                            // Populate the output,
                            // i.e. overwrite elements
                            // on each loop.
                            arg.forEach(function (element, index) {
                                if (!!element) {
                                    output[index] = element;
                                }
                            });
                        });
                } else {
                    // And the angular merge method for objects
                    // which is available since Angular 1.4
                    output = angular.merge.apply(undefined, args);
                }
                return output;
            };
        })

        .factory('getScript', [
            '$document',
            '$timeout',
            '$q',
            function (
                $document,
                $timeout,
                $q
            ) {
                // This service provide a method to dynamically
                // append a given script to the DOM and load it.
                function load(createElement){
				    var promises = {};
				    return function(url) {
					    if (!promises[url]) {
                            var deferred = $q.defer(),
						        element = createElement(url),
                                onload = function (event) {
							        $timeout(function () {
								        deferred.resolve(event);
							        });
						        },
                                onerror = function (event) {
							        $timeout(function () {
								        deferred.reject(event);
							        });
						        };
                            // Create event listeners
                            // Load event
						    element.onload =
                                element.onreadystatechange =
                                onload;
                            // Error event
						    element.onerror =
                                onerror;
						    promises[url] = deferred.promise;
                            // Create success and error states
                            promises[url].success = function (cb) {
                                promises[url].then(cb);
                                return promises[url];
                            };
                            promises[url].error = function (cb) {
                                promises[url].then(null, cb);
                                return promises[url];
                            };
					    }
					    return promises[url];
				    };
			    }
                return load(function (src) {
				    var script = $document[0].createElement('script');
				    script.src = src;
				    $document[0].body.appendChild(script);
				    return script;
			    });
            }
        ])

        .factory('windowLocation', [
            '$window',
            function (
                $window
            ) {
                return $window.location;
            }
        ]);

}());
