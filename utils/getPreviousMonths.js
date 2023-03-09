function getLastXMonths(x) {
    const today = new Date();
    const lastXMonths = {};
    
    for (let i = x - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      lastXMonths[key] = { income: 0, outcome: 0 };
    }
    
    return JSON.stringify(lastXMonths);
  }

  module.exports = {getLastXMonths};
  