import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Stack,
    IconButton,
    InputAdornment
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import {
    SearchOutlined,
    CloudOutlined,
} from '@ant-design/icons';
import {
    WbSunnyOutlined,
    CloudQueueOutlined,
    GrainOutlined,
    OpacityOutlined,
    AirOutlined,
    ThunderstormOutlined,
    WaterDropOutlined,
    AcUnitOutlined,
    FilterDramaOutlined
} from '@mui/icons-material';
import WeatherService from '../../service/weatherService';
import { toast } from 'sonner';
import './weather.css';

/**
 * WeatherDashboard Component
 * Main UI for weather module. Handles state management for loading, success, and error states.
 */
export default function WeatherDashboard() {
    const theme = useTheme();
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Requirement: Prevent empty input submission
    const handleSearch = async (e) => {
        if (e) e.preventDefault();

        if (!city.trim()) {
            toast.error('Please enter a city name');
            return;
        }

        fetchWeather(city);
    };

    /**
     * Core logic for fetching and handling state.
     * Requirement: async/await with proper error handling.
     */
    const fetchWeather = async (cityName) => {
        try {
            setError(null);
            setIsLoading(true);

            const data = await WeatherService.fetchCurrentWeather(cityName);
            setWeatherData(data);
            setCity('');
        } catch (err) {
            console.error('Weather Fetch Error:', err);
            setError(err.message || 'Something went wrong');
            toast.error(err.message || 'Failed to fetch weather');
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getWeatherIcon = (code) => {
        const style = {
            fontSize: '80px',
            color: theme.palette.primary.main,
            filter: `drop-shadow(0 0 20px ${alpha(theme.palette.primary.main, 0.4)})`
        };

        if (code === 0) return <WbSunnyOutlined style={{ ...style, color: theme.palette.warning.main }} />;
        if (code >= 1 && code <= 3) return <CloudQueueOutlined style={style} />;
        if (code === 45 || code === 48) return <FilterDramaOutlined style={style} />;
        if (code >= 51 && code <= 65) return <WaterDropOutlined style={style} />;
        if (code >= 71 && code <= 86) return <AcUnitOutlined style={style} />;
        if (code >= 95) return <ThunderstormOutlined style={style} />;
        return <CloudQueueOutlined style={style} />;
    };

    return (
        <div className="product-page-wrapper">
            <div className="glass-header-bar">
                <div className="header-left">
                    <h1 className="gallery-title">Weather Intelligence</h1>
                </div>
            </div>

            <div className="weather-container">
                {/* Search Section */}
                <div className="glass-card weather-search-card">
                    <form onSubmit={handleSearch}>
                        <Stack spacing={2}>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>
                                Enter a city name to explore real-time atmospheric conditions.
                            </Typography>
                            <Box className="weather-input-group">
                                <TextField
                                    fullWidth
                                    placeholder="e.g. London, New York, Tokyo"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="neon-textfield"
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchOutlined style={{ color: theme.palette.primary.main }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    onClick={handleSearch}
                                    className="add-btn-compact"
                                    disabled={isLoading}
                                    sx={{ minWidth: '120px' }}
                                >
                                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="weather-error-box animate-fade-in">
                        <Typography variant="body1" fontWeight={600}>
                            Error: {error}
                        </Typography>
                    </div>
                )}

                {/* Success Display */}
                {weatherData && (
                    <div className="glass-card weather-display-card animate-fade-in">
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800 }}>
                                    {weatherData.name}, {weatherData.country}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                    Current conditions in {weatherData.region || 'the area'}
                                </Typography>
                            </Box>
                            <Box sx={{ ml: 2 }}>
                                {getWeatherIcon(weatherData.iconCode)}
                            </Box>
                        </Stack>

                        <div className="temp-main">
                            {weatherData.temp}°<span style={{ fontSize: '2.5rem' }}>C</span>
                        </div>

                        <div className="condition-text">
                            {weatherData.description}
                        </div>

                        <div className="weather-stats-grid">
                            <div className="stat-item">
                                <span className="stat-label">Humidity</span>
                                <span className="stat-value">{weatherData.humidity}%</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Wind Speed</span>
                                <span className="stat-value">{weatherData.windSpeed} m/s</span>
                            </div>
                        </div>

                        {isLoading && (
                            <div className="weather-loading-overlay">
                                <CircularProgress sx={{ color: theme.palette.primary.main }} />
                            </div>
                        )}
                    </div>
                )}

                {/* Initial State / No Data */}
                {!weatherData && !isLoading && !error && (
                    <Box sx={{ textAlign: 'center', mt: 4, opacity: 0.5 }}>
                        <CloudOutlined style={{ fontSize: '64px', marginBottom: '1rem' }} />
                        <Typography variant="h5">Start by searching a city</Typography>
                    </Box>
                )}
            </div>
        </div>
    );
}
