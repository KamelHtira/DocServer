const moment = require("moment");
function getCurrentDateTime() {
  return moment(new Date()).format();
}
module.exports = { getCurrentDateTime };
