import React, { Component } from 'react';
import { CSSProperties } from 'react';
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
interface RobotControllerState {
  pressedButton: string | null;
}

class Controls extends Component<MyProps, RobotControllerState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      pressedButton: null,
    };
  }

  handleButtonPress = (buttonName: string) => {
    this.setState({ pressedButton: buttonName });
    console.log(buttonName);
    makeCommand(this.props.session.user.id, buttonName.toLowerCase());
  };

  handleButtonRelease = () => {
    this.setState({ pressedButton: null });
    console.log('released');
    makeCommand(this.props.session.user.id, 'stop');
  };

  handleContextMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  render() {
    const containerStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
    };

    const clusterStyle: CSSProperties = {
      display: 'grid',
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridGap: '10px',
      width: '100%',
    };

    const buttonStyle: CSSProperties = {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      padding: '10px 24px',
      borderRadius: '4px',
      width: '100%',
      height: '60px',
      userSelect: 'none',
    };

    const pressedButtonStyle: CSSProperties = {
      ...buttonStyle,
      backgroundColor: '#216e2c',
    };

    const armButtonStyle: CSSProperties = {
      ...buttonStyle,
      margin: '10px',
    };

    const armPressedButtonStyle: CSSProperties = {
      ...armButtonStyle,
      backgroundColor: '#216e2c',
    };

    return (
      <div style={containerStyle}>
        <a href="/" style={{ position: 'absolute', marginLeft: '0', top: '0' }}>
          Back
        </a>

        <div style={clusterStyle}>
          <div></div>
          <button
            style={
              this.state.pressedButton === 'forward'
                ? pressedButtonStyle
                : buttonStyle
            }
            onTouchStart={() => this.handleButtonPress('forward')}
            onTouchEnd={this.handleButtonRelease}
            onPointerDown={() => this.handleButtonPress('forward')}
            onPointerUp={this.handleButtonRelease}
            onContextMenu={this.handleContextMenu}
          >
            Forward
          </button>
          <div></div>
          <button
            style={
              this.state.pressedButton === 'left'
                ? pressedButtonStyle
                : buttonStyle
            }
            onTouchStart={() => this.handleButtonPress('left')}
            onTouchEnd={this.handleButtonRelease}
            onPointerDown={() => this.handleButtonPress('left')}
            onPointerUp={this.handleButtonRelease}
            onContextMenu={this.handleContextMenu}
          >
            Left
          </button>
          <button
            style={
              this.state.pressedButton === 'stop'
                ? pressedButtonStyle
                : buttonStyle
            }
            onTouchStart={() => this.handleButtonPress('stop')}
            onTouchEnd={this.handleButtonRelease}
            onPointerDown={() => this.handleButtonPress('stop')}
            onPointerUp={this.handleButtonRelease}
            onContextMenu={this.handleContextMenu}
          >
            Stop
          </button>
          <button
            style={
              this.state.pressedButton === 'right'
                ? pressedButtonStyle
                : buttonStyle
            }
            onTouchStart={() => this.handleButtonPress('right')}
            onTouchEnd={this.handleButtonRelease}
            onPointerDown={() => this.handleButtonPress('right')}
            onPointerUp={this.handleButtonRelease}
            onContextMenu={this.handleContextMenu}
          >
            Right
          </button>
          <div></div>
          <button
            style={
              this.state.pressedButton === 'backward'
                ? pressedButtonStyle
                : buttonStyle
            }
            onTouchStart={() => this.handleButtonPress('backward')}
            onTouchEnd={this.handleButtonRelease}
            onPointerDown={() => this.handleButtonPress('backward')}
            onPointerUp={this.handleButtonRelease}
            onContextMenu={this.handleContextMenu}
          >
            Backward
          </button>
          <div></div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '10px',
          }}
        >
          <button
            style={
              this.state.pressedButton === 'extend'
                ? armPressedButtonStyle
                : armButtonStyle
            }
            onTouchStart={() => this.handleButtonPress('extend')}
            onTouchEnd={this.handleButtonRelease}
            onPointerDown={() => this.handleButtonPress('extend')}
            onPointerUp={this.handleButtonRelease}
            onContextMenu={this.handleContextMenu}
          >
            Retract
          </button>
          <button
            style={
              this.state.pressedButton === 'retract'
                ? armPressedButtonStyle
                : armButtonStyle
            }
            onTouchStart={() => this.handleButtonPress('retract')}
            onTouchEnd={this.handleButtonRelease}
            onPointerDown={() => this.handleButtonPress('retract')}
            onPointerUp={this.handleButtonRelease}
            onContextMenu={this.handleContextMenu}
          >
            Extend
          </button>
        </div>
      </div>
    );
  }
}
export default Controls;

