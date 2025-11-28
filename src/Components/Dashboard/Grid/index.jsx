import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import {motion} from 'framer-motion'
const Grid = ({ coin }) => {
  return (
    <motion.div className={`grid-container ${coin.price_change_percentage_24h<0 && "grid-container-red"}`}
    initial={{opacity:0,x:-50}} animate={{opacity:1,x:0}} transition={{duration:0.5,delay:0.05}}
    >
      <div className="info-flex">
        <img src={coin.image} alt="coin_image" className="coin-logo" />
        <div className="coin-col">
          <p className='coin-symbol'>{coin.symbol}</p>
          <p className='coin-name'>{coin.name}</p>
        </div>
      </div>
      {
        coin.price_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h != null
                ? coin.price_change_percentage_24h.toFixed(2) + " %"
                : "N/A"}
            </div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h != null
                ? coin.price_change_percentage_24h.toFixed(2) + " %"
                : "N/A"}
            </div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )
      }
      <div className="info-container">
        <h3 className="coin-price" style={coin.price_change_percentage_24h >= 0 ? { color: "var(--green)" } : { color: "var(--red)" }}>{coin.current_price != null
          ? "$" + coin.current_price.toLocaleString()
          : "N/A"}</h3>
          <p className="total_volume">Total Volume: {coin.total_volume != null ?coin.total_volume.toLocaleString() : "N/A"}</p>
          <p className="market_cap">Market Cap: {coin.market_cap != null ? "$" + coin.market_cap.toLocaleString() : "N/A"}</p>
      </div>
    </motion.div>
  )
}

export default Grid