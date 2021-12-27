import React, {Component} from "react";
import './Cell.css'

class Cell extends Component {
    constructor(props) {
        super(props);
        this.handleChangeColor = this.handleChangeColor.bind(this)
    }
    handleChangeColor(evt) {
        this.props.changeColor(this._reactInternals.key)
    }
    render() {

        return (
            <div className='Cell' style={{ backgroundColor: this.props.color }} onClick={this.handleChangeColor}></div>
        );
    }
}

export default Cell;