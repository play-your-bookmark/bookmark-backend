const { getChromeHistory } = require("../nodeBrowserHistory");

exports.getHistoryLink = async function (req, res, next) {
  const minute = Number(req.query.minute);
  let { date } = req.query;
  let historyLinkList = [];

  date = [...date]
    .map((char) => {
      if (char === "T") {
        return " ";
      }
      if (char === "Z") {
        return "";
      }
      return char;
    })
    .join("");

  try {
    historyLinkList = await getChromeHistory(minute, date);
    res.status(200).send(historyLinkList[0]);
  } catch (error) {
    next(error);
  }
};
