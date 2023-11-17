import { Link, useNavigate } from "react-router-dom";
import video from "./../assets/images/vd_login.mp4";
import { AiOutlineUser, AiOutlineSwapRight } from 'react-icons/ai';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await fetch(`http://localhost:8888/api/v1/login/login-jwt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const result = await res.json();
            if (!res.ok) {
                alert(result.message);
                navigate("/login");
            } else {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        id: result.id,
                        username: result.username,
                        role: result.role,
                        userAgent: result.userAgent,
                        token: result.token,
                    },
                });
                if (result.role == "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }

        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.message });
            navigate("/login");
        }
    };
    return (
        <>
            <div className="loginPage flex">
                <div className="container flex">
                    <div className="videoDiv">
                        <video src={video} loop muted autoPlay typeof="video/mp4"></video>

                        <div className="textDiv">
                            <h2 className="title">Start Your Journeys</h2>
                            <p>Enjoy Wonderful Holiday</p>
                        </div>
                        <div className="footerDiv flex">
                            <span className="text">Don't have an account?</span>
                            <Link to="/register"><button className="btn">SignUp</button></Link>
                        </div>
                    </div>
                    <div className="formDiv flex">

                        <form onSubmit={handleClick} className="form grid">
                            <h3>Welcome Back!</h3>
                            <div className="inputDiv">
                                <label htmlFor="username">Username</label>
                                <div className="input flex">
                                    <AiOutlineUser className="icon" />
                                    <input type="text" id="username" onChange={handleChange} placeholder="Enter Username" required />
                                </div>
                            </div>
                            <div className="inputDiv">
                                <label htmlFor="password">Password</label>
                                <div className="input flex">
                                    <BsFillShieldLockFill className="icon" />
                                    <input type="password" id="password" onChange={handleChange} placeholder="Enter password" required />
                                </div>
                            </div>
                            <button type="submit" className="btn flex">
                                <span>Login</span>
                                <AiOutlineSwapRight className="icon" />
                            </button>
                            <span className="forgotPassword">
                                Forgot your password? <a href="">Click Here</a>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;