import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import * as actions from "../../../actions";
import Header from "../../Header/Header";
import MobileHeader from "../../Header/Mobile/MobileHeader";
import Footer from "../../Footer/Footer";
import MobileTrader from "./mobileTrader/MobileTrader";

import styles from "./trader.module.css";
import { getDate } from "../../Blog/helper";

class Trader extends Component {
  constructor(props) {
    super(props);

    this.onClickTableSort = this.onClickTableSort.bind(this);
    this.genTableRows = this.genTableRows.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      traderTableRows: [],
      ideas: [],
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
      author: "",
    };
  }

  genTableRows(ideas) {
    const tableValues = [];

    for (const key in ideas) {
      tableValues.push(
        <div className={styles.tradersTableRow} key={Math.random(123)}>
          <a href ={ideas[key].link} target = '_blank' style ={{textDecoration: 'none', cursor: 'pointer'}}><span style={{ color: "#039cfc" }}>{ideas[key].title}</span></a>
          <span
            style={{
              fontFamily: "G",
            }}
            className={styles.date}
          >
            {ideas[key].date_posted}
          </span>
          <span
            style={{
              color: ideas[key].success ? "#00b647" : "#ff375d",
              fontFamily: "G",
            }}
          >
            {ideas[key].success ? "Succesfull" : "Failed"}
          </span>
        </div>
      );
    }

    this.setState({
      traderTableRows: tableValues,
    });
  }

  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    window.scrollTo(0, 0);

    await this.props.getTrader(this.props.match.params.id);
    await this.props.getIdeasByTraderId(this.props.match.params.id);

    const ideas = this.props.traderState.idea.ideas[0];

    for (const key in ideas) {
      ideas[key].date_posted = getDate(ideas[key].date_posted);
    }

    this.genTableRows(this.sort(ideas, false));

    this.setState({
      author: ideas[0].author,
      ideas,
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

  sort(arr, increment) {
    return arr.sort((a, b) => {
      return increment
        ? new Date(a.date_posted) - new Date(b.date_posted)
        : new Date(b.date_posted) - new Date(a.date_posted);
    });
  }

  onClickTableSort() {
    let sortedArr = this.sort(this.state.ideas.slice(), true);
    if (JSON.stringify(sortedArr) === JSON.stringify(this.state.ideas)) {
      sortedArr = this.sort(this.state.ideas.slice(), false);
    }

    this.setState({
      ideas: sortedArr,
    });

    this.genTableRows(sortedArr);
  }

  render() {
    return (
      <div>
        <div className={styles.bg} />
        {this.state.isMobile ? <MobileHeader /> : <Header />}
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.pageName}>
              <Link to="/traders"> Search Traders / </Link> {this.state.author}
            </div>
            <div className={styles.tableContainer}>
              {!this.state.isMobile ? (
                <div className={styles.tradersTable}>
                  <div className={styles.tradersTableHeader}>
                    <span>Idea’s name</span>
                    <span className={styles.dateTitle}>
                      Idea’s date{" "}
                      <div onClick={() => this.onClickTableSort()} />
                    </span>
                    <span>Successful / Not successful</span>
                  </div>
                  {this.state.traderTableRows}
                </div>
              ) : this.state.ideas.length > 0 ? (
                <MobileTrader ideas={this.state.ideas} />
              ) : null}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    traderState: state,
  };
}

export default connect(mapStateToProps, actions)(Trader);
