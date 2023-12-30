import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { RxDragHandleHorizontal } from "react-icons/rx";
import { FaWind } from "react-icons/fa";
import { PiMapPinLineFill } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { UseWeather } from "../context/weatherContext";
import { Forecast } from "./index";
import UseWeatherServices from "../services/weatherServices";

function WeatherDetail() {
  const [inputData, setInputData] = useState("");

  const { weatherInfo, forcasteData } = UseWeather();
  const { GetWeatherDetail, GetWeatherForcastDetail, loading } =
    UseWeatherServices();

  const locationhandler = async () => {
    GetWeatherDetail("Delhi");
    GetWeatherForcastDetail("Delhi");
  };

  const searchHandler = (inputData) => {
    if (inputData === "") {
      return 0;
    }
    GetWeatherDetail(inputData);
    GetWeatherForcastDetail(inputData);
    setInputData("");
  };
  const retryHandler = () => {
    GetWeatherDetail("Punjab");
    GetWeatherForcastDetail("Punjab");
  };

  useEffect(() => {
    GetWeatherDetail("Punjab");
    GetWeatherForcastDetail("Punjab");
  }, []);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="top-bar">
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Search..."
        />
        <div
          className="top-icon"
          onClick={() => {
            searchHandler(inputData);
          }}
        >
          <IoSearch />
        </div>
        <div className="top-icon location" onClick={locationhandler}>
          <PiMapPinLineFill />
        </div>
      </div>
      {loading && <h2>Loading...</h2>}
      {!loading && weatherInfo && (
        <>
          <div className="weather-image">
            <img
              src={weatherInfo.icon_img}
              height={150}
              width={150}
              alt="cloud"
            />
          </div>
          {weatherInfo.location && (
            <div className="weather-location" value={weatherInfo.location}>
              {weatherInfo.location}
            </div>
          )}
          <div className="weather-time" value={weatherInfo.time_date}>
            {weatherInfo.time_date}
          </div>
          <div className="weather-temp " value={weatherInfo.temp_c}>
            {weatherInfo.temp_c}°c
          </div>

          <div className="data-container">
            <div className="element ">
              <WiHumidity className="icon" />

              <div className="data">
                <div value={weatherInfo.humidity}>{weatherInfo.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <FaWind className="icon" />
              <div className="data">
                <div value={weatherInfo.wind_kph}>
                  {weatherInfo.wind_kph}km/h
                </div>
                <div className="text">wind speed</div>
              </div>
            </div>
            <div className="element">
              <RxDragHandleHorizontal className="icon" />
              <div className="data">
                <div value={weatherInfo.pressure_in}>
                  {weatherInfo.pressure_in}
                </div>
                <div className="text">Pressure</div>
              </div>
            </div>
          </div>
          {forcasteData?.length > 0 ? (
            <>
              <h2>7 Days weather Forcast (Slide)</h2>
              <Forecast />
            </>
          ) : (
            ""
          )}
        </>
      )}
      {!loading && !weatherInfo && (
        <>
          <h2 className="error">Sorry Data not Found Try again!</h2>
          <button className="btn" onClick={retryHandler}>
            Retry
          </button>
        </>
      )}
    </div>
  );
}

export default WeatherDetail;
