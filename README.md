# My-Blog

This is a simple project that creates a node.js server.

User can access a blog page that is hosted on the server.

There are several pages here

- A blogs page which shows all the blogs that are currently saved in the database.
- An about page which is just a static page with static about information.
- A create blog page that allows the user to create a blog.

The different files and folders used in this project and the functionality are as follows 

- server.js : This file contains pure node code to create server and send response.This file is not being used in this project.It is kept inorder to compare between express code and node code.
- app.js : This is our main file.It contains the route to various requests made by the user.Mongobd database is also connected at this file.
- public folder : contains the static files,that is the stylesheet that is linked using a middleware.
- views folder : It contains the ejs code for various pages that are being hosted by the server.404.ejs is available to be displayed when a user makes an invalid request.
- /views/partials : This folder contains three files mainly footer.ejs,head.ejs and nav.ejs which is used to store the code for reused frontend components.
- /models/blog.js : This file is used to create a schema for the mongodb document.

Functionalities provided by My-Blog

- View all the blogs saved in the database.
- Create a new blog and save in the database.
- Delete a blog
