import React, { useState, useEffect } from 'react';
import { Button, message, Upload, Form, Input, Dropdown, List, Checkbox, Spin } from 'antd';
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
  const [visibleFiles, setVisibleFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setVisibleFiles(uploadedFiles.slice(0, 10));
      setLoading(false);
    }, 500);
  }, [uploadedFiles]);

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
    setSelectedFiles((prevSelected) => {
      const updatedSelectedFiles = checked
        ? [...prevSelected, file]
        : prevSelected.filter((selectedFile) => selectedFile.url !== file.url);
      onSelectedFilesChange(updatedSelectedFiles);
      return updatedSelectedFiles;
    });
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const formatFileName = (fileName) => {
    if (fileName.length > 20) {
      return fileName.slice(0, 20) + '...';
    }
    return fileName;
  };

  // const getFileExtension = (fileName) => {
  //   const extension = fileName.split('.').pop().toUpperCase();
  //   return extension;
  // };

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {loading ? (
            <Spin style={{ display: 'block', textAlign: 'center', marginTop: 20 }} />
          ) : (
            <div>
              <Button type="primary">Add Media</Button>
            </div>
          )}
          <Dropdown
            menu={{ items: urls }}
            trigger={['click']}
            open={dropdownVisible}
            onOpenChange={(visible) => setDropdownVisible(visible)}
            placement="bottom"
          >
            <div>
              <Button type="link" onClick={handleDropdownClick}>
                Add from URL
              </Button>
            </div>
          </Dropdown>
        </div>
        <div>
          <p className="ant-upload-hint">Drag and drop Images, videos, 3D models and file</p>
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
          xxl: 6,
        }}
        dataSource={visibleFiles}
        renderItem={(file) => (
          <List.Item>
            <div
              className="file-item"
              style={{
                position: 'relative',
                hover: 'gray',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                className="checkbox-container"
                style={{ position: 'absolute', top: 5, left: 13, zIndex: 2 }}
              >
                <Checkbox
                  checked={selectedFiles.some((selectedFile) => selectedFile.url === file.url)}
                  onChange={(e) => handleCheckboxChange(file, e.target.checked)}
                />
              </div>

              {file.url ? (
                <img
                  src={file.url}
                  alt={file.name}
                  style={{
                    width: 'calc(100% - 10px)',
                    height: 'calc(150px - 17px)',
                    objectFit: 'cover',
                    border: '5px solid white',
                    borderRadius: '4px',
                    marginLeft: '5px',
                    cursor: 'pointer',
                    zIndex: '1',
                  }}
                  onClick={() => {
                    const isChecked = selectedFiles.some(
                      (selectedFile) => selectedFile.url === file.url,
                    );
                    handleCheckboxChange(file, !isChecked); // Thay đổi trạng thái checkbox khi click vào hình ảnh
                  }}
                />
                
              ) : (
                <InboxOutlined style={{ fontSize: 24 }} />
              )}
              <div className="file-info" style={{ textAlign: 'center' }}>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="file-name">
                  {formatFileName(file.name)}
                </a>
                <div
                  className="file-extension"
                  style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}
                >
                  {/* {getFileExtension(file.name)} */}
                </div>
              </div>
            </div>
          </List.Item>
        )}
        style={{ marginTop: 16 }}
      />
    </div>
  );
}
