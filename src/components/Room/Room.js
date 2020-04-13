import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {socketport} from '../../const';


import './Room.css';

let socket;

/**
 * Room
 * @constructor
 */

class Room extends Component {
  constructor(props){
    super(props);
    this.state = {
      rolltime: 18,
      cmdr_dmgToggle: 0
    };

    this.rolldice = this.rolldice.bind(this)
    this.changePlayerValue = this.changePlayerValue.bind(this)
    this.submitPlayerValue = this.submitPlayerValue.bind(this)
    this.addCustomValue = this.addCustomValue.bind(this)

  }

  componentDidMount(){
    // console.log(this.props.location,window.location.hostname)

    // let players = this.state.room.roomData.player_data.length;
    socket = openSocket(`http://${window.location.hostname}:${socketport}`);

    console.log('this.props.location.pathname', this.props.location.pathname)

    socket.emit('roomExists', this.props.location.pathname);


    // socket.on('joinedRoom', data => {
    //   this.setState({room: JSON.parse(data) });
    //   // console.log(this.state)
    //   // this.updateRoom(this.state.room);
    // });
    // socket.on('userleft', data => {
    //   console.log('THIS IDS DISCONNECT',data)
    // });

    socket.on('roomUpdated', data => {
      this.setState({room: JSON.parse(data)});
    });

    socket.on('sendConsole', data => {
      console.log(JSON.parse(data))
    });



    // socket.emit('createRoom', this.props.location.pathname, 0);


  }

  componentDidUpdate(){
    console.log('update', this.state.room)
    // this.updateRoom(this.state.room)
  }

  updateRoom(room){
    socket.emit('updateRoom', JSON.stringify(room));
  }
  

  removePlayer(index){
    let room = {...this.state.room}
    //this isn't working right. match name instead of index
    room.roomData.player_data.forEach((player, playerindex)=>player.cmdr_dmg.splice(index,1));

    room.roomData.player_data.splice(index,1);

    this.setState({room: room});
    this.updateRoom(this.state.room);
  }
  
  submitPlayerValue(event){
    // alert(event)
    let room = {...this.state.room}

    let key = event.target.elements[0].name;
    let index = event.target.elements[0].attributes.index.value;
    let type = event.target.elements[0].type;
    let value = event.target.elements[0].value;
    let placeholder = event.target.elements[0].placeholder;

    if(type === 'number'){
      value = parseInt(value)
    }

    room.roomData.player_data[index][key] = value;
    if(key === 'name'){

      // change name for everyone

      room.roomData.player_data.forEach((player,playerindex)=>{
        
        let cmdr_dmg_new = player.cmdr_dmg;

        cmdr_dmg_new = cmdr_dmg_new.map((cmdr_dmg, cmdr_index)=>{
          if(cmdr_dmg.name === placeholder){
            return {
              id: cmdr_dmg.id,
              name: value,
              dmg: cmdr_dmg.dmg
  
            }
          }else{
            return cmdr_dmg
          }
          

        })

        player.cmdr_dmg = cmdr_dmg_new;

      })

    }
    this.setState({room: room});
    this.updateRoom(this.state.room);
  }

  addCustomValue(event){
    console.log('fireing')
    let room = {...this.state.room}
    // alert('ADDDING')
    console.log(' ADDING CUSTOM ',room.roomData.player_data[index]);

    let type = event.target.type;

    let index = parseInt(event.target.attributes.index.value);
    let value = event.target.value;

    // event.preventDefault();
    let field = {
      name: 'tester',
      type: 'field',
      value: 0
    }


    room.roomData.player_data[index].custom.push(field);
    
    console.log(' ADDED CUSTOM ',room.roomData.player_data[index]);


    this.setState({room: room});
    this.updateRoom(this.state.room);
  }

  // changePlayerValueStatic(event){}
  changePlayerValue(event){

    let room = {...this.state.room}

    let key = event.target.name
    let type = event.target.type
    let nested = event.target.attributes.nested.value;

    let index,
        value;

    if(type === 'number'){
      index = parseInt(event.target.attributes.index.value)
      value = parseInt(event.target.value)
    }else{
      index = event.target.attributes.index.value
      value = event.target.value
    }
    console.log('NESTED ', nested, key, index, type, value)

    if(nested > 0){
      let subindex = parseInt(event.target.attributes.subindex.value)
      let subkey = event.target.attributes.subkey.value

      if(this.state.cmdr_dmgToggle > 0){
        var difference = function (a, b) { return a-b; }
        
        let lifeDifference = difference(room.roomData.player_data[index][key][subindex].dmg, value)
        
        room.roomData.player_data[index].life = room.roomData.player_data[index].life + (lifeDifference);
        console.log('LIF + CMD DMG', room.roomData.player_data[index] , lifeDifference, room.roomData.player_data[index][key][subindex])
      }
      
      console.log(room.roomData.player_data[index])

      room.roomData.player_data[index][key][subindex][subkey] = value;
    }else{
      room.roomData.player_data[index][key] = value;
    }

    this.setState({room: room});
    this.updateRoom(this.state.room);
  }

