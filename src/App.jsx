import { useState } from 'react'
import './App.css'
import Footer from './Components/Common/Footer'
import Header from './Components/Common/Header'
import MainComponent from './Components/LandingPage/MainComponent'

function App() {


  return (
    <>
      <div className='app'>
        {/* <Footer /> */}
        <Header />
        <MainComponent/>
      </div>
    
    </>
  )
}

export default App
