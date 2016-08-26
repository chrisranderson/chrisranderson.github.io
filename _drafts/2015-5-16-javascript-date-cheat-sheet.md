---
layout: post
title: "JavaScript date cheat sheet"
---

A list of every method you would use to get info from a date. Check out [moment.js](http://momentjs.com/) for better formatting.

<table>
	<tr>
		<th>Method</th>
		<th>Result</th>
	</tr>
	<tr>
		<td><code>var date = new Date();<br/> console.log(date);</td>
		<td>Sat May 16 2015 08:33:13 GMT-0600 (MDT)</td>
	</tr>
	<tr>
		<td><code>date.getDate()</code></td>
		<td>16</td>
	</tr>
	<tr>
		<td><code>date.getDay()</code></td>
		<td>6</td>
	</tr>
	<tr>
		<td><code>date.getFullYear()</code></td>
		<td>2015</td>
	</tr>
	<tr>
		<td><code>date.getHours()</code></td>
		<td>8</td>
	</tr>
	<tr>
		<td><code>date.getMilliseconds()</code></td>
		<td>111</td>
	</tr>
	<tr>
		<td><code>date.getMinutes()</code></td>
		<td>33</td>
	</tr>
	<tr>
		<td><code>date.getMonth()</code></td>
		<td>4</td>
	</tr>
	<tr>
		<td><code>date.getSeconds()</code></td>
		<td>13</td>
	</tr>
	<tr>
		<td><code>date.getTime()</code></td>
		<td>1431786793111</td>
	</tr>
	<tr>
		<td><code>date.getTimezoneOffset()</code></td>
		<td>360</td>
	</tr>
	<tr>
		<td><code>date.getUTCDate()</code></td>
		<td>16</td>
	</tr>
	<tr>
		<td><code>date.getUTCDay()</code></td>
		<td>6</td>
	</tr>
	<tr>
		<td><code>date.getUTCFullYear()</code></td>
		<td>2015</td>
	</tr>
	<tr>
		<td><code>date.getUTCHours()</code></td>
		<td>14</td>
	</tr>
	<tr>
		<td><code>date.getUTCMilliseconds()</code></td>
		<td>111</td>
	</tr>
	<tr>
		<td><code>date.getUTCMinutes()</code></td>
		<td>33</td>
	</tr>
	<tr>
		<td><code>date.getUTCMonth()</code></td>
		<td>4</td>
	</tr>
	<tr>
		<td><code>date.getUTCSeconds()</code></td>
		<td>13</td>
	</tr>
	<tr>
		<td><code>date.getYear()</code></td>
		<td>115</td>
	</tr>
	<tr>
		<td><code>date.toDateString()</code></td>
		<td>Sat May 16 2015</td>
	</tr>
	<tr>
		<td><code>date.toGMTString()</code></td>
		<td>Sat, 16 May 2015 14:33:13 GMT</td>
	</tr>
	<tr>
		<td><code>date.toISOString()</code></td>
		<td>2015-05-16T14:33:13.111Z</td>
	</tr>
	<tr>
		<td><code>date.toJSON()</code></td>
		<td>2015-05-16T14:33:13.111Z</td>
	</tr>
	<tr>
		<td><code>date.toLocaleDateString()</code></td>
		<td>Saturday, May 16, 2015</td>
	</tr>
	<tr>
		<td><code>date.toLocaleTimeString()</code></td>
		<td>08:33:13</td>
	</tr>
	<tr>
		<td><code>date.toTimeString()</code></td>
		<td>08:33:13 GMT-0600 (MDT)</td>
	</tr>
	<tr>
		<td><code>date.toUTCString()</code></td>
		<td>Sat, 16 May 2015 14:33:13 GMT</td>
	</tr>
</table>

And for fun, how I generated it. I started up a Node.js repl (just `node` in the terminal):

```javascript
var a = new Date();
```

I typed `a.`, and then pressed tab to get an autocomplete list of all of the available methods, which I pasted into Sublime. 

```javascript
var now = new Date();
console.log('now: ', now);
['getDate',
'getDay',
'getFullYear',
'getHours',
'getMilliseconds',
'getMinutes',
'getMonth',
'getSeconds',
'getTime',
'getTimezoneOffset',
'getUTCDate',
'getUTCDay',
'getUTCFullYear',
'getUTCHours',
'getUTCMilliseconds',
'getUTCMinutes',
'getUTCMonth',
'getUTCSeconds',
'getYear',
'toDateString',
'toGMTString',
'toISOString',
'toJSON',
'toLocaleDateString',
'toLocaleTimeString',
'toTimeString',
'toUTCString'].forEach(function (method){
	console.log('\n');
	console.log('date.'+method)
	console.log(now[method]())
});
```
