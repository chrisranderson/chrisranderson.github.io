---
layout: post
title: "Intro to Variational Inference"
---

In our probabilistic program, we've defined a model, some query, and perhaps we're conditioning on some data. Now we have choose an inference algorithm to figure out the stuff we don't know (e.g. $m$ and $b$ in $y=mx + b$). Variational inference is one option that helps us find optimal values for our unknown parameters. We'll be learning about mean-field variational inference.

First, some definitions:

- $Z$: unknown variables
- $X$: data
- $Q()$: variational distribution
- $q()$: distribution for an individual parameter, $Z_i$
- $P()$: true distribution over $Z$
- $d$: difference between $Q$ and $P$. In our case, [KL-divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence)
- $i$: counter for the different pieces of $Q$

Given $X$, we want to know $Z$. $Q$ is some distribution that is simpler than $P$, but hopefully close to it. Variational inference picks a good $Q$. $Q$ is the product of a bunch of other distributions $q_i$: one for each unknown parameter. So I guess that means it assumes each parameter is independent of the others.

Wikipedia gives us a big nasty equation for figuring out each $q$: 

$$q_j^{*}(Z_j\mid X) = \frac{\color{red}{e^{\operatorname{E}_{i \neq j} [\ln p(Z, X)]}}}{\int \color{red}{e^{\operatorname{E}_{i \neq j} [\ln p(Z, X)]}}\, dZ_j}$$

The left part means something like "the probability of this part of $Z$ given the data". The * on $q$ means it's our goal. I highlighted the parts in red to help you see the pattern: the bottom part is just making sure that everything sums to one. Now for the meat:

$$\color{red}{e^{\operatorname{E}_{i \neq j} [\ln p(Z, X)]}}$$

I don't know why $e$ is included, but I have a vague idea for the rest. For all of the other unknown variables, take a product of the expected value of that particular unknown variable given the data. I don't see 
