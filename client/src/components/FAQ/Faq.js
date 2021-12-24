import styles from "./faq.module.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import Question from "./Question/Question";
import Footer from "../Footer/Footer";
import MobileHeader from "../Header/Mobile/MobileHeader";
import * as actions from "../../actions";
import { Link } from "react-router-dom";

function Faq(props) {
  const [isMobile, setIsMobile] = useState(
    document.body.clientWidth < 831 || window.innerHeight < 730 ? true : false
  );

  const updateDimensions = () => {
    setIsMobile(
      document.body.clientWidth < 831 || window.innerHeight < 730 ? true : false
    );
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    window.scrollTo(0, 0);

    document
      .getElementsByClassName(styles.content)[0]
      .classList.add(styles.contentActive);

    setIsMobile(
      document.body.clientWidth < 831 || window.innerHeight < 730 ? true : false
    );

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.bg} />
      {isMobile ? <MobileHeader /> : <Header />}
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {/* {!isMobile ? <Header /> : null} */}

          <div>
            <div className={styles.pageName}>FAQ</div>
            <div className={styles.text}>
              Below you`ll find answers to our most frequently asked questions
            </div>
          </div>
          <div className={styles.questionsSection}>
            {/* <Question
              question="What is Trade Signals?"
              answer="A trade signal is a suggestion for entering a trade, usually at a specific price and time. The signal is generated either by a human analyst or an automated robot supplied to a subscriber of the signal service."
            />
            <Question
              question="What trading platforms/exchanges are supported for trade calls?"
              answer={
                <p>
                  We provide trade calls for all the major exchanges and
                  brokers. More info you can find on our{" "}
                  <Link to="/brokers">Brokers</Link> page
                </p>
              }
            /> */}
            <Question
              question="What makes your service different from any other?"
              answer="We have analysed best market players forecasts & signals, found patterns and provide our own signals with great results"
            />
            <Question
              question="Here can be your question!"
              answer="And here answer"
            />
            <Question
              question="Here can be your question!"
              answer="And here answer"
            />
            {/* <Question
              question="Can TraderStat be trusted?"
              answer="So as not to be unfounded, you can check our statistics table & weekly reports on your own."
            />
            <Question
              question="What time zone do I need to be to follow trade signals?"
              answer="We share trade signals 24/7 as all traders are based in various time zones, but usually it’s between 09:00 GMT to 17:00 as the markets are most active at this time.
              "
            /> */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    faqState: state,
  };
}

export default connect(mapStateToProps, actions)(Faq);
