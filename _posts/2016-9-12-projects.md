---
layout: post
title: "Projects"
---
## Neural network parameter variance visualization
[Code](https://github.com/chrisranderson/finch/blob/master/nn_viz.py)

<iframe width="560" height="315" src="https://www.youtube.com/embed/gjXmacaxlYI" frameborder="0" allowfullscreen></iframe>

This visualization shows the variance of the parameters in your network over the last few time steps. Healthy networks seem to adjust parameters across the board fairly equally. Unhealthy ones can be black for large sections, or shift in unnatural-looking patterns.

## Mondrian style transfer 
[GitHub repository](https://github.com/chrisranderson/2016-ppaml-summer-school/tree/master/projects/anglican/mondrian-style-transfer)

![](/images/projects/mondrian-continuous.png) 
![](/images/projects/star-mondrian.png) 

I built this at the 2016 PPAML Summer School on probabilistic programming. I wrote it using [Anglican](http://www.robots.ox.ac.uk/~fwood/anglican). The task is: given a target image, generate a [Mondrian-style](https://www.google.com/search?q=mondrian+paintings&safe=active&espv=2&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjGluS1hY3PAhUJ7mMKHTVBAlkQ_AUICCgB&biw=790&bih=766) image that looks like the target image.

<hr>  
## WebPPL runtime errors
[GitHub repository](https://github.com/probmods/webppl)

![](/images/projects/webppl-error.png)

I fixed runtime errors in WebPPL - before my work, runtime errors were uninterpretable by users.

<hr/>
## Gradient visualization 
[GitHub repository](https://github.com/chrisranderson/gradient-visualization/tree/master)<br>
[live demo](/demos/gradient-visualization/main.html)

![](/images/projects/gradient-viz.png) 

An interactive, web-based visualization of gradients. Uses [plotly](https://plot.ly/) for plots.

<excerpt_separator>

<hr/>
## Beethoven music generation 
[GitHub repository](https://github.com/chrisranderson/music-generation)

![](/images/projects/music-gen.png) 

Here's two samples of the music we generated: <br>
<audio controls>
  <source src="/sound/generated-music.mp3" type="audio/mpeg">
</audio>

Part of a school project, built with two other students. We converted MIDI files to a text format, and used [char-rnn](https://github.com/karpathy/char-rnn) to generate similar text, and converted it back into MIDI for playback.
<hr/>
## Colorblindness simulation 
[GitHub repository](https://github.com/chrisranderson/Empathy)

![](/images/projects/colorblindness-comparison.png) 

A side project - built to help people understand what their websites look like to people with different types of colorblindness.
<hr/>
## City Issue Tracker 
[GitHub repository](https://github.com/byu-osl/cityvoice)

![](/images/projects/tracker1.png) 

A side project, later used as part of a class. Built for the city of Cedar Hills, UT to manage issues GitHubrted to the city.
