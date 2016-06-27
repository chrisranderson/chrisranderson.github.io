---
layout: post
title: "Linear Regression in 7 Probabilistic Programming Languages"
---

Hopefully, this will help people translate between the different languages. For each one, I'll use the same setup:

x values: [6.2041669 , 2.05551396, 6.79070013, 7.59920837, 0.5772892, 5.47008728, 4.64499245, 1.07686703, 9.05913621, 5.8801956]

y values: [18.15427496, 9.75519636, 19.25448523, 20.67397867, 6.75323743, 15.88042634, 13.64629158, 7.94655257, 23.12743254, 17.04033715]

$y = mx + b + \epsilon$ <br />
$m = 2$ <br />
$b = 5$ <br />
$\epsilon = \text{uniform_random}(-1, 1)$ <br />

Priors on $m$ and $b$ will be uniform from -10 to 10. I'll generate 10,000 samples for each one. I'm not really sure why things aren't working well; I'd love to hear your input!

## [Anglican](http://www.robots.ox.ac.uk/~fwood/anglican/index.html)

```clojure
(ns gaussian-estimation
  (:require [anglican importance pgibbs]
            [anglican.stat :as stat]
            [gorilla-plot.core :as plot])
  (:use [anglican core emit runtime]))

(def x-values (list 6.2041669 2.05551396 6.79070013 7.59920837 0.5772892 5.47008728 4.64499245 1.07686703 9.05913621 5.8801956))
(def y-values (list 18.15427496 9.75519636 19.25448523 20.67397867 6.75323743 15.88042634 13.64629158 7.94655257 23.12743254 17.04033715))

(defquery linear-regression [xs ys]
  (let [m (sample (uniform-continuous -10 10))
        b (sample (uniform-continuous -10 10))]
    
     (map (fn [x y] (observe (normal (+ (* m x) b) 5) y))
          xs
          ys)  

    (predict :m m)
    (predict :b b)))

(def samples (repeatedly 10000 
                         #(sample ((conditional linear-regression :lmh) 
                                   x-values 
                                   y-values))))

(plot/histogram (map :m samples))
(plot/histogram (map :b samples))
```

### m
![anglican histogram for m](/images/anglican-m.png) 

### b
![anglican histogram for b](/images/anglican-b.png) 

## [Church](http://projects.csail.mit.edu/church/wiki/Church)

```scheme
(define x-values (list 6.2041669 2.05551396 6.79070013 7.59920837 0.5772892 5.47008728 4.64499245 1.07686703 9.05913621 5.8801956))
(define y-values (list 18.15427496 9.75519636 19.25448523 20.67397867 6.75323743 15.88042634 13.64629158 7.94655257 23.12743254 17.04033715))

(define samples
  (mh-query 10000 1
            (define m (uniform -10 10))
            (define b (uniform -10 10))
            
            (list m b)
            
            (map (lambda (x y)
                   (eq? (gaussian (+ (* m x) b) 5) y))
                 x-values
                 y-values)))

(hist (map first samples))
(hist (map second samples))
```

### m
![church histogram for m](/images/church-m.png) 

### b
![church histogram for b](/images/church-b.png) 

## [Figaro](https://www.cra.com/work/case-studies/figaro)

## [PyMC](https://github.com/pymc-devs/pymc3)

## [Stan](http://mc-stan.org/)

## [Venture](http://probcomp.csail.mit.edu/venture/)

## [WebPPL](http://webppl.org/)