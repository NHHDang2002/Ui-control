import React from 'react';
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
        <div onClick={(e) => e.stopPropagation()}>
          <span>
            <Checkbox onChange={onChange}>{item.label}</Checkbox>
          </span>
        </div>
      ),
    })),
  };
  return (
    <Dropdown menu={FileTypeList} trigger={['click']} placement="bottomLeft">
      <Button>
        File Type <DownOutlined />
      </Button>
    </Dropdown>
  );
}
