import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import convertNumber from '../../../functions/ConvertNumbers';
const List = ({coin}) => {
  return (
    <tr className='list-row'>
          <Tooltip title={coin.name+" logo"}>
            <td className="td-image">
        <img src={coin.image} alt="coin_image" className="coin-logo" />
        </td>
          </Tooltip>
          <Tooltip title="Symbol and Name" placement='bottom-start'>
        <td>
        <div className="coin-col">
          <p className='coin-symbol'>{coin.symbol}</p>
          <p className='coin-name'>{coin.name}</p>
        </div>
      </td>
      </Tooltip>
      {
        coin.price_change_percentage_24h > 0 ? (
            <Tooltip title="24h Price Change" placement='bottom-start'>
          <td className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h != null
                ? coin.price_change_percentage_24h.toFixed(2) + " %"
                : "N/A"}
            </div>
            <div className="icon-chip td-icon">
              <TrendingUpRoundedIcon />
            </div>
          </td>
            </Tooltip>
        ) : (
          <Tooltip title="24h Price Change" placement='bottom-start'>
          <td className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h != null
                ? coin.price_change_percentage_24h.toFixed(2) + " %"
                : "N/A"}
            </div>
            <div className="icon-chip chip-red td-icon">
              <TrendingDownRoundedIcon />
            </div>
          </td>
          </Tooltip>
        )
      }
    <Tooltip title="Current price">
    <td><h3 className="coin-price td-align-center" style={coin.price_change_percentage_24h >= 0 ? { color: "var(--green)" } : { color: "var(--red)" }}>{coin.current_price != null
          ? "$" + coin.current_price.toLocaleString()
          : "N/A"}</h3></td> </Tooltip>
     <Tooltip title="Total volume" ><td> <p className="total_volume td-align-right td-total-volume">{coin.total_volume != null ?coin.total_volume.toLocaleString() : "N/A"}</p></td></Tooltip>
        
        <Tooltip title="Market cap"> <td className='desktop-td-mkt'> <p className="market_cap td-align-right">{coin.market_cap != null ? "$" + coin.market_cap.toLocaleString() : "N/A"}</p></td></Tooltip>
        <Tooltip title="Market cap"> <td className='mobile-td-mkt'> <p className="market_cap td-align-right">{coin.market_cap != null ? "$" + convertNumber(coin.market_cap) : "N/A"}</p></td></Tooltip>
    </tr>
  )
}

export default List 