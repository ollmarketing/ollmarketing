import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import MobileHeader from "../Header/Mobile/MobileHeader";
import Plans from "../Plans/Plans";
import Footer from "../Footer/Footer";
import * as actions from "../../actions";

import styles from "./signals.module.css";
import Registration from "../Modal/Registration/Registration";
import Login from "../Modal/Login/Login";
import RestorePassword from "../Modal/RestorePassword/RestorePassword";
import NewPassword from "../Modal/NewPassword/NewPassword";

const getDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-Us", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

class Signals extends Component {
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleModalChange = this.handleModalChange.bind(this);
    this.closeAllModal = this.closeAllModal.bind(this);
    this.showPay = this.showPay.bind(this);

    window.scrollTo(0, 0);

    this.state = {
      reports: [],
      reportBlocks: [],
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
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

  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    window.scrollTo(0, 0);

    await this.props.getReports();

    const reports = this.props.signalsState.report.reports[0];

    const reportBlocks = [];

    for (const key in reports) {
      const isLast = (Number(key) + 1) % 4 === 0 ? true : false;
      reportBlocks.push(
        <div
          className={styles.reportBlock}
          style={{ marginRight: isLast ? 0 : "32px" }}
          key={Number(key)}
        >
          <div className={styles.date}>{getDate(reports[key].date)}</div>
          <div className={styles.reportRow}>
            <div>Signals</div>
            <div>{reports[key].signals}</div>
          </div>
          <div className={styles.reportRow}>
            <div>Pips</div>
            <div>{reports[key].pips}</div>
          </div>
          <div className={styles.reportRow}>
            <div>Win rate</div>
            <div className={styles.winRate} style={{ color: "#1bb934" }}>
              {reports[key].winRate}%
            </div>
          </div>
          <div className={styles.lines}>
            <div className={styles.reportLine} />
            <div
              className={styles.reportLine}
              style={{
                backgroundColor: "#1bb934",
                width: `${reports[key].winRate}%`,
              }}
            />
          </div>
          <div className={styles.downloadButton}>
            <a download={reports[key].file} href={`/${reports[key].file}`}>
              DOWNLOAD REPORT
            </a>
          </div>
        </div>
      );
    }

    this.setState({
      reports,
      reportBlocks,
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

  handleModalChange(currentModal) {
    this.setState({
      [currentModal]: !this.state[currentModal],
    });
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
    const benefits = [
      "All signals are easily understandable",
      "Your Success is our main goal.",
      "All signals are good for all well known markets.",
      "Our signals are based on analysis of 500+ top traders.",
      "We checked best free and paid sources to collect data",
      "Our team is ready 24/7 to help you",
    ];
    return (
      <div>
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
        />
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
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {/* {!this.state.isMobile ? <Header /> : false} */}
            <div className={styles.block}>
              <div className={styles.blockHeader}>
                Benefits of using Degram VIP signals
              </div>
              <div className={styles.blockText}>
                Below are some examples as to why traders are choosing our VIP
                Signals over other providers;
              </div>
              <div className={styles.blockBenefits}>
                {benefits.map((item, index) => (
                  <div className={styles.benefit}>
                    <div className={styles.benefitNumberContainer}>
                      <div className={styles.benefitNumber}>{index + 1}</div>
                    </div>
                    <div className={styles.benefitText}>{item}</div>
                  </div>
                ))}
              </div>
              <div
                className={styles.blockButton}
                onClick={() => {
                  window.scrollTo(0, 2540);
                }}
              >
                <span
                  onClick={() => {
                    if (this.props.signalsState.auth.isAuthenticated) {
                      window.scrollTo(0, 2540);
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
                  GET STARTED TODAY
                </span>
              </div>
            </div>
            <div className={styles.line} />

            <div className={styles.block}>
              <div className={styles.blockHeader}>Example of a Trade Call </div>
              <div className={styles.blockText}>
                Below are some examples as to why traders are choosing our VIP
                Signals over other providers;
              </div>
              <div className={styles.exampleTradeCards}>
                <div className={styles.card}>
                  <div className={styles.cardLabel}>
                    Ollmarketing Forex Signals
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardType}>SELL</div>
                    <div className={styles.cardSubInfo}>EURUSD at 1.1778</div>
                  </div>
                  <div className={styles.cardResultl}>
                    <div className={styles.cardResultRow}>
                      <div className={styles.cardRowProperty}>Take Profit</div>
                      <div className={styles.cardRowValue}>1.1748</div>
                    </div>
                    <div className={styles.cardResultRow}>
                      <div className={styles.cardRowProperty}>Stop loss</div>
                      <div className={styles.cardRowValue}>1.1818</div>
                    </div>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardLabel}>
                    Ollmarketing Forex Signals
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardType}>SELL</div>
                    <div className={styles.cardSubInfo}>GBPUSD at 1.38072</div>
                  </div>
                  <div className={styles.cardResultl}>
                    <div className={styles.cardResultRow}>
                      <div className={styles.cardRowProperty}>Take Profit</div>
                      <div className={styles.cardRowValue}>1.36127</div>
                    </div>
                    <div className={styles.cardResultRow}>
                      <div className={styles.cardRowProperty}>Stop loss</div>
                      <div className={styles.cardRowValue}>1.38400</div>
                    </div>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardLabel}>
                    Ollmarketing Forex Signals
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardType}>SELL</div>
                    <div className={styles.cardSubInfo}>NZDUSD at 0.7218</div>
                  </div>
                  <div className={styles.cardResultl}>
                    <div className={styles.cardResultRow}>
                      <div className={styles.cardRowProperty}>Take Profit</div>
                      <div className={styles.cardRowValue}> 0.7301</div>
                    </div>
                    <div className={styles.cardResultRow}>
                      <div className={styles.cardRowProperty}>Stop loss</div>
                      <div className={styles.cardRowValue}>0.7180</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.line} />
            <div className={styles.block}>
              <div className={styles.blockHeader}>Weekly reports</div>
              <div className={styles.blockText}>
                Can our signals be trusted? Check our weekly trade reports
              </div>
              <div className={styles.tradeReports}>
                {this.state.reportBlocks}
              </div>
            </div>
            <div className={styles.lastLine} />
            <Plans openLogin={this.handleModalChange} showPay={this.showPay} />

            <Footer />
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
    signalsState: state,
  };
}

export default connect(mapStateToProps, actions)(Signals);
