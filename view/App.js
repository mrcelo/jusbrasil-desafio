/**
 * Created by Marcelo on 7/19/16.
 */

import React from 'react';

class App extends React.Component {

    constructor() {
        super()
        this.state  = { txt: '' }
        this.update = this.update.bind(this)
    }

    update( e ) {
        this.setState({ txt: e.target.value })
    }

    render() {
        return (
            <div className="container">
                <Widget txt={this.state.txt} update={this.update}/>
            </div>
        );
    }
}

class Slider extends React.Component {
    render() {
        return (
            <input type="range" min="0" max="255" onChange={this.props.update}/>
        )
    }
}

const Widget = ( props ) => {
    return (
        <div>
            <input type="text" onChange={props.update}/>
            <h1>{props.txt}</h1>
        </div>
    )
}

export default App