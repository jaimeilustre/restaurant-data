# Coding Assignment: Displaying Restaurant Data (Frontend)

- Platform: Web application
- Language: Javascript
- Library: React
- Code editor: Visual Studio Code

## Link to the Backend
https://github.com/jaimeilustre/restaurant-data-proxy-server

## Steps to build and compile the React app

1. Navigate to the directory you want to save your app
2. Using Vite, create your app with the following code:
    ``` bash
    npm create vite@latest name-of-app -- --template react
    ```
3. Navigate to this newly created directory and run the following commands
    ``` bash
    npm install 
    code .
    npm run dev
    ```
4. Once done, install the relevant dependencies. In this case it would be:
    ``` bash
    npm install react router dom
    npm install axios
    ```
5. From there, proceed with the app with all the requirements you need to meet

## Steps to run the app locally

1. Fork this repo and clone it
2. Navigate to this directory and run the following code to install the relevant dependencies:
    ``` bash
    npm install
    code .
    ```
3. Once done, run the app locally with the following code:
    ``` bash
    npm run dev
    ```

## Assumptions or things that were not clear


## Improvements for future development
- Create a filter function with the cuisines by either making a drop down menu to pick the cuisines of your choice or listing all the cuisines and making them clickable to filter your favourites.
- Use a map to display the address of the restaurant since the coordinates are present in the API. This can be done by using a react map package or using Google Map's developer features.
- Create a sorting function where you can sort the restaurants by their name or rating for example.