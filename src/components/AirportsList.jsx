import AirportCard from "./AirportCard";
import PropTypes from 'prop-types';

function AirportsList({ airports }) {
console.log(airports);
    return (
        <div className="space-y-4">
            {airports.map(airport => (
                <AirportCard key={airport.id} airport={airport} />
            ))}
        </div>
    );
}

AirportsList.propTypes = {
    airports: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AirportsList;
