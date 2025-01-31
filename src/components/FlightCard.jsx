import { useState } from 'react';
import PropTypes from 'prop-types';

function FlightCard({ flight }) {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => setShowDetails(!showDetails);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    const farePolicyExists = Object.values(flight.farePolicy).some(value => value);

    return (
        <div className="border p-4 pt-8 rounded-lg shadow-lg mb-4 bg-white w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold">{flight.legs[0].origin.name} - {flight.legs[0].destination.name}</h2>
                    <p className="text-sm">{formatDate(flight.legs[0].departure)} - {formatDate(flight.legs[flight.legs.length - 1].arrival)}</p>
                </div>
                <div className="text-right">
                    <span className="text-xl font-semibold">{flight.price.formatted}</span>
                    {flight.hasFlexibleOptions && <p className="text-sm text-green-500">Flexible options</p>}
                </div>
            </div>

            <button onClick={toggleDetails} className="text-blue-500 underline">
                {showDetails ? 'Hide flight details' : 'Show flight details'}
            </button>

            {showDetails && flight.legs.map((leg, index) => (
                <div key={leg.id} className="border-t pt-4 mt-4 ">
                    <h3 className="text-md font-semibold">Leg {index + 1}: {leg.origin.name} to {leg.destination.name}</h3>
                    <p className="text-sm">Duration: {leg.durationInMinutes} minutes</p>
                    <p className="text-sm">Stops: {leg.stopCount === 0 ? 'Direct flight' : `${leg.stopCount} stop(s)`}</p>
                    {leg.segments.map((segment, segmentIndex) => {
                        const carrierLogos = {};
                        leg.carriers.marketing.forEach(carrier => {
                            carrierLogos[carrier.id] = carrier.logoUrl;
                        });
                        return (
                            <div key={segment.id} className="w-full max-w-2xl pl-4 mt-2 flex items-center">
                                <div className="mr-2 flex items-center space-x-2">
                                    <img
                                        src={carrierLogos[segment.marketingCarrier.id]} // Используем хэшмапу для получения логотипа
                                        alt={segment.marketingCarrier.name}
                                        title={segment.marketingCarrier.name} // Добавляем подсказку с именем авиакомпании
                                        className="w-10 h-10 mr-2"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Segment {segmentIndex + 1}: {segment.origin.name} to {segment.destination.name}</p>
                                    <p className="text-sm">Departure: {formatDate(segment.departure)}</p>
                                    <p className="text-sm">Arrival: {formatDate(segment.arrival)}</p>
                                    <p className="text-sm">Flight Number: {segment.flightNumber}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}

            {farePolicyExists && (
                <div className="border-t pt-4 mt-4">
                    <p className="text-sm">Fare Policy:</p>
                    <ul className="list-disc list-inside">
                        {flight.farePolicy.isChangeAllowed && <li>Change allowed</li>}
                        {flight.farePolicy.isPartiallyChangeable && <li>Partially changeable</li>}
                        {flight.farePolicy.isCancellationAllowed && <li>Cancellation allowed</li>}
                        {flight.farePolicy.isPartiallyRefundable && <li>Partially refundable</li>}
                    </ul>
                </div>
            )}
        </div>
    );
}

FlightCard.propTypes = {
    flight: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        farePolicy: PropTypes.shape({
            isChangeAllowed: PropTypes.bool,
            isPartiallyChangeable: PropTypes.bool,
            isCancellationAllowed: PropTypes.bool,
            isPartiallyRefundable: PropTypes.bool,
        }),
        hasFlexibleOptions: PropTypes.bool,
        price: PropTypes.shape({
            raw: PropTypes.number,
            formatted: PropTypes.string,
            pricingOptionId: PropTypes.string,
        }),
        legs: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                arrival: PropTypes.string,
                departure: PropTypes.string,
                origin: PropTypes.shape({
                    id: PropTypes.string,
                    name: PropTypes.string,
                }),
                destination: PropTypes.shape({
                    id: PropTypes.string,
                    name: PropTypes.string,
                }),
                durationInMinutes: PropTypes.number,
                stopCount: PropTypes.number,
                segments: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string,
                        departure: PropTypes.string,
                        arrival: PropTypes.string,
                        origin: PropTypes.object,
                        destination: PropTypes.object,
                        durationInMinutes: PropTypes.number,
                        flightNumber: PropTypes.string,
                        marketingCarrier: PropTypes.shape({
                            logoUrl: PropTypes.string,
                            name: PropTypes.string,
                        }),
                        operatingCarrier: PropTypes.shape({
                            name: PropTypes.string,
                        }),
                    })
                ),
            })
        ),
    }).isRequired,
};

export default FlightCard;