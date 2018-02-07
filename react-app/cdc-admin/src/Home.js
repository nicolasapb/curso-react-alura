import React, { Component } from 'react'; 

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Bemvindo ao sistema</h1>
        </div>
        <br/>
        <div className="content" id="content">
        </div> 
      </div>
    )
  }
}