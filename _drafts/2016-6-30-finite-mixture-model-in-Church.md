---
layout: post
title: "Finite Mixture Model in Church"
---

As I'm trying to figure out probabilistic programming, I'm trying to digest models from [forestdb](http://forestdb.org/models/finite-mixture.html). This is one is called a finite mixture model. I didn't know anything about them at first, so all of this is my best guess.

```scheme
(define (zip xs1 xs2) 
  (if (or (is_null xs1) (is_null xs2)) '() 
      (pair 
       (pair (first xs1) (pair (first xs2) '()))
       (zip (rest xs1) (rest xs2)))))

(define (soft-eq x y) 
  (factor (if (equal? x y) 0.0 (log 0.1))))

(define samples
  (mh-query 10 100
   (define objects '(bob jane mary steve))
   (define object-indices (iota (length objects)))
   (define observed-features '(#t #t #f #f))

   (define categories '(a b c))
   (define cat-indices (iota (length categories)))
   (define pseudo-counts (repeat (length categories) (lambda () 1.0)))

   (define cats-dist (dirichlet '(0.3 0.3 0.3)))
   (define cat-weights 
     (map (lambda (cat) (beta 1.0 1.0)) 
          categories))

   (define types 
     (map (lambda (obj) (multinomial cat-indices cats-dist)) 
          objects))

   (define observations 
     (map (lambda (obj-index) 
            (flip (list-ref cat-weights (list-ref types obj-index)))) 
          object-indices))

   (define res 
     (map (lambda (cat-index) (list-ref categories cat-index)) 
          types))

   (define constr 
     (map (lambda (obs12) 
            (soft-eq (first obs12) (second obs12))) 
          (zip observations observed-features)))

   (define sample (pair res constr)) 

   sample 

   #t))

samples
```

Finite mixture models are used to classify data into categories. I'm thinking *finite* refers to having a set number of categories, rather than trying to learn the number of categories. Here we are trying to label the `objects` (line 12) with one of three categories: a, b, or c. Let's start diving into the code.

First, `zip` and `soft-eq`. `zip` takes two lists and turns them into a list of pairs. I'll explain `soft-eq` later.

```scheme
(define samples
  (mh-query 10 100
```

Here we will use the Metropolis-Hastings algorithm to take 10 samples, dropping 100 samples between each sample that we keep.

```scheme
   (define objects '(bob jane mary steve))
   (define object-indices (iota (length objects)))
   (define observed-features '(#t #t #f #f))
```

We want to categorize these four people, we make a list of indices, and here is our observed data. Maybe they prefer crunchy over creamy or something.

```scheme
   (define categories '(a b c))
   (define cat-indices (iota (length categories)))
   (define pseudo-counts (repeat (length categories) (lambda () 1.0)))
```

Create our list of possible categories, make a list of indices, and... I'm not sure what `pseudo-counts` is. It isn't used anywhere. 

```scheme
   (define cats-dist (dirichlet '(0.3 0.3 0.3)))
```

This looks like a prior distribution over the categories a, b, and c. We don't know what they are, so we guess. Sampling from the dirichlet gives us the parameter for a multinomial distribution; we pull a category from that distribution.

```scheme
   (define cat-weights 
     (map (lambda (cat) (beta 1.0 1.0)) 
          categories))
```

For each category, draw a number between 0 and 1, uniformly random.

```scheme
   (define types 
     (map (lambda (obj) (multinomial cat-indices cats-dist)) 
          objects))
```

For each object/person, select a category (really a category index).

```scheme
   (define observations 
     (map (lambda (obj-index) 
            (flip (list-ref cat-weights (list-ref types obj-index)))) 
          object-indices))
```

For each of the object indices (`'(0 1 2)`), make an observation. `(list-ref types obj-index)` takes the current object and gets its chosen category index. `(list-ref cat-weights ...)` takes that cateory index, and gets its weight. The observation is `#t` with probability of the cat-weight for that category.

```scheme
   (define res 
     (map (lambda (cat-index) (list-ref categories cat-index)) 
          types))
```

For the category indices we chose for each person, turn it from an index to an actual category.

```scheme  
   (define constr 
     (map (lambda (obs12) 
            (soft-eq (first obs12) (second obs12))) 
          (zip observations observed-features)))
   (define sample (pair res constr)) 
```

It looks like `constr` (maybe for *constraint*?) is checking to see if our observations match the provided data. `sample` is our list of categories paired with whether those categories were correct or not. 


```scheme
   sample 
   #t))
```

All of the previous code up to `mh-query 10 100` was *the model* (it isn't necessary to include deterministic code like the definition of `objects` in there, more a stylistic choice I guess). `sample` is like the return value. Samples will be ten of whatever `sample` is. `#t` is the condition for taking this sample. This is a little strange to me. I would guess the work that `soft-eq` does would be found here.

`soft-eq` adjusts the score for the current sample: if our guessed category matches the observed category, we leave it alone, otherwise you add -1 to the score. Or something like that.  

`samples` at the end of the code shows your ten samples. It really isn't necessary to include `constr` in the samples, since `soft-eq` doesn't return anything. What you might want to do instead is take `res` and plot histograms to see the most likely categories of bob, jane, mary, and steve.

I think the best place to start is line 37 - that's really what we're looking for. This code will run the Metropolis-Hastings algorithm to get 10 samples with 100 dropped samples in between each sample (to help with [autocorrelation](https://en.wikipedia.org/wiki/Autocorrelation)).
