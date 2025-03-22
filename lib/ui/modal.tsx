import React from 'react';

export default function Modal({ display }: { display: boolean }) {
  return (
    <div
      style={{ display: display ? 'block' : 'none' }}
      data-testid="columns-modal"
    >
      <h2>Columns</h2>
    </div>
  );
}
