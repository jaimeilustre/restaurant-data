# Coding Assignment: Displaying Restaurant Data (Frontend)

- Platform: Web application
- Languages: Javascript and CSS
- Library: React
- Code editor: Visual Studio Code
- Preferred browser to run application: Google Chrome

## Link to the Backend
https://github.com/jaimeilustre/restaurant-data-proxy-server

## Steps to build and compile the React app

1. Navigate to the directory you want to save your app.
2. Using Vite, create your app with the following code:
    ``` bash
    npm create vite@latest name-of-app -- --template react
    ```
3. Navigate to this newly created directory and run the following commands:
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
5. Navigate to the `main.jsx` file in the root folder and import `BrowserRouter` from `react-router-dom`. Once imported, wrap it around the `App` component: It should look like this:
    ``` bash
    // main.jsx
    // ...

    import { BrowserRouter } from 'react-router-dom'
    // ...

    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>,
    )
    ```
    By doing this, we allow client-side routing within the React application, where dynamic updates can happen without having the page to fully reload.

6. This completes the basic setup for the react app. From here onwards, proceed with the app with all the requirements you need. In this specific case, this is outlined in the following steps.

7. In the root folder, create a new folder called `pages`. This will allow us to store pages that we create for the React app. In this case, create two pages, one called `RestaurantListPage.jsx` to display the list of restaurants by postcode, and one called `HomePage.jsx` which displays a search bar where we can type the postcode we want to search. For the initial setup of the page, you can use the following code:
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    function RestaurantListPage() {
        return(
            <h1>Hello world!</h1>
        )
    }
    
    export default RestaurantListPage
    ```
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    function HomePage() {
        return(
            <h1>Hello world!</h1>
        )
    }
    
    export default HomePage
    ```
    Please note that this is done just to check if the pages are working on the browser with their respective paths for the next step.
    

8. Navigate to the `App.jsx` then import `Route` and `Routes` from `react-router-dom` to set up routes within our React app. Once imported, create the routes you need. In this case, we need two routes for the two pages we created in the previous step. The following code should look like this:
    ``` bash
    // App.jsx
    //...

    import { Route, Routes } from 'react-router-dom'
    import RestaurantListPage from './pages/RestaurantListPage'
    import HomePage from './pages/HomePage'
    //...

    return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants/:postcode" element={<RestaurantListPage />} />
        </Routes>
    </>
    )
    ```
  Note here as well both pages were also imported. Please test the pages and the paths to ensure everything is working before proceeding to the next steps.

9. Navigate to the `RestaurantListPage.jsx` to begin constructing the page to display the list of restaurants. First, we can begin by creating the state variable for the restaurant. This is what it would look like:
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    const [restaurants, setRestaurants] = useState([])
    ```

    This does the following:
    - This uses the `useState` hook that allows functional components to manage state.
    - A state variable `restaurants` is declared and the function `setRestaurants` is used to update the variable.
    - The initial state is set as an empty array.

10. Next thing to do is create the `GET` request for the restaurant data using the Express server we created acting on our behalf on requesting the data from the Just Eat API. This is what it would look like:
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    const {postcode} = useParams()

    const apiUrl = import.meta.env.VITE_API_URL

    const getApiData = () => {
        axios.get(`${apiUrl}${postcode}`)
            .then(response => {
            setRestaurants(response.data.restaurants.slice(0, 10))
        })
        .catch(error => {
            console.log("Error not receiving data")
            console.log(error)
        })
    }

    useEffect(() => {
        getApiData()
    }, [])
    ```
    This does the following:
    - Using `req.params`, the postcode is extracted from the URL parameters.
    - The environment variable `VITE_API_URL` is then accessed using `import.meta.env`
    - Using axios, it then makes a `GET` request to the API endpoint specified. If successful, then the callback function `.then()` is executed. 
        - This callback function uses the function we created earlier `setRestaurants` where the parameter `response.data.restaurants` is used to update our state variable with the list of restaurants from the API response.
        - `.slice(0, 10)` is then added at the end to select the first 10 restaurants.
    - If not successful, then the `.catch()` is executed where the error and error message is logged to the console.
    - The `useEffect` hook is then used to optionally perform side effects. The function `getApiData` (which is whwere we saved our `GET` request) is called within this hook. The dependency array `[]` is left empty in this case, which means it will only run once after the component is mounted.

