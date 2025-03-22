import React from 'react';

export default function Modal({
  display, changeDisplay,
}: {
  display: boolean, changeDisplay: Function
}) {
  return (
    <div
      style={{ display: display ? 'block' : 'none' }}
      data-testid="columns-modal"
    >
      <button onClick={changeDisplay}>X</button>
      <h2>Columns</h2>
    </div>
  );
}
