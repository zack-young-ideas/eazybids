import { useState, useEffect } from 'react';
import Head from 'next/head';
import Table from '../lib/ui/table';

export default function Home() {
  const [assignments, setAssignments] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);

  useEffect(() => {
    fetch('/api/assignments')
      .then((response) => response.json())
      .then((object) => {
        setAssignments(object.assignments);
      });
  }, []);

  const changeModal = () => {
    setModalDisplay(!modalDisplay);
  }

  return (
    <div>
      <Head>
        <title>EazyBids</title>
      </Head>

      <div
        style={{ display: modalDisplay ? 'block' : 'none' }}
        data-testid="columns-modal"
      >
      </div>

      <button onClick={changeModal}>Columns</button>

      <Table assignments={assignments} />
    </div>
  );
}
