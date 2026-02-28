import { useQuery } from '@tanstack/react-query';
import WeatherService from '../service/weatherService';

export const useGetWeather = (cityName) => {
    return useQuery({
        queryKey: ['weather', cityName],
        queryFn: () => WeatherService.fetchCurrentWeather(cityName),
        enabled: !!cityName, // Only fetch if cityName is provided
        retry: false, // Don't retry on error (e.g. invalid city name)
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
