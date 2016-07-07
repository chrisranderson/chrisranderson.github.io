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

Given $X$, we want to know $Z$. $Q$ is some distribution that is simpler than $P$, but hopefully close to it. Variational inference picks a good $Q$. $Q$ is the product of a bunch of other distributions: one for each unknown parameter. So I guess that means it assumes each parameter is independent of the others.


