import React from 'react';
import logo from './logo.svg';
import ShoppingList from './model/shoppingList'
import RunsTable from './model/runsTable'
import './App.css';
import {createData} from './model/runsTable'

function add(runs:number, balls:number,sixes:number,fours:number) {
  if (rows[rows.length-1].name !== "Ravindra Jadeja"){
    rows.push(createData('Ravindra Jadeja',runs,balls,sixes,fours));
    return
  } 

  rows[rows.length-1].runs = runs;
  rows[rows.length-1].balls = balls;
  rows[rows.length-1].sixes = sixes;
  rows[rows.length-1].fours = fours;

  console.log(rows);
}

let rows = [
  createData('Rohit Sharma', 110, 63, 2, 3),
  createData('Virat Kohli', 5, 6, 0, 1),
  createData('KL Rahul', 0, 1, 0, 0),
  createData('Risabh Pant', 5, 6, 0, 0),
  createData('Suryakumar Yadav', 100, 44, 9, 4),
];

function App() {
  let runs:number=0;
  let balls:number=0;
  let sixes:number=0;
  let fours:number=0;
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

      <input type="number" onChange={event => {runs = +event.target.value}}></input>
      <input type="number" onChange={event => {balls = +event.target.value}}></input>
      <input type="number" onChange={event => {sixes = +event.target.value}}></input>
      <input type="number" onChange={event => {fours = +event.target.value}}></input>
      <button className='somebutton' onClick={() => add(runs,balls,sixes,fours)}></button>
      <RunsTable list={rows}></RunsTable>
    </div>
  );
}

export default App;
