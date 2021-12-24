import styles from "./message.module.css";
import React, { useEffect, useState } from "react";
// import * as actions from "../../../actions";
import * as actions from "../../../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";

function Message(props) {
  const [isShow, setIsShow] = useState(props.isShow);
  const history = useHistory();

  function closeMessage() {
    if (props.close !== undefined) props.close();
    setIsShow(false);
    if(props.redirect) {
      history.push('/');
    }
  }

  if (isShow) {
    return (
      <div className={styles.container}>
        <div
          className={styles.modal}
          onClick={closeMessage}
          style={props.bg ? null : { display: "none" }}
        ></div>
        <div className={styles.modalContent}>
          <div className={styles.header}>{props.message}</div>

          <button className={styles.login_button} onClick={closeMessage}>
            OK
          </button>
        </div>
      </div>
    );
  }
  return null;
}


function mapStateToProps(state) {
  return {
    messageState: state.props,
  };
}

export default connect(mapStateToProps, actions)(Message);

