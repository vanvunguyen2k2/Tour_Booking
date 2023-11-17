import React, { useContext, useState } from "react";
import "./navbar.css";
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Space, Dropdown } from "antd";
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
    const { token, username, dispatch } = useContext(AuthContext);
    const [active, setActive] = useState('navBar');
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
        navigate("/");
    }

    const items = [
        {
          label: (
            <a href="/profile">
              Update Profile
            </a>
          ),
          key: '0',
        },
        {
            type: 'divider',
          },
        {
          label: (
            <a href="/history">
              Booking History
            </a>
          ),
          key: '1',
        },
        {
          type: 'divider',
        },
        {
            label: (
                <a onClick={handleLogout}>
                  Logout
                </a>
              ),
          key: '3',
        },
      ];


    // Function to toggle navBar
    const showNav = () => {
        setActive('navBar activeNavbar')
    }

    // Function to toggle navBar
    const removeNabar = () => {
        setActive('navBar')
    }

    return(
        <div className="navBarSection">
            <header className="header flex">

                <div className="logoDiv">
                    <a href="/" className="logo flex">
                        <h1> <MdOutlineTravelExplore className="icon"/>
                            TRAVELvn.</h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">

                        <li className="navItem">
                            <a href="/" className="navLink">Home</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Packages</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Shop</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">About</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Pages</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Blogs</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Contact</a>
                        </li>

                        {(token == null) ? (
                            <button className="btn">
                                <Link to="/login">SIGN IN</Link>
                            </button>
                        ) : (<li><Avatar size={40} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}/>
                         <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        {username}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
                        </li>)}
                    </ul>

                    <div onClick={removeNabar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </header>
        </div>
    )
}
export default Navbar;