
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import playersIcon from './assets/icons/playersIcon.png'
import { useState } from 'react'
import xIcon from './assets/icons/xIcon.png'
import oIcon from './assets/icons/oIcon.png'

function App() {

  const [playerTurn, setPlayerTurn] = useState(true);
  const [cells, setCells] = useState(Array(9).fill(null));

  const handleClick = (i) => {
    setCells(prev => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = playerTurn ? "X" : "O";
      return next;
    });
    setPlayerTurn(prev => !prev);
  }

  const iconFor = v => (v === "X" ? xIcon : (v === "O" ? oIcon : null));

  const displayPlayerTurn = () => {
    return playerTurn ? xIcon : oIcon;
  }

  return (
    
      <div className='contentContainer'>
        <section className='titleSection'>
          <h1 className='title'>TicTacToe</h1>
          <div className='playersTurnBox'>
            <div className='test'>
            <img src={playersIcon}/>
            </div>
            <div className='test2'>
            <p>Player <img src={displayPlayerTurn()} className='test3'/>'s Turn</p> 
            </div>
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
                <p>0</p>
                <p>Player X</p>
              </div>  

            <div className='playerStats'>
              <p>0</p>
              <p>Draws</p>
            </div>  

            <div className='playerStats'>
              <p>0</p>
              <p>Player O</p>
            </div>  
          </div>

          <div className='buttonsBox'>
            <button>New Game</button>
            <button>Reset Stats</button>
          </div>
        </section>
      </div>
    
  )
}

export default App
