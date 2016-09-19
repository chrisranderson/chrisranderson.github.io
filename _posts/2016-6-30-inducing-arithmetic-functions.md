---
layout: post
title: "Inducing Arithmetic Functions in Church"
---

I'm going to go through the [Inducing Arithmetic Functions](http://forestdb.org/models/arithmetic.html) example from [Forest](http://forestdb.org/). Hopefully this can help you gain a little bit of familiarity with probabilistic programming. Here's the code:

```scheme
(define (random-arithmetic-fn)
  (if (flip 0.3)
      (random-combination (random-arithmetic-fn) 
                          (random-arithmetic-fn))
      (if (flip) 
          (lambda (x) x) 
          (random-constant-fn))))

(define (random-combination f g)
  (define op (uniform-draw (list + -)))
  (lambda (x) (op (f x) (g x))))

(define (random-constant-fn)
  (define i (sample-integer 10))
  (lambda (x) i))

(define (sample)
  (rejection-query
   (define my-proc (random-arithmetic-fn))
   (my-proc 2)
   (and (= (my-proc 0) 2)
        (= (my-proc 1) 3))))

(sample)
```

<excerpt_separator>

The goal is to determine what `my-proc` is, but since Church doesn't have function pretty-printing, showing that the results of `(my-proc 2)` are consistent with what you would expect is good enough.

### `(define (sample) ...)`

Let's start with the meat: lines 17-22. This function will draw a sample from `(my-proc 2)`. In Church, the body of sampling functions (like `rejection-query`) begin with the model, followed by the query and some condition. The model is the definition of `my-proc`. The query is `(my-proc 2)`, and the condition is the `and` expression on line 21. Church will draw samples until the conditions are true.

### `random-arithmetic-fn`

With probability .3, this function will create bigger combinations of adding and subtracting further arithmetic expressions. In these recursive calls, there is a 70% chance of returning either the parameter passed in (`2` from `(my-proc 2)`) or some random integer. A couple sample calls might look like this:

```scheme
(lambda (x) x)
(lambda (x) (- (lambda (x) 2) (lambda (x) 4))) ; just (- 2 4)
(lambda (x) 0)
(lambda (x) (+ (lambda (x) x) (lambda (x) 7))) ; just (+ x 7)
```

`(my-proc)` could never be any of those values since the conditions

```scheme
(and (= (my-proc 0) 2)
        (= (my-proc 1) 3)))
```

don't hold. It would keep drawing samples until it found something like: 

```scheme
(lambda (x) (+ (lambda (x) x) (lambda (x) 2)))
```

At that point, calling `(my-proc 2)` would return `4`. I ran the program a few times, and that's what it always came up with.

I hope that's helpful! You can tinker with and run the code at [forestdb](http://forestdb.org/models/arithmetic.html).