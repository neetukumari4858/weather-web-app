import { createContext, useContext, useState } from "react";

const WeatherContext = createContext(null);
const WeatherProvider = ({ children }) => {
  const [weatherInfo, setWeatherInfo] = useState({
    time_date: "",
    temp_c: "",
    location: "",
    humidity: "",
    icon_img: "",
    wind_kph: "",
    pressure_in: "",
  });
  const [forcasteData, setForcasteData] = useState([]);

  return (
    <WeatherContext.Provider
      value={{ weatherInfo, setWeatherInfo, forcasteData, setForcasteData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const UseWeather = () => useContext(WeatherContext);

export { WeatherProvider, UseWeather };
