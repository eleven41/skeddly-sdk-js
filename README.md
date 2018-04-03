# Skeddly SDK for Javascript

[![NPM](https://nodei.co/npm/skeddly-sdk.svg?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/skeddly-sdk/)

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