import React, { Component } from 'react'
import './Board.css'
import { choice } from './Helpers'
import Cell from './Cell.js'

class Board extends Component {
    static defaultProps = {
        colors: ['#263238', '#00bcd4'],
        nbRows: 5,
        nbColumns: 5
    }
    constructor(props) {
        super(props);
        this.changeColor = this.changeColor.bind(this)
        this.getNewColor = this.getNewColor.bind(this)
        this.createBoard = this.createBoard.bind(this)
        this.state = {
            items: this.createBoard(this.props.nbRows, this.props.nbColumns),
            isWinner: false
        }
    }
    //create onload random board
    createBoard(nbRows, nbColumns) {
        let board = Array(nbRows).fill(null).map(() => Array(nbColumns))
        for (let i = 0; i < nbRows; i++) {
            for (let j = 0; j < nbColumns; j++) {
                board[i][j] = {
                    color: choice(this.props.colors)
                }
            }
        }
        return board
    }
    //get the new color when changing the cell color
    getNewColor(color) {
        let newColor
        do {
            newColor = choice(this.props.colors)
        } while (newColor === color)
        return newColor
    }
    //change the cell color, called by the cell child
    changeColor(key) {
        //get the cell coordinates
        let [lineIndex, columnIndex] = key.split("-").map(Number)
        //update the children by flipping the color of the clicked cell and its neighbors
        let items = this.state.items
        for (let i = 0; i < this.props.nbRows; i++) {
            for (let j = 0; j < this.props.nbColumns; j++) {

                if ((i == lineIndex && j == columnIndex) || (i == lineIndex - 1 && j == columnIndex) || (i == lineIndex + 1 && j == columnIndex) || (i == lineIndex && j == columnIndex + 1) || (i == lineIndex && j == columnIndex - 1)) {
                    items[i][j] = { color: this.getNewColor(items[i][j].color) }
                }
            }
        }
        //check if winner to set state
        let equal = true;
        for (let i = 0; i < this.props.nbRows; i++) {
            for (let j = 0; j < this.props.nbColumns; j++) {
                if (items[i][j].color != items[0][0].color) {
                    equal = false;
                    break;
                }
            }
        }
        if (equal) {
            this.setState(st => ({
                isWinner: true
            }));
        }
        //set new state with new children
        this.setState(st => ({
            items: items
        }));
    }
    render() {
        if (this.state.isWinner) {
            return (
                <div className="Board-title">
                    <div className="winner">
                        <span className="neon">You </span>
                        <span className="flux">Win! </span>
                    </div>
                </div>
            )
        }
        return (
            <div className='Game'>
                <div className="Board-title">
                    <span className="neon">Lights </span>
                    <span className="flux">Out </span>
                </div>
                <table className='Board'>
                    <tbody>
                        {this.state.items.map((r, rowIndex) => <tr>
                            {r.map((t, colIndex) => <td><Cell changeColor={this.changeColor} color={t.color} key={`${rowIndex}-${colIndex}`} /></td>)}</tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Board