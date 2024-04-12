const BASE_URL = import.meta.env.VITE_BASE_URL;

export const FETCH_CURRENT_WEATHER_URL = BASE_URL + '/weather_details';

export const FETCH_WEATHER_HISTORY_URL = BASE_URL + '/weather_details/all';
