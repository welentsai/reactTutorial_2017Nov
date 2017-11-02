import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


// 1. React components have props => this.props => Passing Data Through Props
// 2. React components can have state => this.state

/* Square no longer keeps its own state; it receives its value from its parent Board 
   and informs its parent when it’s clicked. We call components like this "controlled components" */
class Square extends React.Component {
  // register a button onClick event listener 
  // event listener 呼叫流程
  // <Button> onClick -> <Square> this.props.onClick
  // <Square> this.props.onClick -> <Board> this.handleClick(i) 
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

// store children components' state at parent component
// so that the parent can pass state back down via props
// so that the child components are always in sync with each other and with the parent
class Board extends React.Component {
  constructor(props) { // set its initial state to contain an array with 9 nulls, corresponding to the 9 squares
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); //  copy the squares array, keep immutability
    squares[i] = 'X';
    // change state via this.setState()
    // the Square components rerender automatically
    this.setState({squares: squares}); 
  }

  renderSquare(i) {
    // passing data to child component via props
    // set up child component's props.value
    // set up child component's props.onClick
    return (  
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
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

