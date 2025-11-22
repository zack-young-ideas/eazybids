import { useState, useEffect } from 'react';
import Head from 'next/head';
import TopButtons from '@/lib/ui/topButtons';
import Table from '@/lib/ui/table';
import Modal from '@/lib/ui/modal';
import initialColumns from '@/lib/columns';

export default function Home() {
  const [assignments, setAssignments] = useState([]);
  const [modalContent, setModalContent] = useState('filters');
  const [modalDisplay, setModalDisplay] = useState(false);
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    fetch('/api/assignments')
      .then((response) => response.json())
      .then((object) => {
        setAssignments(object.assignments);
      });
  }, []);

  const showModal = () => {
    setModalDisplay(true);
  }

  const hideModal = () => {
    setModalDisplay(false);
  }

  const displayModalContent = (content) => {
    setModalContent(content);
    showModal();
  }

  return (
    <div>
      <Head>
        <title>EazyBids</title>
      </Head>

      <Modal
        modalContent={modalContent}
        modalDisplay={modalDisplay}
        hideModal={hideModal}
        columns={columns}
        setColumns={setColumns}
      />

      <TopButtons displayModalContent={displayModalContent} />

      <Table assignments={assignments} columns={columns} />
    </div>
  );
}
