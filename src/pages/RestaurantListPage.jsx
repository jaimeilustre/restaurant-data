import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function RestaurantListPage() {

const [restaurants, setRestaurants] = useState([])
const {postcode} = useParams()

// Fetching data from API
const getApiData = () => {
    axios.get(`http://localhost:5001/restaurants/${postcode}`)
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

    return (
        <>
        {restaurants === null
        ? <p>Loading...</p>
        : restaurants.map(restaurant => {
            return(
                <div key={restaurant.id}>
                    <h1>{restaurant.name}</h1>
                    <h2>{restaurant.cuisines.map(cuisine => cuisine.name).join(', ')}</h2>
                    <h2>{restaurant.rating.starRating}</h2>
                    <h2>{restaurant.address.firstLine}</h2>
                    <h2>{restaurant.address.postalCode}</h2>
                    <h2>{restaurant.address.city}</h2>
                </div>
            )
        })
    }
        </>
    
    )
}

export default RestaurantListPage