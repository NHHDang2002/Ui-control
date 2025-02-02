import React, { useState } from 'react';
import Header from '../app/Header';
import FilterFile from '../app/FilterFile';
import { Button, Modal } from 'antd';
import AddMedia from '../app/AddMedia';

export default function ModalAddFile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log('Selected files:', selectedFiles);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal-add-file">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>

      <Modal
        style={{ top: 20 }}
        width="60%"
        title="Select file"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: selectedFiles.length === 0,
        }}
      >
        <Header />
        <FilterFile />
        <AddMedia onSelectedFilesChange={setSelectedFiles} />
      </Modal>
    </div>
  );
}
