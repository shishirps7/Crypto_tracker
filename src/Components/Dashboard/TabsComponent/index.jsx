import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Grid from '../Grid';
import './styles.css'
import List from '../List';
import { div } from 'framer-motion/client';
import Button from '../../Common/Button';

export default function TabsComponent({coins,onSearchChange}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme=createTheme({
    palette:{
      primary:{
        main:"#3a80e9",
      },
    },
  });
 
  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
          <TabList onChange={handleChange} variant='fullWidth'>
            <Tab label="Grid" value="grid" sx={{color:"var(--white)",width:"50vw",fontSize:"1.1rem",fontFamily:"inter",fontWeight:"600 "}}/>
            <Tab label="List" value="list" sx={{color:"var(--white)",width:"50vw",fontSize:"1.1rem",fontFamily:"inter",fontWeight:"600 "}}/>
          </TabList>      
        <TabPanel value="grid">
          <div className='grid-flex'>
            {coins.length==0?
            <div className='no-item-found-grid'>
              <h1>No Items Found</h1>
              <Button text={"Clear Search"} outline={false} onClick={()=>onSearchChange("")}/>
            </div>:coins.map((coin,i)=>{
         return <Grid  coin={coin} key={i}/>
          })}
          </div>
        </TabPanel>
        <TabPanel value="list" className='table_tabPanel'> 
          {coins.length==0?
            <div className='no-item-found'>
              <h1>No Items Found</h1>
              <Button text={"Clear Search"} outline={false} onClick={()=>onSearchChange("")}/>
            </div>:
            <table className='list-table'>
               <tbody className='list-table'>
              {
              coins.map((item,i)=>{
                return <List coin={item} key={i}/>
              })
            }
            </tbody>
          </table>
          }
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
