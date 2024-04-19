import { Link } from "react-router-dom"

function Navbar () {
    return (
        <nav className="navbar">
            <Link to="/">
                <img className="company-logo" src="https://cdn.worldvectorlogo.com/logos/just-eat-orange-logo.svg" />
            </Link>
        </nav>

    )
}

export default Navbar