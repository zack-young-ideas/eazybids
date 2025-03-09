import { useState, useEffect } from 'react';
import Head from 'next/head';
import Table from '../lib/ui/table';

export default function Home() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('/api/assignments')
      .then((response) => response.json())
      .then((object) => {
        setAssignments(object.assignments);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>EazyBids</title>
      </Head>

      <Table assignments={assignments} />
    </div>
  );
}
