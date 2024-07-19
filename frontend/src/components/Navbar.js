import { Link } from "react-router-dom";

const Navbar = () =>{
    return (
        <header>
        <div className="navbar">       
                <h1> Stocks site</h1>  
            <nav>
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </nav>
        </div>
    </header>
    ) 
}

export default Navbar