11. After that, we can start rendering the data on our frontend with the following code:
    ``` bash
    // .src/pages/RestaurantListPage.jsx
    // ...

    return (
        <>
            {restaurants === null
                ? <p>Loading...</p>
                : restaurants.map(restaurant => {
                    return (
                        <div className="restaurant-card" key={restaurant.id}>
                            <div className="restaurant-info">
                                <h2>{restaurant.name}</h2>
                                <h3>{restaurant.cuisines.map(cuisine => cuisine.name).join(', ')}</h3>
                                <h3>
                                    <img className="rating-logo" src={star} alt="text" />
                                    <span>{parseFloat(restaurant.rating.starRating)}</span>
                                </h3>
                            </div>
                            <div className="restaurant-address">
                                <h3>{restaurant.address.firstLine}</h3>
                                <h3>{restaurant.address.postalCode}</h3>
                                <h3>{restaurant.address.city}</h3>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
    ```
    This does the following:
    - A conditional render is created where if the state variable `restaurants` is empty, then a message `"Loading.."` is then displayed. 
    - If `restaurants` does have data, then the `.map()` method is then used to create a new array of restaurants with the information of your choice. As each restaurant is an object, we can use dot notation to access the object keys and values.
        - Using the requirements for this assignement, we are able to display the restaurant name, cuisines, rating, and address.
        - For the cuisines, as the values are stored in an array, we then use the `.map()` method again to create a new array for the cuisines. Using `.join(', ')` at the end, we can then display these cuisines next to each other with a space and comma in between.
        - For the rating, a star logo is added next to the rating number to make it look more realistic and for the rating number, `parseFloat()` is added to ensure that the number is properly rendered as a number and not a string.

12. Please check that everything is working on this page before proceeding with the `HomePage.jsx`.

13. Navigate to the `HomePage.jsx` to begin constructing the page with the search bar. First, like before, we can start by creating the state variables. This is what it would look like:
    ``` bash
    // .src/pages/HomePage.jsx
    // ...

    const [searchPostcode, setSearchPostcode] = useState('')
    const [validPostcode, setValidPostcode] = useState(true)
    ```
    This does the following:
    - The first `useState` hook declares a `searchPostcode` variable with its respective function to update its values. This is where we store the postcode we type in the search bar. Its initial value is set as an empty string
    - The second `useState` hook declares a `validPostcode` variable with its respective function to update its values. More will be explained later, but this is where we would store whether the postcode entered is a valid UK one (true) or not (false). Its initial value is set to true.

14. Next thing to do is to create a search handler to handle what happens when we click the search button. This is what it would look like:
    ``` bash
    // .src/pages/HomePage.jsx
    // ...
    
    const navigate = useNavigate()

    const searchHandler = (e) => {
        setSearchPostcode(e.target.value)
    }

    const postcodeRegEx = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i
  
    const searchButtonHandler = () => {
        if (searchPostcode !== "") {
            if (postcodeRegEx.test(searchPostcode)) {
                navigate(`restaurants/${searchPostcode}`)
            } else {
                setValidPostcode(false)
                setTimeout(() => {
                    setValidPostcode(true)
                }, 1000)
            }
        } else {
            alert('Please enter a postcode')
        }
    }
    ```
    This does the following:
    - The first part is using the `useNavigate` hook to help us later with navigating to the restaurant list page once we hit search.
    - The next part is creating a search handler which is for the `onChange` in the `<input>` later in the rendering. The `e` is the event object and the `.target.value` retrieves the current value of the input field. In this case, it would be what we type in the search bar. This is then used as an argument for the function `setSearchPostcode` to update the state variable.
    - The next part is where we use a Regular Express, or RegEx expression to check that the postcode is a valid UK format. This is what's stated:
        - `/^` Beginning of string
        - `[A-Z]{1,2}` One or two uppercase letters
        - `[0-9]` A single digit
        - `[A-Z0-9]?` An optional alphanumeric character
        - `''` A single space in between
        - `[0,9]` A single digit
        - `[A-Z]{2}` Two uppercase letters
        - `$` End of the string
        - `/i` Case insensitive
    - The next part is the `searchButtonHandler` function, which combines everything we discussed previously.
        - Starting with an `if` statement, we state that if the `searchPostcode` is not empty, and with a nested `if` statement, state that in addition, if the postcode is a valid postcode (`postcodeRegEx.test(searchPostcode)` is used to check the validity with our RegEx), then we navigate to the respective `RestaurantListPage.jsx`.
        - If not a valid postcode, we then update our `validPostcode` state variable to false and we use a `setTimeout()` to set the state variable back to true. This is done as later in the rendering part, a message will pop up briefly reminding to input a valid UK postcdode.
        - On the other hand, if the postcode field in the search bar is empty, then an alert on your browser will pop up stating to enter a postcode.

