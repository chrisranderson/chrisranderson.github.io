---
layout: post
title: "Indian Buffet Process in webppl"
---

[webppl](http://webppl.org/)("web people") is a probabilistic programming language written in JavaScript - I'll be attending a [PPL summer school](http://ppaml.galois.com/wiki/wiki/SummerSchools/2016/Announcement) where webppl will be taught, so I'm going to implement an [Indian Buffet Process](https://cocosci.berkeley.edu/tom/papers/indianbuffet.pdf) to familiarize myself with it.

## Indian Buffet Process

I think it gets its name from the [Chinese Restaurant Process](http://chrisranderson.github.io/chinese-restaurant-process-introduction/). You can imagine a buffet with an infinite number of dishes to choose from. Customers choose dishes according to their popularity, and eventually stop because their plates get too full. Let's define our model all math-like:

- $i$: customer counter
- $k$: dish counter

$$\text{# of dishes per customer} \sim \text{Poisson}(\alpha)$$

This is what $\text{Poisson}(5)$ looks like:

![Poisson 5](/images/poisson-5.png)

$$p(\text{customer } i \text{ tries dish } k) = \frac{\text{times dish } k \text{ has been tried}}{i}$$

After $k$ dishes,

$$\text{number of new dishes to try} \sim \text{Poisson}(\frac{\alpha}{i})$$

In summary: everyone tries a similar number of dishes. The more popular a dish is, the more likely someone is to try it. The more customers that have already gone through the buffet, the less likely someone is to try totally new dishes.

Let's take a look of an implementation in webppl:

```javascript

```
