import React, { useState } from 'react';
import ViewStatus from '../constant/ViewStatus';
import { CheckOutlined, FolderViewOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';

export default function View() {
  const [selectedView, setSelectedView] = useState('0'); // Lưu trạng thái view được chọn
  const handleViewClick = ({ key }) => {
    setSelectedView(key); // Cập nhật trạng thái view được chọn
    console.log(`Selected view: ${key}`);
  };

  const ViewList = {
    items: ViewStatus.map((item) => ({
      ...item,
      onClick: handleViewClick,
      label: (
        <span>
          {item.label}
          {selectedView === item.key && (
            <span style={{ marginLeft: 5 }}>
              <CheckOutlined />{' '}
            </span>
          )}
        </span>
      ),
    })),
  };

  return (
    <Dropdown menu={ViewList} trigger={['click']}>
      <Button type="primary" icon={<FolderViewOutlined />} style={{ marginLeft: 5 }}>
        View
      </Button>
    </Dropdown>
  );
}
