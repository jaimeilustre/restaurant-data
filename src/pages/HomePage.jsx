import { useState } from "react"
import { Link } from "react-router-dom"

function HomePage () {

const [searchPostcode, setSearchPostcode] = useState('')

const searchHandler = (e) => {
    setSearchPostcode(e.target.value)
}

    return (
        <>
            <h1>Search restaurants in your area</h1>
            <input
                type="text"
                value={searchPostcode}
                onChange={searchHandler}
                placeholder="Type postcode here..."
            />

            <Link to={`restaurants/${searchPostcode}`}>
                <button>Search</button>
            </Link>
        </>
    ) 
}

export default HomePage