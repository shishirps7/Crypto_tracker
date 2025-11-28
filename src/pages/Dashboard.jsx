import React, { useEffect, useState } from 'react'
import Header from '../Components/Common/Header'
import TabsComponent from '../Components/Dashboard/TabsComponent'
import axios from 'axios'
import Search from '../Components/Dashboard/Search'
import PaginationComponent from '../Components/Dashboard/Pagination'



const Dashboard = () => {
  const [coins,setCoins]=useState([])
  const [paginatedCoins,setPaginatedCoins]=useState([])
  const [search,setSearch]=useState("")
  const [page,setPage]=useState(1)
  const onSearchChange=(e)=>{

    e==""?setSearch(""):setSearch(e.target.value)
  }
  const handlePageChange=(event,value)=>{
    setPage(value)
    var previousIndex=(value-1)*10
    setPaginatedCoins(coins.slice(previousIndex,previousIndex+10))
  }
  const filteredCoins=coins.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())||item.symbol.toLowerCase().includes(search.toLowerCase()))
  useEffect(()=>{
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&price_change_percentage=1h&order=market_cap_desc&per_page=100&page=1')
  .then((response)=>{
    console.log("data>>",response.data)
    setCoins(response.data)
    setPaginatedCoins(response.data.slice(0,10))
  })
  .catch((error)=>{
    console.log("error>>>",error)
  })
},[])
  return (
    <div>
      <Header/>
      <Search search={search} onSearchChange={onSearchChange}/>
      <TabsComponent coins={search?filteredCoins:paginatedCoins} onSearchChange={onSearchChange}/>
      <PaginationComponent page={page} handlePageChange={handlePageChange}/>
    </div>
  )
}

export default Dashboard