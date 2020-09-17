import React from 'react';
import ReactDOM from 'react-dom';

function CowEntry({cow, handleUpdate}) {
  return (
    <div className="modal">
      <p>Name</p>
      <input type="text" value={cow.name} onChange={(e)=>{handleUpdate(e, 'name')}}/>
      <p>Description</p>
      <textarea value={cow.description} onChange={(e)=>{handleUpdate(e, 'description')}}/>
    </div>
  );
}

export default CowEntry;
