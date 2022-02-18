const { getChromeHistory } = require("90crew-node-browser-history");

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
    console.log("call this if history exist", historyLinkList);
    res.status(200).send(historyLinkList[0]);
  } catch (error) {
    console.log("call if none", error.stack);
    next(error);
  }
};
