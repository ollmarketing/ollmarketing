import styles from "./header.module.css";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import React, { useState } from "react";
import Login from "../Modal/Login/Login";
import Registration from "../Modal/Registration/Registration";
import RestorePassword from "../Modal/RestorePassword/RestorePassword";
import * as actions from "../../actions";

function Header(props) {
  const [modalState, setModalState] = useState({
    login: false,
    registration: false,
    restorePassword: false,
    newPassword: false,
  });

  const handleModalChange = (currentModal) => {
    setModalState((prev) => {
      return { ...prev, [currentModal]: !prev[currentModal] };
    });
  };

  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    return pathname === "/";
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.wrapper}>
        <div className={styles.buttons}>
          <NavLink
            to="/"
            // activeClassName={styles.logoActive}
            isActive={checkActive}
          >
            <div className={styles.logo} />
          </NavLink>
          {/* <NavLink to="/signals" activeClassName={styles.active}>
            Signals
          </NavLink> */}
          {/* <NavLink to="/brokers" activeClassName={styles.active}>
            Brokers
          </NavLink> */}
          <NavLink to="/blog" activeClassName={styles.active}>
            Offers{/* Blog */}
          </NavLink>
          <NavLink to="/FAQ" activeClassName={styles.active}>
            FAQ
          </NavLink>
          {/*<NavLink to="/about" activeClassName={styles.active}>
            About Us
          </NavLink> */}
          {/* <Login show={modalState.login} exit={handleModalChange} /> */}
          {/* <Registration
            show={modalState.registration}
            exit={handleModalChange}
          />
          <RestorePassword
            show={modalState.restorePassword}
            exit={handleModalChange}
          /> */}
        </div>
        {props.isAuth.auth.isAuthenticated ? (
          <div className={styles.loginButton} onClick={() => props.signOut()}>
            <span>LOGOUT</span>
          </div>
        ) : (
          <div
            className={styles.loginButton}
            onClick={() => handleModalChange("login")}
          >
            <span>LOGIN</span>
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
    isAuth: state,
  };
}

export default connect(mapStateToProps, actions)(Header);
