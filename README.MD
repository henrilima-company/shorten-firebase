## Install [Firebase](https://www.npmjs.com/package/firebase) (v8.10.0 recommended) and [Shorten Firebase](https://www.npmjs.com/package/shorten-firebase.realtime-database)

<br/>

```bash
$ npm install firebase@8.10.0 shorten-firebase.realtime-database
```

# Features

> - Simple & easy to use 🤘
> - Beginner friendly 😱
> - Lightweight 🛬

# Getting Started

```js
// Base Example

const Shorten = require('shorten-firebase.realtime-database');
const firebase = require('firebase');

var firebaseConfig = {
	// Your Firebase configuration data
};

firebase.initializeApp(firebaseConfig);
const database = new Shorten(firebase);
```

# New changes 

```md
+ the "fetch" method is now "search"
+ the "getAllData" method was added
+ new aliases for methods
+ updated error messages
+ problems fixed
```

<br/>

# Methods

```js
// "set" or "update" methods
// Used to update something in the database, examples:
database.set(ref, { data });
database.set('user', { username: 'Will' });
database.update('user', {
	username: 'Michael',
	balance: 0,
}); // rewriting the data



// "add" method
// Used to increase a value of type NUMBER in the database, example:
database.add(
	ref, property, value
); // Strings are concatenated
database.add(
	'user', 'balance', 700
);



// subtraction with the "add" method
// Using the "add" method to subtract a value of type NUMBER in the database, example:
database.add(
	ref, property, value
); // Only negative numbers
database.add(
	'user', 'balance', -200
);



// "get" method
// Method used to get data from a reference in the database, example:
await database.get(ref);
await database.get('user');
// return a Object:
/*
{
	username: 'Michael',
	balance: 500
}
*/



// "search" method
// Searches for and returns the value of a property in the database, example:
await database.search(ref, property);
await database.search(
	'user', 'balance'
); // return 500



// "getAllData" method
await database.getAllData();
// return a Object:
/*
{
	user: {
		username: 'Michael',
		balance: 500
	}
}
*/



// "delete" or "erase" methods
// Method used to delete data in the database, example:
database.erase(ref);
database.erase('user');
database.delete('user');



// "ping" or "latency" methods
// Returns the latency of the database (return of type NUMBER), example:
await database.ping();
await database.latency();





OBS: Methods that need to fetch something from the database need "await" to resolve the Promise.
```
