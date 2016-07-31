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
            entities:  [],
            term:      '',
            searching: false
        };

    }


    // on startup, populate the List
    componentDidMount() {
        this.setState({
            searching: true
        });
        this.serverRequest = $.ajax({
            type:        "GET",
            url:         "https://searchngin.herokuapp.com/entities/",
            contentType: "application/json; charset=utf-8",
            data:        { "q": this.state.term },
            cache:       true,
            success:     function ( data ) {

                let results = [];
                data.hits.map(hit=>results.push(hit));

                console.log(results);

                this.setState({
                    entities:  results,
                    searching: false
                })

            }.bind(this)
        });

    }


    componentWillUnmount() {
        // this should prevent hangups on moveaway
        this.serverRequest.abort();

    }

    // fetch a new term query
    search( term ) {
        $.ajax({
            type:        "GET",
            url:         "https://searchngin.herokuapp.com/entities/",
            contentType: "application/json; charset=utf-8",
            data:        { "q": term },
            cache:       true,
            success:     function ( data ) {

                let results = [];
                data.hits.map(hit=>results.push(hit));

                this.setState({
                    entities: results
                })

            }.bind(this)
        });
        this.setState({
            term
        });

    }

    render() {
        return (
            <div>
                <h1>Searchngin</h1>
                <SearchBar onSearchTermChange={this.search.bind(this)}/>
                <EntityList result={this.state.entities}
                            term={this.state.term}
                            searching={this.state.searching}/>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.querySelector('.container'));