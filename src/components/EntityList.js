/**
 * Created by Marcelo on 7/29/16.
 */

import React from 'react';

import EntityRow from './EntityRow';
import EntityListHeader from './EntityListHeader';

class EntityList extends React.Component {

    constructor( props ) {
        super(props);

    }

    render() {

        const results = this.props.result.map(( entity ) => {

            return (
                <EntityRow key={entity._id}
                           entity={entity._source}
                           term={this.props.term}/>
            );
        });

        return (
            <div className="entitylist">
                <EntityListHeader searching={this.props.searching}
                                  resultsCount={results.length}
                                  term={this.props.term}/>
                <ul>{results}</ul>
            </div>
        );

    }

}

export default EntityList;
