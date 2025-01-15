import React, { useState } from 'react';
import { Button, message, Upload, Form, Input, Dropdown } from 'antd';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'api.synck.io.vn/api/a/uploads',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function AddMedia() {
  const [form] = Form.useForm();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [links, setLinks] = useState([]);

  const handleAddLink = () => {
    if (newLink.trim()) {
      setLinks([...links, newLink]);
      setNewLink('');
      message.success('Link added successfully!');
      setDropdownVisible(false); // Đóng dropdown
    } else {
      message.error('Please enter a valid link.');
    }
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    //setDropdownVisible(!dropdownVisible);
  };

  const urls = [
    {
      key: '1',
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Form form={form} layout="vertical">
            <Form.Item label="File URL" name="fileUrl">
              <Input placeholder="Enter file URL" />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" onClick={handleAddLink}>
                Add
              </Button>
            </div>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Dragger {...props} style={{ zIndex: 1, position: 'relative' }}>
        <p className="ant-upload-hint">Drag and drop Images, videos, 3D models and file</p>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -110%)',
            display: 'flex',
            gap: '4px',
          }}
        >
          <Button type="primary">Add Media</Button>
          <Dropdown
            menu={{ items: urls }}
            trigger={['click']}
            open={dropdownVisible}
            onOpenChange={setDropdownVisible}
            placement="bottomCenter"
          >
            <Button type="link" onClick={handleDropdownClick}>
              Add from URL
            </Button>
          </Dropdown>
        </div>
      </Dragger>
    </div>
  );
}
