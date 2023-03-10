import { createContext, useEffect, useState } from "react";
import { words } from "../words";

export const DataContext = createContext();

const defaultBoard = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

export const DataProvider = ({ children }) => {
    // random word from the list
    const [correctWord, setCorrectWord] = useState("");
    // current state of the guess
    const [board, setBoard] = useState(defaultBoard);
    const [currentAttempt, setCurrentAttempt] = useState({
        letter: 0,
        row: 0,
    });
    // list of word which is not in the word
    const [wrongGuess, setWrongGuess] = useState([]);
    // list of words which is guessed right
    const [rightGuess, setRightGuess] = useState([]);
    // list of words which are there in the word but not at guessed at right place
    const [almostGuess, setAlmostGuess] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    // if word is correctly guessed
    const [correctlyGuessed, setCorrectlyGuessed] = useState(false);

    const { letter: currentLetter, row: currentRow } = currentAttempt;

    const onEnter = () => {
        if (currentLetter !== 5 || gameOver) return;
        let inputWord = "";
        for (let letter of board[currentAttempt.row]) {
            inputWord = inputWord + letter;
        }

        // if the guessed word matches the correctWord, game over
        if (inputWord === correctWord.toUpperCase()) {
            setGameOver(true);
            setCorrectlyGuessed(true);
            setCurrentAttempt({ letter: 0, row: currentRow + 1 });
            return;
        }

        if (currentRow === 5) {
            setGameOver(true);
            setCurrentAttempt({ letter: 0, row: currentRow + 1 });
            return;
        }

        if (words.includes(inputWord.toLowerCase())) {
            setCurrentAttempt({ letter: 0, row: currentRow + 1 });
        } else {
            alert("Word Not Found!");
        }
    };

    const onDelete = () => {
        if (currentLetter === 0 || gameOver) return;
        let newBoard = [...board];
        newBoard[currentRow][currentLetter - 1] = "";
        setBoard(newBoard);
        setCurrentAttempt({ ...currentAttempt, letter: currentLetter - 1 });
    };

    const onLetter = (key) => {
        // need to add condition if game is over just return for the last row
        if (currentLetter > 4 || gameOver) return;
        let newBoard = [...board];
        newBoard[currentRow][currentLetter] = key;
        setBoard(newBoard);
        setCurrentAttempt({ ...currentAttempt, letter: currentLetter + 1 });
    };

    const getNewWord = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCorrectWord(randomWord);
    };

    const playAgain = () => {
        console.log("play again");
        getNewWord();
        setBoard([
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
        ]);
        setCurrentAttempt({ letter: 0, row: 0 });
        setWrongGuess([]);
        setRightGuess([]);
        setAlmostGuess([]);
        setGameOver(false);
        setCorrectlyGuessed(false);
    };

    useEffect(() => {
        getNewWord();
    }, []);

    return (
        <DataContext.Provider
            value={{
                board,
                words,
                correctWord,
                setCorrectWord,
                setBoard,
                currentAttempt,
                setCurrentAttempt,
                onEnter,
                onDelete,
                onLetter,
                wrongGuess,
                rightGuess,
                setRightGuess,
                almostGuess,
                setAlmostGuess,
                setWrongGuess,
                gameOver,
                setGameOver,
                correctlyGuessed,
                setCorrectlyGuessed,
                playAgain,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
