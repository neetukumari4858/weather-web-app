import { useState } from "react";
import { UseWeather } from "../context/weatherContext";
import axios from "axios";
const API_KEY = "60ace144eeec4237a04144833232812";
const BASE_URL = "https://api.weatherapi.com/v1";

const UseWeatherServices = () => {
  const { setWeatherInfo, setForcasteData } = UseWeather();
  const [loading, setLoading] = useState(true);

  const GetWeatherDetail = async (inputData) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${inputData}`
      );
      const { current, location } = response.data;

      setWeatherInfo({
        time_date: current?.last_updated,
        temp_c: current?.temp_c,
        location: location?.name,
        humidity: current?.humidity,
        icon_img: current?.condition?.icon,
        wind_kph: current?.wind_kph,
        pressure_in: current?.pressure_in,
      });
      setLoading(false);
    } catch (error) {
      console.log("error");
      setWeatherInfo(null);
    }
  };
  const GetWeatherForcastDetail = async (inputData) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${inputData}&days=7`
      );
      const { forecast } = response.data;

      setForcasteData(forecast?.forecastday);
    } catch (error) {
      console.log(error);
      setForcasteData(null);
    }
  };
  return { GetWeatherDetail, GetWeatherForcastDetail, loading };
};

export default UseWeatherServices;
