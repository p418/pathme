PathMe
======

A Nodejs module to manipulate objects like a folder


## Install

```sh
$ npm install --save pathme
```


## Usage

```js
var pathme = require('pathme');

var myObj = { foo :{ bar : 1 }, pi : { ka: { chu : {} }} };

var PathObj = pathme(myObj);

```

or just simply

```js
var PathObj = require('pathme')(myObj);

```



## License

MIT © [p418](mailto:hey.p418@gmail.com)


