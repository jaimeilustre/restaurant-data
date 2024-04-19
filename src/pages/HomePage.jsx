import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function HomePage () {

const [searchPostcode, setSearchPostcode] = useState('')
const navigate = useNavigate()

const searchHandler = (e) => {
    setSearchPostcode(e.target.value)
}

const searchButtonHandler = () => {
    if(searchPostcode !== "") {
        navigate(`restaurants/${searchPostcode}`)
    } else {
        alert('Please enter a postcode')
    }
}

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
        </div>
    ) 
}

export default HomePage