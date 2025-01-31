import {useEffect, useState} from 'react';
import './styles/App.css'
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';
import FlightList from './components/FlightList';
//import AirportsList from './components/AirportsList';
import axios from 'axios';

function App() {
    const [flights, setFlights] = useState([]);
    //const [airports, setAirports] = useState([]);
    const [originAirportsData, setOriginAirportsData] = useState([]);
    const [destinationAirportsData, setDestinationAirportsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const fetchAirports = async (skyName) => {
        try {
            const response = await axios.get('https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport', {
                headers: {
                    'x-rapidapi-key': '8bbe4fee2bmshf3a481240fa5b17p1774b6jsn5fd15f329bd4',
                    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
                },
                params: {
                    query: skyName,
                    locale: 'en-US'
                },
            });

            let res = [];
            if (response.data.status) {
                const airportData = response.data.data.map(item => ({
                    skyId: item.skyId,
                    entityId: item.entityId,
                    title: item.presentation.title,
                    suggestionTitle: item.presentation.suggestionTitle,
                    subtitle: item.presentation.subtitle
                }));
                res = airportData;
            } else {
                console.error("Failed to fetch airports: Status is false");
            }
            return res;
        } catch (error) {
            console.error("Error(s) occurred while fetching airports: ", error);
            return [];
        }
    };


    const fetchFlights = async (params) => {
        const options = {
            method: 'GET',
            url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
            params,
            headers: {
                'x-rapidapi-key': '8bbe4fee2bmshf3a481240fa5b17p1774b6jsn5fd15f329bd4',
                'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            if (!response.data.status) {
                throw new Error("Failed to fetch flights. Incorrect user's data.");
            }

            const flightsData = response.data.data.itineraries;
            setFlights(flightsData);

            //const airportsData = response.data.data.filterStats.airports.flatMap(city => city.airports);
            //setAirports(airportsData);
            setNoResults(flightsData.length === 0);
        } catch (error) {
            console.error("Error(s) occurred while fetching flights: ", error);
            setNoResults(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (searchParams) => {
        setIsLoading(true);
        setNoResults(false);
        setFlights([]);
        //setAirports([]);
        const originAirportsData = await fetchAirports(searchParams.originSkyName);
        setOriginAirportsData(originAirportsData);

        const destinationAirportsData = await fetchAirports(searchParams.destinationSkyName);
        setDestinationAirportsData(destinationAirportsData);

        if (originAirportsData.length > 0 && destinationAirportsData.length > 0) {
            const params = {
                originSkyId: originAirportsData[0].skyId,
                originEntityId: originAirportsData[0].entityId,
                destinationSkyId: destinationAirportsData[0].skyId,
                destinationEntityId: destinationAirportsData[0].entityId,
                date: searchParams.date,
                returnDate: searchParams.returnDate,
            };
            await fetchFlights(params);
        } else {
            setIsLoading(false);
            setNoResults(true);
        }
    };

    return (
        <div className="App">
            <Header />
            <SearchForm onSearch={handleSearch} />
            {isLoading && (
                <div className="text-center my-4">
                    <div className="loader"></div>
                    <p>Searching for flights...</p>
                </div>
            )}
            {!isLoading && noResults && (
                <div className="text-center my-4">
                    <p>No flights found. Please try different search criteria.</p>
                </div>
            )}
            {!isLoading && !noResults && (
                <>
                    {/*<AirportsList airports={airports} />{}*/}
                    <FlightList flights={flights} />
                </>
            )}
            <Footer />
        </div>
    );
}

export default App;