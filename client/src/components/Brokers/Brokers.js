import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import MobileHeader from "../Header/Mobile/MobileHeader";
import Footer from "../Footer/Footer";
import * as actions from "../../actions";

import styles from "./brokers.module.css";

class Brokers extends Component {
  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);

    this.state = {
      brokers: [],
      brokerBlocks: [],
      isMobile:
        document.body.clientWidth < 831 || window.innerHeight < 730
          ? true
          : false,
    };
  }

  async componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    window.scrollTo(0, 0);

    await this.props.getBrokers();

    const brokers = this.props.brokersState.broker.brokers[0];

    const brokerBlocks = [];

    for (const key in brokers) {
      let margin = "32px";
      if ((Number(key) + 1) % 4 === 0) {
        margin = "0";
      }
      brokerBlocks.push(
        <div className={styles.broker} style={{ marginRight: margin }}>
          <div
            className={styles.brokerImage}
            style={{ backgroundImage: `url('/${brokers[key].file}')` }}
          />
          <div className={styles.brokerTitle}>{brokers[key].header}</div>
          <div className={styles.brokerText}>{brokers[key].text}</div>
          <div className={styles.link}>
            <a href={brokers[key].link} target="_blank">
              OPEN
            </a>
          </div>
        </div>
      );
    }

    this.setState({
      brokers,
      brokerBlocks,
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

  render() {
    return (
      <div>
        <div className={styles.bg} />
        {this.state.isMobile ? <MobileHeader /> : <Header />}
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {/* {!this.state.isMobile ? <Header /> : false} */}
            <div className={styles.block}>
              <div className={styles.title}>Degram Brokers</div>
              <div className={styles.text}>
                How not to lose money with a broker? 90% of brokers want to take
                your money!️ I myself saw how brokers.
                <br /> Here are good brokers with whom you will not have
                problems.
              </div>
              <div className={styles.brokers}>{this.state.brokerBlocks}</div>
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
    brokersState: state,
  };
}

export default connect(mapStateToProps, actions)(Brokers);
