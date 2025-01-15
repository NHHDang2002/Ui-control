import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchFile() {
  return (
    <div className="input-container">
      <Input placeholder="Search file" prefix={<SearchOutlined />} />
    </div>
  );
}
