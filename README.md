# Project Title

A Simple MEAN Timeline Application

### Developed By

Saad Salman - Junior MEAN Stack Developer at OneByte LLC

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

## Project Overview

It is a Simple Timeline Application just like the timeline functionality that you see on Facebook, where a user first registers, then logs in, and then creates a post which are then displayed on the timeline in chronological order (which means that the latest post will be displayed on the top).
A user can also edit and delete its post, and then can logout. Token-based Authentication is used in this application. Some routes are properly protected which means that only a logged-in user can access them. 

## Prerequisites

What things you need to install the software and how to install them

Node.js
NPM
Express
MongoDB
Angular
Webpack
Kraken.js
and many more...

### Installing

It's not something to be worried about, as we will not be installing each and everything individually.
For our ease, we will be using a yeoman generator for this purpose, named "generator-maskers".

You can read more about this generator, by goinf to the following link:
https://www.npmjs.com/package/generator-maskers

Steps

These are the steps which we followed when we started building this project.

1- First install Yeoman
npm install -g yo

2- Then Install this generator
npm install -g generator-maskers

By running this command you will get a proper file structure in your folder.

4- Now go to your package.json and downgrade the version of core-js from the current version to 2.5.7.

You have to simply replace the version with 2.5.7 and run the command 'npm install'.

5- Now you are good to go and start building this project.

### Important Commands

1- npm run build (to run the build script from package.json)
2- npm run server-start (to run the server-side / API of the project)
3- npm run client-start (to run the client-side / Front-end of the project)
4- npm run dev-start (it runs project as a whole, which means both client-side and server-side)

## Built With

* Yeoman Generator named [Generator Maskers](https://www.npmjs.com/package/generator-maskers)

Yeoman generator for:

Express with KrakenJS
Mongoose or Sequelize
Sockets.io (Optional)
Bare-bones ReactJS with Webpack and Babel

## Versioning

For the versions available, see (https://github.com/SaadiWorld/Timeline)

## Authors

* **Saad Salman** - (https://github.com/SaadiWorld)

Thanks to my mentors [Sir Ahsan Javed](https://github.com/ahsan-javaid) and [Brad Traversy](https://github.com/bradtraversy) for their guidance.

