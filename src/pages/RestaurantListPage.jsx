import axios from "axios"
import { useEffect, useState } from "react"

function RestaurantListPage() {

const apiUrl = import.meta.env.VITE_API_URL
const [restaurants, setRestaurants] = useState([])

// Fetching data from API
const getApiData = () => {
    axios.get(apiUrl)
    .then(response => {
        setRestaurants(response.data)
        console.log(response.data)
    })
    .catch(error => {
        console.log("Error not receiving data")
        console.log(error)
    })
}

useEffect(() => {
    getApiData()
}, [])

    return (
        <>
        {restaurants === null
        ? <p>Loading...</p>
        : restaurants.map(restaurant => {
            return(
                <div>
                    <h1>{restaurant.metaData.district}</h1>
                </div>
            )
        })
    }
        </>
    
    )
}

export default RestaurantListPage