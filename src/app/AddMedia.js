import React, { useState } from 'react';
import { Button, message, Upload, Form, Input, Dropdown, List, Checkbox } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function AddMedia({ onSelectedFilesChange }) {
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://api.synck.io.vn/api/uploads',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        const response = info.file.response;
        if (response?.data?.fileAttributes && response.data.fileAttributes.length > 0) {
          const fileInfo = response.data.fileAttributes[0];
          setUploadedFiles((prevFiles) => [
            ...prevFiles,
            { name: fileInfo.originalname, url: fileInfo.source },
          ]);
          message.success(`${info.file.name} file uploaded successfully.`);
        } else {
          message.error('Failed to retrieve file URL from server response.');
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const [form] = Form.useForm();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [newLink, setNewLink] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddLink = () => {
    if (newLink.trim() && isValidURL(newLink)) {
      setUploadedFiles((prevFiles) => [...prevFiles, { name: `Link: ${newLink}`, url: newLink }]);
      setNewLink('');
      message.success('Link added successfully!');
      setDropdownVisible(false);
    } else {
      message.error('Please enter a valid URL.');
    }
  };

  const handleCheckboxChange = (file, checked) => {
    if (checked) {
      setSelectedFiles((prevSelected) => [...prevSelected, file]);
    } else {
      setSelectedFiles((prevSelected) =>
        prevSelected.filter((selectedFile) => selectedFile.url !== file.url),
      );
    }
    onSelectedFilesChange(selectedFiles);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const formatFileName = (fileName) => {
    if (fileName.length > 20) {
      return fileName.slice(0, 20) + '...';
    }
    return fileName;
  };

  const getFileExtension = (fileName) => {
    const extension = fileName.split('.').pop().toUpperCase(); // Lấy phần mở rộng (jpg, png, ...)
    return extension;
  };

  const urls = [
    {
      key: '1',
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Form form={form} layout="vertical">
            <Form.Item label="File URL" name="fileUrl">
              <Input
                placeholder="Enter file URL"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
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
      <Dragger {...props} showUploadList={false} style={{ zIndex: 1, position: 'relative' }}>
        <p className="ant-upload-hint">Drag and drop Images, videos, 3D models and file</p>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -95%)',
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
            placement="bottom"
          >
            <Button type="link" onClick={handleDropdownClick}>
              Add from URL
            </Button>
          </Dropdown>
        </div>
      </Dragger>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 5,
          xxl: 3,
        }}
        dataSource={uploadedFiles}
        renderItem={(file) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                file.url ? (
                  <div style={{ position: 'relative', width: 200, height: 200 }}>
                    <Checkbox
                      style={{
                        position: 'absolute',
                        top: 4,
                        left: 6,
                        zIndex: 2,
                      }}
                      onChange={(e) => handleCheckboxChange(file, e.target.checked)}
                    />
                    <div className="cursor-pointer" style={{ width: 100, height: 100 }}>
                      <img
                        src={file.url}
                        alt={file.name}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          border: '5px solid white',
                          borderRadius: '4px',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <InboxOutlined style={{ fontSize: 24 }} />
                )
              }
              title={
                <div
                  style={{
                    position: 'absolute',
                    top: 100,
                    left: 0,
                  }}
                >
                  <div style={{ fontSize: '12px '}}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {formatFileName(file.name)}
                  </a>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', textAlign: 'center' }}>
                {getFileExtension(file.name)} {/* Hiển thị định dạng file */}
              </div>
                </div>
                
              }
            />
          </List.Item>
        )}
        style={{ marginTop: 16 }}
      />
    </div>
  );
}
