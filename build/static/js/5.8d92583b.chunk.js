(this["webpackJsonpreact-sass-boilerplate"]=this["webpackJsonpreact-sass-boilerplate"]||[]).push([[5],{101:function(e,t,a){"use strict";function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}a.r(t);var l,s=a(8),c=a(9),m=a(17),i=a(11),u=a(10),d=a(0),p=a.n(d),v=a(51),y=a.n(v),g=a(50),h=(a(99),function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(s.a)(this,a),(r=t.call(this,e)).state={rolltime:18},r.rolldice=r.rolldice.bind(Object(m.a)(r)),r.changePlayerValue=r.changePlayerValue.bind(Object(m.a)(r)),r.submitPlayerValue=r.submitPlayerValue.bind(Object(m.a)(r)),r}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;l=y()("http://localhost:".concat(g.a)),console.log("this.props.location.pathname",this.props.location.pathname),l.emit("roomExists",this.props.location.pathname),l.on("roomUpdated",(function(t){e.setState({room:JSON.parse(t)})})),l.on("sendConsole",(function(e){console.log(JSON.parse(e))}))}},{key:"componentDidUpdate",value:function(){console.log("update",this.state.room)}},{key:"updateRoom",value:function(e){l.emit("updateRoom",JSON.stringify(e))}},{key:"removePlayer",value:function(e){var t=o({},this.state.room);t.roomData.player_data.forEach((function(t,a){return t.cmdr_dmg.splice(e,1)})),t.roomData.player_data.splice(e,1),this.setState({room:t}),this.updateRoom(this.state.room)}},{key:"submitPlayerValue",value:function(e){var t=o({},this.state.room),a=e.target.elements[0].name,r=e.target.elements[0].attributes.index.value,n=e.target.elements[0].type,l=e.target.elements[0].value,s=e.target.elements[0].placeholder;"number"===n&&(l=parseInt(l)),t.roomData.player_data[r][a]=l,"name"===a&&t.roomData.player_data.forEach((function(e,t){var a=e.cmdr_dmg;a=a.map((function(e,t){return e.name===s?{id:e.id,name:l,dmg:e.dmg}:e})),e.cmdr_dmg=a})),this.setState({room:t}),this.updateRoom(this.state.room)}},{key:"addCustomValue",value:function(e){var t=o({},this.state.room),a=(e.target.name,e.target.type,e.target.attributes.nested.value,parseInt(e.target.attributes.index.value)),r=e.target.value;t.roomData.player_data[a].custom.push({name:r,type:"field",value:0}),this.setState({room:t}),this.updateRoom(this.state.room)}},{key:"changePlayerValue",value:function(e){var t,a,r=o({},this.state.room),n=e.target.name,l=e.target.type,s=e.target.attributes.nested.value;if("number"===l?(t=parseInt(e.target.attributes.index.value),a=parseInt(e.target.value)):(t=e.target.attributes.index.value,a=e.target.value),console.log("NESTED ",s,n,t,l,a),s>0){var c=parseInt(e.target.attributes.subindex.value),m=e.target.attributes.subkey.value;console.log(r.roomData.player_data[t][n][c],m),r.roomData.player_data[t][n][c][m]=a}else r.roomData.player_data[t][n]=a;this.setState({room:r}),this.updateRoom(this.state.room)}},{key:"rolldice",value:function(e){var t=this,a=o({},this.state.room);a.roomData.dice.rolling=!0,this.setState({room:a});for(var r=function(r){setTimeout((function(){a.roomData.dice.dicevalues.forEach((function(t,a){a!==e&&"all"!==e||(t.value=Math.floor(Math.random()*t.sides)+1)})),r==t.state.rolltime-1&&(a.roomData.dice.rolling=!1),t.setState({room:a}),t.updateRoom(t.state.room)}),2*r*r)},n=0;n<this.state.rolltime;n++)r(n)}},{key:"render",value:function(){var e=this;return p.a.createElement("main",null,this.state.room&&this.state.room.roomData&&p.a.createElement("div",null,p.a.createElement("h1",null,"Room PAGE : ",this.state.room.roomNum),p.a.createElement("div",{className:"row"},p.a.createElement("div",{className:"row"},p.a.createElement("button",{onClick:function(){return e.rolldice("all")}},"Re-Roll all dice")),p.a.createElement("div",{className:"row"},this.state.room.roomData.dice.dicevalues.map((function(t,a){return p.a.createElement("button",{key:"dice-".concat(a),className:"dice-".concat(t.sides),onClick:function(){return e.rolldice(a)}},t.value)}))),p.a.createElement("div",{className:"row"},this.state.room.roomData.player_data.map((function(t,a){return p.a.createElement("div",{key:t.name,className:"col-xs-12 col-sm-6 playerCard"},p.a.createElement("div",{className:"playerCard-wrapper"},p.a.createElement("div",{className:"playerCard-exit"},p.a.createElement("button",{onClick:function(){return e.removePlayer(a)}},"X")),p.a.createElement("div",{className:"playerCard-content"},p.a.createElement("form",{onSubmit:e.submitPlayerValue},p.a.createElement("input",{type:"text",name:"name",placeholder:t.name,index:a,className:"playerCard-name"}),p.a.createElement("input",{type:"submit",value:"^"})),p.a.createElement("input",{type:"number",name:"life",value:t.life,index:a,nested:0,onChange:e.changePlayerValue,className:"playerCard-life",step:1}),p.a.createElement("div",{className:"row playerCard-bigsec"},t.cmdr_dmg.map((function(t,r){return p.a.createElement("div",{className:"col-sm-4 cmdrDmg",key:"".concat(t.name,"_").concat(t.id)},p.a.createElement("span",null,t.name),p.a.createElement("input",{type:"number",name:"cmdr_dmg",subkey:"dmg",value:t.dmg,index:a,subindex:r,onChange:e.changePlayerValue,nested:1,className:"cmdrDmg-dmg",step:1}))}))),p.a.createElement("div",{className:"row"},p.a.createElement("form",{onSubmit:e.submitPlayerValue},p.a.createElement("input",{type:"text",placeholder:"new value",index:a,className:"playerCard-custom"}),p.a.createElement("input",{type:"submit",value:"^"}))),p.a.createElement("div",{className:"row playerCard-bigsec"},t.custom.map((function(t,r){return p.a.createElement("div",{className:"col-sm-6"},"field"==t.type&&p.a.createElement("input",{type:"number",name:t.name,value:t.value,index:a,nested:0,onChange:e.changePlayerValue,step:1}),"toggle"==t.type&&p.a.createElement("div",{className:"customtoggle ".concat(t.active)},t.name,p.a.createElement("div",{className:"customtoggle-toggleOn"}),p.a.createElement("div",{className:"customtoggle-toggleOff"})))}))))))}))))))}}]),a}(d.Component));t.default=h},50:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var r="8000"},62:function(e,t){},99:function(e,t,a){}}]);
//# sourceMappingURL=5.8d92583b.chunk.js.map