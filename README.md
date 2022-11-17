# Ecommerce-Microservices
The codes are to implement the REST APIs for updating user's cart and retrieving products list

Install node js and express and mongoose using
npm install express
npm install mongoose

Open the project folder in VS Code.
For usercart api, product folder must be downloaded first (as it acts as downstream api). Then in the index.js file, replace the location of the product api with the location where it is downloaded in your system.
Substitute the mongodb connection string in mongoose.connect() in both the index files.
Use the command "npm start" in the terminal of the folder to run.
Browser can be used to type the get request url and view the results. For put requests, postman can be installed, data can be written in the body, select the data form to be raw and file type as json.

