import React, { useState } from 'react';
import SortStatus from '../constant/SortStatus';
import { Radio, Dropdown, Button } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';

export default function Sort() {
  const [selectedSort, setSelectedSort] = useState('0');

  const handleSortClick = ({ key }) => {
    setSelectedSort(key);
    console.log(`Selected sort: ${key}`);
  };

  const SortList = {
    items: SortStatus.map((item) => ({
      ...item,
      onClick: handleSortClick,
      label: (
        <span>
          <Radio
            checked={selectedSort === item.key}
            onClick={() => handleSortClick({ key: item.key })} // Cập nhật trạng thái khi radio được click
          >
            {item.label}
          </Radio>
        </span>
      ),
    })),
  };

  return (
    <Dropdown menu={SortList} trigger={['click']}>
      <Button type="primary" icon={<SortAscendingOutlined />} style={{ marginLeft: 5 }}>
        Sort
      </Button>
    </Dropdown>
  );
}
