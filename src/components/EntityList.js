/**
 * Created by Marcelo on 7/29/16.
 */

import React from 'react';

import EntityRow from './EntityRow';

class EntityList extends React.Component {

    constructor( props ) {
        super(props);

    }

    render() {

        const results = this.props.result.map(( entity ) => {
            return (
                <EntityRow key={entity._id} entity={entity._source}/>
            );
        });

        return (
            <ol>
                {results}
            </ol>
        );
    }

}

export default EntityList;
