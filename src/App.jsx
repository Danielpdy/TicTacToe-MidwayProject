
import './App.css'
import playersIcon from './assets/icons/playersIcon.png'
import { useEffect, useState } from 'react'
import xIcon from './assets/icons/xIcon.png'
import oIcon from './assets/icons/oIcon.png'

function App() {

  const [playerTurn, setPlayerTurn] = useState(true);
  const [cells, setCells] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [xWins, setxWins] = useState(0);
  const [oWins, setoWins] = useState(0);
  const [Draws, setDraws] = useState(0);

  const handleClick = (i) => {
    if (gameOver || cells[i]) return;
    setCells(prev => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = playerTurn ? "X" : "O";
      return next;
    });
    setPlayerTurn(prev => !prev);

    calculateWinner();
  }

  const iconFor = v => (v === "X" ? xIcon : (v === "O" ? oIcon : null));

  const displayPlayerTurn = () => {
    return playerTurn ? xIcon : oIcon;
  }

  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const calculateWinner = (arr) => {
    for (const [a, b, c] of winnerLines) {
      if (arr[a] === arr[b] && arr[b] === arr[c] && arr[c] === arr[a]) {
        return arr[a]
      }
    } 

    return null;
  };

  useEffect(() => {
    if (gameOver) return;
    const w = calculateWinner(cells);

    if (w) {
      setGameOver(true);
      determineWinner(w);

    } else if (cells.every(Boolean)) {
      setGameOver(true);
      determineWinner(w);
      
    }
  }, [cells, gameOver]);


  function determineWinner(winner) {
    if (winner === "X") {
      setxWins(prev => prev + 1);
      alert(`${winner} Wins`);
    } else if (winner === "O") {
      setoWins(prev => prev + 1);
      alert(`${winner} Wins`);
    } else {
      setDraws(prev => prev + 1);
      alert("Draw!")
    }
  }

  function resetGame() {
    setCells(Array(9).fill(null));
    setPlayerTurn(true);
    setGameOver(false);
    return;
  }
  
  function resetStats() {
    setxWins(0);
    setoWins(0);
    setDraws(0);
  }
  

  return (
    
      <div className='contentContainer'>
        <section className='titleSection'>
          <h1 className='title'>TicTacToe</h1>
          <div className='playersTurnBox'>

            <div className='playersIcon'>
              <img src={playersIcon}/>
            </div>
            <p className='turnIconBox'>Player <img src={displayPlayerTurn()} className='turnIcon'/>'s Turn</p> 
          
          </div>
        </section>

        <section className='gameBoard'>
          <div className='boardLines'>
            {cells.map((v, i) =>(
            <button className='boardBoxes' key={i} onClick={() => handleClick(i)}>
              {v && <img className='xoIcons' src={iconFor(v)} alt={v}/>}
            </button>
            ))}
          </div>
        </section>

        <section className='statsSection'>
          <div className='statsBox'>
              <div className='playerStats'>
                <p>{xWins}</p>
                <p>Player X</p>
              </div>  

            <div className='playerStats'>
              <p>{Draws}</p>
              <p>Draws</p>
            </div>  

            <div className='playerStats'>
              <p>{oWins}</p>
              <p>Player O</p>
            </div>  
          </div>

          <div className='buttonsBox'>
            <button onClick={resetGame}>New Game</button>
            <button onClick={resetStats}>Reset Stats</button>
          </div>
        </section>
      </div>
    
  );
}



export default App;
