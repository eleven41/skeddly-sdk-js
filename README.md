# Skeddly SDK for JavaScript

[![NPM](https://nodei.co/npm/skeddly-sdk.svg?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/skeddly-sdk/)

[![Build status](https://ci.appveyor.com/api/projects/status/7kyj1hay3x46hb61?svg=true)](https://ci.appveyor.com/project/eleven41/skeddly-sdk-js)

The official Skeddly SDK for JavaScript, available for Node.js backends.

## Installing

### In Node.js

The preferred way to install the Skeddly SDK for Node.js is to use the
[npm](http://npmjs.org) package manager for Node.js. Simply type the following
into a terminal window:

```sh
npm install skeddly-sdk
```

## Usage and Getting Started

### In Node.js

In your JavaScript file, `require` the library:

```javascript
// import the Skeddly SDK
var Skeddly = require('skeddly-sdk');
```

then create your Skeddly client:

```javascript
var client = Skeddly.createClient({
    accessKey: '12345678901234567890123456789012'
});
```