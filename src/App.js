import { useState } from "react";
import Axios from "axios";

function App(){
  const [location,setLocation]=useState("")
  const [locationkey,setLocationKey]=useState(0);
  const [temperature,setTemperature]=useState(0);
  const [temperatureUnit,setTemperatureUnit]=useState("");
  const [precipitationtype,setPrecipitationtype]=useState("");
  const fetchWeather = () => {
    Axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=VeZkSetZ6NbntdzeOMFuTCjkeM3r7jMW&q=${location}`).then((res)=>{
setLocationKey(res.data[0].Key);
Axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationkey}?apikey=VeZkSetZ6NbntdzeOMFuTCjkeM3r7jMW`).then((res)=>{
 //console.log("precipitation type",res.data[0].PrecipitationType)
 setPrecipitationtype(res.data[0].PrecipitationType);
 //console.log("temperature",res.data[0].Temperature.Metric);
 setTemperature(res.data[0].Temperature.Metric.Value);
 setTemperatureUnit(res.data[0].Temperature.Metric.Unit);
});
  });
 //console.log(locationkey);
    }
    

  
    if(locationkey){
  return(
    <>
    
    <input placeholder="ENTER LOCATION" onChange={(event)=>{setLocation(event.target.value)}}/>
    <button onClick={fetchWeather}>Check todays forecast</button>
    <h1>weather today  </h1>
    <h1>{precipitationtype} today </h1>
    <h2> temperature in {temperatureUnit} is {temperature} degrees </h2>
    </>
  )}
  else{
    return(
      <>
      <input placeholder="ENTER LOCATION" onChange={(event)=>{setLocation(event.target.value)}}/>
      <button onClick={fetchWeather}>Check todays forecast</button>
      <h1>enter location</h1>
      </>
    )
  }
}
export default App;