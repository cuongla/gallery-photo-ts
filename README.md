# Electron Chat App

A simple chat application using React and Electron to improve user experience.

## Installation

`$ git clone https://github.com/tinla94/Electron-Chat-App` or click `Clone or download`.

### Code Folder

1. Install node packages: `npm install`
2. Start up browser to see UI: `npm start`.
3. Electron will load its own window

## Technology Use

### Front-End

1. `React` - an open-source JavaScript library which is used for building user interfaces specifically for single page applications

2. `React Hooks` - functions that let us hook into the React state and lifecycle features from function components

4. `CSS` ( Cascading Style Sheets ) - used to style the web page.

5 `Bulma` - a free, open source CSS framework based on Flexbox and used by more than 200,000 developers.

### Other Tools

1. `Firebase` - a Google's mobile application development platform that helps you build, improve, and grow your app.

2. `Google Analytics` - uses a JavaScript code to collect information from websites.

3. `webpack` -  a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

## Setup for build

1. Start your webpack

You can check webpack.common.js, webpack.dev.js and webpack.prod.js for more information.

```
    "watch": "webpack --config=webpack.dev.js --watch",
    "build": "webpack --config=webpack.prod.js",
```

2. Implement firebase

```
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREABSE_AUTH_DOMAIN}`,
    databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
})

export default firebase;
```


## Deployment

You can use any Cloud Server to deploy your application.

In this project, I have used `Netlify` service to deploy my application.

### Who is Netlify?

`Netlify` a web developer platform that multiplies productivity. By unifying the elements of the modern decoupled web, from local development to advanced edge logic, `Netlify` enables a 10x faster path to much more performant, secure, and scalable websites and apps.

You can learn more about how to deploy your app with `Netlify` here: https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/

## Authors

- **Tin La**