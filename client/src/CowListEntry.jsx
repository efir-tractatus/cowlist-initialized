import React from 'react';

var CowListEntry = ({cow, handleSelect}) => {
    return(
    <div className='cow-list-entry'
    onClick = {() => {handleSelect(cow.id)}}
    >{cow.name}
    </div>
    )
}

export default CowListEntry;