import React from 'react';
import CowListEntry from './CowListEntry.jsx';

var CowList = ({ cows, handleSelect }) => {
  var renderCowList = cows.map((cow) => {
    return <CowListEntry cow={cow} key={cow.id} handleSelect={handleSelect} />;
  });

  return (
    <div className="cow-list">
      <ul>{renderCowList}</ul>
    </div>
  );
};

export default CowList;
