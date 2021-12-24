import homepageStyles from "../Homepage/homepage.module.css";
import styles from "./plans.module.css";
import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import { plans } from "./plansArrays";
import * as actions from "../../actions";
import { connect } from "react-redux";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const getOffset = (cw) => {
  //cw - currentWidth
  return cw <= 320
    ? -25
    : cw <= 335
    ? -35
    : cw <= 350
    ? -45
    : cw <= 410
    ? -75
    : -100;
};

const getBlock = (sub, isMobile, offset, openLogin, prices, showPay) => {
  return (
    <div className={styles.plans}>
      {isMobile ? (
        <Carousel
          onChange={onChangeSlick}
          offset={offset}
          animationSpeed={200}
          plugins={[
            "infinite",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 2,
              },
            },
          ]}
        >
          {
            plans(openLogin, prices, showPay)[
              sub === 1
                ? "forexSignals"
                : sub === 2
                ? "indexSignals"
                : "forexEducation"
            ]
          }
        </Carousel>
      ) : (
        plans(openLogin, prices, showPay)[
          sub === 1
            ? "forexSignals"
            : sub === 2
            ? "indexSignals"
            : "forexEducation"
        ]
      )}
    </div>
  );
};

const onChangeSlick = (value) => {
  const white = `
        background-color: #fff;
        color: #2d3436;  
        --accessTimeColor: #636e71;
        --buttonTextColor: #ffffff;
        --buttonColor: #039cfc;
        --crossOutColor: rgba(0, 0, 0, 0.3);

        transition: background-color 1s, color 1s, --crossOutColor 1s, --buttonTextColor 1s, --accessTimeColor 1s;
    `;
  const blue = `
        background-color: #039cfc;
        color: #ffffff;
        --crossOutColor: rgba(255, 255, 255, 0.5);
        --buttonTextColor: #039cfc;
        --buttonColor: #ffffff;
        --accessTimeColor: rgba(255, 255, 255, 0.7);

        transition: background-color 1s, color 1s, --crossOutColor 1s, --buttonTextColor 1s, --accessTimeColor 1s;
    `;
  if (value != 1) {
    document.getElementsByClassName(styles.plan)[1].style = white;
    document.getElementsByClassName(styles.plan)[0].style = blue;
    document.getElementsByClassName(styles.plan)[2].style = blue;
  } else {
    document.getElementsByClassName(styles.plan)[0].style = white;
    document.getElementsByClassName(styles.plan)[2].style = white;
    document.getElementsByClassName(styles.plan)[1].style = blue;
  }
};

function Plans(props) {
  const [block, setBlock] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSub, setCurrentSub] = useState(1);
  const [prices, setPrices] = useState();

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    setOffset(getOffset(document.body.clientWidth));
    setIsMobile(document.body.clientWidth <= 450 ? true : false);

    document.getElementById(1).style =
      "color: #2d3436; border-bottom: 3px solid #039cfc;";

    props.getPrices().then((prices) => {
      delete prices._id;

      setPrices(prices);

      setBlock(
        <div className={styles.plans}>
          {getBlock(
            1,
            document.body.clientWidth <= 450,
            getOffset(document.body.clientWidth),
            props.openLogin,
            prices,
            props.showPay
          )}
        </div>
      );
    });

    console.log(props);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const updateDimensions = () => {
    if (document.body.clientWidth <= 460) {
      setOffset(getOffset(document.body.clientWidth));
      setIsMobile(document.body.clientWidth <= 450 ? true : false);

      if (prices) {
        setBlock(
          <div className={styles.plans}>
            {getBlock(
              currentSub,
              document.body.clientWidth <= 450,
              getOffset(document.body.clientWidth),
              props.openLogin,
              prices,
              props.showPay
            )}
          </div>
        );
      }
    }
  };

  const onClickSub = (type) => {
    setCurrentSub(type);
    const types = [1, 2, 3];
    types.map((a) => {
      if (a !== type) {
        document.getElementById(a).style =
          "color: rgba(0, 0, 0, 0.3); border-bottom: none;";
      }
    });

    document.getElementById(type).style =
      "color: #2d3436; border-bottom: 3px solid #039cfc;";
    if (prices) {
      setBlock(
        <div className={styles.plans}>
          {getBlock(
            type,
            isMobile,
            offset,
            props.openLogin,
            prices,
            props.showPay
          )}
        </div>
      );
    }
  };

  return (
    <div className={homepageStyles.block}>
      <div className={homepageStyles.blockHeader}>Premium Plans</div>
      <div className={homepageStyles.blockText}>
        Enjoy the best courses available. Select the subscription plan you need
      </div>
      <div className={homepageStyles.subBar}>
        <span id={1} onClick={() => onClickSub(1)} style={{ width: "100%" }}>
          Management
        </span>
        <span id={2} onClick={() => onClickSub(2)}>
          Business analyse
        </span>
        <span id={3} onClick={() => onClickSub(3)}>
          Social qualities
        </span>
      </div>

      {block}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    plans: state,
  };
}

export default connect(mapStateToProps, actions)(Plans);
