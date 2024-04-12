/* eslint-disable react/prop-types */
import { determineDirection } from '../helpers';
import Img from './Img';

function WeatherData({ data }) {
  return (
    <div className="p-4 grid grid-cols-5 gap-8 place-items-center">
      <div className="max-w-32">
        <Img
          src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
          alt="icon"
        />
      </div>
      <div className="font-semibold flex flex-col gap-2 justify-center">
        <h2 className="text-5xl">{data.temperature}°C</h2>
        <p className="capitalize">{data.description}</p>
      </div>
      <div className="font-semibold">
        <h4>{data.time}</h4>
      </div>
      <div className="flex flex-col gap-2 text-sm font-semibold">
        <p>Rainfall: {data.rainfall ? data.rainfall + ' mm' : 'No rain'}</p>
        <p>Humidity: {data.humidity}%</p>
        <p>Wind Speed: {data.windSpeed} m/s</p>
      </div>
      <div className="flex flex-col text-sm gap-2 font-semibold">
        <p>Wind Direction: {determineDirection(data.windDirection)}</p>
        <p>Cloud Coverage: {data.cloudCoverage}%</p>
        <p>Pressure: {data.pressure} hPa</p>
      </div>
    </div>
  );
}

export default WeatherData;
