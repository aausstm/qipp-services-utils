# qipp-services-utils

## General

> This module provides five factories as utilities: analytics, cssProperties,
> deepExtend, getScript, windowLocation.

## Install

```bash
npm install
```

## Angular usage

### analytics

The *analytics()* factory is a wrapper around the Google Analytics $window objet:

```javascript
analytics(args);
```

See [Google Analytics](https://developers.google.com/analytics/?hl=en)
documentation for further help.

### cssProperties

This factory returns the corresponding vendor css properties for
transitionDuration, transitionEnd and transform of a given element:

```javascript
cssProperties(element);
/*
Object {
    transitionDuration: "transitionDuration",
    transitionEnd: "transitionend",
    transform: "transform"
}
*/
```

### deepExtend

This service provides a method to deep extend objects or array, like the [jQuery
extend method with the deep option](http://api.jquery.com/jquery.extend):

```javascript
var ext,
    obj = {
    propA: 123,
    propB: 456
    };
ext = deepExtend(
    obj,
    {propC: 789}
);
console.log(ext); // {propA: 123, propB: 456, propC: 789}
```

### getScript

This factory provides a method is a promise with *.success* and *.error*
callbacks to dynamically append a given script to the DOM and load it:

```javascript
getScript('https://app.qipp.com/scriptToLoad.js')
    .success(function () {
        // Do something.
    })
    .error(function () {
        // Do something else.
    });
```

### windowLocation

This factory is a wrapper around $window.location:

```javascript
windowLocation(); // https://app.qipp.com
```

## Tools

### Linting

```bash
npm run lint
```

### Unit testing

```bash
npm run unit
```

## Dependencies

### External

* angular 1.4.0
* google-analytics
