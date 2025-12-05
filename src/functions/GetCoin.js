import axios from "axios";

export const GetCoin = (id) => {
  const myData = axios
    .get(`/api/coin/${id}`) // <-- call your backend API instead of CoinGecko directly
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error>>>", error);
      return null; // return null on error to avoid breaking components
    });

  return myData;
};
