import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function HomePage () {

    const [searchPostcode, setSearchPostcode] = useState('')
    const [validPostcode, setValidPostcode] = useState(true)
    const navigate = useNavigate()

    const searchHandler = (e) => {
        setSearchPostcode(e.target.value)
    }

    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i
  
    const searchButtonHandler = () => {
        if (searchPostcode !== "") {
            if (postcodeRegex.test(searchPostcode)) {
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
}

export default HomePage