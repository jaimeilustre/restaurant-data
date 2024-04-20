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