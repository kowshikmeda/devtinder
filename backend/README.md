-create a repository
-Intialize the repository
-node_modules,package.json,package-lock.json
-Install express
-Create a server
-Listen to port 3000
-Write request handlers for /test,/hello
-Install nodemon and update the scripts inside package.json
-What are dependencies
-what is "-g" in while npm install
-what is difference between caret and tilde(^ vs ~) in package.json


-initialize git
-.gitignore
-create a  remote repo on github
- push code to remote origin
-play with routes and route extension ex:/hello,/,/hello/2,/test,/xyz..
-order of route matter a lot
-Install Postman app for API testing create workspace/collection>testAPI calls
-Write logic to handle GET,POST,PUT,DELETE,PATCH API calls and test them on Postman
-Explore routing and use of *,+,(),? in routes
-usage of regex in routes /a/,/.*fly$/
-Reading query params in routes /user?userid=101
-Reading dynamic params in routes /user/:id

-Multiple route handlers - play with code
-next()
-next function and errors along with res.send()
-app.use("/user,[rh1,rh2,rh3],rh4,rh5,[rh6,rh7])
-What is middleware?Why do we need it?
-How express Js basically handle request behind the scenes
-Difference between app.use() and app.all()
-Create a dummy auth middleware for admin
-Create a dummy auth middleware for all users routes except /user/login
-Error handling in app.use("/",(err,req,res,next)=>{})

-Create a free cluster in mongodb offical website (atlas)
-Install mongoose library
-Connect your application with database "connection string"/devtinder
-Call the connecctDb function and connect to database before starting application listen port 3000 
-Create a userSchema & userModel
-Create a POST /signup API to add data to database
-Push some documents via API calls with Postman
-Error handling using try,catch

-JS object vs JSON(difference)
-Add the express.json() middleware to your app
-Make your /signup API dynamic to receive data from the end user
-User.findOne() with duplicate emailIds,which object will returned
-API get user by  emailId
-API get feed -get all users from database
-API get user by ID
-Delete a userAPI
-Difference between PATCH and PUT
-Update a user API
-Explore the mongoose documentation for models methods
-What are options in model.findOneAndUpdate method,explore about it
-API update user by emailId

-Explore schemaTypes options in documentation
-add required,unique,lowercase,min,max,minLength,maxLength
-Add default
-create a custom validator for gender
-Improve the DB schema - put all apprioriate validations on each fields in schema
-Add timestamps to Userschema
-Add API validation on PATCH request & signup POST API
-Data Sanitization-Add API validation on each field
-Install validator
-Explore validator library function and use validatorfunctions for email,password,photourl
-Never Trust req.body


-Validate the data in signup API
-Install bcrypt package
-Create a passwordHash using bcrypt.hash func and save the user with encrypted password
-Create login API
-Compare passwords and throw errors if email or password is invalid


-Install cookie-parser
-just send a dummy cookie to user
-create a /profile API and check if you get cookie back
-install jsonwebtoken
-In /login API after email and password validation create a jwt token and send it to user in cookies
-read the cookie in /profile API and find the loggedIn user
-userAuth middleware is created
-Add the userAuth middleware in profile API and a new sendConnectionRequest API
-Set the expiry of token and cookies to 7days
-Create userschema method getJWT()
-Create userschema method to compare Password(passwordInputByUser)

-Explore Tinder API's
-Create a list API that all you want in devtinder
-Group multiple routes under respective router
-Read documentation for express.Router()
-Create a routes folder for managing auth,profile,request router
-Create authRouter,profileRouter,requestRouter
-Import these routers in app.js
