import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import MobileHeader from "../Header/Mobile/MobileHeader";
import Plans from "../Plans/Plans";
import Footer from "../Footer/Footer";
import * as actions from "../../actions";

import styles from "./homepage.module.css";
import MobileTable from "./mobileTable/MobileTable";
import { Link } from "react-router-dom";
import Registration from "../Modal/Registration/Registration";
import Login from "../Modal/Login/Login";
import RestorePassword from "../Modal/RestorePassword/RestorePassword";
import NewPassword from "../Modal/NewPassword/NewPassword";
import Message from "../Modal/Message/Message";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.onClickTableSort = this.onClickTableSort.bind(this);
    this.genTableRows = this.genTableRows.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
    this.closeAllModal = this.closeAllModal.bind(this);
    this.openLog = this.openLog.bind(this);
    this.showPay = this.showPay.bind(this);

    this.state = {
      traderTableRows: [],
      traders: [],
      isMobile: false,
      login: false,
      registration: false,
      restorePassword: false,
      newPassword: false,
      showPay: false,
    };
  }

  showPay(pay, showPay) {
    this.setState({ pay, showPay });
  }

  genTableRows(traders) {
    const tableValues = [];

    for (const key in traders) {
      tableValues.push(
        <div className={styles.tradersTableRow} key={Math.random(123)}>
          {this.props.homepageState.auth.isAuthenticated ? (
            <Link
              to={
                this.props.homepageState.auth.isAuthenticated
                  ? `/traders/${traders[key]._id}`
                  : null
              }
              style={{ color: "#039cfc" }}
            >
              {traders[key].name}
            </Link>
          ) : (
            <span style={{ color: "#039cfc" }} onClick={this.openLog}>
              {traders[key].name}
            </span>
          )}

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
    window.scrollTo(0, 0);
    window.addEventListener("resize", this.updateDimensions);

    await this.props.getTraders();

    const traders = this.props.homepageState.trader.traders[0];

    this.sort(traders, 1, false);

    traders.splice(5);
    this.genTableRows(traders);

    this.setState({
      newPassword: this.props.userId ? true : false,
      traders,
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
      confirm: this.props.confirmation,
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
    let sortedArr = this.sort(this.state.traders.slice(), type, true);
    if (JSON.stringify(sortedArr) === JSON.stringify(this.state.traders)) {
      sortedArr = this.sort(this.state.traders.slice(), type, false);
    }

    this.setState({
      traders: sortedArr,
    });

    this.genTableRows(sortedArr);
  }

  handleModalChange(currentModal) {
    this.setState({
      [currentModal]: !this.state[currentModal],
    });
  }

  openLog() {
    this.handleModalChange("login");
  }

  closeAllModal() {
    this.setState({
      login: false,
      registration: false,
      restorePassword: false,
      newPassword: false,
    });
  }

  render() {
    return (
      <div>
        <div className={styles.bg} />

        {this.state.isMobile ? (
          <MobileHeader
            handleModalChange={this.handleModalChange}
            closeAllModal={this.closeAllModal}
            login={this.state.login}
            registration={this.state.registration}
            restorePassword={this.state.restorePassword}
            newPassword={this.state.newPassword}
          />
        ) : (
          <Header />
        )}
        {this.props.confirmation ? (
          <Message
            // close={closeModal}
            message={"Email confirmed successfully"}
            bg={true}
            isShow={true}
            redirect={true}
          />
        ) : null}

        {this.props.userId ? (
          <NewPassword
            userId={this.props.userId}
            exit={this.handleModalChange}
            show={this.state.newPassword}
          />
        ) : null}
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.block}>
              <div className={styles.blockHeader}>
                Ollmarketing: Top Courses & Analytics Statistics
              </div>
              <div className={styles.blockText}>
                Ollmarketing is a team of professionals and developers. We have
                checked thousands of information to give you the <b>best!</b>
              </div>
              <div className={styles.socialPic} />
            </div>
            <div className={styles.line} />
            <div className={styles.block}>
              <div className={styles.blockHeader}>Ollmarketing Signals</div>
              <div className={styles.blockText} style={{ maxWidth: "700px" }}>
                We collect top documents & volume, analyse them with out
                algorithms to make the good call with best average profit.
              </div>
              <div className={styles.analystPic} />
              <div
                className={styles.blockButton}
                onClick={() => {
                  if (this.props.homepageState.auth.isAuthenticated) {
                    window.scrollTo(0, 2950);
                  } else {
                    this.handleModalChange("registration");
                    if (this.state.isMobile) {
                      setTimeout(() => {
                        window.scrollTo(0, 0);
                      }, 300);
                    }
                  }
                }}
              >
                <span
                  onClick={() => {
                    if (this.props.homepageState.auth.isAuthenticated) {
                      window.scrollTo(0, 2950);
                    } else {
                      this.handleModalChange("registration");
                      if (this.state.isMobile) {
                        setTimeout(() => {
                          window.scrollTo(0, 0);
                        }, 300);
                      }
                    }
                  }}
                >
                  JOIN TODAY
                </span>
              </div>
            </div>

            <Plans openLogin={this.handleModalChange} showPay={this.showPay} />
            <Footer />
            <Registration
              show={this.state.registration}
              exit={this.handleModalChange}
            />
            <Login show={this.state.login} exit={this.handleModalChange} />
            <RestorePassword
              show={this.state.restorePassword}
              exit={this.handleModalChange}
            />
            <NewPassword
              show={this.state.newPassword}
              exit={this.handleModalChange}
              userId={this.props.userId}
            />
            {this.state.showPay ? (
              <div style={{ position: "fixed", width: "100%", height: "100%" }}>
                <div style={{ width: "100%", height: "100%", padding: "50px" }}>
                  {this.state.pay}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    homepageState: state,
  };
}

export default connect(mapStateToProps, actions)(Homepage);
