import React from 'react';
import Node from './Node';
import {dijkstra} from '../dijkstra';

import './FindShortestPath.css';

export default class FindShortestPath extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      START_NODE_ROW: 5,
      FINISH_NODE_ROW: 20,
      START_NODE_COL: 5,
      FINISH_NODE_COL: 30,
      ROW_COUNT: 25,
      COLUMN_COUNT: 35,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false,
      currRow: 0,
      currCol: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.toggleIsRunning = this.toggleIsRunning.bind(this);
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    const newGrid = this.setGridText(grid);
    this.setState({grid: newGrid});
  }

  toggleIsRunning() {
    this.setState({isRunning: !this.state.isRunning});
  }

  getInitialGrid = (
    rowCount = this.state.ROW_COUNT,
    colCount = this.state.COLUMN_COUNT,
  ) => {
    const initialGrid = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push(this.createNode(row, col, false));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  setGridText(grid) {
    const newGrid = grid.slice();
    // P
    for(let col = 11; col <= 14;col++) {
      for(let row = 5; row <= 10; row++) {
        const node = newGrid[row][col];
        let isBlank = row === 5 || row === 8 ? false : true;
        if(col === 11) {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !node.isWall,
            };
            newGrid[row][col] = newNode;
          }
        } else if(col === 14 && row !== 9 && row !== 10) {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !node.isWall,
            };
            newGrid[row][col] = newNode;
          }
        } else {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !isBlank,
            };
            newGrid[row][col] = newNode;
          }
        }
      }
    }

    // A
    for(let col = 16; col <= 19;col++) {
      for(let row = 5; row <= 10; row++) {
        const node = newGrid[row][col];
        let isBlank = row === 5 || row === 8 ? false : true;
        if(col === 16) {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !node.isWall,
            };
            newGrid[row][col] = newNode;
          }
        } else if(col === 19) {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !node.isWall,
            };
            newGrid[row][col] = newNode;
          }
        } else {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !isBlank,
            };
            newGrid[row][col] = newNode;
          }
        }
      }
    }

    // U
    for(let col = 19; col <= 22;col++) {
      for(let row = 13; row <= 17; row++) {
        const node = newGrid[row][col];
        let isBlank = row === 17 ? false : true;
        if(col === 19 || col === 22) {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !node.isWall,
            };
            newGrid[row][col] = newNode;
          }
        } else {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !isBlank,
            };
            newGrid[row][col] = newNode;
          }
        }
      }
    }

    // N
    for(let col = 24; col <= 28;col++) {
      for(let row = 13; row <= 17; row++) {
        const node = newGrid[row][col];
        let isBlank = row === 17 ? false : true;
        if(col === 24 || col === 28) {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !node.isWall,
            };
            newGrid[row][col] = newNode;
          }
        } else if(col === 25 || col === 26 || col === 27) {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !isBlank,
            };
            newGrid[col - 11][col] = newNode;
          }
        } else {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !isBlank,
            };
            newGrid[row][col] = newNode;
          }
        }
      }
    }

    // B
    for(let col = 30; col <= 33;col++) {
      for(let row = 13; row <= 17; row++) {
        const node = newGrid[row][col];
        let isBlank = row === 13 || row === 15 || row === 17 ? false : true;
        if(col === 30 || col === 33) {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !node.isWall,
            };
            newGrid[row][col] = newNode;
          }
        } else {
          if (!node.isStart && !node.isFinish && node.isNode) {
            const newNode = {
              ...node,
              isWall: !isBlank,
            };
            newGrid[row][col] = newNode;
          }
        }
      }
    }
    return newGrid;
  }

  createNode = (row, col) => {
    return {
      row,
      col,
      isStart:
        row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
      isFinish:
        row === this.state.FINISH_NODE_ROW &&
        col === this.state.FINISH_NODE_COL,
      distance: Infinity,
      distanceToFinishNode:
        Math.abs(this.state.FINISH_NODE_ROW - row) +
        Math.abs(this.state.FINISH_NODE_COL - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };

  handleMouseDown(row, col) {
    if (!this.state.isRunning) {
      if (this.isGridClear()) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          'node node-start'
        ) {
          this.setState({
            mouseIsPressed: true,
            isStartNode: true,
            currRow: row,
            currCol: col,
          });
        } else if (
          document.getElementById(`node-${row}-${col}`).className ===
          'node node-finish'
        ) {
          this.setState({
            mouseIsPressed: true,
            isFinishNode: true,
            currRow: row,
            currCol: col,
          });
        } else {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({
            grid: newGrid,
            mouseIsPressed: true,
            isWallNode: true,
            currRow: row,
            currCol: col,
          });
        }
      }
    }
  }

  isGridClear() {
    for (const row of this.state.grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`,
        ).className;
        if (
          nodeClassName === 'node node-visited' ||
          nodeClassName === 'node node-shortest-path'
        ) {
          return false;
        }
      }
    }
    return true;
  }

  handleMouseEnter(row, col) {
    if (!this.state.isRunning) {
      if (this.state.mouseIsPressed) {
        const nodeClassName = document.getElementById(`node-${row}-${col}`)
          .className;
        if (this.state.isStartNode) {
          if (nodeClassName !== 'node node-wall') {
            const prevStartNode = this.state.grid[this.state.currRow][
              this.state.currCol
            ];
            prevStartNode.isStart = false;
            document.getElementById(
              `node-${this.state.currRow}-${this.state.currCol}`,
            ).className = 'node';

            this.setState({currRow: row, currCol: col});
            const currStartNode = this.state.grid[row][col];
            currStartNode.isStart = true;
            document.getElementById(`node-${row}-${col}`).className =
              'node node-start';
          }
          this.setState({START_NODE_ROW: row, START_NODE_COL: col});
        } else if (this.state.isFinishNode) {
          if (nodeClassName !== 'node node-wall') {
            const prevFinishNode = this.state.grid[this.state.currRow][
              this.state.currCol
            ];
            prevFinishNode.isFinish = false;
            document.getElementById(
              `node-${this.state.currRow}-${this.state.currCol}`,
            ).className = 'node';

            this.setState({currRow: row, currCol: col});
            const currFinishNode = this.state.grid[row][col];
            currFinishNode.isFinish = true;
            document.getElementById(`node-${row}-${col}`).className =
              'node node-finish';
          }
          this.setState({FINISH_NODE_ROW: row, FINISH_NODE_COL: col});
        } else if (this.state.isWallNode) {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid});
        }
      }
    }
  }

  handleMouseUp(row, col) {
    if (!this.state.isRunning) {
      this.setState({mouseIsPressed: false});
      if (this.state.isStartNode) {
        const isStartNode = !this.state.isStartNode;
        this.setState({isStartNode, START_NODE_ROW: row, START_NODE_COL: col});
      } else if (this.state.isFinishNode) {
        const isFinishNode = !this.state.isFinishNode;
        this.setState({
          isFinishNode,
          FINISH_NODE_ROW: row,
          FINISH_NODE_COL: col,
        });
      }
      this.getInitialGrid();
    }
  }

  handleMouseLeave() {
    if (this.state.isStartNode) {
      const isStartNode = !this.state.isStartNode;
      this.setState({isStartNode, mouseIsPressed: false});
    } else if (this.state.isFinishNode) {
      const isFinishNode = !this.state.isFinishNode;
      this.setState({isFinishNode, mouseIsPressed: false});
    } else if (this.state.isWallNode) {
      const isWallNode = !this.state.isWallNode;
      this.setState({isWallNode, mouseIsPressed: false});
      this.getInitialGrid();
    }
  }

  clearWalls() {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (nodeClassName === 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
            node.isWall = false;
          }
        }
      }
    }
  }

  visualize() {
    if (!this.state.isRunning) {
      this.toggleIsRunning();
      const {grid} = this.state;
      const startNode =
        grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode =
        grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
      dijkstra(grid, startNode, finishNode);
       
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push('end');
      this.animateShortestPath(nodesInShortestPathOrder);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === 'end') {
        setTimeout(() => {
          this.toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`,
          ).className;
          if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish'
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }
        }, i * 40);
      }
    }
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <div>
        <table
          className="grid-container"
          onMouseLeave={() => this.handleMouseLeave()}>
          <tbody className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp(row, col)}
                        row={row}></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.visualize()}>
            Dijkstra's
          </button>
        </div>
      </div>
    );
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!node.isStart && !node.isFinish && node.isNode) {
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
