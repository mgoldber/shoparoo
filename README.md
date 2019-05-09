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

You should now create an `index.js` file inside of your utils folder. We are going to write a function inside of the `index.js` file called `applyMiddleware`. 

TODO: ADD NOTES ON HOW THIS FUNCTION ACTUALLY WORKS.

This function should be written as the following:

```js
exports.applyMiddleware = (middlewareWrapper, router) => {
    for (const wrapper of middlewareWrapper) {
        wrapper(router);
    }
}
```

As we have exported the function, we can now import it into our `server.js` file. This can be done with the following line:

```js
const { applyMiddleware } = require('./utils'); 
```

We are using destructuring, as well as the built in functionality of require that specifies that since we are only telling it to look in the utils folder, that it will reference the `index.js` file.

The next thing that we are going to do is ensure that our routing is set up. 

The initial functionality that we want to set up is authentication.

// AUTHENTICATION

In order to ensure that we are able to handle authentication for our application, we need to be able to store users in our database. In order to this up, we are going to create a folder called `users` within our `routes` folder. The process to set up our users routes can be duplicated for all additional routes that we want to set up.

Within our `users` folder, we are going to create three separate files. The files will be called `userModel.js`, `userRoutes.js`, and `userService.js`.

`userModel.js`: This will be responsible for setting up our user schema, as well as identifying behaviours that should occur when interacting with the user model.

`userRoutes.js`: We will specify the logic that will happen when hitting different endpoints related to our users.

`userService.js`: This will contain helper functions that we can use within our routes to perform important actions.

Lets start with the `userModel.js` file. We create our schemas with Mongoose. We should add the following imports to the top of `userModel.js` in order to set up our schema.

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;
```

As we have imported our destructured Schema, we can use it to create our user schema. The following is the structure to set up a new schema:

```js
const userSchema = new Schema({

});
```

We would like for each of our users to have an email and a password that will allow them to login. Therefore, we need to add this to our user schema:

```js
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

Both of these fields are required in order for the user to be valid. So we use the built in `required` flag in Mongoose that allows us to specify that the user should not be saved if these fields are not present. We will also make use of the `unique` flag for the email property to ensure that no two users in our system have the same email. 

Mongoose exposes a pre-save hook called the `.pre` method that allows us to specify functionality that should execute prior to the save function being called. This is very useful for specifying important actions that must occur prior to the new entry being saved in our database. For example, though we specifide the password type as `String` within our schema - this should never be saved as a plaintext string. We are going to use the `pre` method to hash a password so that we can appropriately encrypt our password prior to saving the user in our database.

We are going to utilize a popular encryption module called bcryptjs. This module exposes a hash function that completes a randomized hash for us and returns a string that we can safely store within our database without risking dangerously storing plaintext passwords. Return to your commandline and run the following command:

```shell
npm install brcryptjs
```

Then within your `userModel.js` file, you can require the module.

```js
const bcrypt = require('bcryptjs');
```

Now we can start writing our pre method that will complete the hashing of our password. The syntax for this method is as follows:

```js
userSchema.pre('save', async function(next) {

});
```

This method takes two arguments. The first argument is the event trigger (which is passed in as a string), and the second argument is the callback function to execute. We are specifying `save` as the event that we wish to trigger this event prior to.

We are going to take advantage of some built in Mongoose methods that will let us know if the user's password is being changed, or if a new user is being created. The `.isModified` method returns true if the specified document was modified. The `.isNew` method returns true if the document is new. We only want to hash our password in the event that one of these cases are true.

```js
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password') || user.isNew) {

    }
});
```

Within the conditional check we are going to hash the password, and assign it to our user password field. The `.hash` method allows us to pass the plaintext password, as well as a value for the number of salt rounds that we would like to secure our password with.

```js
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

We utilize the `next()` function. This specifies that the next action should occur following all of the actions that run in our pre save. We will add the next function wherever the pre function has completed its work. In the event that an error is thrown, we are able to pass this into the `next()` function as well.

```js
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
exports.model = mongoose.model('User', userSchema);
```

Next, we are going to work on the routes file for our users. Go into your users folder and create a new file called `userRoutes.js`.

Within our `userRoutes.js` file, we are going to need to access express in order to access the router and set up our various routes. At the top of our `userRoutes.js` file lets bring in express and router.

```js
const express = require('express');
const router = express.Router();
```

The `.route()` method on the router object allows us to specify the endpoint that we are intending to hit. We are going to set up the route for when the user hits in the endpoint of /api/users/. Each of the routes that we specify within our `users` folder here will assume the start of /api/users.

Router lets us specify the HTTP method that we are interested in of our familiar methods (GET, POST, PUT, DELETE). Depending on the way that the call is made, the code will vary even if the same endpoint is hit. For example, if the application sends a request of /api/users/ as a GET request, this does not necessarily need to behave the same way as sending a request to /api/users as a POST request. When we send a POST request to /api/users/, we would like for our API to create a new user. This can be set up as the following:

```js
router.route('/')
    .post(async (req, res, next) => {

    });
```

We are specifying the '/' endpoint, as well as stating that this is the code that will be run in the event that the request is sent as a POST request.

We could write all of our code within here, but for modularity, we like to separate out our code. We are going to utilize our `userService.js` file to write our helper function of creating a user based on the body of information that is sent in the request body.

In our `userService.js` file we are going to need access to our user model. Remember, this is essentially a skeleton of how we want each user in our system to look. We can import the model into our service file by doing the following:

```js
const { model: User } = require('./userModel');
```

We are going to write a helper function to create our user. In order to do this, we would like to instantiate a new instance of our user model, and then save the user to our database.

As this is a helper function that we are going to be using elsewhere, we need to be sure to export the function.

```js
exports.createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (e) {
        throw e;
    }
}
```

`.save()` is a method in mongoose that allows us to save a document into our MongoDB database. 

Now that we have this function available to us, we can return to our `userRoutes.js` file and add the necessary code to create a user in the event that the application sends a post request to a our /api/user endpoint.

At the top of the file, ensure that you import the userService functions so that we have access to these helpers.

```js
const userService = require('./userService');
```

With these functions now available, you can add the following code:

```js
router.route('/')
    .post(async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json({
                data: [user]
            });
            logRequest(req, res);
        } catch (e) {
            next(e);
        }
    });
