import styles from "./mobileHeader.module.css";
import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import Login from "../../Modal/Login/Login";
import Registration from "../../Modal/Registration/Registration";
import RestorePassword from "../../Modal/RestorePassword/RestorePassword";
import NewPassword from "../../Modal/NewPassword/NewPassword";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import Message from "../../Modal/Message/Message";

function MobileHeader(props) {
  const [modalState, setModalState] = useState({
    login: false,
    registration: false,
    restorePassword: false,
    newPassword: false,
    message: false,
  });

  const [open, setOpen] = useState(false);

  const handleModalChange = (currentModal) => {
    setModalState((prev) => {
      return { ...prev, [currentModal]: !prev[currentModal] };
    });
  };

  const closeAllModal = () => {
    setModalState(() => {
      return {
        login: false,
        registration: false,
        restorePassword: false,
        newPassword: false,
        message: false,
      };
    });
  };

  const checkActive = (match, location) => {
    if (!location) return false;
    const { pathname } = location;
    return pathname === "/";
  };

  return (
    <div className={styles.container}>
      <div
        className={open ? styles.bgShadow : null}
        onClick={() => setOpen(!open)}
      />

      <div
        className={
          open ? `${styles.bg} ${styles.open}` : `${styles.bg} ${styles.close}`
        }
      >
        <div className={styles.wrapper}>
          {/* <div className={styles.menuHeader}>
            <div className={styles.menuHeaderLeft}>
              <div className={styles.cross} onClick={() => setOpen(!open)} />
              <div className={styles.label}>Menu</div>
            </div>
            {props.isAuth.auth.isAuthenticated ? (
              <div className={styles.menuHeaderRight}>
                <div className={styles.user}>{props.isAuth.auth.username}</div>
                <div
                  className={styles.logout}
                  onClick={() => props.signOut()}
                />
              </div>
            ) : null}
          </div> */}
          <div className={styles.menu}>
            <div className={styles.menuRow}>
              <NavLink
                to="/"
                isActive={checkActive}
                activeClassName={styles.active}
              >
                Home
              </NavLink>
            </div>
            {/* <div className={styles.menuRow}>
              <NavLink to="/signals" activeClassName={styles.active}>
                Signals
              </NavLink>
            </div> */}
            {/* <div className={styles.menuRow}>
              <NavLink to="/brokers" activeClassName={styles.active}>
                Brokers
              </NavLink>
            </div> */}
            <div className={styles.menuRow}>
              <NavLink to="/blog" activeClassName={styles.active}>
                Offers
              </NavLink>
            </div>
            <div className={styles.menuRow}>
              <NavLink to="/FAQ" activeClassName={styles.active}>
                FAQ
              </NavLink>
            </div>
            {/* <div className={styles.menuRow}>
              <NavLink to="/about" activeClassName={styles.active}>
                About Us
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
      <Registration
        show={
          props.registration !== undefined
            ? props.registration
            : modalState.registration
        }
        exit={
          props.handleModalChange !== undefined
            ? props.handleModalChange
            : handleModalChange
        }
      />
      <RestorePassword
        show={
          props.restorePassword !== undefined
            ? props.restorePassword
            : modalState.restorePassword
        }
        exit={
          props.handleModalChange !== undefined
            ? props.handleModalChange
            : handleModalChange
        }
      />
      <Login
        show={props.login !== undefined ? props.login : modalState.login}
        exit={
          props.handleModalChange !== undefined
            ? props.handleModalChange
            : handleModalChange
        }
      />
      <NewPassword
        show={
          props.newPassword !== undefined
            ? props.newPassword
            : modalState.newPassword
        }
        exit={
          props.handleModalChange !== undefined
            ? props.handleModalChange
            : handleModalChange
        }
      />
      <Message
        show={props.message !== undefined ? props.message : modalState.message}
        exit={
          props.handleModalChange !== undefined
            ? props.handleModalChange
            : handleModalChange
        }
      />
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.burger} onClick={() => setOpen(!open)} />
          <Link
            to="/"
            onClick={
              props.closeAllModal !== undefined
                ? props.closeAllModal
                : closeAllModal
            }
          >
            <div className={styles.logo} />
          </Link>
        </div>
        <div className={styles.headerRight}>
          {props.isAuth.auth.isAuthenticated ? (
            <div className={styles.loginButton} onClick={() => props.signOut()}>
              <span>LOGOUT</span>
            </div>
          ) : (
            <div
              className={styles.loginButton}
              onClick={() => {
                if (props.handleModalChange === undefined) {
                  handleModalChange("login");
                  if (modalState.registration) {
                    handleModalChange("registration");
                  }
                  if (modalState.restorePassword) {
                    handleModalChange("restorePassword");
                  }
                  if (modalState.newPassword) {
                    handleModalChange("newPassword");
                  }
                  if (modalState.message) {
                    handleModalChange("message");
                  }
                } else {
                  props.handleModalChange("login");
                  if (props.registration) {
                    props.handleModalChange("registration");
                  }
                  if (props.restorePassword) {
                    props.handleModalChange("restorePassword");
                  }
                  if (props.newPassword) {
                    props.handleModalChange("newPassword");
                  }
                  if (props.message) {
                    props.handleModalChange("message");
                  }
                }
              }}
            >
              <span>LOGIN</span>
            </div>
          )}
        </div>
        <div className={styles.lineWrapper}>
          <div className={styles.line}></div>
        </div>
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

export default connect(mapStateToProps, actions)(MobileHeader);
