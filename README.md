<a name="intro"></a>
# Introduction
   Deveoping a e-commerce web site using open api, [platzi store](https://fakeapi.platzi.com/).
   This api provids wide range of stuff that is used in real e-commerce web site.
   ie. able to get all the products or find a product with title, price, category parameters.
   also allow us to register/update product as a admin role. (including file image upload to server well) 

   JWT is also avaialbe for user session, the access token is valid for 20 days, and the refresh token is valid for 10 hours.
   Once you are logged in, JWT token is saved in localStroage and will be used for user session.

   You can check out here [super cool shopping](https://super-cool-shopping.netlify.app)

<a name="table_of_contents"/>
## Table of Contents
   For long READMEs, it’s helpful to have a table of contents to navigate through different sections.
   [Introduction](#intro)
   [Table of Contents](#table_of_contents)
   [Getting Started](#getting_started)
      - [Prerequisites](#prerequisites)
      - [Clone the project](#clone)
      - [Install and run](#install)
      - [Navgiate](#navigate)
   [Usage](#usage)
      - [Architecture and Design](#architecture_design)
      - [Testing](#testing)
      - [Deployment](#deployment)

<a name="getting_started"/>
## Getting Started
   Prerequisites: List the software, tools, and versions you need to run the project.
   Installation:Clone the repo: Provide the git command to clone your project.
   Set up the environment: Mention if there are any environment variables to set, config files to update, etc.
   Installation steps: Detailed steps to install dependencies, for example using npm install or yarn.

   <a name="prerequisites"/>
   ### Prerequisites
   - node `^19.2.0`
   - npm `^9.2.0`
   Make sure you have [npm](https://www.npmjs.com/get-npm) installed globally.

   <a name="clone"/>
   #### 1.Clone the project:
   ```bash
   $ git clone https://github.com/Woongsik/fs17-Frontend-project.git
   $ cd fs17-Frontend-project
   ```
   <a name="intall"/>
   #### 2.Install and run:

   ```bash
   $ npm install   # Install project dependencies
   $ npm start     # Compile and launch on local environment
   ```

   <a name="navigate"/>
   #### 3. Navigate to [http://localhost:3000](http://localhost:3000)


<a name="usage"/>
# Usage:
   Scripts: List the available scripts in package.json like start, build, test, and what they do.
   Features: Break down the main features of your application and how to use them.
   Screenshots or GIFs: Visual aids can help users quickly understand what the project looks like in action.
   
   <a name="architecture_design"/>
   # Architecture & Design:
   Folder Structure: Briefly explain the organization of important directories and files.
   Data Flow: Describe how data flows in the application, especially if you’re using tools like Redux or Context API.
   Component Structure: Explain the main components and their relationships, possibly using a diagram.
   
   <a name="testing"/>
   # Testing:
   Mention the testing libraries/frameworks used.
   Explain how to run tests.
   If applicable, describe the structure of your tests (unit, integration, end-to-end).
   
   Testing code is done by _Jest_
   This stage, all the reducers tested (productSlice, userSlice, cartSlice, categorySlice)
   Total 70 tests runs and succeeded.
   Testing code src/test/reducers
   ```bash
   $ npm test   # Test
   ```


   <a name="deployment"/>
   # Deployment:
   Detail the steps required for deploying the project to a server.
   Mention any specific hosting platforms, CI/CD pipelines, or other tools used.

   (Netlify)[https://www.netlify.com/] is used for the deployment/hosting. 
   Use the continuous 