```

This tells our application to create a new user, and send a response of the user object with a status of 201 to assure us that the user has been created.

Finally, we want to ensure that our routes are being appropriately exported. At the bottom of the file, add the following line:

```js
exports.router = router; 
```

// ADD NOTES HERE ON INCORPORATING SIGN UP FLOW WHICH DOES THE CREATE USER CALL - WITHIN THE REACT APP

Now that we are able to register a new user, we want to ensure that this user is able to sign in, as well as have a token generated in order to continue navigating the application, and accessing the routes that may be locked down.

We are going to add a route into our `userRoutes.js` file that will handle our login for us. The expectation for what should happen at this endpoint is the following:

1. Verify that the user is an actual user in our system.
2. Verify the user login details.
3. Generate a random token for the user. 

We will start with adding the familiar route structure that we use to provide code for any of our routes. The following can go below our `/` route:

```js
router.route('/login')
    .post(async (req, res, next) => {
        
    });
```

We are going to use more helper functions to help us accomplish the above mentioned actions. The first function we need is to check if the user exists in our system. We will add the following to our `userService.js` file:

```js
exports.isUser = async ({ email, password }) => {

}
```

This will use the user's email to run the mongoose method of `.find()` to see if a user with that email exists as an entry in our database. In the event that the user is found, we will use another mongoose method called `comparePassword()` that securely checks if a provided password matches the salted password in the database.

We can add the following to the above code:

```js
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

We can now confidently return the user if found is found in the database, and the password provided at the login stage matches. Next, we are going to focus on the token generation.

To keep our code clean, we are going to create a new services file that will handle all actions related to our token.

Inside of our `utils` folder, we will create a new file called `tokenService.js`. This file is going to use JWT in order to generate the random token for us. On your command line, run `npm install jsonwebtoken` in order to bring in the necessary module to get this random token generation working.

At the top of your `tokenService.js` file, add the following line:

```js
const jwt = require('jsonwebtoken');
```

We are going to create a function to issue a new token. We are going to pass the user information in so that we can be sure that the token that is being generated is the one related to the specified user. Each entry in our MongoDB has a unique ID that we can use to uniquely identify the user.:

```js
exports.issueToken = async (userData) => {
    const { _id: id } = userData;

    const payload = {
        user: {
            id
        }
    }
}
```

We are going to use a built in method available on the jwt object called `.sign()`. The `.sign()` method takes in a payload, a secret key, and an optional callback and generates a token. In this case, we have the payload which is the user object, however, we still need a secret key. We are going to put our secret key in our constants file. Inside our `constants.js` file within our `utils` folder add the following line:

```js
exports.SECRET = process.env.SECRET || 'super-secret-passphrase';
```

The passphrase can be whatever you want it to be as long as it remains secret.

We can then return to our `tokenService.js` file and import our secret key from our constants file with the following line:

```js
const { SECRET } = require('./constants');
```

Inside our issueToken function that we were writing previously, we can now add the call to the `.sign()` method.

```js
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

Now that we have written the necessary helper functions for our login, we can return to our `userRoutes.js` file to complete all of the actions related to a user login.

```js
router.route('/login')
    .post(async (req, res, next) => {
        try {
            const user = await userService.isUser(req.body);
            if (user) {
                const token = await tokenService.issueToken(user);
                res.status(200).json({
                    data: [{
                        token
                    }]
                })
                logRequest(req, res);
            } else {
                next()
            }
        } catch (e) {
            next(e);
        }
    })
```

// TIE IN THE REACT LOGIN FORM COMPONENT TO CALL THAT ENDPOINT AND PRINT OUT THE TOKEN THAT IT RETURNS

/---------------------------------------------
ADD NOTE ON SPECIAL PROXY THINGY THAT CREATE-REACT-APP REQUIRES IN DEVELOPMENT
https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
THIS IS TO ENSURE THAT A SERVER AND CLIENT CAN BE RUNNING IN THE SAME PROJECT
---------------------------------------------/

USE WINDOW LOCAL STORAGE TO STORE THE TOKEN IN THE CURRENT WINDOW AND ALLOW US TO ACCESS RESTRICTED ROUTES (THIS IS ADDED INTO THE CLIENT APPLICATION INSIDE OF THE SERVICES FOLDER IN THE FILE CALLED TOKENSERVICE.JS)

## Step 3: Working with routing

We are going to set up a separate route for our shopping cart. This will be a separate page that will contain all of the items that we have added to our shopping cart. We are going to use an npm module called `react-router-dom` to set up our routes. `react-router-dom` allows us to specify the components that should render when a different URL is hit. For example, if we hit a URL akin to /shoppingcart/ inside of our application, the should render a component that handles the logic related to the shopping cart (i.e. fetching all of the shopping cart items). Note that this will be behind a restricted route that will require our token because we want to ensure that only the items that our logged in user has added to their shopping cart are shown, and not the shopping cart items of all users.

Now that we have had the user login which generates a token, we need to ensure that we have this token available to us throughout the application. To accomplish this, we are going to utilize `localStorage` available on our window object. This will allow us to access our token anywhere we need it in order to use to it access our restricted routes.




