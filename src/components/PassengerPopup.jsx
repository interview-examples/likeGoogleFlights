import PropTypes from 'prop-types';

const PassengerPopup = ({ adults, kids, infantsWithSeat, infantsWithoutSeat, onPassengerChange, onClose, onSubmit }) => {
    return (
        <div className="absolute bg-white border rounded shadow-lg p-4 mt-2 z-10">
            <div className="flex justify-between items-center mb-2">
                <span>Adults</span>
                <div className="flex items-center">
                    <button onClick={() => onPassengerChange('adults', Math.max(1, adults - 1))}>-</button>
                    <span className="mx-2">{adults}</span>
                    <button onClick={() => onPassengerChange('adults', adults + 1)}>+</button>
                </div>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span>Children</span>
                <div className="flex items-center">
                    <button onClick={() => onPassengerChange('kids', Math.max(0, kids - 1))}>-</button>
                    <span className="mx-2">{kids}</span>
                    <button onClick={() => onPassengerChange('kids', kids + 1)}>+</button>
                </div>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span>Infants with seat</span>
                <div className="flex items-center">
                    <button onClick={() => onPassengerChange('infantsWithSeat', Math.max(0, infantsWithSeat - 1))}>-</button>
                    <span className="mx-2">{infantsWithSeat}</span>
                    <button onClick={() => onPassengerChange('infantsWithSeat', infantsWithSeat + 1)}>+</button>
                </div>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span>Infants without seat</span>
                <div className="flex items-center">
                    <button onClick={() => onPassengerChange('infantsWithoutSeat', Math.max(0, infantsWithoutSeat - 1))}>-</button>
                    <span className="mx-2">{infantsWithoutSeat}</span>
                    <button onClick={() => onPassengerChange('infantsWithoutSeat', infantsWithoutSeat + 1)}>+</button>
                </div>
            </div>
            <div className="flex justify-between">
                <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                    Close
                </button>
                <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                    OK
                </button>
            </div>
        </div>
    );
};

PassengerPopup.propTypes = {
    adults: PropTypes.number.isRequired,
    kids: PropTypes.number.isRequired,
    infantsWithSeat: PropTypes.number.isRequired,
    infantsWithoutSeat: PropTypes.number.isRequired,
    onPassengerChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PassengerPopup;