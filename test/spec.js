/* global beforeEach, describe, expect, inject, it, module */

(function () {
    'use strict';

    describe('qipp-services-utils', function () {

        beforeEach(function () {
            module('qipp-services-utils');
        });

        describe('cssProperties', function () {

            it('Should return WebKit specific css properties.', inject(
                function (cssProperties) {
                    expect(cssProperties([{
                        style: {
                            webkitTransitionDuration: '',
                            webkitTransform: ''
                        }
                    }])).toEqual({
                        transitionDuration: 'webkitTransitionDuration',
                        transitionEnd: 'webkitTransitionEnd',
                        transform: 'webkitTransform'
                    });
                }
            ));

            it('Should return Mozilla specific css properties.', inject(
                function (cssProperties) {
                    expect(cssProperties([{
                        style: {
                            MozTransitionDuration: '',
                            MozTransform: ''
                        }
                    }])).toEqual({
                        transitionDuration: 'MozTransitionDuration',
                        transitionEnd: 'transitionend',
                        transform: 'MozTransform'
                    });
                }
            ));

            it('Should return generic css properties.', inject(
                function (cssProperties) {
                    expect(cssProperties([{
                        style: {
                            transitionDuration: '',
                            transform: ''
                        }
                    }])).toEqual({
                        transitionDuration: 'transitionDuration',
                        transitionEnd: 'transitionend',
                        transform: 'transform'
                    });
                }
            ));

            it('Should handle browsers without transition support.', inject(
                function (cssProperties) {
                    expect(cssProperties([{
                        style: {}
                    }])).toEqual({});
                }
            ));

            it('Should handle browsers with transition but without transform support.', inject(
                function (cssProperties) {
                    expect(cssProperties([{
                        style: {
                            transitionDuration: 'transitionDuration',
                            transitionEnd: 'transitionend'
                        }
                    }])).toEqual({
                        transitionDuration: 'transitionDuration',
                        transitionEnd: 'transitionend'
                    });
                }
            ));

        });

        describe('windowLocation', function () {

            it('Should return the window.location object.', inject(
                function ($window, windowLocation) {
                    expect(windowLocation).toBe($window.location);
                }
            ));

        });

        describe('analytics', function () {

            it('Should track analytics calls.', inject(
                function ($window, analytics) {
                    var hasTracked;
                    $window.analytics = {
                        track: function (arg) {
                            hasTracked = arg;
                        }
                    };
                    analytics('track', true);
                    expect(hasTracked).toBeTruthy();
                }
            ));

        });

    });

}());
