import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Main from '../components/Main';
import { showLocationPermissionAlert } from '../helpers';
import useStore from '../store';
import axios from 'axios';
import {
  FETCH_CURRENT_WEATHER_URL,
  FETCH_WEATHER_HISTORY_URL,
} from '../api_config';

function WeatherHome() {
  const { userCoords, setUserCoords } = useStore();

  const [currentWeather, setCurrentWeather] = useState({});
  const [weatherHistory, setWeatherHistory] = useState([]);

  const [refetchTime, setRefetchTime] = useState(300000);

  useEffect(() => {
    const hasNoData =
      !userCoords || !userCoords.latitude || !userCoords.longitude;

    if (hasNoData) showLocationPermissionAlert();

    navigator.geolocation.getCurrentPosition(
      (res) => {
        console.log(res);
        const latitude = res.coords.latitude;
        const longitude = res.coords.longitude;
        setUserCoords({ latitude, longitude });
      },
      () => {
        alert('Location permission was not provided');
      },
    );
  }, []);

  const { data: currentData, isLoading: isCurrentLoading } = useQuery({
    queryKey: ['weather', userCoords.latitude, userCoords.longitude],
    queryFn: () =>
      axios
        .get(FETCH_CURRENT_WEATHER_URL, {
          params: {
            latitude: userCoords.latitude.toFixed(2),
            longitude: userCoords.longitude.toFixed(2),
          },
        })
        .then((res) => res.data),
    staleTime: refetchTime,
  });

  useEffect(() => {
    if (currentData) {
      console.log(currentData);
      setCurrentWeather(currentData);
    }
  }, [currentData]);

  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['weather', 'history', userCoords.latitude, userCoords.longitude],
    queryFn: () =>
      axios
        .get(FETCH_WEATHER_HISTORY_URL + `/${currentData.userCoordinates.id}`)
        .then((res) => res.data),
    enabled: !isCurrentLoading,
    staleTime: refetchTime,
  });

  useEffect(() => {
    if (historyData) {
      console.log(historyData);
      setWeatherHistory(historyData);
    }
  }, [historyData]);

  return (
    <div className="max-w-4xl mx-auto shadow-md bg-slate-100 py-5 text-gray-800">
      <Main
        currentWeather={currentWeather}
        weatherHistory={weatherHistory}
        loading={isCurrentLoading || isHistoryLoading}
        setRefetchTime={setRefetchTime}
      />
    </div>
  );
}
export default WeatherHome;
