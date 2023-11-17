import { MdManageAccounts } from "react-icons/md";
import { BiTrip, BiSolidUserCircle } from "react-icons/bi";
import { RiBillFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { Tooltip } from "antd";
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    path: "/admin/tour",
  },
];

const Sidebar = () => {
  return (
    <section className="sideBar">
      <div className="logoDiv flex">
        <a href="" className="logo flex">
          <BiSolidUserCircle className="icon" />
        </a>
      </div>

      <div className="menu">
        <ul className="navItem">
          <NavLink to="/admin/account">
            <Tooltip placement="right" title="Manage Accounts">
              <li className="navList">
                <MdManageAccounts className="icon" />
              </li>
            </Tooltip>
          </NavLink>

          <NavLink to="/admin/tour">
            <Tooltip placement="right" title="Manage Tours">
              <li className="navList">
                <BiTrip className="icon" />
              </li>
            </Tooltip>
          </NavLink>
          <NavLink to="/admin/booking">
            <Tooltip placement="right" title="Manage Bookings">
              <li className="navList">
                <RiBillFill className="icon" />
              </li>
            </Tooltip>
          </NavLink>
          <Tooltip placement="right" title="Setting">
            <li className="navList">
              <AiFillSetting className="icon" />
            </li>{" "}
          </Tooltip>
        </ul>
      </div>
    </section>
  );
};
export default Sidebar;
