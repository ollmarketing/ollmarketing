import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { getDate } from "../../Blog/helper";
import Header from "../Header/Header";

import styles from "./allUsers.module.css";

class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.onClickTableSort = this.onClickTableSort.bind(this);
    this.genTableRows = this.genTableRows.bind(this);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.search = this.search.bind(this);
    this.onKeyDownInput = this.onKeyDownInput.bind(this);

    this.state = {
      userTableRows: [],
      users: [],

      nothingFound: false,
      newTraders: [],
      searchReqest: "",
    };
  }

  genTableRows(users) {
    const tableValues = [];
    for (const key in users) {
      tableValues.push(
        <div className={styles.usersTableRow} key={Math.random(123)}>
          <span style={{fontFamily: "G",}}>
            {users[key].name}
          </span>
          <span style={{fontFamily: "G",}} >
            {users[key].email}
          </span>
          <span style={{fontFamily: "G",}}>
            {users[key].confirmation ? 'true' : 'false'}
          </span>
          <span style={{fontFamily: "G",}}>
            {users[key].createdAt}
          </span>
        </div>
      );
    }

    this.setState({
      userTableRows: tableValues,
    });
  }

  async componentDidMount() {
    window.scrollTo(0, 0);

    const users = await this.props.getUsers();

    for (const key in users) {
      users[key].confirmation = users[key].confirmation ? true : false;
      users[key].createdAt = users[key].createdAt ? users[key].createdAt : new Date().toISOString();
    }

    this.genTableRows(this.sort(users, false));

    this.setState({
      users,
    });

  }

  sort(arr, increment, type) {
    return arr.sort((a, b) => {
      return increment  
        ? String(a[type]) > String(b[type]) ? -1 : 1
        : String(b[type]) < String(a[type]) ? 1 : -1
    });
  }

  onClickTableSort(type) {
    let sortedArr = this.sort(this.state.users.slice(), true, type);
    if (JSON.stringify(sortedArr) === JSON.stringify(this.state.users)) {
      sortedArr = this.sort(this.state.users.slice(), false, type);
    }

    this.setState({
      users: sortedArr,
    });

    this.genTableRows(sortedArr);
  }

  onChangeSearch(e) {
    if (!e.target.value) {
      this.setState({ newUsers: [] });
      this.genTableRows(this.state.users.slice());
    }

    this.setState({
      searchReqest: e.target.value,
    });
  }

  search() {
    const searchReqest = this.state.searchReqest.slice();
    const users = this.state.users.slice();
    const newUsers = [];

    for (const key in users) {
      if (
        String(users[key].email)
          .toLowerCase()
          .includes(searchReqest.toLowerCase()) &&
        searchReqest.length !== 0
      ) {
        newUsers.push(users[key]);
      }
    }

    if (searchReqest.length > 0) {
      if (newUsers.length === 0) {
        this.setState({
          userTableRows: (
            <div
              className={styles.usersTableRow}
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
          this.setState({ newUsers });
          this.genTableRows(newUsers);
        }
      }
    } else {
      this.genTableRows(users);
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
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.content}>
            <div className={styles.tableContainer}>
            <div className={styles.search}>
                <div className={styles.searchInput}>
                  <input
                    placeholder={"Search users by email…"}
                    onChange={this.onChangeSearch}
                    onKeyDown={this.onKeyDownInput}
                    value={this.state.searchReqest}
                  />
                </div>
                <div className={styles.searchButton} onClick={this.search}>
                  <span>SEARCH</span>
                </div>
              </div>
                <div className={styles.usersTable}>
                  <div className={styles.usersTableHeader}>
                    <span>
                      Name{" "}
                      <div onClick={() => this.onClickTableSort('name')} />
                    </span>
                    <span>
                      Email{" "}
                      <div onClick={() => this.onClickTableSort('email')} />
                    </span>
                    <span>
                    Confirmation{" "}
                      <div onClick={() => this.onClickTableSort('confirmation')} />
                    </span>
                    <span>
                      Date of registration{" "}
                      <div onClick={() => this.onClickTableSort('createdAt')} />
                    </span>
                  </div>
                  {this.state.userTableRows}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allUsersState: state,
  };
}

export default connect(mapStateToProps, actions)(AllUsers);
