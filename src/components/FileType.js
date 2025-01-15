import React, { useState } from 'react';
import { Dropdown, Button, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AllType from '../constant/AllFileType';

export default function FileType() {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const FileTypeList = {
    items: AllType.map((item) => ({
      ...item,
      label: (
        <span>
          <Checkbox onChange={onChange}>{item.label}</Checkbox>
        </span>
      ),
    })),
  };
  return (
    <Dropdown menu={FileTypeList} trigger={['click']} placement="bottomLeft">
      <Button>
        FileType <DownOutlined />
      </Button>
    </Dropdown>
  );
}
