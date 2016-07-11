---
layout: post
title: "Indian Buffet Process in webppl"
---

[webppl](http://webppl.org/) ("web people") is a probabilistic programming language written in JavaScript - I'll be attending a [PPL summer school](http://ppaml.galois.com/wiki/wiki/SummerSchools/2016/Announcement) where webppl will be taught, so I'm going to implement an [Indian Buffet Process](https://cocosci.berkeley.edu/tom/papers/indianbuffet.pdf) to familiarize myself with it.

## Indian Buffet Process

I think its name draws inspiration from the [Chinese Restaurant Process](http://chrisranderson.github.io/chinese-restaurant-process-introduction/). You can imagine a buffet with an infinite number of dishes to choose from. The first customer chooses dishes until their plate is too full, and customers after that choose dishes according to their popularity.

- $i$: customer counter
- $k$: dish counter

$$\text{# of dishes for the first customer} \sim \text{Poisson}(\alpha)$$

As a maybe-refresher, this is what $\text{Poisson}(5)$ looks like, for instance:

![Poisson 5](/images/poisson-5.png)

$$p(\text{customer } i \text{ tries dish } k) = \frac{\text{times dish } k \text{ has been tried}}{i}$$

After $k$ dishes,

$$\text{number of new dishes to try} \sim \text{Poisson}(\frac{\alpha}{i})$$

Let's take a look of an implementation in webppl:

```javascript
var normalizeLength = function (lists, length) {
    return map(function (list) {
        if (list.length == length) {
            return list
        } else {
            var needed = length - list.length
            return list.concat(mapN(function () {return 0}, needed))
        }
    }, lists)    
}

var transpose = function (lists) {
    return mapN(function (n) {
        return map(function (list) {
            return list[n]
        }, lists)
    }, lists[0].length)
}

var boolToBinary = function (x) {
    if (x == false) {
        return 0
    } else {
        return 1
    }
}

var newCustomerDishes = function (alpha, dishChoices) {
    var i = dishChoices.length + 1
    var dishesToTry = poisson({mu: alpha})
    var newDishesCount = poisson({mu: (alpha / i)})
    
    var dishCounts = map(function (dishList) {
        return sum(dishList)
    }, transpose(dishChoices))
    var dishProbabilities = map(function (dishCount) {return dishCount/i},
                                dishCounts)
   
    var dishesTried = map(boolToBinary, map(bernoulli, dishProbabilities))
    var newDishes = repeat(newDishesCount, function () {return 1})
    var allDishesTried = dishesTried.concat(newDishes)
    return allDishesTried
}

var newCustomer = function (alpha, dishChoices) { 
    var newCustomerChoices = newCustomerDishes(alpha, dishChoices)
    var newDishCount = newCustomerChoices.length
    var newDishChoices = snoc(dishChoices, newCustomerChoices)
    return normalizeLength(newDishChoices, newDishCount)
}

var indianBuffetProcessInner = function (alpha, numberOfCustomers, dishChoices) {
    if (numberOfCustomers == 0) {
        return dishChoices
    } else {
        return indianBuffetProcessInner(alpha, 
                                   numberOfCustomers - 1, 
                                   newCustomer(alpha, dishChoices))
    }
}

var indianBuffetProcess = function (alpha, numberOfCustomers) {
    var firstDishCount = poisson({mu: alpha})
    return indianBuffetProcessInner(alpha,
                               numberOfCustomers - 1,
                               [mapN(function (n) {return 1}, firstDishCount)])
}

var alpha = 5 
var numberOfCustomers = 10
return indianBuffetProcess(alpha, numberOfCustomers)

```

I get the feeling this is a bit verbose; suggestions would be appreciated.

That code produces something like this:

![indian buffet process results](/images/ibp-results.png)

Each row is a customer, each column is a particular dish. A `1` means they tried the dish; a `0` means they didn't try it.
