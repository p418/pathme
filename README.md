PathMe [![npm version][npm-image]][npm-url] [![Dependency Status][david-image]][david-url] [![devDependency Status][david-dev-image]][david-dev-url]
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


//or chaining calls

pathObj.cd('pi').cd('ka').cd('chu').cwd ==  myObj.pi.ka.chu;
pathObj.cd('pi').cd('ka').cd('chu').cd('/') == myObj;


//Shell user would be familiar with pushd/popd commands

pathObj.pushd('/foo/bar').cwd == myObj.foo.bar; // move to foo/bar and save path to stack; 
pathObj.pushd('/pi/ka').cwd == myObj.pi.ka; // move to /pi/ka and save path to stack; 
pathObj.cd('/').push().cwd == myObj; // save current path to stack


pathObj.cd('/pi/ka/chu').cwd ==  myObj.pi.ka.chu;


pathObj.popd().cwd == myObj;
pathObj.popd().cwd == myObj.pi.ka;
pathObj.popd().cwd == myObj.foo.bar;


```


* test if a given attribute exists

```js

//Testing from "root folder"

pathObj.exists('/pi/ka/chu') == true;
pathObj.exists('/pi/ka/chu/uuuuu') == false;
pathObj.exists('/pe/pe/ro/ni') == false;


//Or from a nested object
pathObj.cd('/foo').cd('bar').exists('p418') == false


```


## Run tests

From package root:

```sh
$> npm install
$> npm test

```




## License

MIT © [p418](mailto:hey.p418@gmail.com)



[npm-image]: https://badge.fury.io/js/pathme.svg
[npm-url]: http://badge.fury.io/js/pathme

[david-image]:https://david-dm.org/p418/pathme.svg
[david-url]:https://david-dm.org/p418/pathme

[david-dev-image]:https://david-dm.org/p418/pathme/dev-status.svg
[david-dev-url]:https://david-dm.org/p418/pathme#info=devDependencies
