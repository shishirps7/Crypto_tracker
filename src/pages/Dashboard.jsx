import React, { useEffect, useState } from 'react'
import Header from '../Components/Common/Header'
import TabsComponent from '../Components/Dashboard/TabsComponent'
import axios from 'axios'
import Search from '../Components/Dashboard/Search'
import PaginationComponent from '../Components/Dashboard/Pagination'
import Loader from '../Components/Common/Loader'
import BackToTop from '../Components/Common/BackToTop'
import { Get100Coins } from '../functions/Get100Coins'



const Dashboard = () => {
  const [coins,setCoins]=useState([])
  const [paginatedCoins,setPaginatedCoins]=useState([])
  const [search,setSearch]=useState("")
  const [page,setPage]=useState(1)
  const [isLoader,setIsLoader]=useState(true)
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
  getCoins()
},[])
const getCoins=async ()=>{
  const Coins = await Get100Coins()
if(coins){
  setCoins(Coins)
    setPaginatedCoins(Coins.slice(0,10))
    setIsLoader(false)
}
}
  return (<>
    <Header/>
    <BackToTop/> 
    { 
    isLoader?<Loader/>:
    <div>
      <Search search={search} onSearchChange={onSearchChange}/>
      <TabsComponent coins={search?filteredCoins:paginatedCoins} onSearchChange={onSearchChange}/>
      <PaginationComponent page={page} handlePageChange={handlePageChange}/>
    </div>
    }
    </>
  )
}

export default Dashboard