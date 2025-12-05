import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import "./styles.css"
export default function PriceType({priceType,handlePriceTypeChange}) {

  return (
    <div className="toggle-prices">
    <ToggleButtonGroup
  value={priceType}
  exclusive
  onChange={handlePriceTypeChange}
  sx={{
  border: "unset !important",

  // default button style
  "& .MuiToggleButton-root": {
    color: "var(--blue)",
    border: "1px solid var(--blue)",
    padding: "0.4rem 1rem",      // desktop padding
    fontSize: "0.9rem",
  },

  // selected style
  "& .Mui-selected": {
    color: "white !important",
    backgroundColor: "var(--blue) !important",
  },

  // remove outline between grouped buttons
  "& .MuiToggleButtonGroup-grouped": {
    borderColor: "var(--blue)",
  },

  /* -------------------------
     🔹 MOBILE STYLES BELOW
     ------------------------- */
  "@media (max-width: 600px)": {
    "& .MuiToggleButton-root": {
      padding: "0.35rem 0.7rem",   // smaller touch-friendly size
      fontSize: "0.55rem",         // smaller text         // nicer on mobile
    },

    "& .Mui-selected": {
      backgroundColor: "var(--blue) !important",
      color: "#fff !important",
    },

    // stack or tighten spacing (optional)
    display: "flex",
  }
}}

>
  <ToggleButton value="prices" className='toggle-btn'>PRICE</ToggleButton>
  <ToggleButton value="market_caps" className='toggle-btn'>MARKET CAP</ToggleButton>
  <ToggleButton value="total_volumes" className='toggle-btn'>TOTAL VOLUME</ToggleButton>
</ToggleButtonGroup>
</div>
  );
}
