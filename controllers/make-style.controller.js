const fetch = require("node-fetch"); // Version 2.x

const makeStyle = async (req, res) => {
  const url = "https://virtual-try-on4.p.rapidapi.com/tryon";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "21c6b824afmsh9055483756d6968p1db239jsn316a7f14463c",
      "x-rapidapi-host": "virtual-try-on4.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: {
      garm: "https://i.ibb.co/BtjmmgW/04469-00.jpg",
      human: "https://i.ibb.co/LRMrz8b/descarga-1.png",
      category: "upper_body",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  makeStyle,
};
