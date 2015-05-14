---
layout: post
title: "No backspaces: introduction, Array.prototype.map"
---

No backspaces is a series of posts where I can't use the bas... backspace key, not even once (more precisely, I can never remove or change the position of a character from the post. I can still go back and add things in. IF there are markdown/code formatting issues or something I might use backspaces for that). I'm going to be coding up errr, my plan is to code up a bunch of different functions. These might be from jQuery, or undersoc (THIS

Th... I might do stuff from Underscore, jQuery, or implement some "native" JavaScript function like *Array.prototpye.map*. Let's do this.

### Try 1
```javascript
Array.prototype.map = function(fn, thisArg) {
    var output = [];
    this.forEach(function(element){
        output.push(fn.call(thisArg, element))
        //pitfn.call(thisArg, element)
    });
    return output;
}

var numbers = [1,2,3,4,5];
numbers.map(function(element){
    return element + element;
})

//-> [2,4,6,8,10]
```
### Mdn's version
// For reference, here is MDN's version (without the... slightly remformatted):

```javascript
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {
    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    A = new Array(len);
    k = 0;
    while (k < len) {

      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}
```

And we're good! At least e... good enough for me. This (writing the map function) was actually an interview question fopr me a little while ago. I mentioned I was interested in functional programming, so maybe that was why he gave me this test.

