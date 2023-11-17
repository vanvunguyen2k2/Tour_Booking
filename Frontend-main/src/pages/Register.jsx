import { Link } from "react-router-dom";
import video from "./../assets/images/vd_login.mp4";
import { AiOutlineUser, AiOutlineSwapRight, AiFillMail } from 'react-icons/ai';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();

        const newUser = {
            username: username,
            password: password,
            email: email,
        }

        try {
            const response = await fetch("http://localhost:8888/api/accounts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                alert("Đăng kí thành công");
                navigate("/login");
            } else {
                // Handle errors in the response data
                if (response.data && response.data.error) {
                    alert('Error:', response.data.error);
                } else {
                    alert('An unexpected error occurred.');
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

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
                            <span className="text">Have an Account?</span>
                            <Link to="/login"><button className="btn">LogIn</button></Link>
                        </div>
                    </div>
                    <div className="formDiv flex">

                        <form onSubmit={handleRegister} className="form grid">
                            <h3>Become Our Member!</h3>
                            <div className="inputDiv">
                                <label htmlFor="email">Email</label>
                                <div className="input flex">
                                    <AiFillMail className="icon" />
                                    <input type="email" id="email" required onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email" />
                                </div>
                            </div>
                            <div className="inputDiv">
                                <label htmlFor="username">Username</label>
                                <div className="input flex">
                                    <AiOutlineUser className="icon" />
                                    <input type="text" id="username" required onChange={(event) => setUsername(event.target.value)} placeholder="Enter Username" />
                                </div>
                            </div>
                            <div className="inputDiv">
                                <label htmlFor="password">Password</label>
                                <div className="input flex">
                                    <BsFillShieldLockFill className="icon" />
                                    <input type="password" id="password" required onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
                                </div>
                            </div>
                            <button type="submit" className="btn flex">
                                <span>Register</span>
                                <AiOutlineSwapRight className="icon" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;