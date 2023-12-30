import React from "react";
import { UseWeather } from "../context/weatherContext";

const Forecast = () => {
  const { forcasteData } = UseWeather();
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return (
    <div className="forcaste-container">
      {forcasteData?.map((item, itemIndex) => {
        return (
          <div className="day-data" key={itemIndex}>
            <img
              className="day-icon"
              alt="cloud"
              src={item?.day?.condition?.icon}
            />
            <div>{WEEKDAYS[itemIndex]}</div>
            <div>{item?.day?.maxtemp_c}°c</div>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
