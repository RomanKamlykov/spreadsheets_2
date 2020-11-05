const axios = require('axios');
require('dotenv').config();

const { SPREADSHEET_ID, RANGE, API_KEY } = process.env;
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?majorDimension=ROWS&key=${API_KEY}`;

exports.handler = async function getData(event, context) {
  try {
    const { data } = await axios.get(URL);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Some error :-)' }),
    };
  }
};
