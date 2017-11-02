import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


// 1. React components have props => this.props => Passing Data Through Props
// 2. React components can have state => this.state

// passing a arrow function as the onClick prop
class Square extends React.Component {
	constructor(props) { // set this.state in the constructor
	  super(props); // need to explicitly call super()
	  this.state = { // initialize this.state
	    value: null,
	  };
	 }

  render() {
    // return (
    //   <button className="square" onClick={() => alert('click')}> 
    //     {this.state.value}
    //   </button>
    // );
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

// store children components' state at parent component
// so that the parent can pass state back down via props
// so that the child components are always in sync with each other and with the parent
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i}/>; // passing data to props.value
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

