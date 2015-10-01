---
layout: post
title: Introduction to WebPPL and probabilistic programming
---

[WebPPL](http://webppl.org/) is "a small but feature-rich probabilistic programming language embedded in JavaScript."  This is my interpretation/distillation of the [book](http://dippl.org/). We'll start with the [introduction](http://dippl.org/chapters/01-introduction.html).

## What are PPLs, and why are they useful?

A **p**robabilistic **p**rogramming **l**anguage is used to enable you to write programs to use data you are unsure about, which makes it a good choice for artificial intelligence and machine learning projects. Probabilistic fields need a probabilistic programming language equipped with probabilistic primitives to provide a proper product. Or something.

## WebPPL

WebPPL (pronounced "web people" (*weh-pee-pull?*)) was inspired by the [Church language](https://en.wikipedia.org/wiki/Church_(programming_language)), and built as a subset (a small one) of JavaScript to let people build cool stuff on the web with it. I believe it compiles to JS, and is run in Node.

The site says "If we view the semantics of the underlying deterministic language as a map from programs to executions of the program, the semantics of a PPL built on it will be a map from programs to distributions over executions." In other words... **if JS converts code to a running app, WebPPL converts code to any number of running apps.** You never really know precisely how your code will run, but you can expect it to conform to some distribution. The book mentions that this makes it difficult to implement efficient PPLs, since the number of  possible paths your app can take gets really big.  How WebPPL does that is a topic for another day (mostly since I have no idea how they do that).

## Diving in

### Installation
Installation was a piece of cake, since I already had [Node.js](https://nodejs.org/en/) installed.

<code>npm install -g webppl</code> 

to install, and then

<code>webppl *filename*</code> 

to interpret your program.

### WebPPL syntax

If you're following along in [the book](http://dippl.org/), I'm now on [chapter 2](http://dippl.org/chapters/02-webppl.html). If you're familiar with JavaScript, WebPPL will feel familiar since it is a subset of JavaScript. The book says it is built on a purely functional subset of JS; **it requires that all functions are referentially transparent** (in other words, don't modify external state within the function. It should do the same thing every time you call it with the same arguments). That means JS built-in functions like <code>Array.map</code>/<code>filter</code>/<code>reduce</code> won't do - you have to use WebPPL's versions of those functions.

Even though WebPPL feels like JS, **it is not JS**. There are substantial differences. Here are some of the differences:

- empty statements: <code>;</code> *(not sure how these are important yet)*
- object properties cannot be functions. So you can't do this:
```javascript
{
	name: 'Chris',
	sayHello: function () {
		console.log("Hello there!")
	}
}
```
- no loops (<code>for, while, do</code>).
- external library functions must be pure, and you can't pass them functions.  So you could use [underscore](http://underscorejs.org/)'s <code>every</code> or <code>pluck</code> , but you couldn't use <code>_.extend</code> (since it mutates something you pass it (making it an impure function)).
- functions can only be called if they are a method of an object. 
- WebPP doesn't like the assignment operator in certain situations. I tried running:

```javascript
var printDistributionAverage = function (flipsSoFar, n, max) {

	if (n > max) return;

	oneFlip = sample(bernoulliERP, [0.5]);
	flipsSoFar.push(oneFlip);

	average = mean(flipsSoFar)
	console.log(average);

	printDistributionAverage(flipsSoFar, n + 1, max)
}

printDistributionAverage([], 0, 1)
```
and got this error: <code>Assignment is allowed only to fields of globalStore</code>. Apparently you can't make assignments unless you're in the global scope. 

### Using WebPPL

WebPPL uses **elementary random primitives** (ERP) - objects that represent distributions.

### Hurdles I discovered while learning

- I didn't realize that all of your code had to be purely functional. I thought you could use normal JS functions like Array.map.
- Assignment is only allowed in the global scope.
- "Continuation passing" - I still have no idea what that is.
