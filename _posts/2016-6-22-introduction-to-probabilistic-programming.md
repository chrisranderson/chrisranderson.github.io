---
layout: post
title: "Introduction to Probabilistic Programming"
---

Probabilistic programming languages are used to build statistical models. I'll use an example that models the [Monty Hall problem](https://en.wikipedia.org/wiki/Monty_Hall_problem) to illustrate. In this problem, there are three doors: one with a car behind it, and two with goats. The contestant is asked to pick a door. After the contestant picks a door, the host reveals one of the remaining two doors. The contestant is given the option to switch doors. 

The question is, what is the optimal strategy? On average, should the contestant switch doors? The answer, perhaps counterintuitively, is *yes*. The contestant has a 2/3 chance of winning if they switch. 

Here is the code. The meat begins with `(define samples...)`:

```lisp
(define door-options (list 0 1 2))

(define (random-list-index l)
  (sample-discrete (make-list (length l) (div 1 (length l)))))

(define (filter-out a-list value)
  (filter (lambda (x) (if (equal? x value) #f #t)) a-list))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define (pick-door)
  (random-list-index door-options))

(define (gen-doors car-door)
  (let [(doors (list 'goat 'goat 'goat))]
    (update-list doors car-door 'car)))

(define (show-door first-choice car-door)
  (if (= first-choice car-door)
      (random-list-index (filter-out door-options car-door))
      (first (filter-out (filter-out door-options first-choice) car-door))))

; the meat
(define samples
  (mh-query 
   10000 1
   
   (define car-door (pick-door))
   (define doors (gen-doors car-door))
   
   (define first-choice (pick-door))
   (define shown-door (show-door first-choice car-door))
     
   (define switch-doors (flip .5))
     
   (define second-choice
     (if switch-doors
         (first (filter-out (filter-out door-options first-choice) shown-door))
         first-choice))
   
   (equal? second-choice car-door)
    
   switch-doors))

(hist samples "Chance of winning if you switch")
```

The language this is written in is called Church (check out [Goodman and Tenenbaum's Probabilistic Models of Cognition](https://probmods.org/) for a good tutorial), a probabilistic Lisp variant. I'll go through the code and explain what I was doing.

```lisp
(define door-options (list 0 1 2))

(define (random-list-index l)
  (sample-discrete (make-list (length l) (div 1 (length l)))))

(define (filter-out a-list value)
  (filter (lambda (x) (if (equal? x value) #f #t)) a-list))
```

A list representing each door, and some helper functions: `random-list-index` takes a list, and gives you a random number from 0 to `( - (length l) 1)`. `filter-out` takes a list and removes `value` from it.

```lisp
(define (pick-door)
  (random-list-index door-options))

(define (gen-doors car-door)
  (let [(doors (list 'goat 'goat 'goat))]
    (update-list doors car-door 'car)))

(define (show-door first-choice car-door)
  (if (= first-choice car-door)
      (random-list-index (filter-out door-options car-door))
      (first (filter-out (filter-out door-options first-choice) car-door))))
```

`pick-door` returns a number in the interval [0, 2]. `gen-doors` creates a list of goats and replaces one with a car. `show-door` simulates the game host picking which door to reveal to the contestant.

```lisp
(define samples
  (mh-query 
   10000 1
```

Now comes the good stuff. `mh` stands for [Metropolis-Hastings](https://en.wikipedia.org/wiki/Metropolis%E2%80%93Hastings_algorithm). `10000` is the number of *samples*, and `1` is the number of samples you throw away between each sample, called the *lag*. I'll explain what all that means later.

```lisp
   
   (define car-door (pick-door))
   (define doors (gen-doors car-door))
   
   (define first-choice (pick-door))
   (define shown-door (show-door first-choice car-door))
```

This is where the model begins. A door is chosen for the car, the contestant picks a door, the host reveals a different door.

```lisp
   (define switch-doors (flip .5))
     
   (define second-choice
     (if switch-doors
         (first (filter-out (filter-out door-options first-choice) shown-door))
         first-choice))
```

Here, `flip` returns true with probability 0.5. The contestant will switch doors roughly half the time. The next chunk of code picks a door depending on whether the contestant decided to flip or not.

```lisp 
   (equal? second-choice car-door)
    
   switch-doors))

(hist samples "Chance of winning if you switch")
```

After the model definition comes the query and a declaration of what knowledge we already have. In mathy terms, we want to know: $$\color{black}{p(\text{I picked the right door}\  | \ \text{I switched doors})}$$ The final line displays something like this:

![monty hall chart: 66% chance of winning if you switch](/images/monty-hall.png)

## What is actually going on here?

It probably isn't too difficult to come up with a closed form solution to this problem. In this case, writing a solution in a typical programming language wouldn't be too tough either. 

The reason probabilistic programming languages (PPLs) are so nice is the *generality*. You can write any model, and proceed to ask any question, conditioned on anything.

*work in progress*






