import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {socketport} from '../../const';


import './Home.css';

const socket = openSocket(`http://localhost:${socketport}`);

/**
 * Home
 * @constructor
 */

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      roomnumber:  Math.floor(Math.random() * 1000000000)
    };
  

  }
  

  componentDidUpdate(){
    // this.updateRoom(this.state.room)
  }

  render() {
    return (
      <main>
        <h1>HOME PAGE</h1>
        <a href={`/mtg/${this.state.roomnumber}`}><button>CREATE A MTG ROOM</button></a>
        <a href={`/rpg/${this.state.roomnumber}`}><button>CREATE A RPG ROOM</button></a>
      </main>
    );
  }
}



export default Home;
