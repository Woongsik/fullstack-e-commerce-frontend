<a name="intro"></a>
# Introduction
   Deveoping a e-commerce web site using open api, [platzi store](https://fakeapi.platzi.com/).
   This api provides a wide range of stuff used in real e-commerce services,
   ie. able to get all the products with pagination or find a product with title, price range, category parameters etc.
   Also allow us to register/update product as admin (including file image upload to server well). 

   JWT is used for user session, the access token is valid for 20 days, and the refresh token is valid for 10 hours.
   Once you are logged in, JWT token is saved in localStroage and will be used for user session.

   You can check out here [super cool shopping](https://super-cool-shopping.netlify.app)

<a name="table_of_contents"></a>
## Table of Contents
   - [Introduction](#intro)
   - [Table of Contents](#table_of_contents)
   - [Getting Started](#getting_started)
      - [Prerequisites](#prerequisites)
      - [Clone the project](#clone)
      - [Install and run](#install)
      - [Navgiate](#navigate)
   - [Usage](#usage)
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
   $ git clone https://github.com/Woongsik/fs17-Frontend-project.git
   $ cd fs17-Frontend-project
   ```

   <a name="install"></a>
   #### 2.Install and run:

   ```bash
   $ npm install   # Install project dependencies
   $ npm start     # Compile and launch on local environment
   ```

   <a name="navigate"></a>
   #### 3. Navigate to [http://localhost:3000](http://localhost:3000)

<a name="usage"></a>
## Usage:
   Scripts: List the available scripts in package.json like start, build, test, and what they do.
   Features: Break down the main features of your application and how to use them.
   Screenshots or GIFs: Visual aids can help users quickly understand what the project looks like in action.

   ### Scripts
   In the package.json, scripts are used for start, build , test
   Since msw doesn't support axios, additional scripts required for test

   ```bash
     "scripts": {
         "start": "react-scripts start",
         "build": "react-scripts build",
         "test": "react-scripts test --transformIgnorePatterns \"node_modules/(?!@toolz/allow-react)/\" --env=jsdom",
         "eject": "react-scripts eject"
      },
   ```
   ### Features
   - Find all products: (GET) https://api.escuelajs.co/api/v1/products
      - pagination: ?offset=0&limit=10
   - Find a product: 
      - base url: (GET) https://api.escuelajs.co/api/v1/products
         - by title: /?title=Generic
         - by price range: /?price_min=900&price_max=1000
         - by category: /?categoryId=1
         - by joinning filters: /?title=Generic&price_min=900&price_max=1000&categoryId=1
   - Find all categories: (GET) https://api.escuelajs.co/api/v1/categories 

   All the features will be handled in a filter of the website 

   - Upload image: (POST) https://api.escuelajs.co/api/v1/files/upload
      ```bash
      # Body
      {
         "file": "<Binary File>"
      }
      ```
   - Login: (POST) https://api.escuelajs.co/api/v1/auth/login
      ```bash
      # Body
      {
         "email": "john@mail.com",
         "password": "changeme"
      }
      ```
   - Get user with session: (GET) https://api.escuelajs.co/api/v1/auth/profile
      ```bash
      # Headers
      {
         "Authorization": "Bearer {your access token}"
      }
      ```
   ### Screenshots or GIFs
   ![screenshot of the site](<Screenshot.png>)

   <a name="architecture_design"></a>
   ### Architecture & Design:
   Folder Structure: Briefly explain the organization of important directories and files.

   Data Flow: Describe how data flows in the application, especially if you’re using tools like Redux or Context API.

   Component Structure: Explain the main components and their relationships, possibly using a diagram.
   
   <a name="testing"></a>
   ### Testing:   
   Testing is done by _Jest_ and _msw_ for mocking the server.
   Since msw is not supporting axios, there are two types of testing code.
   xxx.test.ts is for axios (Focused on reducer)
   xxxWithMockingServert.test.ts is for fetch (Focused on server)

   To avoid, potential error, axios is used for the site.
   If you want to fully check the test code, please use fetch in src/services/apiService.ts 
   Just comment axios and remove fetch's comment.

   Currently all the reducers tested (productSlice, userSlice, cartSlice, categorySlice)
   Total 128 tests runs and succeeded in 7 tst suites.

   Testing code src/test/redux
   Testing server src/test/shared

   ```bash
      $ npm test   # Test
   ```
   
   <a name="deployment"></a>
   ### Deployment:
   One of most popular deployment: [Netlify](https://www.netlify.com/) used for the deployment/hosting. 
   Use the continuous integration
