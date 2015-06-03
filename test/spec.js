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

        describe('deepExtend', function () {

            it('Should provide a deepExtend method', inject(
                function (deepExtend) {
                    var obj1 = {key: {sub1: 'value1'}},
                        obj2 = {key: {sub2: 'value2'}},
                        arr1 = [1, 2, 3],
                        arr2 = [];
                    arr2[3] = 4;
                    expect(deepExtend).toBeDefined();
                    expect(deepExtend({}, obj1, obj2))
                        .toEqual({key: {sub1: 'value1', sub2: 'value2'}});
                    expect(deepExtend(obj1))
                        .toEqual({key: {sub1: 'value1'}});
                    expect(deepExtend(arr1, arr2))
                        .toEqual([1, 2, 3, 4]);
                    expect(deepExtend([1, 2, 3], undefined, [undefined, 4]))
                        .toEqual([1, 4, 3]);
                    deepExtend(obj1, obj2);
                    expect(obj1)
                        .toEqual({key: {sub1: 'value1', sub2: 'value2'}});
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
