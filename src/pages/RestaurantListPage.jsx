import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function RestaurantListPage() {

const [restaurants, setRestaurants] = useState([])
const {postcode} = useParams()

const apiUrl = import.meta.env.VITE_API_URL

// Fetching data from API
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

    return (
        <>
        {restaurants === null
        ? <p>Loading...</p>
        : restaurants.map(restaurant => {
            return(
                <div className="restaurant-card" key={restaurant.id}>
                    <div className="restaurant-info">
                        <h2>{restaurant.name}</h2>
                        <h3>{restaurant.cuisines.map(cuisine => cuisine.name).join(', ')}</h3>
                        <h3>
                            <img className="rating-logo" src="https://www.svgrepo.com/show/13695/star.svg" alt="text" />
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
}

export default RestaurantListPage