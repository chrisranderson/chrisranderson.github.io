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
