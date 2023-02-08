import "./Board.css";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Row from "./Row";
import Keyboard from "./Keyboard";

const Board = () => {
    const { board } = useContext(DataContext);
    return (
        <div className="board-container">
            <div className="board">
                {board.map((row, index) => (
                    <Row rowData={row} rowNumber={index + 1} />
                ))}
                <Keyboard />
            </div>
        </div>
    );
};

export default Board;