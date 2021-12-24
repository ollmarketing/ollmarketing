import styles from "./plans.module.css";
import React, { useEffect, useState } from "react";
import { sha256 } from "js-sha256";
import * as actions from "../../actions";
import { connect } from "react-redux";

import { Pay } from "./../Tinkoff";

require("dotenv").config();

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

function Plan(props) {
  const [list, setList] = useState([]);
  const [crossOutList, setCrossOutList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState();
  const [showFormTimeOut, setShowFormTimeOut] = useState();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    terminalkey: "TinkoffBankTest",
    frame: "true",
    language: "en",
    amount: "",
    order: "",
    description: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const propsList = [];
    const crossOutList = [];
    props.list.map((a) => {
      propsList.push(<span>{a}</span>);
    });

    props.crossOutList.map((a) => {
      crossOutList.push(<span>{a}</span>);
    });

    setList(propsList);
    setCrossOutList(crossOutList);

    return () => {
      clearTimeout(showFormTimeOut);
    };
  }, []);

  function openLogin() {
    props.showLogin("login");
  }

  const onClickGet = async (data) => {
    props.getRate().then((rate) => {
      if (props.isAuth.auth.isAuthenticated) {
        setIsLoading(true);

        const type =
          data.type === "forexSignals"
            ? "Forex Signals"
            : data.type === "indexSignals"
            ? "Index Signals"
            : "Forex Education";

        const orderId = getRandom(99999, 99999999);

        setForm({
          terminalkey: window.env.REACT_APP_TERMINAL_KEY,
          frame: "true",
          language: "en",
          amount: String((data.price * rate).toFixed(2)),
          order: orderId,
          description: `${type}: ${data.accessTime}`,
          name: "test",
          email: "",
          phone: "",
        });

        setShowFormTimeOut(
          setTimeout(() => {
            setShowForm(false);
          }, 1800000)
        );
      } else {
        openLogin();
      }
    });
  };

  const onPaymentInit = (item) => {
    setPayment(item);
  };

  function showPayForm() {
    setShowForm(true);
  }

  useEffect(() => {
    if (form.amount) {
      //!
      showPayForm();
    }

    if (form.amount && payment) {
      props.createTransaction({
        status: "NOT_PAID",
        amount: form.amount,
        order: payment.OrderId,
        description: form.description,
        userId: localStorage.getItem("USER_ID"),
        paymentId: payment.PaymentId,
        createdAt: new Date(),
      });
    }
  }, [form, payment]);

  useEffect(() => {
    props.showPay(
      <Pay
        form={form}
        onClose={() => {
          setShowForm(false);
          clearTimeout(showFormTimeOut);
        }}
        onPaymentInit={onPaymentInit}
      />,
      showForm
    );
  }, [showForm]);

  return (
    <div>
      <div className={styles.plan}>
        {props.save ? (
          <div className={styles.save}>SAVE €{props.save}</div>
        ) : null}
        <div
          className={styles.star}
          key={Math.random()}
          id={styles[`star${props.stars}`]}
        />
        <div className={styles.level}>{props.level}</div>
        <div className={styles.accessTime}>{props.accessTime}</div>
        <div className={styles.price}>
          <div className={styles.euro}>€ </div>
          <div className={styles.count}>
            <span>{props.price}</span>
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.list}>
          <div className={styles.notCrossOut}>list</div>
          <div className={styles.crossOut}>crossOutList</div>
        </div>
        <div
          className={styles.button}
          onClick={async () =>
            onClickGet({
              price: props.price,
              type: props.type,
              accessTimeInt: props.accessTimeInt,
              accessTime: props.accessTime,
              type: props.type,
            })
          }
        >
          GET NOW
        </div>
      </div>
      {/* {showForm ? (
        
      ) : null} */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: state,
  };
}

export default connect(mapStateToProps, actions)(Plan);
