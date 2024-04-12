/* eslint-disable react/prop-types */
import Chart from 'react-apexcharts';
import Select from 'react-select';
import { determineDirection, processDataList } from '../helpers';
import useStore from '../store';
import Img from './Img';
import Loading from './Loading';
import WeatherData from './WeatherData';

// const Data = {
//   id: 5,
//   icon: '02d',
//   description: 'few clouds',
//   temperature: 33.51,
//   rainfall: null,
//   humidity: 34,
//   windSpeed: 5.59,
//   windDirection: 129,
//   cloudCoverage: 22,
//   pressure: 1012,
//   createdOn: '2024-04-12T12:53:43.942345',
//   userCoordinates: {
//     id: 1,
//     latitude: 17.46,
//     longitude: 78.55,
//     createdOn: '2024-04-12T10:33:39',
//     weatherDetails: [],
//   },
// };

const selectOptions = [
  { value: 300000, label: '5 min' },
  { value: 600000, label: '10 min' },
  { value: 900000, label: '15 min' },
  { value: 1800000, label: '30 min' },
  { value: 3600000, label: '1 hr' },
];

function Main({ currentWeather, weatherHistory, loading }) {
  const { staleTime, setStaleTime } = useStore();

  const topData = processDataList(weatherHistory).slice(0, 20).reverse();

  const chartOptions = {
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Temperature by Time',
        align: 'left',
      },
      xaxis: {
        categories: topData.map((i) => i.time),
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
    },
  };

  const series = [
    {
      name: 'Temperature in °C',
      data: topData.map((i) => i.temperature),
    },
  ];

  console.log(topData);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="w-full grid grid-flow-col-dense place-items-center">
        <Img
          src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
          alt="icon"
        />
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-7xl">
            {Math.round(currentWeather.temperature)}°C
          </h2>
          <h4 className="capitalize font-semibold text-lg">
            {currentWeather.description}
          </h4>
          <h4 className="capitalize font-semibold text-lg">
            {currentWeather.userCoordinates?.city},{' '}
            {currentWeather.userCoordinates?.country}
          </h4>
        </div>
        <div className="flex flex-col gap-1 font-semibold">
          <p>
            Rainfall:{' '}
            {currentWeather.rainfall
              ? currentWeather.rainfall + ' mm'
              : 'No rain'}
          </p>
          <p>Humidity: {currentWeather.humidity}%</p>
          <p>Wind Speed: {currentWeather.windSpeed} m/s</p>
          <p>
            Wind Direction: {determineDirection(currentWeather.windDirection)}
          </p>
          <p>Cloud Coverage: {currentWeather.cloudCoverage}%</p>
          <p>Pressure: {currentWeather.pressure} hPa</p>
        </div>
      </div>
      <div className="max-w-2xl p-5 flex gap-5 items-center font-semibold">
        <h4>Get weather after every: </h4>
        <Select
          defaultValue={300000}
          value={staleTime}
          onChange={setStaleTime}
          options={selectOptions}
        />
      </div>
      <div className="">
        <Chart options={chartOptions.options} series={series} type="line" />
      </div>
      <div>
        <h2 className="font-semibold">Weather History</h2>
        <div className="flex flex-col gap-3 py-5">
          {topData
            .reverse()
            .slice(0, 20)
            .map((data, idx) => (
              <WeatherData key={idx} data={data} />
            ))}
        </div>
      </div>
    </div>
  );
}
export default Main;
