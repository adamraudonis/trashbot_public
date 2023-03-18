import React, { Component } from 'react';
import { supabase } from '../supabaseClient';

type MyProps = {
  session: any;
};

async function makeCommand(user_id: string, commandType: string) {
  const updates = {
    created_at: new Date(),
    command: { command: commandType },
    user_id: user_id,
  };
  await supabase.from('controls').update(updates).eq('id', 1);
}

class Up extends Component<MyProps> {
  handleClick = async () => {
    makeCommand(this.props.session.user.id, 'forward');
  };
  handleStop = () => {
    makeCommand(this.props.session.user.id, 'stop');
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
        onPointerDown={this.handleClick}
        onPointerUp={this.handleStop}
      >
        Up
      </button>
    );
  };
}

class Down extends Component<MyProps> {
  handleClick = () => {
    makeCommand(this.props.session.user.id, 'backward');
  };
  handleStop = () => {
    makeCommand(this.props.session.user.id, 'stop');
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
        onPointerDown={this.handleClick}
        onPointerUp={this.handleStop}
      >
        Down
      </button>
    );
  };
}

class Left extends Component<MyProps> {
  handleClick = () => {
    makeCommand(this.props.session.user.id, 'left');
  };
  handleStop = () => {
    makeCommand(this.props.session.user.id, 'stop');
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
        onPointerDown={this.handleClick}
        onPointerUp={this.handleStop}
      >
        Left
      </button>
    );
  };
}

class Right extends Component<MyProps> {
  handleClick = () => {
    makeCommand(this.props.session.user.id, 'right');
  };
  handleStop = () => {
    makeCommand(this.props.session.user.id, 'stop');
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
        onPointerDown={this.handleClick}
        onPointerUp={this.handleStop}
      >
        Right
      </button>
    );
  };
}

class Stop extends Component<MyProps> {
  handleClick = () => {
    makeCommand(this.props.session.user.id, 'stop');
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
          marginLeft: 'auto',
        }}
        onClick={this.handleClick}
      >
        Stop
      </button>
    );
  };
}

class Extend extends Component<MyProps> {
  handleClick = () => {
    makeCommand(this.props.session.user.id, 'extend');
  };
  handleStop = () => {
    makeCommand(this.props.session.user.id, 'stop');
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
        onPointerDown={this.handleClick}
        onPointerUp={this.handleStop}
      >
        Extend
      </button>
    );
  };
}

class Retract extends Component<MyProps> {
  handleClick = () => {
    makeCommand(this.props.session.user.id, 'retract');
  };

  handleStop = () => {
    makeCommand(this.props.session.user.id, 'stop');
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
        onPointerDown={this.handleClick}
        onPointerUp={this.handleStop}
      >
        Retract
      </button>
    );
  };
}

function Controls({ session }: any) {
  if (!session) {
    return <h1>Loading Session.</h1>;
  }
  return (
    <div className="Controller">
      <a href="/">Back</a>
      <Up session={session} />
      <Down session={session} />
      <Left session={session} />
      <Right session={session} />
      <Extend session={session} />
      <Retract session={session} />
      <Stop session={session} />
    </div>
  );
}

export default Controls;