//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('extend')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Extend
//           </button>
//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('retract')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Retract
//           </button>

///////////

// interface RobotControllerState {
//   pressedButton: string | null;
// }

// class Controls extends Component<any> {
//   handleButtonPress = (buttonName: string) => {
//     console.log(buttonName);
//   };

//   handleButtonRelease = () => {
//     console.log('released');
//   };

//   render() {
//     const containerStyle: CSSProperties = {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#f0f0f0',
//     };

//     const clusterStyle: CSSProperties = {
//       display: 'grid',
//       gridTemplateRows: '1fr 1fr 1fr',
//       gridTemplateColumns: '1fr 1fr 1fr',
//       gridGap: '10px',
//       width: '100%',
//     };

//     const buttonStyle: CSSProperties = {
//       backgroundColor: '#4CAF50',
//       border: 'none',
//       color: 'white',
//       textAlign: 'center',
//       textDecoration: 'none',
//       display: 'inline-block',
//       fontSize: '16px',
//       padding: '10px 24px',
//       borderRadius: '4px',
//       width: '100%',
//     };

//     const pressedButtonStyle: CSSProperties = {
//       ...buttonStyle,
//       backgroundColor: '#216e2c',
//     };

//     return (
//       <div style={containerStyle}>
//         <div style={clusterStyle}>
//           <div></div>
//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('forward')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Forward
//           </button>
//           <div></div>
//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('left')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Left
//           </button>
//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('stop')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Stop
//           </button>
//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('right')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Right
//           </button>
//           <div></div>
//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('backward')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Backward
//           </button>
//           <div></div>
//         </div>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             width: '100%',
//             marginTop: '10px',
//           }}
//         >
//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('extend')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Extend
//           </button>
//           <button
//             style={buttonStyle}
//             onTouchStart={() => this.handleButtonPress('retract')}
//             onTouchEnd={this.handleButtonRelease}
//           >
//             Retract
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default Controls;

///////////////////////

// import React, { Component } from 'react';

// class Up extends Component<MyProps> {
//   handleClick = async () => {
//     makeCommand(this.props.session.user.id, 'forward');
//   };
//   handleStop = () => {
//     makeCommand(this.props.session.user.id, 'stop');
//   };
//   render = () => {
//     return (
//       <button
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '100px',
//           height: '100px',
//           fontSize: '30px',
//           backgroundColor: '#cccccc',
//           border: '1px solid #333333',
//           borderRadius: '10px',
//           boxShadow: 'none',
//           outline: 'none',
//           cursor: 'pointer',
//           zIndex: '1',
//           marginTop: '-150px',
//         }}
//         onPointerDown={this.handleClick}
//         onPointerUp={this.handleStop}
//       >
//         Up
//       </button>
//     );
//   };
// }

// class Down extends Component<MyProps> {
//   handleClick = () => {
//     makeCommand(this.props.session.user.id, 'backward');
//   };
//   handleStop = () => {
//     makeCommand(this.props.session.user.id, 'stop');
//   };
//   render = () => {
//     return (
//       <button
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '100px',
//           height: '100px',
//           fontSize: '30px',
//           backgroundColor: '#cccccc',
//           border: '1px solid #333333',
//           borderRadius: '10px',
//           boxShadow: 'none',
//           outline: 'none',
//           cursor: 'pointer',
//           zIndex: '1',
//           marginTop: '150px',
//         }}
//         onPointerDown={this.handleClick}
//         onPointerUp={this.handleStop}
//       >
//         Down
//       </button>
//     );
//   };
// }

