import React from 'react';
import ReactDOM from 'react-dom';

function CowEntry({ name, description, handleUpdate, handleDelete, handlePUT }) {
  return (
    <div className="modal">
      <p>Name</p>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          handleUpdate(e, 'updateCow_name');
        }}
      />
      <p>Description</p>
      <textarea
        value={description}
        onChange={(e) => {
          handleUpdate(e, 'updateCow_description');
        }}
      />
      <p></p>
      <button type="button" onClick={handlePUT}>
        Change
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default CowEntry;
