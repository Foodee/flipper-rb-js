# flipper-rb-js

[![Build Status](https://travis-ci.org/Foodee/flipper-rb-js.svg)](https://travis-ci.org/Foodee/flipper-rb-js) [![Code Climate](https://codeclimate.com/github/Foodee/flipper-rb-js/badges/gpa.svg)](https://codeclimate.com/github/Foodee/flipper-rb-js) [![Issue Count](https://codeclimate.com/github/Foodee/flipper-rb-js/badges/issue_count.svg)](https://codeclimate.com/github/Foodee/flipper-rb-js) [![Test Coverage](https://codeclimate.com/github/Foodee/flipper-rb-js/badges/coverage.svg)](https://codeclimate.com/github/Foodee/flipper-rb-js/coverage)


Simple lib for letting your JavaScript talk to Flipper.rb

## Motivation

If you use the flipper library [https://github.com/jnunemaker/flipper](https://github.com/jnunemaker/flipper) for your rails app,
but you also run an SPA, you may also want those feature flags to be visible in the JavaScript side of things. This library
aims to make that easy for you.

## Usage - Rails side

You'll need to build an endpoint that exposes your feature flags for a particular user, the implementation currently
assumes a simple json object:

```JavaScript
{
  feature: true,
  false: false
}
```

## Usage - JavaScript

Use the static initializer, which is promise aware.

```JavaScript

import Flipper from 'flipper-rb';

let eventuallyFlipper = Flipper.load('/api/users/features');

eventuallyFlipper
  .then(flipper => {
  
    if(flipper.isEnabled('featureName')){
      // do some things 
    }
    else {
      // do some other things 
    }
  });
```

The library assumes native promises, but if you want to be backwards compatible you can pass a promise class into the
load function like so

```JavaScript

let eventuallyFlipper = Flipper.load('/api/users/features', {PromiseClass: Ember.RSVP.Promise});

```

You might need some custom authentication (since you're likely flipping per user) so you can pass along some headers as well.

```JavaScript
let eventuallyFlipper = Flipper.load('/api/users/features', {
                                                              PromiseClass: Ember.RSVP.Promise,
                                                              headers: {
                                                                Authentication: token="myToken"
                                                              }
                                                            });
```


Happy Flipping !


## Shout outs

Thanks to [https://github.com/jnunemaker](https://github.com/jnunemaker) for Flipper!
  