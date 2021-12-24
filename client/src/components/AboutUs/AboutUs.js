import styles from "./aboutUs.module.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MobileHeader from "../Header/Mobile/MobileHeader";
import * as actions from "../../actions";

function AboutUs(props) {
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
          <div className={styles.block}>
            <div className={styles.pageName}>About Us</div>
            <div className={styles.text}>
              How not to lose money with a broker? 90% of brokers want to take
              your money!️ I myself saw how brokers. Here are good brokers with
              whom you will not have problems.
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.pageName}>
              Social charting for traders who look first
            </div>
            <div className={styles.text}>
              There is no better advertisement campaign that is low cost and
              also successful at the same time. Great business ideas when
              utilized effectively can save lots of money. This is not only easy
              for those who work full-time as an advertiser, but also for those
              who work from home. Advertising from home is also a low cost
              option, which involves making and distributing fliers. Usually
              potential customers will visit home for business dealing. Print
              good amount of fliers and give it to anyone who is visiting home
              like family, friends, mailman, etc. Business cards can also be
              distributed. Few selected people can be given sample of the
              product. For those who work outside home, employ college students
              to distribute fliers at supermarkets, community centers, or malls,
              especially on weekends, when there is a rush. Spread the word by
              the mouth. Talk to everyone about the product and ask them to talk
              about it to others. It’s a very powerful tool to increase the
              network and doesn’t even cost anything. When receiving a casual
              call from family members and friends, don’t forget to tell them
              about the latest events, discounts and promotions and ask them
              about what they are up to. If the parties are into the business,
              it won’t hurt to promote each other. Joint ventures can be started
              with trustable people of the same trade.
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    aboutUsState: state,
  };
}

export default connect(mapStateToProps, actions)(AboutUs);
