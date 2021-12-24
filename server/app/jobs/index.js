const schedule = require("node-schedule");
const sqlLiteController = require("../routes/controllers/sqlLiteController");
const transactionsController = require("../routes/controllers/transactionsController");
const { getCurrency } = require("./actions/getCurrency");

module.exports = {
  getTradersSchedule: () =>
    schedule.scheduleJob("0 18 * * *", async function () {
      //await sqlLiteController.getAndSaveTraders();
    }),

  getIdeasSchedule: () =>
    schedule.scheduleJob("0 18 * * *", async function () {
      //await sqlLiteController.getAndSaveIdeas();
    }),

  getTransactionStatus: (database) =>
    schedule.scheduleJob("*/1 * * * *", async function () {
      //await transactionsController.getAndUpdateTransactionsStatus(database);
    }),

  updateCurrency: (database) =>
    schedule.scheduleJob("0 1 */1 * *", async function () {
      await getCurrency(database);
    }),
};
