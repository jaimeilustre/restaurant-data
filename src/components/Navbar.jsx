import { Link } from "react-router-dom"

function Navbar () {
    return (
        <Link to="/">
            <nav className="navbar">
                <img className="company-logo" src="https://cdn.worldvectorlogo.com/logos/just-eat-orange-logo.svg" />
            </nav>
        </Link>
    )
}

export default Navbar