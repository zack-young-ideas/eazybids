import { useState, useEffect } from 'react';
import Head from 'next/head';
import TopButtons from '@/lib/ui/topButtons';
import Table from '@/lib/ui/table';
import Modal from '@/lib/ui/modal';
import initialColumns from '@/lib/columns';
import sorts from '@/lib/commands/sorts.ts';

export default function Home() {
  const [assignments, setAssignments] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [modalContent, setModalContent] = useState('filters');
  const [modalDisplay, setModalDisplay] = useState(false);
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    fetch('/api/assignments')
      .then((response) => response.json())
      .then((object) => {
        setAssignments(object.assignments);
        setCurrentList(object.assignments);
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

  const applyCommand = (commandType, commandArgs) => {
    switch (commandType) {
      case 'sort':
        const sortClass = sorts[commandArgs.selectedSort]._class;
        const sortObject = new sortClass(commandArgs.sortDirection);
        setCurrentList(sortObject.updateList(currentList));
        break;
    }
  }

  return (
    <div>
      <Head>
        <title>EazyBids</title>
      </Head>

      <Modal
        applyCommand={applyCommand}
        modalContent={modalContent}
        modalDisplay={modalDisplay}
        hideModal={hideModal}
        columns={columns}
        setColumns={setColumns}
      />

      <TopButtons displayModalContent={displayModalContent} />

      <Table assignments={currentList} columns={columns} />
    </div>
  );
}
