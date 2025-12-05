import React, { useEffect, useState } from 'react'
import Header from '../Components/Common/Header'
import SelectCoins from '../Components/Compare/SelectCoins'
import SelectDays from '../Components/Coin/SelectDays'
import { GetCoin } from '../functions/GetCoin'
import { CoinObject } from '../functions/CoinObject'
import { GetCoinPrices } from '../functions/GetCoinPrices'
import { SettingChartData } from '../functions/SettingChartData'
import Loader from '../Components/Common/Loader'
import List from '../Components/Dashboard/List'
import CoinInfo from '../Components/Coin/CoinInfo'
import LineChart from '../Components/Coin/LineChart'
import PriceType from '../Components/Coin/PriceType'

const ComparePage = () => {
  const [crypto1, setCrypto1] = useState("bitcoin")
  const [crypto2, setCrypto2] = useState("ethereum")
  const [crypto1Data, setCrypto1Data] = useState(null)
  const [crypto2Data, setCrypto2Data] = useState(null)
  const [isLoader, setIsLoader] = useState(true)
  const [days, setDays] = useState(30)
  const [priceType, setPriceType] = useState("prices")
  const [chartData, setChartData] = useState({})

  // 🔥 Auto-fetch whenever any dependency changes
  useEffect(() => {
    fetchData()
  }, [crypto1, crypto2, days, priceType])

  const fetchData = async () => {
    setIsLoader(true)
    try {
      const [
        coin_data1,
        coin_data2,
        price_data1,
        price_data2
      ] = await Promise.all([
        GetCoin(crypto1),
        GetCoin(crypto2),
        GetCoinPrices(crypto1, days, priceType),
        GetCoinPrices(crypto2, days, priceType)
      ])

      if (coin_data1) CoinObject(setCrypto1Data, coin_data1)
      if (coin_data2) CoinObject(setCrypto2Data, coin_data2)
      if (price_data1.length > 0 && price_data2.length > 0) {
        SettingChartData(
          setChartData,
          price_data1,
          price_data2,
          coin_data1,
          coin_data2
        )
      } else {
        console.log("no price data")
      }
    } catch (err) {
      console.log("error fetching data", err)
    } finally {
      setIsLoader(false)
    }
  }

  // No API calls here — only state updates
  const handleCoinChange = (event, isCoin2) => {
    if (isCoin2) setCrypto2(event.target.value)
    else setCrypto1(event.target.value)
  }

  const handleDaysChange = (event) => {
    setDays(event.target.value)
  }

  const handlePriceTypeChange = (event, newPriceType) => {
    setPriceType(newPriceType)
  }

  return (
    <div>
      <Header />

      {isLoader ? (
        <Loader />
      ) : (
        <>
          <div className='compare-coins-flex'>
            <SelectCoins
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinChange={handleCoinChange}
            />
            <SelectDays
              days={days}
              handleDaysChange={handleDaysChange}
              noPtag={true}
            />
          </div>

          {crypto1Data && (
            <div className="coinpage-element-wrapper">
              <table className="coinpage-table">
                <tbody>
                  <List coin={crypto1Data} />
                </tbody>
              </table>
            </div>
          )}

          {crypto2Data && (
            <div className="coinpage-element-wrapper">
              <table className="coinpage-table">
                <tbody>
                  <List coin={crypto2Data} />
                </tbody>
              </table>
            </div>
          )}

          {chartData?.labels && chartData?.datasets && (
            <div className="coinpage-element-wrapper-chart">
              <PriceType
                priceType={priceType}
                handlePriceTypeChange={handlePriceTypeChange}
              />
              <LineChart
                chartData={chartData}
                priceType={priceType}
                multiAxis={true}
              />
            </div>
          )}

          {crypto1Data && (
            <CoinInfo
              heading={crypto1Data.name}
              description={crypto1Data.desc}
            />
          )}

          {crypto2Data && (
            <CoinInfo
              heading={crypto2Data.name}
              description={crypto2Data.desc}
            />
          )}
        </>
      )}
    </div>
  )
}

export default ComparePage
