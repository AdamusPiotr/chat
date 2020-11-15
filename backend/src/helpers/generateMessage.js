const { unix } = require("dayjs");
const dayjs = require("dayjs");

const generateMessage = (message) => ({
  text: message,
  timestamp: dayjs.unix(),
});

module.exports = {
  generateMessage,
};
