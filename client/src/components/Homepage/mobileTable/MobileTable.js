import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./mobileTable.module.css";

function MobileTable(props) {
  useEffect(() => {}, [props.traders, props.newTraders, props.nothingFound]);

  function openLogin() {
    props.openLogin("login");
  }

  const tableValues = [];
  (() => {
    if (props.newTraders.length === 0 && !props.nothingFound) {
      for (const i in props.traders) {
        tableValues.push(
          <div className={styles.trader} key={i}>
            <div className={styles.traderName} style={{ color: "#039cfc" }}>
              {props.isAuth ? (
                <Link
                  to="/traders/props.traders[i]._id"
                  style={{ color: "#039cfc" }}
                >
                  {props.traders[i].name}
                </Link>
              ) : (
                <span onClick={openLogin}>{props.traders[i].name}</span>
              )}
            </div>
            <div className={styles.traderRow}>
              <div className={styles.traderRowLeft}>Number of ideas</div>
              <div className={styles.traderRowRight}>
                {props.traders[i].ideas_count}
              </div>
            </div>
            <div className={styles.traderRow}>
              <div className={styles.traderRowLeft}>Successful ideas</div>
              <div className={styles.traderRowRight}>
                {props.traders[i].successful_count}
              </div>
            </div>
            <div className={styles.traderRow}>
              <div className={styles.traderRowLeft}>Successful percentage</div>
              <div className={styles.traderRowRight}>
                {props.traders[i].percentage}
              </div>
            </div>
          </div>
        );
      }
    } else if (props.nothingFound) {
      tableValues.push(
        <div
          className={styles.trader}
          style={{ textAlign: "center", fontSize: "16px" }}
        >
          Nothing found
        </div>
      );
    } else {
      for (const i in props.newTraders) {
        tableValues.push(
          <div className={styles.trader} key={i}>
            <div className={styles.traderName} style={{ color: "#039cfc" }}>
              <Link to={`/traders/${props.newTraders[i]._id}`}>
                {props.newTraders[i].name}
              </Link>
            </div>
            <div className={styles.traderRow}>
              <div className={styles.traderRowLeft}>Number of ideas</div>
              <div className={styles.traderRowRight}>
                {props.newTraders[i].ideas_count}
              </div>
            </div>
            <div className={styles.traderRow}>
              <div className={styles.traderRowLeft}>Successful ideas</div>
              <div className={styles.traderRowRight}>
                {props.newTraders[i].successful_count}
              </div>
            </div>
            <div className={styles.traderRow}>
              <div className={styles.traderRowLeft}>Successful percentage</div>
              <div className={styles.traderRowRight}>
                {props.newTraders[i].percentage}
              </div>
            </div>
          </div>
        );
      }
    }
  })();

  return (
    <div className={styles.tableTraders}>
      <div className={styles.tableTradersHeader}> Top traders</div>
      {tableValues}
    </div>
  );
}

export default MobileTable;
