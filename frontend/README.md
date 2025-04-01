#Devtinder

-create a vite+react application
-remove unecessary code and create hello world in app
-installed tailwind css for vite
-install daisy ui
-Add navbar component in app.jsx
-create a separate Navbar.jsx  component file
-install react-router-dom
-create BrowserRouter>Routes>Route=/ Body>Route Children
-create an outlet in Body component
-create a footer
-create a login page
-install axios
-CORS-install cors in backend =>add to middleware with configurations :origin,credentials:true
-whenever you're making  API calls we pass axios=>{withCredentials :true}
-Install redux toolkit+react-redux read it's documentation
-Configuration store =>Provider =>Create Slice =>add reducer to store
-Add redux dev tool to chrome
-Login and see if your data is properly coming to the store
-Navbar should update as soon as user login in
-Refactor our code to add constant file + create componente folder
-You should not use other routes without login
-If the token is not present then redirect to login
-Logout
-Get the feed and add the feed in the store
-Build user card on feed
-Edit profile Feature
-Show toast message on save profile
-New page-See all connections
-New page-See all connection requests
-Feature : Accepted/Rejected a connectionRequest
-Send/Ignore the user card from feed 
-Signup the new user
-E2E testing


-body
  Navbar
   route=/=> Feed
   route=/login => Login
   route=/profile => Profile
   route=/connections => Connections

#Real time chat using websocket(socket.io)
 -Build UI for for chat window for /chat/:targetUserId
 -Setup socket.io in backend
 -npm i socket.io
 -Setup frontend socket.io-client
 -Intialize the chat
 -create a socketconnection
 -Listen to events
 
