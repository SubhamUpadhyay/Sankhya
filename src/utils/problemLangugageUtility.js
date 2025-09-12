const axios = require("axios");
const getLangugageById = (lang) => {
  const language = {
    "c++": 105,
    javascript: 102,
    python: 109,
  };
  return language[lang.toLowerCase()] ?? "Notfound";
};

const submitBatch = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",  //url where we submit 
    params: {
      base64_encoded: "true",    //encoding 
    },
    headers: {
      "x-rapidapi-key": "7ff1bf078fmshc943193a5505a54p1b07b1jsn06a1071a93ae",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();
};

module.exports = { getLangugageById, submitBatch };
