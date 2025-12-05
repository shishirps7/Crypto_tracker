import axios from "axios";

export const Get100Coins = () => {
  const myCoins = axios
    .get('/api/coins') // <-- call your backend API instead of CoinGecko directly
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error>>>", error);
      return []; // return empty array on error to avoid breaking components
    });

  return myCoins;
};
