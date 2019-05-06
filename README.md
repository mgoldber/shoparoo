# Shoparoo App - Tutorial Instructions

## Conceptual Overview


## Code Architecture


## Step 1: Setting up the structure of our application

- Folder structure

Within the directory of your choosing, create a folder called `shoparoo`. This folder will henceforth be referred to as the `root` of your application. This is where all of the code for this application will live.

To organize our application, we will separate the client side (user facing) from the API. Many applications will actually create completely separate applications for each of these separate pieces. For our purposes, we will be keeping the API and the client side within the same code base.

Lets start with the familiar section. The client-side portion of the application can also be referred to as the front-end. For our front-end, we have used React. To keep it simple for us, we used `create-react-app`. When making your own full stack applications in the future, any front-end framework can be substitued in the place of the React app. For the purposes of this code-along, we have provided the front-end code in order to focus on the back-end code. It's important to note that the front-end code is living in a folder called `src` as a result of the way that we have set up our `package.json` file (we will come back to this). We have all of the necessary front-end components that will be powering the front-end of our store. We will be revisiting this code as we have to start making API calls throughout the app. We will also modify the application to ensure that we are using routes. 

- Package.json  

The `package.json` file is the backbone for running the entirety of our application. The goal when configuring our file is to ensure that we are able to run both the front-end and back-end from within the project folder. We also want to ensure that we are set up with all of the necessary starting dependencies.

Return to your command line in the root directory of your project. In order to create the package.json file, we run the `npm init` command. You can select enter for each of the questions that appear. For the main, please ensure that the filename is set to `server.js`. All of the defaults should be set up in the way that we want.

Open up your `package.json` file in your preferred editor so that we can start to make the necessary modifications. Within the scripts object, we are going to add in two custom scripts.

The first script that we will add in should look like this, and will be how we start the client side of our application.:
```json
"scripts": {
    "start:client": "react-scripts start", // This is the first script we want to add in.
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}
```

Whenever we navigate to the command line in the route of our application, we are able to run the front-end by typing `npm run start:client`. Note that `react-scripts start` is the default that create-react-app utilizes in order to start our React applications. `react-scripts` searches for a folder with the name of `src` and this is where it finds all of the necesary files in order to run the react application. There are ways to create links so that react-scripts looks for a different folder name (such as client), however, these are more complex and are out of scope for this code-along.

The next script that we are going to add in is so that we can run the back-end of our application. Underneath the `start:client` script, type in the following line:

`"start:server": "nodemon api/server.js"`.

Our scripts object now looks like the following: 
```json
"scripts": {
    "start:client": "react-scripts start",
    "start:server": "nodemon api/server",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}
```

This is letting our application know that we need to set up our `api` folder with a `server.js` file that will serve as the starting point for the configuration of our backend. You will also see the use of `nodemon` for this script. This is introducing the first dependency that we will need to install to get our application running. Nodemon monitors any changes in a node.js application and automatically restarts the server for us. It is incredibly useful for development so that we do not need to stop and start the server everytime we change anything. In order to install this dependency, return to the command line and type in `npm install nodemon`. All dependencies will be added into the `dependencies` object in your package.json file. Whenever you want to run the server of your application, you will go to the root of your application in the command line, and can type `npm run start:server`.

- server.js file

Our server.js file serves as the entry point for our API. Within here, we will set up necessary configurations, link the necessary pieces of our API, and start the server and connection to our database.

Create a file inside of your `api` folder at the highest level called `server.js`. This file will pull in information from files located in different areas of our api folder in order to get the server running in the way that we want. Lets work through setting up this folder structure so that we understand all of the information that we will need to pull in!

- middleware vs. routers vs. utils

We are going to create three main folders inside of our API folder. These three folders will be called `routes`, `utils`, and `middleware`.

`middleware`: Middleware is where we can define actions that our application should run through. Middleware expects the layer to do some computation, augment parameters, and call `next` as a callback function.

`utils`: This will hold our helper functions, as well as any constants that are required in our application.

`routes`: This will hold the information specifying what happens when endpoints in an API are hit. 

Create these three folders within your API folder, and we will populate the contents as we continue building out the application.

## Step 2: Getting our server going

Open up your `server.js` file inside of your text editor. We are going to `require` some modules. We use the keyword `require` when bringing in modules in Node.js. `require` and `import` are very similar in their functionality. `require` will automatically look within your node_modules to find the necessary modules, while `import` which is a part of ES6 will not do this.

The first module that we are going to bring in is `mongoose`. Mongoose is utilized for our connection between Node and Mongodb. Within our server file, mongoose is utilized to establish our connection to the database.

The next module that we need to import is `express`. Express allows us to simplify our routing, and provides immensely helpful methods to keep our http requests clean.

Finally, we are going to bring in the `http` module. Https is a module that allows us to create the server that is necessary for our application. 

The top of your `server.js` file should look like the following:

```js
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
```

We need to create a express instance. When we import express, we can call express to instantiate our instance. We are going to assign the express instance to a variable called router.

```js
const router = express();
```

Next we are going to bring in several constants that we are going to need in order to have our server running. This will require us to have the URL that will establish our mongo connection, as well as the port that we want to be running on. Within your utils folder, create a file called `constants.js`. Within this file, we are going to specify and export several variables. The first variable will be the mongoURL. Common practise when specifying these values is to provide the location of the `process.env` corresponding variable, as well as the default value in the event that the `process.env` is not specified. The process.env variable is injected by Node at runtime and gives access to environment variables important throughout your application. 

Type the following inside of your `constants.js` file:

```js
exports.URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/shoparoo'
exports.PORT = process.env.PORT || 3001;
```

The first thing that you may notice is that the variable names are specified with capital letters. This is the common convention when specifying constants in a project. The MONGODB_URI is the URL that we will pass to connect to our MongoDB database. The OR(||) allows us to specify the fallback if we do not provide a system variable value for the database location. This is the difference between production and local environments. 

The next value that we are specifying is the port that we wish to run on. This is an arbitrary value, and should not impact the overall functionality of our application.

We can now return to our `server.js` file to make use of these exports. Inside the file, type the following line:

```js
const { URL, PORT } = require('./utils/constants');
```

Destructuring can be used as there is an object coming from the exports from the constants file. As we know that there is a URL and PORT specified in the constants file, we can extract each of them. 

Next, we are going to ensure that we can properly use our middleware. We are going to create a function within our utils that will allow us to utilize our middleware. The `require` command has a lot of nice built in functionality. One nice thing that it allows is in the event that your require a folder, the command will look for an `index.js` file within that folder automatically to seek out the functionality. 