import React, { Component } from "react";
import { MdPermIdentity } from "react-icons/md";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
  MdSettings,
  MdAddCircle,
  MdFormatListBulleted,
  MdDelete,
} from "react-icons/md";

class Admin_Sidenav extends Component {
  state = {};
  handleLogout() {
    const { logout } = this.props;
    logout();
  }
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  render() {
    const activeNow = this.props.activeComponent;
    return (
      <>
        <h4 className="text-light text-center mt-2">PICT IMS</h4>
        <p className="mt-4">Menu</p>
        <ul id="ul">
          <Link to="/admin/">
            <li id="li" className={activeNow == 1 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdPermIdentity />
              </span>
              Profile
            </li>
          </Link>
          <Link to="/all">
            <li id="li" className={activeNow == 2 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdFormatListBulleted />
              </span>
              Faculty List
            </li>
          </Link>
          <Link to="/add">
            <li id="li" className={activeNow == 3 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdAddCircle />
              </span>
              Add New Faculty
            </li>
          </Link>
          <Link to="/deleteFaculty">
            <li id="li" className={activeNow == 4 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdDelete />
              </span>
              Delete Faculty
            </li>
          </Link>
          <Link to="/settings">
            <li id="li" className={activeNow == 5 ? "sidenav-active" : ""}>
              <span className="mx-2">
                <MdSettings />
              </span>
              Change Password
            </li>
          </Link>
          <li id="li" className="nav-item">
            <span className="mx-2">
              <RiLogoutBoxLine />
            </span>
            <a onClick={this.handleLogout}>Logout</a>
          </li>
        </ul>
      </>
    );
  }
}

export default connect((store) => ({ auth: store.auth }), { logout })(
  Admin_Sidenav
);
