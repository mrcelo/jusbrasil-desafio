/**
 * Created by Marcelo on 7/29/16.
 */

import React from 'react';
import Highlighter from 'react-highlight-words';

const EntityRow = ( { entity, term } ) => {

    return (
        <li><Highlighter searchWords={term.split(' ')}
                         textToHighlight={entity.title}
                         highlightClassName={"highlight"}
        /> <span
            className="type">{entity.entitytype}</span></li>
    );

}

export default EntityRow;