/**
 * Created by Marcelo on 7/29/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import EntityList from './components/EntityList';

class App extends React.Component {

    constructor( props ) {
        super(props);

        this.state = {
            entities: [],
            term:     ''
        };

        // this.search = this.search.bind(this);
        const APIURL = "http://localhost:3000/entities/";

    }

    componentDidMount() {
        this.serverRequest = $.ajax({
            type:        "GET",
            url:         "http://localhost:3000/entities/",
            contentType: "application/json; charset=utf-8",
            data:        { "q": this.state.term },
            cache:       true,
            success:     function ( data ) {

                let results = [];
                data.hits.map(function ( hit ) {

                    results.push(hit);
                });

                console.log(results);

                this.setState({
                    entities: results
                })

            }.bind(this)
        });

    }

    componentWillUnmount() {
        this.serverRequest.abort();

    }

    search( term ) {
        // TODO - Search for term using elasticsearch client
        console.log("Input is now: " + term);

        $.ajax({
            type:        "GET",
            url:         "http://localhost:3000/entities/",
            contentType: "application/json; charset=utf-8",
            data:        { "q": term },
            cache:       true,
            success:     function ( data ) {

                let results = [];
                data.hits.map(function ( hit ) {

                    results.push(hit);
                });

                this.setState({
                    entities: results
                })

            }.bind(this)
        });

        this.setState({
            term: term
        });
    }

    render() {
        return (
            <div>

                <SearchBar onSearchTermChange={this.search.bind(this)}/>
                <EntityList result={this.state.entities}/>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.querySelector('.container'));