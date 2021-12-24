import React from "react";
import Plan from "./Plan";

const getSave = (price, pricePerMonth, countOfMonths) => {
  return pricePerMonth * countOfMonths - price;
};

export const plans = (openLogin, prices, showPay) => {
  return {
    forexSignals: [
      <Plan
        key={1}
        stars={1}
        type="forexSignals"
        level="Basic"
        accessTime="1 month room access"
        accessTimeInt={1}
        price={prices["forexSignals"][1]}
        list={["Signals in Telegram", "Signals in Email"]}
        crossOutList={["Autocopy signals for MT4"]}
        showLogin={openLogin}
        showPay={showPay}
      />,
      <Plan
        key={2}
        stars={2}
        type="forexSignals"
        level="Pro"
        accessTime="6 month room access"
        accessTimeInt={6}
        price={prices["forexSignals"][2]}
        list={["Signals in Telegram", "Signals in Email"]}
        crossOutList={["Autocopy signals for MT4"]}
        showLogin={openLogin}
        showPay={showPay}
        save={getSave(prices["forexSignals"][2], prices["forexSignals"][1], 6)}
      />,
      <Plan
        key={3}
        stars={3}
        type="forexSignals"
        level="Advanced"
        accessTime="12 month room access"
        accessTimeInt={12}
        price={prices["forexSignals"][3]}
        list={["Trading room access", "Pro trading video academy"]}
        list={[
          "Signals in Telegram",
          "Signals in Email",
          "Autocopy signals for MT4",
        ]}
        crossOutList={[]}
        showLogin={openLogin}
        showPay={showPay}
        save={getSave(prices["forexSignals"][3], prices["forexSignals"][1], 12)}
      />,
    ],
    indexSignals: [
      <Plan
        key={1}
        stars={1}
        type="indexSignals"
        level="Easy Level"
        accessTime="1 month room access"
        accessTimeInt={1}
        price={prices["indexSignals"][1]}
        list={["Trading room access", "Pro trading video academy"]}
        crossOutList={[
          "Daily live trading sessions",
          "Trading signals",
          "Weekly hot-pick analysis",
        ]}
        showLogin={openLogin}
        showPay={showPay}
      />,
      <Plan
        key={2}
        stars={2}
        type="indexSignals"
        level="Easy Level"
        accessTime="6 month room access"
        accessTimeInt={6}
        price={prices["indexSignals"][2]}
        list={["Trading room access", "Pro trading video academy"]}
        crossOutList={[
          "Daily live trading sessions",
          "Trading signals",
          "Weekly hot-pick analysis",
        ]}
        showLogin={openLogin}
        showPay={showPay}
        save={getSave(prices["indexSignals"][2], prices["indexSignals"][1], 6)}
      />,
      <Plan
        key={3}
        stars={3}
        type="indexSignals"
        level="Easy Level"
        accessTime="12 month room access"
        accessTimeInt={12}
        price={prices["indexSignals"][3]}
        list={["Trading room access", "Pro trading video academy"]}
        crossOutList={[
          "Daily live trading sessions",
          "Trading signals",
          "Weekly hot-pick analysis",
        ]}
        showLogin={openLogin}
        showPay={showPay}
        save={getSave(prices["indexSignals"][3], prices["indexSignals"][1], 12)}
      />,
    ],
    forexEducation: [
      <Plan
        key={1}
        stars={1}
        type="forexEducation"
        level="Easy Level"
        accessTime="1 month room access"
        accessTimeInt={1}
        price={prices["forexEducation"][1]}
        list={["Trading room access", "Pro trading video academy"]}
        crossOutList={[
          "Daily live trading sessions",
          "Trading signals",
          "Weekly hot-pick analysis",
        ]}
        showLogin={openLogin}
        showPay={showPay}
      />,
      <Plan
        key={2}
        stars={2}
        type="forexEducation"
        level="Easy Level"
        accessTime="6 month room access"
        accessTimeInt={6}
        price={prices["forexEducation"][2]}
        list={["Trading room access", "Pro trading video academy"]}
        crossOutList={[
          "Daily live trading sessions",
          "Trading signals",
          "Weekly hot-pick analysis",
        ]}
        showLogin={openLogin}
        showPay={showPay}
        save={getSave(
          prices["forexEducation"][2],
          prices["forexEducation"][1],
          6
        )}
      />,
      <Plan
        key={3}
        stars={3}
        type="forexEducation"
        level="Easy Level"
        accessTime="12 month room access"
        accessTimeInt={12}
        price={prices["forexEducation"][3]}
        list={["Trading room access", "Pro trading video academy"]}
        crossOutList={[
          "Daily live trading sessions",
          "Trading signals",
          "Weekly hot-pick analysis",
        ]}
        showLogin={openLogin}
        showPay={showPay}
        save={getSave(
          prices["forexEducation"][3],
          prices["forexEducation"][1],
          12
        )}
      />,
    ],
  };
};
