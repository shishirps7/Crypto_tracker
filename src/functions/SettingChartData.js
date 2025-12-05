import { ConvertDate } from "./ConvertDate"

export const SettingChartData=(setChartData ,price_data1, price_data2,coin_1data,coin_2data)=>{
  if(price_data2){
    setChartData({
  labels: price_data1.map((item)=>{return ConvertDate(item[0])}),
  datasets: [
    { label: coin_1data.name,
      data: price_data1.map((item)=>{return item[1]}),
      borderColor: "#3a80e9",
      borderWidth:2,
      fill:false,
      tension:0.27,
      pointRadius:0,
      yaxisID:"crypto1"
    },
    { label: coin_2data.name,
      data: price_data2.map((item)=>{return item[1]}),
      borderColor: "#61c96f",
      borderWidth:2,
      fill:false,
      tension:0.27,
      pointRadius:0,
      yaxisID:"crypto2"
    }
  ]
}
)}

  else{
    setChartData({
  labels: price_data1.map((item)=>{return ConvertDate(item[0])}),
  datasets: [
    { 
      data: price_data1.map((item)=>{return item[1]}),
      borderColor: "#3a80e9",
      borderWidth:2,
      backgroundColor: "rgba(58,128,233,0.1)",
      fill:true,
      tension:0.27,
      pointRadius:0,
      yaxisID:"crypto1"
    }
  ]
})}
}