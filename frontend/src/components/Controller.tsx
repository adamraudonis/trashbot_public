import React, { Component } from 'react';

class Up extends Component {
  handleClick = () => {
    console.log('Up');
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
    console.log('Down');
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
    console.log('Left');
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
    console.log('Right');
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

class Extend extends Component {
  handleClick = () => {
    console.log('Extend');
  };

  render = () => {
    return (
      <button
        style={{
          position: 'fixed',
          bottom: '0px',
          right: '0px',
          width: '100px',
          height: '50px',
          backgroundColor: '#cccccc',
          border: '1px solid #333333',
          borderRadius: '10px',
          margin: '20px',
        }}
        onClick={this.handleClick}
      >
        Extend
      </button>
    );
  };
}

class Retract extends Component {
  handleClick = () => {
    console.log('Retract');
  };

  render = () => {
    return (
      <button
        style={{
          position: 'fixed',
          bottom: '0px',
          left: '0px',
          width: '100px',
          height: '50px',
          backgroundColor: '#cccccc',
          border: '1px solid #333333',
          borderRadius: '10px',
          margin: '20px',
        }}
        onClick={this.handleClick}
      >
        Retract
      </button>
    );
  };
}

function Controller() {
  return (
    <div className="Controller">
      <a href="/">Back</a>
      <Up />
      <Down />
      <Left />
      <Right />
      <Extend />
      <Retract />
    </div>
  );
}

export default Controller;
