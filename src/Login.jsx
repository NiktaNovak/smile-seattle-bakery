import { useState, useContext } from "react";
import AuthContext from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");
        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            const endpoint = isLogin ? `${import.meta.env.VITE_API_URL}/api/users/login` : `${import.meta.env.VITE_API_URL}/api/users/register`;
            const body = isLogin ? { email, password } : { name, email, password };
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Something went wrong.");
                return;
            }
            if (isLogin) {
                login(data.token, data.user);
                setMessage("Login successful!");
                navigate("/");
                console.log("Login successful:", data);
            }
            else {
                console.log("Registration successful:", data);
                setMessage("Account created successfully! You can now log in.");
                setIsLogin(true);
                setName("");
                setPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            console.error(error);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };
    const switchMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setMessage("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>
                    {isLogin ? "Welcome Back!" : "Create an Account"}
                </h1>
                <p>
                    {isLogin ? "Log in to continue your order." : "Create an account to order from Smile Seattle Bakery."}
                </p>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword"> Confirm Password</label>
                            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                    )}
                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}
                    {message && (
                        <p className="success-message">
                            {message}
                        </p>
                    )}
                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Please wait..."
                            : isLogin
                                ? "Login"
                                : "Create Account"
                        }
                    </button>
                </form>
                <div className="auth-switch">
                    {isLogin ? (
                        <p>
                            Don't have an account?{" "}
                            <button type="button" onClick={switchMode}>
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button type="button" onClick={switchMode}>
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Login;