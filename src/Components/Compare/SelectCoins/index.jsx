import React, { useState, useEffect } from 'react'
import "./styles.css"
import { Get100Coins } from '../../../functions/Get100Coins'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Loader from '../../Common/Loader'

const SelectCoins = ({ crypto1, crypto2, handleCoinChange }) => {
  const [allCoins, setAllCoins] = useState([])   // always valid array
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCoins()
  }, [])

  async function getCoins() {
    try {
      const coins = await Get100Coins()

      // If API fails → keep empty array instead of undefined
      setAllCoins(Array.isArray(coins) ? coins : [])
    } catch (e) {
      console.log("Error fetching coins", e)
      setAllCoins([]) // fallback
    } finally {
      setLoading(false)
    }
  }

  const styles = {
    height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "3a80e9",
      },
    },
    "@media (max-width: 600px)": {
      height: "2.2rem",
      fontSize: "0.8rem",
      "& .MuiSelect-select": {
        padding: "8px 10px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--white)",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "1.1rem",
      },
    },
  }

  if (loading) return <Loader />

  return (
    <div className="coins-flex">
      <p>Crypto 1</p>
      <Select
        sx={styles}
        value={crypto1}
        label="crypto 1"
        onChange={(event) => handleCoinChange(event, false)}
      >
        {(allCoins || [])
          .filter((item) => item.id !== crypto2)
          .map((coin) => (
            <MenuItem key={coin.id} value={coin.id}>
              {coin.name}
            </MenuItem>
          ))}
      </Select>

      <p>Crypto 2</p>
      <Select
        sx={styles}
        value={crypto2}
        label="crypto 2"
        onChange={(event) => handleCoinChange(event, true)}
      >
        {(allCoins || []).map((coin) => (
          <MenuItem key={coin.id} value={coin.id}>
            {coin.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default SelectCoins
