import "./Row.css";
import Letter from "./Letter";
const Row = ({ rowData, rowNumber }) => {
    return (
        <div className="row">
            {rowData.map((letter) => (
                <Letter letter={letter} />
            ))}
        </div>
    );
};

export default Row;