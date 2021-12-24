import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import MobileHeader from "../../Header/Mobile/MobileHeader";
import Footer from "../../Footer/Footer";
import * as actions from "../../../actions";

import styles from "./traders.module.css";
import MobileTable from "../../Homepage/mobileTable/MobileTable";
import { Link } from "react-router-dom";

class Traders extends Component {
  constructor(props) {
    super(props);

    this.onClickTableSort = this.onClickTableSort.bind(this);
    this.genTableRows = this.genTableRows.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.search = this.search.bind(this);
    this.onKeyDownInput = this.onKeyDownInput.bind(this);

    this.state = {
      traderTableRows: [],
      traders: null,
      nothingFound: false,
      newTraders: [],
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
      searchReqest: "",
    };
  }

  genTableRows(traders) {
    const tableValues = [];

    for (const key in traders) {
      tableValues.push(
        <div className={styles.tradersTableRow} key={Math.random(123)}>
          <Link
            to={`/traders/${traders[key]._id}`}
            style={{ color: "#039cfc" }}
          >
            {traders[key].name}
          </Link>
          <span>{traders[key].ideas_count}</span>
          <span>{traders[key].successful_count}</span>
          <span style={{ margin: 0 }}>{traders[key].percentage} %</span>
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

    await this.props.getTraders();

    const traders = this.props.tradersState.trader.traders[0];

    this.genTableRows(this.sort(traders, 1, false));

    this.setState({
      traders,
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

  sort(arr, type, increment) {
    return arr.sort((a, b) => {
      if (type === 1) {
        return increment
          ? a.ideas_count - b.ideas_count
          : b.ideas_count - a.ideas_count;
      } else if (type === 2) {
        return increment
          ? a.successful_count - b.successful_count
          : b.successful_count - a.successful_count;
      } else if (type === 3) {
        return increment
          ? a.percentage - b.percentage
          : b.percentage - a.percentage;
      }
    });
  }

  onClickTableSort(type) {
    const arr =
      this.state.newTraders.length === 0
        ? this.state.traders.slice()
        : this.state.newTraders.slice();

    let sortedArr = this.sort(arr.slice(), type, true);
    if (JSON.stringify(sortedArr) === JSON.stringify(arr.slice())) {
      sortedArr = this.sort(arr.slice(), type, false);
    }

    this.genTableRows(sortedArr);

    this.setState(
      this.state.newTraders.length === 0
        ? {
            traders: sortedArr,
          }
        : { newTraders: sortedArr }
    );
  }

  onChangeSearch(e) {
    if (!e.target.value) {
      this.setState({ newTraders: [] });
      this.genTableRows(this.state.traders.slice());
    }

    this.setState({
      searchReqest: e.target.value,
    });
  }

  search() {
    const searchReqest = this.state.searchReqest.slice();
    const traders = this.state.traders.slice();
    const newTraders = [];

    for (const key in traders) {
      if (
        String(traders[key].name)
          .toLowerCase()
          .includes(searchReqest.toLowerCase()) &&
        searchReqest.length !== 0
      ) {
        newTraders.push(traders[key]);
      }
    }

    if (searchReqest.length > 0) {
      if (newTraders.length === 0) {
        this.setState({
          traderTableRows: (
            <div
              className={styles.tradersTableRow}
              key={Math.random(123)}
              style={{ justifyContent: "center", fontSize: "25px" }}
            >
              Nothing found
            </div>
          ),
          nothingFound: true,
        });
      } else {
        {
          this.setState({ newTraders });
          this.genTableRows(newTraders);
        }
      }
    } else {
      {
        this.state.isMobile
          ? this.setState({ newTraders: [] })
          : this.genTableRows(traders);
      }
    }
  }

  onKeyDownInput(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  render() {
    return (
      <div>
        <div className={styles.bg} />
        {this.state.isMobile ? <MobileHeader /> : <Header />}
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.pageName}>Search Traders</div>
            <div className={styles.tableContainer}>
              <div className={styles.search}>
                <div className={styles.searchInput}>
                  <input
                    placeholder={"Search trader by name…"}
                    onChange={this.onChangeSearch}
                    onKeyDown={this.onKeyDownInput}
                    value={this.state.searchReqest}
                  />
                </div>
                <div className={styles.searchButton} onClick={this.search}>
                  <span>SEARCH</span>
                </div>
              </div>

              {!this.state.isMobile ? (
                <div className={styles.tradersTable}>
                  <div className={styles.tradersTableHeader}>
                    <span>Trader name</span>
                    <span>
                      Number of ideas{" "}
                      <div onClick={() => this.onClickTableSort(1)} />
                    </span>
                    <span>
                      Successful ideas{" "}
                      <div onClick={() => this.onClickTableSort(2)} />
                    </span>
                    <span style={{ margin: 0 }}>
                      Successful percentage{" "}
                      <div onClick={() => this.onClickTableSort(3)} />
                    </span>
                  </div>
                  {this.state.traderTableRows}
                  <div className={styles.shadowTable} />
                </div>
              ) : this.state.traders ? (
                <MobileTable
                  traders={this.state.traders}
                  newTraders={this.state.newTraders}
                  nothingFound={this.state.nothingFound}
                />
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
    tradersState: state,
  };
}

export default connect(mapStateToProps, actions)(Traders);
