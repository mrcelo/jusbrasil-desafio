/**
 * Created by Marcelo on 7/29/16.
 */

import React from 'react';

class SearchBar extends React.Component {

    constructor( props ) {
        super(props);

        this.state = { term: '' };
    }

    render() {
        return (

            <span className="input input--makiko">

                <input className="input__field input__field--makiko searchTerm"
                       type="text"
                       id="input"
                       value={this.state.term}
                       onChange={ event => this.onInputChange(event.target.value) }

                />

                <label className="input__label input__label--makiko" htmlFor="input">
                    <span className="input__label-content input__label-content--makiko">Search</span>
                </label>

            </span>

        );
    }

    onInputChange( term ) {

        // these characters at the beginning of string can crash the runtime
        if ( (term[ 0 ] != "$") && (term[ 0 ] != "^") && (term.indexOf('*') == -1) ) {
            this.setState({ term });
            this.props.onSearchTermChange(term);
        } else {
            console.log("Nah ah ah");
        }


    }

}

export default SearchBar;