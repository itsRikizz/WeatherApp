import { Input } from 'semantic-ui-react'
import "./searchbar.css"
import { useState, useEffect } from 'react'
import WeatherCard from './WeatherCard'
const SearchBar = () => {
    const [searchQuary, setSearchQuary] = useState('')
    const [weather, setWeather] = useState({});
    // const [error, setError] = useState("");
    const search = async (city) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`
            );

            if (!response.ok) {
                // Handle error, maybe set an error state
                console.error('Error fetching weather data');
                return;
            }

            if (response.ok) {
                const result = await response.json();
                setWeather(result);
                console.log(result);
            }
        } catch (error) {
            // Handle fetch error
            console.error('Error during fetch:', error);
        }
    };
    useEffect(() => {
        // Ensure searchQuery is not empty before making the request
        if (searchQuary.trim() !== '') {
            search(searchQuary);
        }
    }, [searchQuary]);
    return (
        <div>
            <div className="searchbar">
                <Input icon='plane' value={searchQuary} onChange={(e) => setSearchQuary(e.target.value)} iconPosition='left' placeholder='Search Places...' />
            </div>
            <WeatherCard weather={weather} />
        </div>
    )
}

export default SearchBar