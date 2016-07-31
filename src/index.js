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

    componentDidMount() {
        this.setState({
            searching: true
        });
        this.serverRequest = $.ajax({
            type:        "GET",
            url:         "http://localhost:3000/entities/",
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
        this.serverRequest.abort();

    }

    search( term ) {
        // this.setState({
        //     searching: true
        // });
        $.ajax({
            type:        "GET",
            url:         "http://localhost:3000/entities/",
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
                <EntityList result={this.state.entities} term={this.state.term} searching={this.state.searching}/>
            </div>
        );
    }

}

ReactDOM.render(<App />, document.querySelector('.container'));