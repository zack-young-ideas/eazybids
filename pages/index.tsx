import { useState, useEffect } from 'react';
import Head from 'next/head';
import TopButtons from '@/lib/ui/topButtons';
import Table from '@/lib/ui/table';
import Modal from '@/lib/ui/modal';
import initialColumns from '@/lib/columns';
import sorts from '@/lib/commands/sorts';
import assignments from '@/lib/placeholder-data';
import { Assignment, CommandArguments } from '@/lib/definitions';

export default function Home() {
  const [currentList, setCurrentList] = useState<Assignment[]>([]);
  const [modalContent, setModalContent] = useState('filters');
  const [modalDisplay, setModalDisplay] = useState(false);
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEMO === 'true') {
      setTimeout(() => {
        setCurrentList(assignments.assignments);
      }, 2000);
    } else {
      fetch('/api/assignments')
        .then((response) => response.json())
        .then((object) => {
          setCurrentList(object.assignments);
        });
    }
  }, []);

  const showModal = () => {
    setModalDisplay(true);
  }

  const hideModal = () => {
    setModalDisplay(false);
  }

  const displayModalContent = (content: string) => {
    setModalContent(content);
    showModal();
  }

  const applyCommand = (
    commandType: string,
    commandArgs: CommandArguments
  ) => {
    switch (commandType) {
      case 'sort':
        if ((commandArgs.selectedSort !== null)
            && (commandArgs.sortDirection !== null)
        ) {
          const sortClass = sorts[
            commandArgs.selectedSort as (keyof typeof sorts)
          ]._class;
          const sortObject = new sortClass(commandArgs.sortDirection);
          setCurrentList(sortObject.updateList(currentList));
        }
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
