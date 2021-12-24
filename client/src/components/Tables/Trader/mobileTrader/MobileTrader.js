import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import { getDate } from "../../../Blog/helper";

import styles from "./mobileTrader.module.css";

class Trader extends Component {
  constructor(props) {
    super(props);

    this.genTableRows = this.genTableRows.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.sort = this.sort.bind(this);

    this.state = {
      traderTableRows: [],
      ideas: [],
    };
  }

  sort(arr, increment) {
    return arr.sort((a, b) => {
      return increment
        ? new Date(a.date_posted) - new Date(b.date_posted)
        : new Date(b.date_posted) - new Date(a.date_posted);
    });
  }

  genTableRows(ideas) {
    const tableValues = [];

    for (const key in ideas) {
      tableValues.push(
        <div className={styles.idea} key={Math.random(123)}>
          <div className={styles.ideaName}>
            <div style={{ color: "#2d3436" }}>{ideas[key].title}</div>
          </div>
          <div className={styles.ideaRow}>
            <div className={styles.ideaRowLeft}>
              {getDate(ideas[key].date_posted)}
            </div>
            <div
              className={styles.ideaRowRight}
              style={{
                color: ideas[key].success ? "#00b647" : "#ff375d",
              }}
            >
              {ideas[key].success ? "Succesfull" : "Failed"}
            </div>
          </div>
        </div>
      );
    }

    this.setState({
      traderTableRows: tableValues,
    });
  }

  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    this.genTableRows(this.sort(this.props.ideas, false));

    this.setState({
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
    });
  }

  checkLocation = () => {
    return this.props.location.pathname === "/ideas";
  };

  render() {
    return (
      <div className={styles.tableIdeas}>{this.state.traderTableRows}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    traderState: state,
  };
}

export default connect(mapStateToProps, actions)(Trader);
