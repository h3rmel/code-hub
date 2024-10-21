// React
import React, { useState } from "react";

// CSS
import "./App.css";

// Components
import Cell from "./components/Cell";
import Footer from "./components/Footer";
import Title from "./components/Title";

import combos from "./config/Combos";

const App = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (number) => {
    if (cells[number] !== "") {
      alert("Já foi clicado!");
      return;
    }
    let squares = [...cells];

    if (turn === "X") {
      squares[number] = "X";
      setTurn("O");
    } else {
      squares[number] = "O";
      setTurn("X");
    }
    checkWinner(squares);
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  return (
    <div className="container">
      <Title title={"Jogo da velha!"} />
      <div className="tictactoe">
        <p>Vez de: {turn}</p>
        <div className="table">
          <div className="row">
            <Cell cells={cells} number={0} handleClick={handleClick} />
            <Cell cells={cells} number={1} handleClick={handleClick} />
            <Cell cells={cells} number={2} handleClick={handleClick} />
          </div>
          <div className="row">
            <Cell cells={cells} number={3} handleClick={handleClick} />
            <Cell cells={cells} number={4} handleClick={handleClick} />
            <Cell cells={cells} number={5} handleClick={handleClick} />
          </div>
          <div className="row">
            <Cell cells={cells} number={6} handleClick={handleClick} />
            <Cell cells={cells} number={7} handleClick={handleClick} />
            <Cell cells={cells} number={8} handleClick={handleClick} />
          </div>
        </div>
        <div className="results">
          <p className={`winner ${winner ? "show" : ""}`}>
            {winner} é o vencedor!
          </p>
          <button onClick={() => handleRestart()}>Reiniciar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
