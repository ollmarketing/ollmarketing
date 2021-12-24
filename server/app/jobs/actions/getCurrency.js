const axios = require("axios").default;

module.exports = {
  getCurrency: async (database) => {
    try {
      const result = await axios.get(
        `http://api.currencylayer.com/live?access_key=${process.env.CURRENCY_API_KEY}`
      );
      const currencies = result.data.quotes;
      const EURRUB =
        Number(currencies["USDRUB"]) / Number(currencies["USDEUR"]);

      await database.collection("Rate").updateMany(
        {},
        {
          $set: {
            rate: EURRUB,
          },
        }
      );

      return Number(currencies["USDRUB"]) / Number(currencies["USDEUR"]);
    } catch (err) {
      console.log(err);
    }
  },
};
