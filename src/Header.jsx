import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import CartContext from "./context/CartContext";
import AuthContext from "./context/AuthContext";

function Header() {
    const [menu, setMenu] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const handleLogout = () => {
        logout();
        setMenu(false);
        navigate("/login");
    };
    return (
        <header className="header">
            <h1>Smile Seattle Bakery</h1>
            <div className="logo">
                🍰 Smile Seattle Bakery
            </div>
            <button className="menu-btn" onClick={() => setMenu(!menu)}>
                {menu ? <FaTimes /> : <FaBars />}
            </button>
            <nav className={menu ? "nav-links active" : "nav-links"}>
                <Link to="/" onClick={() => setMenu(false)}>
                    🏠 Home
                </Link>
                <Link to="/Order" onClick={() => setMenu(false)}>
                    🛍️ Order
                </Link>
                <Link to="/Contact" onClick={() => setMenu(false)}>
                    💌 Contact
                </Link>
                <Link to="/Cart" onClick={() => setMenu(false)}>
                    🛒 Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
                {user ? (
                    <>
                        {user.role === "admin" && (
                            <Link to="/admin" onClick={() => setMenu(false)}>
                                ⚙️ Admin
                            </Link>
                        )}
                        <div className="user-menu">
                            <button className="user-menu-btn" onClick={() => setUserDropdown(!userDropdown)}>
                                👋 Hi, {user.name} ▾
                            </button>
                            {userDropdown && (
                                <div className="user-dropdown">
                                    <Link to="/MyOrders" onClick={() => {
                                        setUserDropdown(false);
                                        setMenu(false);
                                    }}
                                    >
                                        📦 My Orders
                                    </Link>
                                    <button className="dropdown-logout" onClick={handleLogout}>
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link to="/login" onClick={() => setMenu(false)}>
                        Login
                    </Link>
                )}
                <Link to="/About" onClick={() => setMenu(false)}>
                    👩‍🍳 About Nana
                </Link>
            </nav>
        </header>
    );
}
export default Header;