15. After that, we can start rendering the data on our frontend with the following code:
    ``` bash
    // .src/pages/HomePage.jsx
    // ...

    return (
        <div className="search-body">
            <h1 className="search-header">Search restaurants in your area</h1>

            <div className="search-bar">
                <input
                    type="text"
                    value={searchPostcode}
                    onChange={searchHandler}
                    placeholder="Type postcode here..."
                />

                <button onClick={searchButtonHandler}>Search</button>

            </div>

            {!validPostcode && <p>Please enter a valid UK postcode</p>}
        </div>
    )
    ```

    This does the following:
    - A restaurant header is displayed and below that will be the search bar. This is done by using an `<input>` element with the following information:
        - `type` specifies the type of input. In this case, it would be `"text"`.
        - `value` specifies the input itself. In this case, it would be our state variable `searchPostcode`.
        - `onChange` specifies the function that is called when the input changes. In this case, as mentioned in the previous step, it would be our `searchHandler` function.
        - `placeholder` specifies a piece of text you see in the search bar to help you. In this case, it would be `"Type postcode here..."`.
    - A button is then created with `searchButtonHandler` as our event handler in the `onClick`.
    - Lastly, as mentioned previously, when the state variable `validPostcode` is set to false, a brief message pops up for one second to remind you to enter a valid UK postcode.

16. Please check that everything is working and if it is, congratulations, the app is officially done. Feel free to add some basic CSS to ensure that the data is displayed clearly.

### OPTIONAL: A navbar can also be created to help navigate to the home page quickly and if interested, will be outlined in the next steps.

17. Create a navbar component by first creating a folder in your root folder called `components` and within that folder create a component called `Navbar.jsx`.

18. For a simple navbar using the company's logo, the following code should look like this:
    ``` bash
    // .src/components/Navbar.jsx
    // ...

    import { Link } from "react-router-dom"
    import companyLogo from "../assets/just-eat-logo.svg"

    function Navbar () {
        return (
            <nav className="navbar">
                <Link to="/">
                    <img className="company-logo" src={companyLogo} />
                </Link>
            </nav>

        )
    }

    export default Navbar
    ```
    This does the following:
    - `Link` from the `react-router-dom` is imported to help navigate to the home page when we click the logo.
    - A saved `companyLogo` is also imported for use later.
    - Under a `<nav>` tag, the `companyLogo` is used with `Link` wrapped around it with a specified path to navigate to the home page. This means that if you click the logo, it takes you to the home page.

19. The last step for the navbar is to navigate back to the `App.jsx` file and import it and render it to see it on your react app. It should look like this:
    ``` bash
    // App.jsx
    // ...

    import Navbar from './components/Navbar'

    function App() {

    return (
        <>

        <Navbar />

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants/:postcode" element={<RestaurantListPage />} />
        </Routes>
        </>
    )
    ```

## Steps to run the app locally

1. Fork this repo and clone it.
2. Navigate to this directory and run the following code to install the relevant dependencies:
    ``` bash
    npm install
    code .
    ```
3. Once done, run the app locally with the following code:
    ``` bash
    npm run dev
    ```
4. Create an `.env` file in the root folder and create the following environment variable:
    ``` bash
    // .env
    //...

    VITE_API_URL = "http://localhost:5005/restaurants/"
    ```

## Assumptions or things that were not clear
- Regarding the postcode, I wasn't sure if I had to add a feature where it would check the validity of the postcode and whether the postcode input is empty or not but thinking about it from an end user perspective, it would make sense to include one and it wouldn't take much time to write. What I ended up doing:
    - If postcode field is empty, it sends an alert on your browser.
    - If it is an invalid UK postcode, a piece of text will appear briefly reminding you to enter a valid one.

## Improvements for future development
- Create a filter function with the cuisines by either making a drop down menu to pick the cuisines of your choice or listing all the cuisines and making them clickable to filter your favourites.
- Use a map to display the address of the restaurant since the coordinates are present in the API. This can be done by using a react map package or using Google Map's developer features.
- Create a sorting function where you can sort the restaurants by their name or rating for example.
- Make the app responsive for different devices.