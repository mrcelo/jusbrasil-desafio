/**
 * Created by Marcelo on 7/30/16.
 */
import React from 'react';

const EntityListHeader = ( { searching, resultsCount, term } ) => {

    if ( searching ) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
    else if ( resultsCount == 0 ) {
        return (
            <div>
                <h3>No results found for "{term}"</h3>
            </div>
        )
    }
    else if ( term == '' ) {

        return (
            <div>
                <h3>Showing all entities</h3>
            </div>
        )
    }

    else {

        return (
            <div>
                <h3>Showing <strong>{resultsCount}</strong> {resultsCount == 1 ? "result" : "results"} for {term}</h3>
            </div>
        );
    }

}

export default EntityListHeader;