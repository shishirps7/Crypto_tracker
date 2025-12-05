import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Common/Header";
import Loader from "../Components/Common/Loader";
import { CoinObject } from "../functions/CoinObject";
import List from "../Components/Dashboard/List";
import CoinInfo from "../Components/Coin/CoinInfo";
import { GetCoin } from "../functions/GetCoin";
import { GetCoinPrices } from "../functions/GetCoinPrices";
import LineChart from "../Components/Coin/LineChart";
import SelectDays from "../Components/Coin/SelectDays";
import { SettingChartData } from "../functions/SettingChartData";
import PriceType from "../Components/Coin/PriceType";
const CoinPage = () => {
  const { id } = useParams();
  const [isLoader, setIsLoader] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(7);
   const [priceType, setPriceType] = useState('prices');

  const [chartData, setChartData] = useState({
  labels: [],
  datasets: [],
});
  useEffect(() => {
    if (id) {
      setIsLoader(true);
      getData();
    }
  }, [id]);

  async function getData() {
    try {
      const coin_data = await GetCoin(id);
      if (coin_data) CoinObject(setCoinData, coin_data);

      const price_data = await GetCoinPrices(id, days, priceType);

      if (price_data && price_data.length > 0) {
        SettingChartData(setChartData ,price_data);
      } else {
        console.log("no price data");
      }
    } catch (e) {
      console.log("error fetching data", e);
    } finally {
      setIsLoader(false);
    }
  }
  const handleDaysChange = async (event) => {
    setIsLoader(true);
    try{
      setDays(event.target.value);
    const price_data = await GetCoinPrices(id, event.target.value, priceType);

      if (price_data && price_data.length > 0) {
        SettingChartData(setChartData ,price_data);
      } else {
        console.log("no price data");
      }
    } catch (e) {
      console.log("error fetching data", e);
    } finally {
      setIsLoader(false);
    }
  };
  const handlePriceTypeChange = async (event, newPriceType) => {
       setIsLoader(true);
    setPriceType(newPriceType);
    try{
    const price_data = await GetCoinPrices(id, days, newPriceType);

      if (price_data && price_data.length > 0) {
        SettingChartData(setChartData ,price_data);
      } else {
        console.log("no price data");
      }
    } catch (e) {
      console.log("error fetching data", e);
    } finally {
      setIsLoader(false);
    }
  };
  return (
    <div>
      <Header />

      {isLoader ? (
        <Loader />
      ) : (
        <>
          <div className="coinpage-element-wrapper">
            {" "}
            <table className="coinpage-table">
              <tbody>
                <List coin={coinData} />
              </tbody>
            </table>
          </div>
          <div className="coinpage-element-wrapper-chart">
            <SelectDays days={days} handleDaysChange={handleDaysChange}/>
            <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
            <LineChart chartData={chartData} />
          </div>
          <CoinInfo heading={coinData.name} description={coinData.desc} />
        </>
      )}
    </div>
  );
};

export default CoinPage;
