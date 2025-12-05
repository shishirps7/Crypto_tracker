import axios from "axios";

export const GetCoinPrices = (id, days, priceType) => {
  const myData = axios
    .get(`/api/chart/${id}?days=${days}&priceType=${priceType}`) // call your backend instead of CoinGecko
    .then((response) => {
      return response.data[priceType]; // return the specific price type array
    })
    .catch((err) => {
      console.log("error-->", err);
      return []; // return empty array if error occurs to prevent crashes
    });

  return myData;
};
