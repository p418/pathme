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

var myObj = { foo :{ bar : ['a','b','c'] },  pi : { ka: { chu : 'chuuuuuuuu' }} };

var pathObj = pathme(myObj);

```

or just simply

```js
var pathObj = require('pathme')(myObj);

```


* move to a given attribute

```js

pathObj.cd('/pi/ka/chu').cwd == 'chuuuuuuuu'
pathObj.cd('foor/bar/0').cwd == 'a'


//You can even play with tree-climbing:

pathObj.cd('foo/../pi/ka/../../pi/ka/../../pi/ka/chu').cwd == myObj.pi.ka.chu ;


pathObj.cd('/foo/bar/../../../../../../../../').cwd == myObj;

pathObj.cd('/').cwd == myObj;


//or chaining 

pathObj.cd('pi').cd('ka').cd('chu').cwd ==  myObj.pi.ka.chu;


pathObj.cd('pi').cd('ka').cd('chu').cd('/') == myObj;

```




## Run tests

From package root:

```sh
$> npm install
$> npm test

```




## License

MIT © [p418](mailto:hey.p418@gmail.com)


