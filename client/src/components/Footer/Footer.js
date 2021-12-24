import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import React from "react";
import "reactjs-popup/dist/index.css";

export default function Footer(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Link to="/FAQ">FAQ</Link>
        <a
          href={window.env ? window.env.REACT_APP_LINK_TO_PRIVACY_POLICY : "#"}
          target="_blank"
        >
          Privacy Policy
        </a>
        <a
          href={window.env ? window.env.REACT_APP_LINK_TO_TERM_OF_USE : "#"}
          target="_blank"
        >
          Terms of Use
        </a>
      </div>
      <div className={styles.rights}>
        <span>Ollmarketing {new Date().getFullYear()}. All Right Reserved</span>
      </div>
    </div>
  );
}
