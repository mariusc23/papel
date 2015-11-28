Papel
=====

[![NPM Version](http://img.shields.io/npm/v/papel.svg)](https://www.npmjs.org/package/papel)
[![Circle CI](https://circleci.com/gh/mariusc23/papel.svg?style=shield)](https://circleci.com/gh/mariusc23/papel)

> One stop logging utility.


## Installation

    npm install --save papel


## Usage

```js
import papel from 'papel';

papel.log('msg');
// info msg
papel.error('just', 'like', 'console');
// error just like console
papel.warn('hi')
// warn hi
```


### Methods

Priority | Method
-------- | ---------------
0        | `.error`
1        | `.warn`
2        | `.debug`, `.log`
3        | `.info`
4        | `.verbose`
5        | `.silly`


### Filtering by Priority

You can filter logs by setting the `DEBUG_PRIORITY` environment variable. Only logs of same and lower priority will be logged.

    DEBUG_PRIORITY=3 node index.js


### Adding Scribes

By default, Papel logs to `console`, but you can add scribes to save to disk or post to a logging service.

If you are performing an asynchronous operation, it is recommended to return a promise so Papel knows when the scribe is done.

It is the scribe's responsibility to respect the `DEBUG_PRIORITY` level, therefore you can have different scribes log different priorities.

The scribe is provided with two arguments:

  - `data` contains information about the specific invocation
  - `papelInstance` contains information about the papel instance

```js
papel.addScribe(function(data, papelInstance) {
  return new Promise(function (resolve, reject) {
    var logs = data.logs;
    var priority = data.priority;
    var datetime = data.datetime;
    var type = data.type;

    setTimeout(function() {
      resolve();
    }, 0);
  });
});
```


### Removing Scribes

When adding a scribe, a callback to remove it is returned.

```js
var removeScribe = papel.addScribe(function() {});
removeScribe();
```


### Named Instances

You can create new Papel instances like [debug](https://www.npmjs.com/package/debug).

```js
import { Papel } from 'papel';

var dbPapel = new Papel({ name: 'db' });
dbPapel.error('boom');
// db:error boom
```


#### Options

The new instance defaults to the same scribes and methods, but you can customize these through the options.


```js
new Papel(options);
```

##### options.name

Instance name. Shows in the console and is provided to scribes.


##### options.scribes and options.methods

This option defaults to the same scribes as the default instance. Note that if you do not provide this option, adding/removing scribes will affect both instances.


##### options.priority

Determines which priority should be logged. Defaults to `DEBUG_PRIORITY`.


#### Filtering Instances

You can filter instances by setting the `DEBUG` environment variable. Glob patterns supported by [minimatch](https://www.npmjs.com/package/minimatch) are allowed.

    DEBUG=db node index.js


## License

Copyright (c) 2015 Marius Craciunoiu. Licensed under the MIT license.
