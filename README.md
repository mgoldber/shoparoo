# Shoparoo App - Tutorial Instructions

## Step 1: Setting up the structure of our application

Within the directory of your choosing, create a folder called `shoparoo`. This folder will henceforth be referred to as the `root` of your application. This is where all of the code for this application will live.

To organize our application, we will separate the client side (user facing) from the API. Many applications will actually create completely separate applications for these separate pieces. For our purposes, we will be keeping the API and the client side within the same code base.

Lets start with the client-side of the application. The client-side portion of the application can also be referred to as the front-end. For our front-end, we will be using React. To keep it simple for us, we used [`create-react-app`](https://github.com/facebook/create-react-app) to quickly set up our front-end development environment. When making your own full stack applications in the future, any front-end framework can be substitued in the place of the React app. For the purposes of this code-along, we have provided the majority of the front-end code in order to focus primarily on the back-end code. It's important to note that the front-end code is living in a folder called `src` as a result of the way that we have set up our `package.json` file (we will come back to this). We have all of the necessary front-end components that will be powering the front-end of our store. We will be revisiting this code as we have to start adding in the API calls that we write throughout the app. We will also modify the application to ensure that we are using routes. 

### Package.json  

The `package.json` file is the backbone for running the entirety of our application. The goal when configuring our file is to ensure that we are able to run both the front-end and back-end from within the same project folder. We also want to ensure that we are set up with all of the necessary dependencies.

Return to your command line in the root directory of your project. In order to create the `package.json` file, we run the `npm init` command. You can select enter for each of the majority questions that appear, however, for the main, please ensure that the filename is set to `server.js`.

Open up your `package.json` file in your preferred editor so that we can start to make the necessary modifications. Within the scripts object, we are going to add in two custom scripts.

The first script that we will add in should look like this, and will be how we start the client side of our application:  
```json
// package.json
"scripts": {
    "start:client": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}
```

Whenever we navigate to the command line in the route of our application, we are able to run the front-end by typing:
```shell
npm run start:client
```
Note that `react-scripts start` is the default that create-react-app utilizes in order to start our React applications. `react-scripts` searches for a folder with the name of `src` and this is where it finds all of the necesary files in order to run the React application. There are ways to create links so that react-scripts looks for a different folder name (such as client), however, these are more complex and are out of scope for this code-along.

The next script that we are going to add in is so that we can run the back-end of our application. Underneath the `start:client` script, type in the following line:

```js
// package.json
"start:server": "nodemon api/server.js"
```

Our scripts object now looks like the following: 
```json
// package.json
"scripts": {
    "start:client": "react-scripts start",
    "start:server": "nodemon api/server",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}
```

This is letting our application know that we need to set up our `api` folder with a `server.js` file that will serve as the starting point for the configuration of our backend. You will also see the use of [`nodemon`](https://nodemon.io/) for this script. This is introducing the first dependency that we will need to install to get our application running. Nodemon monitors any changes in a node.js application and automatically restarts the server for us. It is incredibly useful for development so that we do not need to stop and start the server every time we change something on the back-end. In order to install this dependency, return to the command line and type in:
```shell
npm install nodemon
```
All dependencies will be added into the `dependencies` object in your package.json file. Whenever you want to run the server of your application, you will go to the root of your application in the command line, and can type `npm run start:server`.

#### proxy

As a by-product of serving our front-end React application from same host and port as our back-end application (i.e. we do not have a separate code base for our front-end and back-end code), we need to add a special property into our `package.json` file. This is the `proxy` property. This allows us to write our endpoint URLs like `/api/cart` without worrying about specifying a port, or having to do any form of a redirection.  

Within the `package.json` file, add the following line at the top level of the object:

```json
"proxy": "http://localhost:4000"
```

This also conveniently allows us to avoid any CORS issues that may come up as a result of this set up. Note that this is only utilized in development, as when the project is launched the front-end and back-end are launched in separate environments, and therefore do not interfere with one another.

If you are interested in reading more on this, the official create-react-app documentation has a great description [here](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development)!

### server.js

Our `server.js` file serves as the entry point for our API. Within here, we will set up necessary configurations, link the necessary segments of our API, and start the server and connection to our database.

Create a file inside of your `api` folder at the top level called `server.js`. This file will pull in information from files located in different areas of our api folder in order to get the server configured in the way that we want. Lets work through setting up this folder structure so that we understand all of the information that we will need to pull in!

### middleware vs. routers vs. utils

We are going to create three folders within of our API folder. These three folders will be called: `routes`, `utils`, and `middleware`.

`middleware`: Middleware is where we can define actions that our application should run through. Middleware expects the layer to do some computation, augment parameters, and call `next` as a callback function.

`utils`: This will hold our helper functions, as well as any constants that are required in our application.

`routes`: This will hold the information specifying what happens when the endpoints of our API are hit. 

Create these three folders within your API folder, and we will populate the contents as we continue building out the application.

## Step 2: Getting our server going

Open up your `server.js` file inside of your text editor. We are going to `require` some modules. We use the keyword `require` when bringing in modules in Node.js. The keywords of `require` and `import` are very similar in their functionality. `require` will automatically look within your node_modules to find the necessary modules, while `import` which is a part of ES6 will not do this.

The first module that we are going to bring in is `mongoose`. Mongoose is utilized for our connection between Node and MongoDB. In addition, within our server file, mongoose is used to establish our connection to the database.

The next module that we need to import is `express`. Express allows us to simplify our routing, and provides immensely helpful methods to keep our http requests simplified and clean.

Finally, we are going to bring in the `http` module. Http is a module that allows us to create the server that is necessary for our application. 

From your command line, you can install these three dependencies by doing the following:

```shell
npm install mongoose
npm install express
npm install http
```

Following this, the top of your `server.js` file should look like the following:

```js
// server.js
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
```

We need to create an express instance. When we import express, we can call express to instantiate our instance. Once we instantiate this instance, we are able to use the available methods it has on its class. We are going to assign the express instance to a variable called router.

```js
// server.js
const router = express();
```

Next we are going to bring in several constants that we are going to need in order to have our server running. This will require us to have the URL that will establish our mongo connection, as well as the port that we want to be running on. Within your utils folder, create a file called `constants.js`. Within this file, we are going to specify and export several variables. The first variable will be the mongoURL. Common practise when specifying these values is to provide the location of the `process.env` corresponding variable, as well as the default value in the event that the `process.env` is not specified. The `process.env` variable is injected by Node at runtime and gives access to environment variables important throughout your application. 

Type the following inside of your `constants.js` file:

```js
// constants.js
exports.URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/shoparoo';
exports.PORT = process.env.PORT || 3001;
```

The first thing that you may notice is that the variable names are specified with capital letters. This is the common convention when specifying constants in a project. The MONGODB_URI is the URL that we will pass to connect to our MongoDB database. The OR (||) condition allows us to specify the fallback if we do not provide a system variable value for the database location. This is the difference between production and local environments. 

The next value that we are specifying is the port that we wish to run on. For development, we are going to run our application on PORT 3001.

We can now return to our `server.js` file to make use of these exports. Inside the file, type the following line:

```js
// server.js
const { URL, PORT } = require('./utils/constants');
```

Destructuring can be used as there is an object coming from the exports from the constants file. As we know that there is a URL and PORT specified in the constants file, we can extract each of them individually. 

Next, we are going to ensure that we can use our middleware. We are going to create a function within our utils that will let us use our middleware. The `require` command has a lot of nice built in functionality. One nice thing that it allows is in the event that you require a folder, the command will look for an `index.js` file within that folder automatically. 

You should now create an `index.js` file inside of your utils folder. We are going to write a function inside of the `index.js` file called `applyMiddleware`. 

This function should be written as the following. For each router that we pass to the function, the bodyParser middleware will be applied to it. :

```js
// index.js
exports.applyMiddleware = (middlewareWrapper, router) => {
    for (const wrapper of middlewareWrapper) {
        wrapper(router);
    }
}
```

As we have exported the function, we can now import it into our `server.js` file. This can be done with the following line:

```js
// server.js
const { applyMiddleware } = require('./utils'); 
```

We are using destructuring, as well as the built in functionality of require that specifies that since we are only telling it to look in the utils folder, and not which specific file to look for, that it will reference the `index.js` file.

We are going to going to use a module called `body-parser` that helps us in parsing incoming request bodies. We are going to parse our request bodies as JSON for ease of handling.

Navigate to your command line and run the following command:

```shell
npm install body-parser
```

Next, we are going to create a middleware folder at the root level of our `api` project. Create a file called `index.js` within this folder.

Our `index.js` file is going to export a function that we can use to apply our bodyParser middleware to each of our routes. We are going to write this specific function within a new file called `common.js` that will also be created inside of our middleware folder.

Inside our `common.js` file, we will import the body-parser module and will apply its properties to the router that we pass in. At the top of the file, lets import in `body-parser`:

```js
// common.js
const bodyParser = require('body-parser');
```

Now we will apply the body-parser properties to the router we pass into the function. We are able to apply middleware by using the `.use` method. We are going to apply the `urlencoded` and `json` middlewares to each of our routers. The function will look like the following:

```js
// common.js
exports.handleBodyRequestParsing = (router) => {
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json());
}
```

Now, within our `index.js` file nested in our middleware folder, we can require this function and export it.

```js
// index.js
const { handleBodyRequestParsing } = require('./common');

module.exports = [
    handleBodyRequestParsing
];
```

We can now bring in the middleware function we wrote so that we can pass it to our apply middleware function and apply body-parser to all of your routes. First we will add the middleware import to our `server.js` file.

```js
// server.js
const middleWare = require('./middleware');
```

The next thing that we are going to do is ensure that our routing is set up. The initial functionality that we want to set up is authentication.

## Step 3: Authentication & Using our Routes 

In order to ensure that we are able to handle authentication for our application, we need to be able to store users in our database. In order to set this up, we are going to create a folder called `users` within our `routes` folder. The process to set up our users routes can be duplicated for all additional routes that we set up throughout the process of building the application.

Within our `users` folder, we are going to create three separate files. The files will be called `userModel.js`, `userRoutes.js`, and `userService.js`.

`userModel.js`: This will be responsible for setting up our user schema, as well as identifying behaviours that should occur when interacting with the user model.

`userRoutes.js`:This will specify the logic that will happen when hitting different endpoints related to our users.

`userService.js`: This will contain helper functions that we can use within our routes to perform important actions and reduce code repetition.

Lets start with the `userModel.js` file. We create our schemas with Mongoose. We should add the following imports to the top of `userModel.js` in order to set up our schema. The schema is the organization of data that we will be storing in our database, and acts as a blueprint to ensure that our data is always in the format that we want.

```js
// userModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
```

As we have imported our destructured Schema, we can use it to create our user schema. The following is the structure to set up a new schema:

```js
// userModel.js
const userSchema = new Schema({

});
```

We would like for each of our users to have an email and a password that will allow them to login. Therefore, we need to add this to our user schema:

```js
// userModel.js
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
```

We would like for both of these fields are required in order for the user to be considered valid. We can use the built in `required` flag in Mongoose that allows us to specify that the user should not be saved if these fields are not present. We will also make use of the `unique` flag for the email property to ensure that no two users in our system have the same email. 

Mongoose exposes a `pre-save` hook called the `.pre` method that allows us to specify functionality that should execute prior to the save function being called. This is very useful for specifying important actions that must occur prior to the new entry being saved in our database. For example, though we specified the password type as `String` within our schema - this should never be saved as a plaintext string. This would be a major security flaw, as anyone with access to our database would immediately have access to all of our user's unencryped passwords. We are going to use the `pre` method to hash the password so that we can appropriately encrypt our password prior to saving the user in our database.

We are going to utilize a popular encryption module called [`bcryptjs`](https://www.npmjs.com/package/bcryptjs). This module exposes a hash function that completes a randomized hash for us and returns a string that we can safely store within our database without risking dangerously storing plaintext passwords. Return to your commandline and run the following command:

```shell
npm install brcryptjs
```

Then within your `userModel.js` file, you can require the module.

```js
// userModel.js
const bcrypt = require('bcryptjs');
```

Now we can start writing our pre method that will complete the hashing of our password. The syntax for this method is as follows:

```js
// userModel.js
userSchema.pre('save', async function(next) {

});
```

This method takes two arguments. The first argument is the event trigger (which is passed in as a string), and the second argument is the callback function to execute. We are specifying `save` as the event trigger that tells our function to run when the save event is triggered.

We are going to take advantage of some built in Mongoose methods that will let us know if the user's password is being changed, or if a new user is being created. The `.isModified` method returns true if the specified document was modified. The `.isNew` method returns true if the document is new. We only want to hash our password in the event that one of these cases are true.

```js
// userModel.js
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password') || user.isNew) {

    }
});
```

Within the conditional check we are going to hash the password, and assign it to our user password field. The `.hash` method allows us to pass the plaintext password, as well as a value for the number of salt rounds that we would like to secure our password with.

```js
// userModel.js
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
        } catch (e) {
            
        }
    }
});
```

We ues the `next()` callback function in order to specify that the next action should occur following all of the actions that run in our pre save. We will add the next function wherever the pre function has completed its work. In the event that an error is thrown, we are able to pass the error into the `next()` function as well.

```js
// userModel.js
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password') || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            return next();
        } catch (e) {
            return next(e);
        }
    } else {
        return next();
    }
});
```

Finally, we need to export the schema as a model at the bottom of the file. The following line allows us to do this:

```js
// userModel.js
exports.model = mongoose.model('User', userSchema);
```

Next, we are going to work on the routes file for our users. Go into your users folder and create a new file called `userRoutes.js`.

Within our `userRoutes.js` file, we are going to need to access express in order to access the router and set up our various routes. At the top of our `userRoutes.js` file lets bring in express and router.

```js
// userRoutes.js
const express = require('express');
const router = express.Router();
```

The `.route()` method on the router object allows us to specify the endpoint that we are intending to hit. We are going to set up the route for when the user hits in the endpoint of `/api/users/signup`. Each of the routes that we specify within our `users` folder here will assume a start of `/api/users`.

Router lets us specify the HTTP method that we are interested in of our familiar HTTP methods (GET, POST, PUT, DELETE). Depending on the HTTP method specified in the call, the code can perform different actions even if the same endpoint is hit. For example, if the application sends a request of `/api/users/signup` as a GET request, this does not necessarily need to behave the same way as sending a request to `/api/users/signup` as a POST request. For our application, when we send a POST request to `/api/users/signup`, we would like for our API to create a new user. This can be set up as follows:

```js
// userRoutes.js
router.route('/signup')
    .post(async (req, res, next) => {

    });
```

We are specifying the `/signup` endpoint, as well as stating that this is the code that will be run in the event that the request is sent as a POST request.

We could write all of our code within here, but for modularity, we like to separate out our code. We are going to utilize our `userService.js` file to write our helper function of creating a user based on the body of information that is sent in the request body.

In our `userService.js` file we are going to need access to our user model. Remember, this is essentially a skeleton of how we want each user in our system to look. We can import the model into our service file by doing the following:

```js
// userService.js
const { model: User } = require('./userModel');
```

We are going to write a helper function to create our user. In order to do this, we would like to instantiate a new instance of our user model, and then save the user to our database.

As this is a helper function that we are going to be using elsewhere, we need to be sure to export the function.

```js
// userService.js
exports.createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (e) {
        throw e;
    }
}
```

`.save()` is a method in mongoose that allows us to add a document into our MongoDB database. 

Now that we have this function available to us, we can return to our `userRoutes.js` file and add the necessary code to create a user in the event that the application sends a post request to a our `/api/user/signup` endpoint.

At the top of the file, ensure that you import the userService functions so that we have access to these helper methods.

```js
// userRoutes.js
const userService = require('./userService');
```

With these functions now available, you can add the following code:

```js
// userRoutes.js
router.route('/signup')
    .post(async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body.data);
            res.status(201).json({
                data: [user]
            });
            logRequest(req, res);
        } catch (e) {
            next(e);
        }
    });
```

This tells our application to create a new user, and send a response of the user object with a status of 201 to assure us that the user has been successfully created.

Finally, we want to ensure that our routes are being appropriately exported. At the bottom of the file, add the following line:

```js
// userRoutes.js
exports.router = router; 
```
 
Now that we are able to register a new user, we want to ensure that this user is able to sign in, as well as have a token generated in order to continue navigating the application, and accessing any restricted routes.

We are going to add a route into our `userRoutes.js` file that will handle our login for us. The expectation for what should happen when this endpoint is hit are the following:

1. Verify that the user is a registered user in our system.
2. Verify the user login details.
3. Generate a random token for the user. 

We will start with adding the familiar route structure that we use to provide code for any of our routes. The following can go below our `/signup` endpoint, and will create an endpoint of `/api/user/login`:

```js
// userRoutes.js
router.route('/login')
    .post(async (req, res, next) => {
        
    });
```

We are going to use more helper functions to help us accomplish the above mentioned desired actions. The first function we need is to check if the user exists in our system. We will add the following to our `userService.js` file:

```js
// userService.js
exports.isUser = async ({ email, password }) => {

}
```

This will use the user's email to run the mongoose method of `.find()` to see if a user with that email exists as an entry in our database. In the event that the user is found, we will use another mongoose method called `comparePassword()` that securely checks if a provided password matches the salted password in the database.

We can add the following to the above code:

```js
// userService.js
exports.isUser = async ({ email, password }) => {
    try {
        const [user] = await User.find({ email });
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                return user;
            }
        }
    } catch (e) {
        throw e;
    }
}
```

We can now confidently return the user if found in the database, and the password provided at the login stage matches. Next, we are going to generate and return the token.

To keep our code clean, we are going to create a new services file that will handle all actions related to our token.

Inside of our `utils` folder, we will create a new file called `tokenService.js`. This file is going to use JWT in order to generate the random token for us. On your command line, run:
```shell
npm install jsonwebtoken
``` 

At the top of your `tokenService.js` file, add the following line:

```js
// tokenService.js
const jwt = require('jsonwebtoken');
```

We are going to create a function to issue a new token. We are going to pass the user information in so that we can be sure that the token that is being generated is the one related to the specified user. Each entry in our database has a unique ID that we can use to uniquely identify the user.:

```js
// tokenService.js
exports.issueToken = async (userData) => {
    const { _id: id } = userData;

    const payload = {
        user: {
            id
        }
    }
}
```

We are going to use a built in method available on the jwt object called `.sign()`. The `.sign()` method takes in a payload, a secret key, and an optional callback and generates a randomized token. In this case, we have the payload which is the user object, however, we still need a secret key. The secret key is essentially a password for our application that allows us to access encrypted confidential data. We are going to put our secret key in our constants file. Inside our `constants.js` file within our `utils` folder add the following line:

```js
// constants.js
exports.SECRET = process.env.SECRET || 'super-secret-passphrase';
```

The passphrase can be whatever you want it to be as long as it remains secret. We are going to leave it as the string of `super-secret-passphrase`. 

We can then return to our `tokenService.js` file and import our secret key from our constants file with the following line:

```js
// tokenService.js
const { SECRET } = require('./constants');
```

Inside our issueToken function that we were writing previously, we can now add the call to the `.sign()` method as we have the necessary parameters.

```js
// tokenService.js
exports.issueToken = async (userData) => {
    const { _id: id } = userData;

    const payload = {
        user: {
            id
        }
    };

    return jwt.sign(payload, SECRET);
}
```

Now that we have written the necessary helper functions for our login, we can return to our `userRoutes.js` file to complete all of the actions related to a user login. We send a response object that contains the generated token so that the front-end is able to access this piece of information.

```js
// tokenService.js
router.route('/login')
    .post(async (req, res, next) => {
        try {
            const user = await userService.isUser(req.body.data);
            if (user) {
                const token = await tokenService.issueToken(user);
                res.status(200).json({
                    data: {
                        token
                    }
                })
            } else {
                next();
            }
        } catch (e) {
            next(e);
        }
    })
```

### Front-end Integration
Now that we have set up the necessary routes on the backend for handling our registration and login, we are going to add the functionality to our front-end application. 

Inside of your `components` folder, you will see a folder containing the necessary files for your `Login` component. Inside of the `Login.js` file, you will see an empty `handleSubmit` function. This function is attached to the login/sign up form submission, and will be called when the `login` or `signup` button are clicked.

In starting this function, the first thing we want to do is ensure that we are extracting the email and password that were entered in the form. In addition, we need to know if we are in the login form or the sign up form as we have combined the forms in our design. We can extract all of these pieces of information from our state object. Destructuring can be used to accomplish this with the following line:

```js
// Login.js
const { email, password, type } = this.state;
```

Next, we are going to store the form route, or more specifically, whether we're in the login or sign up form:

```js
// Login.js
const route = type === 'login' ? 'login' : 'signup'
```

Finally, we can make our call to the appropriate endpoint depending on if the user is signing up for the first time, or is logging in. We will use the `await` keyword inside of our `async` function in order to make the API call. We will wrap this call inside of a `try-catch` block.

```js
// Login.js
try {
    const res = await axios.post(`/api/users/${route}`, {
        data: {
            email: email,
            password: password
        }
    });
    console.log(res);
} catch (e) {
    this.setState({ message: e });
    console.log(e);
}
```

Your `console.log` will show you that the token is nested in the response from the server. To access the token, we have to access the property with the following `res.data.data.token`.

```js
// Login.js
try {
    const res = await axios.post(`/api/users/${route}`, {
        data: {
            email: email,
            password: password
        }
    });
    const token = res.data.data.token;
} catch (e) {
    this.setState({ message: e });
    console.log(e);
}
```

We want to ensure that we can access the token throughout our application as we will need it to access any restricted routes. We are going to use [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for our purposes. This stores the data in the browser session and gives us an accessible key-value storage object wherever we require it in our web application.
 
Create a new folder at the root of our client application called `services`. Inside of here, we are going to add any files that contain our front-end helper functions. Inside of your `services` folder, create a file called `tokenService.js`. We are going to write 3 functions within this file. 

1. We are going to create a function that sets the token within our local storage.
2. We are going to write a function that gets the token from our local storage.
3. We are going to write a function that deletes the token from our local storage object.


The localStorage object offers methods that are very helpful in accomplishing the aforementioned tasks. The first function will be called `setToken` and will take in an argument of the token that we are storing:

```js
// tokenService.js
export const setToken = (token) => {
    
};
```

We are then going to use the `setItem` method available on the localStorage object in order to tell the local storage object to hold on to the token for us. 

```js
// tokenService.js
export const setToken = (token) => {
    localStorage.setItem('token', token);
};
```

This is essentially creating a key-value pair with the key being the string of token, and the value being the token itself, which we have passed into the function.

The remaining functions that we are writing will look very similar. For the getToken function, the only difference is that we will return the token that we retrieve within the function. This will looks like the following:

```js
// tokenService.js
export const getToken = () => {
    return localStorage.getItem('token');
}
```

Finally, we are going to write our function that will remove the stored token from our local storage. This will utilize the `removeItem` method which finds the item by its key and then deletes it. 

```js
// tokenService.js
export const removeToken = () => {
    localStorage.removeItem('token');
}
```

Now that we have exported these functions to help us manage our token, we want to import the ones we need back into our Login component. We are going to use the `setToken` function as we are generating the token for the first time and want to push it to our localStorage object to ensure that it is available throughout our application. At the top of the `Login.js` file, add the following line:

```js
// Login.js
import { setToken } from '../..services/tokenService';
```

Now we will use the `setToken` function, and pass in the token that we generated earlier.

```js
// Login.js
try {
    const res = await axios.post(`/api/users/${route}`, {
        data: {
            email: email,
            password: password
        }
    });
    const token = res.data.data.token;

    setToken(token) // added this line
} catch (e) {
    this.setState({ message: e });
    console.log(e);
}
```

Finally, we are going to add in a call to our `hideLogin` method which we passed in using our props. This is so that the login/signup modal disappears and lets us continue using our application.

```js
// Login.js
try {
    const res = await axios.post(`/api/users/${route}`, {
        data: {
            email: email,
            password: password
        }
    });
    const token = res.data.data.token;

    setToken(token);

    this.props.hideLogin();
} catch (e) {
    this.setState({ message: e });
    console.log(e);
}
```

And that's it! You are now using the `login` and `signup` endpoints that you wrote earlier, and storing the generated token in local storage for later use.

## Step 4: React Router

We are going to set up a separate route for our shopping cart. This will be a separate page that will contain all of the items that we have added to our shopping cart from the main store. We are going to use an npm module called [`react-router-dom`](https://reacttraining.com/react-router/web/guides/quick-start) to set up our routes. `react-router-dom` allows us to specify the components that should render when a different URL is hit. For example, if we hit a URL such as `WEBSITEURL/cart`inside of our application, this should render a component that handles the logic functionality related to the shopping cart. We are also going to offer a purchase option within this route. The purchase option is going to utilize a restricted route that will require a valid token to be sent to the server in order for the endpoint to run.

To get us started, return to your command line and run the following command:

```shell
npm install react-router-dom
```

Setting up routing in your React application starts from the root, or entry point of your React project. Our `App` component. At the top of our `App.js` file, we are going to import the necessary components from the react-router-dom module. We are going to import `BrowserRouter`, `Route`, and `Switch`. Add the following import to the top of the `App.js` file.

```js
// App.js
import {
    BrowserRouter as Router,
    Route,
    Switch
}
```

We are able to use the `as` keyword to alias a component import to another shorter word. These components can be used within the render return. The `Router` component serves as the wrapper for all of the routing logic that we write.

```js
// App.js
render() {
        return (
            <Router>
                
            </Router>
        )
    }
```

we have already set up some of the components that are going to be nested inside of the router. These components are `StoreItems`, and `Cart`. `StoreItems` represents all of the available available waist packs that our store sells. This component will retrieve all of the packs from our database, map through, and display them in a way that allows for a user to add them to their cart. `Cart` is the component that handles displaying all the packs that the user has added to their cart, and allows for the purchase to be made. 

We are going to modify our `Navigation` component that serves as the header/navigation bar of our application that will contain links to our home page, the cart, as well as a button to complete the login. We are going to ensure that the nav bar is correctly utilizing our routing as well.

As we know, React requires that when we have sibling components, they must utilize a wrapper. We are going to wrap each of the mentioned components within a div.

```js
// App.js
render() {
        return (
            <Router>
                <div>
                    <Navigation user={this.state.user} toggleLogin={this.toggleLogin} logout={this.logout} />
					{this.state.showLogin && !this.state.user && <Login hideLogin={this.toggleLogin} setUser={this.setUser} />}
                    <StoreItems />
                    <Cart />
                </div>
            </Router>
        )
    }
```

Navigation is not a part of the main router set up as there will not be a route that will go to our navigation component. To think about it a different way, there will be no `/navigation` route that will redirect to our navigation component. Instead, there will be paths that will go to the other two mentioned components. We are going to use our `Switch` component imported from router-dom to set up these unique routes. This will look like the following:

```js
// App.js
render() {
        return (
            <Router>
                <div>
                    <Navigation user={this.state.user} toggleLogin={this.toggleLogin} logout={this.logout} />
                    {this.state.showLogin && !this.state.user && <Login hideLogin={this.toggleLogin} setUser={this.setUser} />}
                    <Switch>
                        <Route exact path="/" component={StoreItems} />
                        <Route path="/cart" component={Cart} />
                    </Switch>
                </div>
            </Router>
        )
    }
```

We need to specify `exact` for our `/` home path to prevent continuous re-rendering of of the `StoreItems` component. This occurs because the `/` is also part of the route to cart as this path starts with a slash. This confuses the route and causes the re-render. To mitigate this, we specify that we want the `StoreItems` component to render only exactly when the path the URL hits ends with `/`.

Next, we are going to complete the necessary routing for our navigation bar. Go into the `Navigation.js` component, and we will start adding the necessary components within here.

We are going to use the `NavLink` which is very similar to `Link`, however, it is a special version that adds styling attributes to the rendered element when it matches the current URL.

Inside of the `Item` styled component for Home and Cart, we will add the necessary NavLink component. When we click on Home in the navigation bar, we would like to re-route to the root of our application, or the `/` route. When we click on the cart option, we would like to navigate to the `/cart` URL. This will look like the following:

```jsx
// Navigation.js
<ul className="list">
    <Item>
        <NavLink exact to={`/`} activeClassName="active" className="link">
            Home
        </NavLink>
    </Item>
    <Item>
        <NavLink to={`/cart`} activeClassName="active" className="link">
            Cart
        </NavLink>
    </Item>
    {user ? (
        <Button spaced purple small onClick={logout}>
            Logout
        </Button>
    ) : (
        <Button spaced purple small onClick={toggleLogin}>
            Login
        </Button>
    )}
</ul>
```

Note that we still need to use the `exact` keyword when specifying the route to the root of the application. 

And that's it! We have now implemented routing into our application as a way of separating out different pages of our application.

## Step 5: Database Design and Initialization

We want to ensure that we are thinking about how we want our specific application to function when we are thinking about the structure of our database. There are many different options for the collections in our database, and the connections between them. 

We will start off with what we know already. We have a `user` collection in our database that is storing each of our unique users and contains an email property, as well as a password property that stores the encrypted password. Our store is going to be displaying waist bags on the home page. These are databases from Shoparoo's inventory and each pack has unique properties. We will have a collection of `fannies` in order to hold this inventory. Each unique pack has the attributes of name, photoUrl, and price.

In thinking about the online shopping experience, we want to be able to create a cart that will be a collection of our fanny packs. Note that a user of the site has the option to purchase multiples of the same pack. Due to this, we want our cart item to be a reference to the fannypack model. This creates a one-to-many relationship as the cart item can reference any of the fanny packs in our store collection. The other important property that the cart item model has is a value for quantity. This is so that a user is able to purchase multiples of the same pack.

Inside of your `api` folder, you will see a file called `seed.js`. The concept of seeding is populating some initial data into your database that does not get added during the usage of your application. One way to do this is to have a file within utils that has methods available that complete the removal of old data and the population of new data. These methods get run each time the server gets restarted. This is very useful when developing as you can mess around with the data, and always be certain that you have a way to get it back to its initial state. It is also very useful for automated testing so that you are able to control the information that is being loaded into your database. The other option, and the one that we will use for this project, is populating the data through a script. 

Upon looking through the script, you will see that a connection is made to our local mongo database, and we have hardcoded in values for all of the fields that we mentioned we would have on the fannypack model. We are also making use of a module called `faker` that allows us to generate realistic looking fake data. Much like lorem ipsum of your backend. In order to run this file, you must do the following:

1. Ensure that you have mongo running in your command line. If you do not have it running, navigate to the command line and run:

```shell
mongod
```

2. Following this, open another command line window and run the file with:

```shell
node seed.js
```

Verify that the data populated within your database. If all worked as planned, you should see a new collection called `fannies` within your `shoparoo` database. If you click through the documents, you should see that the fake data has been populated.

----------TO DO: MAKE A DATABASE DESIGN DIAGRAM ---------

## Step 6: Routes, routes, routes

We're making great progress! Our user is able to login, and we have some data to play with. Let's get started with setting up the remaining routes for our API. A great place to start when testing out your routes is to create a route that is able to get all entries in a collection. As we have populated the fanny packs in our database, we should work to make a route to retrieve all of these packs. This will be the endpoint that is called when initially landing on the store page and loading in the store inventory.

We will follow a very similar flow that we did when setting up our user routes. Create a new folder within `routes` called `fannies`. Inside of this folder, create the following three files: `fannyModel.js`, `fannyRoutes.js`, and `fannyService.js`. 

Let's start off with the model. When determining the design of our database, we identified the properties that we would need to include within the fanny model. At the top of the file, we will import the familiar modules, and objects that we will need to utilize:

```js
// fannyModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
```

And the skeleton structure for creating a brand new schema:

```js
// fannyModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fannySchema = new Schema({
    name: String,
    photoUrl: String,
    price: Number,
    quantity: Number
});
```

These properties map directly to the fields we created when populating our initial dataset. All that's left is to export this model so that is available for use elsewhere:

```js
// fannyModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fannySchema = new Schema({
    name: String,
    photoUrl: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model('Fanny', fannySchema);
```

Now let's move to setting up our routes! Within our `fannyRoutes.js` file, we will import the necessary modules that we will be using:

```js
// fannyRoutes.js
const express = require('express');
const router = express.Router();
```

Now that we have access to `Router` from Express, we will set up the GET endpoint of /fannies/ that, when hit, will get us all entries in the fanny collection from our database.

```js
// fannyRoutes.js
router.route('/')
    .get(async (req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    });
```

We are going to use a helper method to retrieve the fanny packs from the database. As we have seen previously, we will write these helper methods within our service file. Inside of `fannyService.js`, let's import the fanny model so that we have access to it:

```js
// fannyService.js
const Fanny = require('./fannyModel');
```

With this, thwe are going to write a helper function called `listFannies` that will access all of the packs in the collection:

```js
// fannyService.js
exports.listFannies = async () => {
    try {

    } catch (e) {
        throw e;
    }
}
```

As we have imported the model, we have access to the methods that are available on the model object. The `.find` method allows us to retrieve documents that match our specified query. If we do not include any specifications, by default, it will return all of the documents:

```js
// fannyService.js
exports.listFannies = async () => {
    try {
        const fannies = await Fanny.find({});
        return fannies;
    } catch (e) {
        throw e;
    }
}
```

That's it! We are now retrieving all of the documents in the collection. Back in `fannyRoutes.js` we are going to make use of this helper method. At the top of the file, ensure that the service file is being imported:

```js
// fannyRoutes.js
const fannyService = require('./fannyService');
```

And since we have access to the methods, let's make use of it within the GET route:

```js
// fannyRoutes.js
router.route('/')
    .get(async (req, res, next) {
        try {
            const fannies = await fannyService.listFannies();
        } catch (e) {
            next(e);
        }
    });
```

With our fannies retrieved, we are going to send a response which is all of our fannies, with a success response code.

```js
// fannyRoutes.js
router.route('/')
    .get(async (req, res, next) {
        try {
            const fannies = await fannyService.listFannies();
            res.status(200).send({
                data: fannies
            });
        } catch (e) {
            next(e);
        }
    });
```

Amazing! We now have an endpoint to retrieve all of the fannies. We know that we are going to be adding packs into our shopping cart. In order to do this, we need a way to select a single pack, as opposed to always having to retrieve the full list. We are going to set up an endpoint, that when passed an ID, will select the fanny pack with the corresponding ID from our database. Express allows us to use a colon (:) within our URL to indicate a parameter that is subject to change. In this example, the ID will change depending on the pack that is selected.

```js
// fannyRoutes.js
router.route('/:id')
    .get(async (req, res, next) {
        try {

        } catch (e) {
            next (e);
        }
    });
```

This lets our endpoint know that we are not expecting the literal string 'id', but are instead expecting a value in place of id. We include the name, as this allow us to access the value using `req.params.id`.

Let's return to our `fannyServices` file to create a new helper function that finds a single fanny pack by ID. 

```js
// fannyService.js
exports.getFannyById = async () => {
    try {
        
    } catch (e) {
        throw e;
    }
}
```

We will use another helpful mongoose method which is `findById` instead of just find. We will also ensure that we are passing the ID into the function so that we know which ID to search for in our database.

```js
// fannyService.js
exports.getFannyById = async (fannyId) => {
    try {  
        const fanny = await Fanny.findById(fannyId);
        return fanny;
    } catch (e) {
        throw e;
    }
}
```

Back in our routes file, we will use this function in a very similar way to how we used the previous one.

```js
// fannyRoutes.js
router.route('/:id')
    .get(async (req, res, next) {
        try {
            const fanny = await fannyService.getFannyById(req.params.id);
            res.status(200).send({
                data: fanny
            });
        } catch (e) {
            next (e);
        }
    });
```

Let's incorporate these endpoints into our front-end code, after all, that's why we wrote them!

### front-end

Within our React application, we have a folder for `StoreItems` which is responsible for handling the loading of our inventory, as well as the interaction of adding new items to our shopping cart. In our `StoreItems.js` file, you will see the function stub of `fetchFannyPacks`. We are going to write our API call within here in order to retrieve our list of fanny packs. 

```js
// StoreItems.js
async fetchFannyPacks() {
    try {
        const res = await axios.get('/api/fannies');
    } catch (e) {
        console.error(e);
    }
}
```

It is always good practise to review the response that comes back from the server so that you know how to properly handle it:

```js
// StoreItems.js
async fetchFannyPacks() {
    try {
        const res = await axios.get('/api/fannies');
        console.log(res);
    } catch (e) {
        console.error(e);
    }
}
```

From this, you will see that our array of fanny packs is nested within `res.data.data`. We have set up an initial state of an empty array of packs that we would like to update the state of with the newly fetched packs.

```js
// StoreItems.js
async fetchFannyPacks() {
    try {
        const res = await axios.get('/api/fannies');
        this.setState({
            packs: res.data.data
        });
    } catch (e) {
        console.error(e);
    }
}
```

Amazing! Now when we refresh the page, we should be seeing our fanny packs populate. You will notice that there is a shopping cart icon on each of the cards. We have a function stub set up to add a unique fanny pack to our shopping cart. There are several ways to handle shopping carts in an application. If you would like your shopping cart to persist (an optional extension for this project if you want to challenge yourself), you'll want to store the cart items in your database. Then, upon navigating to the `/cart` route in your front-end, you will retrieve all documents in your `cart` collection from the database. For our purposes, we are not going to make our shopping cart persist, but are instead going to handle it in local storage. This is immensely similar to how we decided to handle our token, and store that in localStorage.

Before we worry about the local storage, we need to ensure that we have the associated fannypack which we will use our `/fannies/:id` route in order to accomplish.

```js
// StoreItems.js
async addToShoppingCart(itemId) {
    try {
        const fannyPack = await axios.get(`/api/fannies/${itemId}`);
    } catch (e) {
        console.log(e.message);
    }
}
```

The itemId is being loaded in on initial load of all of the fanny packs on the page so that it is always available. This will fetch just the unique fanny pack that is associated with that id.

Now we can begin to set up the local storage piece of the application which will follow the following logic:

1. Load in the current shopping cart from local storage, if one doesn't exist create a new one.
2. If a cart does not currently exist, i.e. there are no items in the cart, increment the quantity of the fanny pack item that we have found and push this to the cart
3. If a cart already exists, search for the existance of the same fanny pack.
    3a. If the fanny pack already exists, incremented the quantity value by 1.
    3b. If the fanny pack does not already exist, add the new item to the cart.

We are going to set up another service file, similar to our `tokenService.js` file that will contain helpers solely related to our shopping cart. Within your `services` folder, create a new file called `cartService.js`. Inside of `cartService.js` add the following functions:

```js
// cartService.js
export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart'));
}

export const setCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
```

These functions will allow us to retrieve the current state of the cart, as well as update the cart when we are modifying the quantity values of the fanny packs.

Back in our `StoreItems.js` file, we must ensure that we import the helper functions:

```js
// StoreItems.js
import { getCart, setCart } from '../../services/cartService';
```

Then within `addtoShoppingCart`, we will write the logic that follows the above mentioned steps.

```js
// StoreItems.js
async addToShoppingCart(itemId) {
    try {
        const fannyPack = await axios.get(`/api/fannies/${itemId}`);

        let cart = getCart() || []; // retrieve current state of cart or create new one

        if (cart.length === 0) { // a cart does not already exist
            fannyPack.data.data.quantity = 1; // set initial quantity for the cart
            cart.push(fannyPack);
            setCart(cart); // push the updated cart to local storage
        } else { // a shopping cart already exists
            let pack = cart.find(item => { // see if any of the items in the cart match the item being passed in
                return item.data.data._id === itemId // the search is being done by ID matching
            });
            if (pack) { // this means that the item already exists in the cart
                pack.data.data.quantity += 1; // update the quantity as the item is already there
                setCart(cart);
            } else { // add the item as it does not already exist
                fannyPack.data.data.quantity = 1;
                cart.push(fannyPack);
                setCart(cart);
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}
```

And there we go! We now have our shopping cart functioning with our local storage. Local storage is accessible through each of the front-end routes of our application, so when we go to the `Cart` component, we are able to load in the contents of the cart. We will do just this as we do our next step!

## Step 7: Handling locked down routes

You're doing great! Next we are going to handle the interactions with our shopping cart, and work with locked down routes. Often, we do not want just anybody to be able to access all of the routes of our application. This poses risks such as allowing another user to complete a shopping cart purchase on another user's behalf. We use our token that we retrieved at login to act as a validation to ensure that the user that is calling the endpoint is properly verified. We are going to lock down our `/fannies/purchase` route using this idea.

Within the `fannyRoutes.js` file, let's stub out our new endpoint.

```js
// fannyRoutes.js
router.route('/purchase')
    .post(async (req, res, next) => {
        try {

        } catch (e) {
            next (e);
        }
    });
```

For the sake of our application, we would like this purchase route to simply calculate the total cost of all of the fanny packs in the shopping cart, and return this as a response. In a real world application, this route would likely handle something more like a credit card payment.

We are able to use middleware to perform our authentication. Middleware are functions that are passed control during the execution of asynchronous functions. In other words, these functions will run prior to the rest of our asynchronous function running. Within the `middleware` folder, create a new file called `auth.js`.

We are going to also need to write a new function within our `tokenService.js` that will verify our token for us. Jsonwebtoken offers a method called `.verify` that completes this verification for us. We will utilize this method within a helper function inside of our `tokenService.js` file.

```js
// tokenService.js
exports.verifyToken = async (token) => {
    return jwt.verify(token, SECRET);
};
```

Now that we have this helper verification available to us, let's import these functions into our `auth.js` middleware.

```js
// auth.js
const tokenService = require('../utils/tokenService');
```

When calling a locked down route, the expectation is that the token is passed in with the request. The token is passed through using an `Authorization` header. As we know of the prescence of this header, we will parse out the value that is passed along. The request body has this header in the event the call is made with axios. We will therefore access the header via the `req.body`.

```js
// auth.js
module.exports = async (req, res, next) => {
    const authHeader = req.body.headers['Authorization'];
}
```

If the authorization header is not present, this means that the locked down route is not being properly used, and therefore is immediately an error. If the header is present, we need to get the token out of the header and then pass it to our verify token helper function to ensure that it is valid. 

```js
// auth.js
module.exports = async (req, res, next) => {
    const authHeader = req.body.headers['Authorization'];

    if (!authHeader) {
        next(new Error('invalid request'));
    } else {
        try {
            const [prefix, token] = authHeader.split(' ');
            const decoded = await tokenService.verifyToken(token);
            if (decoded) {
                req.token = decoded;
                next();
            } else {
                next(new HTTP401Error());
            }
        } catch (e) {
            console.error(e);
        }
    }
}
```

Now that we have this functionality available to us, we can import it into our route files and quite simply lock down any routes that we choose. In `fannyRoutes.js` let's lock down our `/purchase` route. First, be sure to import the middleware:

```js
// fannyRoutes.js
const requireAuth = require('../../middleware/auth');
```

And then use the middleware wherever you please!

```js
// fannyRoutes.js
router.route('/purchase')
    .post(requiresAuth, async (req, res, next) => {
        try {

        } catch (e) {
            next (e);
        }
    });
```

Wow! Our route is now locked down. The middleware function will execute first, followed by the contents of the function body. We are going to write one more helper function in our service file that will generate an order confirmation number for us. The expectation here is that when the `/purchase` endpoint is called, the front-end will pass in a list of fanny pack objects. In our `fannyService.js` file, let's create a function called `generateOrderNumber` that will generate a random 8 character order number for us.

```js
// fannyService.js
exports.generateOrderNumber = () => {
    const orderConfirmationLen = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let orderNum = '';
    for (let i = 0; i < orderConfirmationLen; i++) {
       orderNum += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return orderNum;
}
```

These service methods are already imported into our routes file, so let's make use of this new function within our `/purchase` route.

```js
// fannyRoutes.js
router.route('/purchase')
    .post(requiresAuth, async (req, res, next) => {
        try {
            const orderNum = await fannyService.generateOrderNumber();
            res.status(200).send({
                orderNum: orderNum
            });
        } catch (e) {
            next (e);
        }
    });
```

We then return the `orderNum` as the response from the request.

### Front-end

Let's use the new endpoint on our front-end! The first action we want to complete is loading our cart items so that we can display them on the page. Recall, our cart items are stored in local storage, and are not being loaded via an API call. We are going to load our cart items into our state. Recall that we wrote a `getCart` function earlier in our cart service that allows us to access all of the cart items.

Let's import this into our file so that we can use it:

```js
// Cart.js
import { getCart } from '../../services/cartService';
```

Now let's use this function to assign our cartItems in state.

```js
// Cart.js
constructor(props) {
    super(props);
    this.state = {
        cartItems: getCart()
    }
}
```

Within the render function, you will see that the code is already set to map through the cartItems, so you should start to see your cart items start appearing on the page!

Finally, we are going to write the `completePurchase` function, which gets called when the purchase button the page is selected. It is within here that we will be using our `/purchase` endpoint.

Let's start with the function stub:

```js
// Cart.js
async completePurchase() {
    try {
        
    } catch(e) {
        console.error(e.message);
    }
}
```

Recall, when we call the endpoint in axios, we are going to have to pass in information with the request. The information that we will be passing is the token that will be passed within the `Authorization` header.

Let's import the `getToken` function that we wrote in our tokenService. 

```js
// Cart.js
import { getToken } from '../../services/tokenService';
```

We can now format our axios request:

```js
// Cart.js
async completePurchase() {
    try {
        const orderConfirmation = await axios.post(`/api/fannies/purchase`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        console.log(orderConfirmation);
    } catch(e) {
        console.error(e.message);
    }
}
```

The `orderConfirmation` variable should now hold the randomly generated order confirmation number.

We will now set the `orderConfirmationNum` within our state so that we can access it for our receipt generation. Where we were completing the console.log of the purchase in our `completePurchase` function, we will instead set the new state.  

```js
// Cart.js
async completePurchase() {
    try {
        const orderConfirmation = await axios.post(`/api/fannies/purchase`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        this.setState({
            orderConfirmationNum: orderConfirmation
        });
    } catch(e) {
        console.error(e.message);
    }
}
```

At the bottom of the render function, you will find a conditional render that displays in the event that `orderConfirmationNum` is a string longer than 0 characters. As a result, now when you select the `Place Order` button, if the call to the API goes as planned, we will now see a confirmation message with our order number.



Options for extension:

1. Make the cart a persisting cart by adding the cart items into their own collection in the database that is associated with the logged in user.
2. 

