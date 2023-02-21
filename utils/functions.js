function getCurrentDateTime() {
  var now = new Date();
  var options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return now.toLocaleString("en-US", options);
}

module.exports = { getCurrentDateTime };