// class Left extends Component<MyProps> {
//   handleClick = () => {
//     makeCommand(this.props.session.user.id, 'left');
//   };
//   handleStop = () => {
//     makeCommand(this.props.session.user.id, 'stop');
//   };
//   render = () => {
//     return (
//       <button
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '100px',
//           height: '100px',
//           fontSize: '30px',
//           backgroundColor: '#cccccc',
//           border: '1px solid #333333',
//           borderRadius: '10px',
//           boxShadow: 'none',
//           outline: 'none',
//           cursor: 'pointer',
//           zIndex: '1',
//           marginLeft: '-150px',
//         }}
//         onPointerDown={this.handleClick}
//         onPointerUp={this.handleStop}
//       >
//         Left
//       </button>
//     );
//   };
// }

// class Right extends Component<MyProps> {
//   handleClick = () => {
//     makeCommand(this.props.session.user.id, 'right');
//   };
//   handleStop = () => {
//     makeCommand(this.props.session.user.id, 'stop');
//   };
//   render = () => {
//     return (
//       <button
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '100px',
//           height: '100px',
//           fontSize: '30px',
//           backgroundColor: '#cccccc',
//           border: '1px solid #333333',
//           borderRadius: '10px',
//           boxShadow: 'none',
//           outline: 'none',
//           cursor: 'pointer',
//           zIndex: '1',
//           marginLeft: '150px',
//         }}
//         onPointerDown={this.handleClick}
//         onPointerUp={this.handleStop}
//       >
//         Right
//       </button>
//     );
//   };
// }

// class Stop extends Component<MyProps> {
//   handleClick = () => {
//     makeCommand(this.props.session.user.id, 'stop');
//   };
//   render = () => {
//     return (
//       <button
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '100px',
//           height: '100px',
//           fontSize: '30px',
//           backgroundColor: '#cccccc',
//           border: '1px solid #333333',
//           borderRadius: '10px',
//           boxShadow: 'none',
//           outline: 'none',
//           cursor: 'pointer',
//           zIndex: '1',
//           marginLeft: 'auto',
//         }}
//         onClick={this.handleClick}
//       >
//         Stop
//       </button>
//     );
//   };
// }

// class Extend extends Component<MyProps> {
//   handleClick = () => {
//     makeCommand(this.props.session.user.id, 'extend');
//   };
//   handleStop = () => {
//     makeCommand(this.props.session.user.id, 'stop');
//   };
//   render = () => {
//     return (
//       <button
//         style={{
//           position: 'fixed',
//           bottom: '0px',
//           right: '0px',
//           width: '100px',
//           height: '50px',
//           backgroundColor: '#cccccc',
//           border: '1px solid #333333',
//           borderRadius: '10px',
//           margin: '20px',
//         }}
//         onPointerDown={this.handleClick}
//         onPointerUp={this.handleStop}
//       >
//         Extend
//       </button>
//     );
//   };
// }

// class Retract extends Component<MyProps> {
//   handleClick = () => {
//     makeCommand(this.props.session.user.id, 'retract');
//   };

//   handleStop = () => {
//     makeCommand(this.props.session.user.id, 'stop');
//   };

//   render = () => {
//     return (
//       <button
//         style={{
//           position: 'fixed',
//           bottom: '0px',
//           left: '0px',
//           width: '100px',
//           height: '50px',
//           backgroundColor: '#cccccc',
//           border: '1px solid #333333',
//           borderRadius: '10px',
//           margin: '20px',
//         }}
//         onPointerDown={this.handleClick}
//         onPointerUp={this.handleStop}
//       >
//         Retract
//       </button>
//     );
//   };
// }

// function Controls({ session }: any) {
//   if (!session) {
//     return <h1>Loading Session.</h1>;
//   }
//   return (
//     <div className="Controller">
//       <a href="/">Back</a>
//       <Up session={session} />
//       <Down session={session} />
//       <Left session={session} />
//       <Right session={session} />
//       <Extend session={session} />
//       <Retract session={session} />
//       <Stop session={session} />
//     </div>
//   );
// }

// export default Controls;
