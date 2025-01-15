import './App.css';
import React, { useState } from 'react';
import Hero from './app/Hero';
import FilterFile from './app/FilterFile';
import { Button, Modal } from 'antd';
import AddMedia from './app/AddMedia';
import FileList from './app/FileList';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Hero />
            <FilterFile />
            <AddMedia />
            <FileList />
          </Modal>
        </>
      </header>
    </div>
  );
}

export default App;
