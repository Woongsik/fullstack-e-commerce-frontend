<a name="intro"></a>
# Fullstack E-commerce Frontend
  Hi, this is a frontend part of Fullstack project at Intergify 2024.
  
  This fronted provides nice UI/UX design according to the data from the backend to simulate E-commerce web site. 

  Basically try to mimic the E-commerce site and make the site fully functional both frontend and backend side in my own way. 
  Simulate the way of Payment, Mailing, Hosting Images, Authenticate, Google account login etc.
  
  I enjoyed the project with full of joy and also with lots of obstacles, but really had fun!  
  
  Check out the result here
  Frontend: (https://cool-awsome-shopping.netlify.app)[https://cool-awsome-shopping.netlify.app]
  Backend: (https://fs17-fullstack.onrender.com/api/v1/products)[https://fs17-fullstack.onrender.com/api/v1/products]

<a name="table_of_contents"></a>
## Table of Contents
   - [Introduction](#intro)
   - [Table of Contents](#table_of_contents)
   - [Getting Started](#getting_started)
      - [Prerequisites](#prerequisites)
      - [Clone the project](#clone)
      - [Set environment variables](#setEnv)
      - [Install and run](#install)
      - [Navgiate](#navigate)
   - [Usage](#usage)
      - [Scripts](#scripts)
      - [Features](#features)
      - [Architecture and Design](#architecture_design)
      - [Testing](#testing)
      - [Deployment](#deployment)

<a name="getting_started"></a>
## Getting Started
   <a name="prerequisites"></a>
   ### Prerequisites
   - node `^19.2.0`
   - npm `^9.2.0`

   Make sure you have [npm](https://www.npmjs.com/get-npm) installed globally.

   <a name="clone"></a>
   #### 1.Clone the project:
   ```bash
   $ git clone https://github.com/Woongsik/fullstack-e-commerce-frontend.git
   $ cd fullstack-e-commerce-frontend
   ```

   <a name="setEnv"></a>
   #### 2. Set envrionment variables 
   Check the .envExample file and set variables into .env
   !This should be done to run the the app!

   <a name="install"></a>
   #### 3.Install and run:

   ```bash
   $ npm install   # Install project dependencies
   $ npm start     # Compile and launch on local environment
   ```

   <a name="navigate"></a>
   #### 4. Navigate to [http://localhost:3000](http://localhost:3000)

<a name="usage"></a>
## Usage:
   <a name="scripts"></a>
   ### Scripts
   In the package.json, below scripts are used.
   Since _msw_ doesn't support axios, additional scripts required for test
   (For the testing purpose, use _fetch_ for mocking server), otherwise axios is used.

   ```bash
     "scripts": {
         "start": "react-scripts start",
         "build": "react-scripts build",
         "test": "react-scripts test --transformIgnorePatterns \"node_modules/(?!@toolz/allow-react)/\" --env=jsdom",
         "eject": "react-scripts eject"
      },
   ```
   <a name="features"></a>
   ### Features
   - Sending queries to server for filtering
      - Find all products: (GET) http:localhost:8080/api/v1/products
         - pagination: ?offset=0&limit=10
      - Find a product: 
         - base url: (GET) http:localhost:8080/api/v1/products
            - by title: /?title=Generic
            - by price range: /?price_min=900&price_max=1000
            - by category: /?category=1
            - by joinning filters: /?title=shoes&price_min=900&price_max=1000&category=1
      - Find all categories: (GET) http:localhost:8080/api/v1/categories 

   - Upload image: 
      (POST) http:localhost:8080/api/v1/files/upload
      ```bash
      # Body
      {
         "file": "<Binary File>"
      }
      ```

   - Validations with React-hook-form
   - General style with Material UI
   - JWT for session: (GET) http:localhost:8080/api/v1/users/session
      ```bash
      # Headers
      {
         "Authorization": "Bearer {your access token}"
      }
      ```

   ### Screenshots or GIFs
   ![screenshot of the site home](<./src/assets/images/Screenshot_Home.png>)
   ![screenshot of the site filter](<./src/assets/images/Screenshot_Filter.png>)
   ![screenshot of the site details](<./src/assets/images/Screenshot_Detail.png>)
   ![screenshot of the site orders](<./src/assets/images/Screenshot_Orders.png>)
   ![screenshot of the site payment](<./src/assets/images/Screenshot_Payment.png>)
   ![screenshot of the site welcome email](<./src/assets/images/Screenshot_Email.png>)
   ![screenshot of the site admin products](<./src/assets/images/Screenshot_Admin_products.png>)
   ![screenshot of the site admin banUser](<./src/assets/images/Screenshot_Admin_banUser.png>)

   <a name="architecture_design"></a>
   ### Architecture & Design:   
   
   <a name="testing"></a>
   ### Testing:   
   Testing is done by _Jest_ and _msw_. Since msw is not supporting _Axios_, 
   you need to use _Fetch_

   To enable _Fetch_, please set testMode to true, line 28 in src/services/apiService.ts

   All the reducers are tested (productSlice, userSlice, cartSlice, categorySlice)
   Total 33 tests runs and passed in 4 test suites.

   Testing code src/test/redux
   Testing server src/test/shared

   ```bash
      $ npm test   # Testing reducers
   ```
   ![screenshot of the testing result](<./src/assets/images/Screenshot_Test.png>)
   
   <a name="deployment"></a>
   ### Deployment:
   One of most popular deployment tool, [Netlify](https://www.netlify.com/) used. 
   Continuous integration for potential fixes and improvements.
