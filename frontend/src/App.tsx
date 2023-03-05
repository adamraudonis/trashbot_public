import React, { Component } from 'react';
import './App.css';

class Up extends Component {
  handleClick = () => {
    alert('Up');
  };

  render = () => {
    return (
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          fontSize: '30px',
          backgroundColor: '#cccccc',
          border: '1px solid #333333',
          borderRadius: '10px',
          boxShadow: 'none',
          outline: 'none',
          cursor: 'pointer',
          zIndex: '1',
          marginTop: '-150px',
        }}
        onClick={this.handleClick}
      >
        Up
      </button>
    );
  };
}

class Down extends Component {
  handleClick = () => {
    alert('Down');
  };

  render = () => {
    return (
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          fontSize: '30px',
          backgroundColor: '#cccccc',
          border: '1px solid #333333',
          borderRadius: '10px',
          boxShadow: 'none',
          outline: 'none',
          cursor: 'pointer',
          zIndex: '1',
          marginTop: '150px',
        }}
        onClick={this.handleClick}
      >
        Down
      </button>
    );
  };
}

class Left extends Component {
  handleClick = () => {
    alert('Left');
  };

  render = () => {
    return (
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          fontSize: '30px',
          backgroundColor: '#cccccc',
          border: '1px solid #333333',
          borderRadius: '10px',
          boxShadow: 'none',
          outline: 'none',
          cursor: 'pointer',
          zIndex: '1',
          marginLeft: '-150px',
        }}
        onClick={this.handleClick}
      >
        Left
      </button>
    );
  };
}

class Right extends Component {
  handleClick = () => {
    alert('Right');
  };

  render = () => {
    return (
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          fontSize: '30px',
          backgroundColor: '#cccccc',
          border: '1px solid #333333',
          borderRadius: '10px',
          boxShadow: 'none',
          outline: 'none',
          cursor: 'pointer',
          zIndex: '1',
          marginLeft: '150px',
        }}
        onClick={this.handleClick}
      >
        Right
      </button>
    );
  };
}

function App() {
  return (
    <div className="App">
      <Up />
      <Down />
      <Left />
      <Right />
    </div>
  );
}

export default App;
