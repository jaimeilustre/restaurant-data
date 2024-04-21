import { useState } from "react"
import { useNavigate } from "react-router-dom"

function HomePage () {

    // Creating our state variables
    const [searchPostcode, setSearchPostcode] = useState('')
    const [validPostcode, setValidPostcode] = useState(true)

    // A hook to help us navigate later
    const navigate = useNavigate()

    // Search handler for our onChange input handler
    const searchHandler = (e) => {
        setSearchPostcode(e.target.value)
    }

    // A RegEx to check that the postcode is a valid UK one
    const postcodeRegEx = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i

    // Search handler for our onClick button handler
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