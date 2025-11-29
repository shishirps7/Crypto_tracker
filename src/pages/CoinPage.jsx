import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Components/Common/Header';
import Loader from '../Components/Common/Loader';
import axios from 'axios'
import { CoinObject } from '../functions/CoinObject';
import List from '../Components/Dashboard/List';
import CoinInfo from '../Components/Coin/CoinInfo';
const CoinPage = () => {
    const {id}=useParams();
    const [isLoader,setIsLoader]=useState(true)
    const [coinData,setCoinData]=useState()

    useEffect(() => {
     axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
  .then((response)=>{
    console.log("data>>",response.data)
    CoinObject(setCoinData,response.data)
    setIsLoader(false)
  })
  .catch((error)=>{
    console.log("error>>>",error)
    setIsLoader(false)
  })
    }, [id])
    
  return (
    <div>
        <Header/>
        
        {isLoader?<Loader/>: <><div className='coinpage-element-wrapper'> <table className='coinpage-table'><tbody><List coin={coinData}/></tbody></table></div>
        <CoinInfo heading={coinData.name} description={coinData.desc}/></>  
        }</div>
  )
}

export default CoinPage