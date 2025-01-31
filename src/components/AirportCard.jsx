import PropTypes from 'prop-types';

function AirportCard({ airport }) {
console.log(airport);
    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">{airport.id} (<small>{airport.entityId}</small>)</h2>
            <p>{airport.name}</p>
        </div>
    );
}

AirportCard.propTypes = {
    airport: PropTypes.shape({
        id: PropTypes.string,
        entityId: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};

export default AirportCard;