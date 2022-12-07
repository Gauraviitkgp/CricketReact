import React,{ useState } from 'react';
import logo from './logo.svg';
import ShoppingList from './model/shoppingList'
import RunsTable from './model/runsTable'
import './App.css';
import {createData,RunsTableInput} from './model/runsTable'

function add(player:RunsTableInput) {
  console.log(rows[rows.length-1]);
  if (rows.at(rows.length-1)!.name !== player.name){
    rows.push({
      name:   player.name,
      runs:   player.runs,
      balls:  player.balls,
      sixes:  player.sixes,
      fours:  player.fours,
    });
    return
  } 

  rows[rows.length-1].runs  = player.runs;
  rows[rows.length-1].balls = player.balls;
  rows[rows.length-1].sixes = player.sixes;
  rows[rows.length-1].fours = player.fours;
}

let rows = [
  createData('Rohit Sharma', 110, 63, 2, 3),
  createData('Virat Kohli', 5, 6, 0, 1),
  createData('KL Rahul', 0, 1, 0, 0),
  createData('Risabh Pant', 5, 6, 0, 0),
  createData('Suryakumar Yadav', 100, 44, 9, 4),
];

let inputParam:RunsTableInput = {
  name: "",
  runs: 0,
  balls: 0,
  sixes: 0,
  fours: 0,
} ;

function App() {
  
  const [state, setState] = useState(0);

  const updateRows = () => {
    add(inputParam);

    console.log(state);
    setState(state+1)
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <ShoppingList name='Gaurav' favourite='Yukta'/> */}
      {/* <ShoppingList name='Yukuta' favourite='Gaurav' /> */}

      <input type="text"    defaultValue={inputParam.name}  onChange={event => {inputParam.name = event.target.value}}></input>
      <input type="number"  defaultValue={inputParam.runs}  onChange={event => {inputParam.runs = +event.target.value}}></input>
      <input type="number"  defaultValue={inputParam.balls} onChange={event => {inputParam.balls = +event.target.value}}></input>
      <input type="number"  defaultValue={inputParam.sixes} onChange={event => {inputParam.sixes = +event.target.value}}></input>
      <input type="number"  defaultValue={inputParam.fours} onChange={event => {inputParam.fours = +event.target.value}}></input>
      <button className='register' onClick={updateRows}></button>
      <RunsTable list={rows} ></RunsTable>
    </div>
  );
}

export default App;
