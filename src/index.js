import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


// 1. React components have props => this.props => Parent component passing data through props
// 2. React components can have state => this.state => component self-maintained data

// React 設計原理 => The Data Flows Down
// Props are Read-Only from parent component
// State is similar to props, but it is private and fully controlled by the component itself
// 結論 => A component may choose to pass its state down as props to its child components

// 慣例 component 名稱第一個字母大寫
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

// 如果 component 只有 render() method => 可以簡化成 Functional Components
// Note that onClick={props.onClick()} would not work 
// because it would call props.onClick immediately instead of passing it down 
function Square2(props) {
  return ( // return React element
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}



// store children components' state at parent component
// so that the parent can pass state back down via props
// so that the child components are always in sync with each other and with the parent
class Board extends React.Component {
  // constructor(props) { // set its initial state to contain an array with 9 nulls, corresponding to the 9 squares
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

  renderSquare(i) {
    // passing data to child component via props
    // set up child component's props.value
    // set up child component's props.onClick
    return (  
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) { // constructor , set up the initial state for Game component
    super(props);

    // this.state.history => object array => 保存整個遊戲紀錄
    this.state = { 
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    console.log("event handle i : " + i);
    // const history = this.state.history;
    const history = this.state.history.slice(0, this.state.stepNumber + 1); //回到第#步
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return; // ignore click and early return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ //重設 history array (包括重下的第#步)
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) { // 回到第#步
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    console.log(history);

    // map() 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合
    // 回呼函式語法 => function callback(currentValue, index, array)
    // step -> current value
    // move -> index (start from 0)
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      // Keys help React identify which items have changed, are added, or are removed. 
      // Keys should be given to the elements inside the array to give the elements a stable identity:
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // a,b,c 位置花色相同
      return squares[a];
    }
  }
  return null;
}

