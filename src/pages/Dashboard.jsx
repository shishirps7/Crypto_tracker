import React, { useEffect, useState } from 'react'
import Header from '../Components/Common/Header'
import TabsComponent from '../Components/Dashboard/TabsComponent'
import axios from 'axios'



const Dashboard = () => {
  const [coins,setCoins]=useState([])
  useEffect(()=>{
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&price_change_percentage=1h&order=market_cap_desc&per_page=100&page=1')
  .then((response)=>{
    console.log("data>>",response.data)
    setCoins(response.data)
  })
  .catch((error)=>{
    console.log("error>>>",error)
  })
},[])
  return (
    <div>
      <Header/>
      <TabsComponent coins={coins}/>
    </div>
  )
}

export default Dashboard