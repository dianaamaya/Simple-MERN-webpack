# Simple MERN - webpack

This application allows users to create/read/update/delete tasks. This project was developed with webpack and MERN Stack (MongoDB, ExpressJS, ReactJS and NodeJS).

## INSTALATION

1. prepare database
2. install the required modules in frontend: npm install

## RUN PROJECT
npm start - to run in production mode  
npm run dev - to run in dev mode  
npm run webpack - to run create a new bundle.js file

## STRUCTURE

- src : all server
    - app : all components (index is the main component)
    - models: database schemes
    - public: html and javascript (transformed) files
    - routes: handles requests made by the client and get data from database
    - database: connection to the database
    - index: file that handles all application

## DESCRIPTION

**Actions:**

- User can Create tasks 
- User can Read tasks 
- User can Update tasks 
- User can Delete tasks 

**Process that the application does to show data in the views:** 

- User requests data to the server (HTTP)
- Server listens to the route
- Depending on the path, route do some action
- data is obtained through the previously created model
- Server respond the required data 

