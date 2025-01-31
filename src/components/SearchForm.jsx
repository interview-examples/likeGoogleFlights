import  { useState } from 'react';
import PropTypes from "prop-types";
import {
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import PassengerPopup from './PassengerPopup';

function SearchForm({ onSearch }) {
    const [searchParams, setSearchParams] = useState({
        originSkyName: '',
        destinationSkyName: '',
        date: '',
        returnDate: '',
        tripType: 'one-way',
        adults: 1,
        kids: 0,
        infantsWithSeat: 0,
        infantsWithoutSeat: 0,
        cabinClass: '',
/*
        originSkyId: '',
        originEntityId: '',
        destinationSkyId: '',
        destinationEntityId: '',
        legs: '',
        currency: '',
        locale: '',
        market: '',
        countryCode: '',
*/
    });
    const [isPassengerPopupOpen, setPassengerPopupOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const validateForm = () => {
        const isValid = true/* logic of validation */;
        setIsFormValid(isValid);
    };

    const handlePassengerChange = (type, value) => {
        setSearchParams(prevState => ({
            ...prevState,
            [type]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevState => ({
            ...prevState,
            [name]: value,
        }));
        validateForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    const totalPassengers = searchParams.adults + searchParams.kids + searchParams.infantsWithSeat + searchParams.infantsWithoutSeat;

    return (
        <div className="p-6 rounded border border-gray-200">
            <h1 className="font-medium text-3xl">Search Flights</h1>
            <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex justify-center">
                    <div className="w-full sm:w-3/4 md:w-2/2 lg:w-1/3 px-2 mb-4 flex items-center">
                        <div className="flex items-center w-full">
                            <select
                                className="form-select w-full border p-2 rounded cursor-pointer"
                                name="tripType"
                                value={searchParams.tripType}
                                onChange={handleChange}
                            >
                                <option value="round-trip">Round-trip &#8644;</option>
                                <option value="one-way">One-way &#8594;</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4 relative">
                        <div
                            className="border p-2 rounded cursor-pointer"
                            onClick={() => setPassengerPopupOpen(!isPassengerPopupOpen)}
                        >
                            {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
                        </div>
                        {isPassengerPopupOpen && (
                            <PassengerPopup
                                adults={searchParams.adults}
                                kids={searchParams.kids}
                                infantsWithSeat={searchParams.infantsWithSeat}
                                infantsWithoutSeat={searchParams.infantsWithoutSeat}
                                onPassengerChange={handlePassengerChange}
                                onSubmit={() => {setPassengerPopupOpen(false) && handlePassengerChange}}
                                onClose={() => setPassengerPopupOpen(false)}
                            />
                        )}
                    </div>
                    <div className="w-full sm:w-3/4 md:w-2/2 lg:w-1/3 px-2 mb-4 flex items-center">
                        <div className="flex items-center w-full">
                            <select
                                className="form-select w-full border p-2 rounded cursor-pointer"
                                name="cabinClass"
                                value={searchParams.cabinClass}
                                onChange={handleChange}
                            >
                                <option value="economy">Economy</option>
                                <option value="premium_economy">Premium Economy</option>
                                <option value="business">Business</option>
                                <option value="first">First</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-2 mb-4">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Airport origin:
                        </Typography>
                        <Input
                            placeholder="Departure from ..."
                            className="w-full"
                            name="originSkyName"
                            value={searchParams.originSkyName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Airport destination:
                        </Typography>
                        <Input
                            placeholder="Arrival to ..."
                            className="w-full"
                            name="destinationSkyName"
                            value={searchParams.destinationSkyName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-2">
                    <div className={`w-full ${searchParams.tripType === 'one-way' ? 'md:w-1/2 md:mx-auto' : 'md:w-1/2'} px-2 mb-4`}>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Date:
                        </Typography>
                        <Input
                            type="date"
                            className="w-full"
                            name="date"
                            value={searchParams.date}
                            onChange={handleChange}
                        />
                    </div>
                    {searchParams.tripType === 'round-trip' && (
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Return date:
                            </Typography>
                            <Input
                                type="date"
                                className="w-full"
                                name="returnDate"
                                value={searchParams.returnDate}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <Button className="mt-4 w-auto px-8" type={"submit"} disabled={!isFormValid}>Search flights</Button>
                </div>
            </form>
        </div>
    );
}

SearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