  rolldice(masterindex){

    let room = {...this.state.room}
    room.roomData.dice.rolling = true;
    this.setState({room: room});

    for (let index = 0; index < this.state.rolltime; index++) {

      let delay = (index*2) * index;
      
      setTimeout(()=>{
        room.roomData.dice.dicevalues.forEach((dice,diceindex) => {
          if(diceindex === masterindex || masterindex ==='all'){
            dice.value = Math.floor(Math.random() * dice.sides) + 1; 
          }
        });
        
        if(index === this.state.rolltime -1){
          room.roomData.dice.rolling = false;
        }
        this.setState({room: room});
        this.updateRoom(this.state.room);
      },delay);

    }
  }
  render() {
    return (
      <main>

        {/* {this.renderRoom()} */}
        

        {this.state.room && this.state.room.roomData && (
          <div>
            <h1>Room PAGE : {this.state.room.roomNum}</h1>

            <div className="row">
              <div className="col-sm-6">
                <div className="row">
                  <button onClick={()=>this.rolldice('all')}>Re-Roll all dice</button>
                </div>
                <div className="row">
                  {this.state.room.roomData.dice.dicevalues.map((dice, index) =>
                    <button 
                      key={`dice-${index}`} 
                      className={`dice-${dice.sides}`} 
                      onClick={()=>this.rolldice(index)}
                    >
                      {dice.value}
                    </button>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <button className={this.state.cmdr_dmgToggle ? 'active' : ''} onClick={()=>this.setState({cmdr_dmgToggle: !this.state.cmdr_dmgToggle})}>Toggle cmdr dmg link</button>
              </div>
              
              <div className="row">
                {this.state.room.roomData.player_data.map((player, index) =>
                  <div key={ `${player.name}_${index}` } className={`col-xs-12 col-sm-6 playerCard`}>
                    <div className={`playerCard-wrapper`}>
                      <div className={`playerCard-exit`}>
                        <button onClick={()=>this.removePlayer(index)} >X</button>
                      </div>
                      <div className={`playerCard-content`}>

                        <form onSubmit={this.submitPlayerValue}>
                          <input 
                            type="text" 
                            name="name"
                            placeholder={player.name}
                            index={index}
                            className={`playerCard-name`}
                          ></input>
                          <input type="submit" value="^"></input>
                        </form>

                      
                        <input 
                          type="number" 
                          name="life"
                          value={player.life}
                          index={index}
                          nested={0}
                          onChange={this.changePlayerValue}
                          className={`playerCard-life`}
                          step={1}
                        ></input>

                        <div className="row playerCard-bigsec">
                          {player.cmdr_dmg.map((player, cmdrIndex)=>
                            <div className="col-sm-4 cmdrDmg" key={`${player.name}_${player.id}_${cmdrIndex}`}>
                              <span>{player.name}</span>

                              <input 
                                type="number" 
                                name="cmdr_dmg"
                                subkey="dmg"
                                value={player.dmg}
                                index={index}
                                subindex={cmdrIndex}
                                onChange={this.changePlayerValue}
                                nested={1}
                                className={`cmdrDmg-dmg`}
                                step={1}

                              ></input>

                            </div>
                          )}
                        </div>

                        <div className="row">

                          <form onSubmit={this.addCustomValue}>
                            test herer
                            <input 
                              type="text" 
                              placeholder={'new value'}
                              index={index}
                              className={`playerCard-custom`}
                            ></input>
                            <input type="submit" value="^"></input>
                          </form>

                        </div>
                        <div className="row playerCard-bigsec">
                          {player.custom.map((customValue, customIndex)=>
                            <div className='col-sm-6' key={`${customValue.name}_${customIndex}`}>
                              {customValue.type == 'field'&&(
                                  <div className='row'>
                                    {customValue.name}
                                    <input 
                                      type="number" 
                                      name={customValue.name}
                                      value={customValue.value}
                                      index={index}
                                      nested={0}
                                      // onChange={this.changePlayerValue}
                                      step={1}
                                    ></input>
                                  </div>
                                  
                              )}
                              {customValue.type == 'toggle'&&(
                                <div className={`customtoggle ${customValue.active}`}>
                                  {customValue.name}
                                  <div className={`customtoggle-toggleOn`}></div>
                                  <div className={`customtoggle-toggleOff`}></div>

                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* {this.state.room.num} */}

      </main>
    );
  }
}



export default Room;
