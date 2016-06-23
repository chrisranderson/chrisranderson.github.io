---
layout: post
title: "Introduction to Probabilistic Programming"
---

Probabilistic programming languages are used to build statistical models, query the model, and optionally condition on observed data. I'll use an example that models the [Monty Hall problem](https://en.wikipedia.org/wiki/Monty_Hall_problem) to illustrate. In this problem, there are three doors: one with a car behind it, and two with goats. The contestant is asked to pick a door, and then the host reveals one of the remaining two doors. The contestant is given the option to switch doors. 

The question is, what is the optimal strategy? On average, should the contestant switch doors? The answer, perhaps counterintuitively, is *yes*. The contestant has a 2/3 chance of winning if they switch. 

Here is the code in full, written in Church, a probabilistic Lisp variant. You can fiddle with it in this [online Church sandbox](https://probmods.org/play-space.html), and if you'd like to read more about probabilistic programming languages first you can skip ahead to "*What is actually going on here?*".

## The code

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
I'll go through the code and explain what I was doing.

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

This is where the model begins. A door is chosen for the car, a list of doors is created, the contestant picks a door, and the host reveals a different door.

```lisp
   (define switch-doors (flip .5))
     
   (define second-choice
     (if switch-doors
         (first (filter-out (filter-out door-options first-choice) shown-door))
         first-choice))
```

Here, `flip` returns true with probability 0.5: the contestant will switch doors roughly half of the time. Afterwards, the contestant picks a door depending on whether they decided to switch or not.

```lisp 
   (equal? second-choice car-door)
    
   switch-doors))

(hist samples "Chance of winning if you switch")
```

After the model definition comes the query and a declaration of what knowledge we already have. In mathy terms, we want to know: $$\color{black}{p(\text{I picked the right door}\  | \ \text{I switched doors})}$$ The final line displays something like this:

![monty hall chart: 66% chance of winning if you switch](/images/monty-hall.png)

## What is actually going on here?

It probably isn't too difficult to come up with a closed form solution to this problem. In this case, writing a solution in a typical programming language wouldn't be too tough either. 

The reason probabilistic programming languages (PPLs) are so nice is the *generality*. You can write any model, and proceed to ask any question, conditioned on anything. Sometimes models have infinite numbers of choices, and it's either impossible to compute integrals over density functions or difficult to write something that samples from it. PPLs generate samples from arbitrary distributions.

In this case, Church uses the Metropolis-Hastings (MH) algorithm for sampling:

- pick an abitrary starting point in the distribution
- propose a new place to jump to. 
  - If it's better, go there and keep the sample. 
  - If not, go there with some probability depending on how much worse it is. If you end up staying, add where you stayed as one of the samples.

The MH algorithm ends up spending more time drawing samples from places that have a higher likelihood. But what does this look like for the Monty Hall problem?

## Metropolis-Hastings and Monty Hall

First, some definitions.

| symbo        | definition           
| ------------- |:-------------:|
| $x_t$      | current position |
| $x_{t + 1}$     | next position      |
| $a$ | are neat      |

surround text...
*work in progress*






