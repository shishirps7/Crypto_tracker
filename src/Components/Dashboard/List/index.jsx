import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import convertNumber from '../../../functions/ConvertNumbers';
import { motion } from 'framer-motion';

const List = ({ coin }) => {
  return (
    <motion.tr
      className="list-row"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
    >

      {/* LOGO */}
      <td className="td-image">
        <Tooltip title={coin.name + " logo"}>
          <img src={coin.image} alt="coin_image" className="coin-logo" />
        </Tooltip>
      </td>

      {/* NAME + SYMBOL */}
      <td>
        <Tooltip title="Symbol and Name" placement="bottom-start">
          <div className="coin-col">
            <p className="coin-symbol list-coinSymbol">{coin.symbol}</p>
            <p className="coin-name list-coinName">{coin.name}</p>
          </div>
        </Tooltip>
      </td>

      {/* PRICE CHANGE */}
      {coin.price_change_percentage_24h > 0 ? (
        <td className="chip-flex list-chip-flex">
          <Tooltip title="24h Price Change" placement="bottom-start">
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="price-chip list-price-chip">
                {coin.price_change_percentage_24h != null
                  ? coin.price_change_percentage_24h.toFixed(2) + " %"
                  : "N/A"}
              </div>
              <div className="icon-chip td-icon">
                <TrendingUpRoundedIcon />
              </div>
            </div>
          </Tooltip>
        </td>
      ) : (
        <td className="chip-flex list-chip-flex">
          <Tooltip title="24h Price Change" placement="bottom-start">
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div className="price-chip chip-red list-price-chip">
                {coin.price_change_percentage_24h != null
                  ? coin.price_change_percentage_24h.toFixed(2) + " %"
                  : "N/A"}
              </div>
              <div className="icon-chip chip-red td-icon">
                <TrendingDownRoundedIcon />
              </div>
            </div>
          </Tooltip>
        </td>
      )}

      {/* CURRENT PRICE DESKTOP */}
      <td className="desktop-td-price">
        <Tooltip title="Current price">
          <h3
            className="coin-price td-align-center list-coinPrice"
            style={
              coin.price_change_percentage_24h >= 0
                ? { color: "var(--green)" }
                : { color: "var(--red)" }
            }
          >
            {coin.current_price != null
              ? "$" + coin.current_price.toLocaleString()
              : "N/A"}
          </h3>
        </Tooltip>
      </td>

      {/* CURRENT PRICE MOBILE */}
      <td className="mobile-td-price">
        <Tooltip title="Current price">
          <h3
            className="coin-price td-align-center list-coinPrice"
            style={
              coin.price_change_percentage_24h >= 0
                ? { color: "var(--green)" }
                : { color: "var(--red)" }
            }
          >
            {coin.current_price != null
              ? "$" + convertNumber(coin.current_price)
              : "N/A"}
          </h3>
        </Tooltip>
      </td>

      {/* TOTAL VOLUME */}
      <td>
        <Tooltip title="Total volume">
          <p className="total_volume td-align-right td-total-volume">
            {coin.total_volume != null
              ? coin.total_volume.toLocaleString()
              : "N/A"}
          </p>
        </Tooltip>
      </td>

      {/* MARKET CAP DESKTOP */}
      <td className="desktop-td-mkt">
        <Tooltip title="Market cap">
          <p className="market_cap td-align-right">
            {coin.market_cap != null ? "$" + coin.market_cap.toLocaleString() : "N/A"}
          </p>
        </Tooltip>
      </td>

      {/* MARKET CAP MOBILE */}
      <td className="mobile-td-mkt">
        <Tooltip title="Market cap">
          <p className="market_cap td-align-right list-marketcap">
            {coin.market_cap != null ? "$" + convertNumber(coin.market_cap) : "N/A"}
          </p>
        </Tooltip>
      </td>

    </motion.tr>
  );
};

export default List;
