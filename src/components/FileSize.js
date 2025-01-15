import React from 'react';
import { Button, Dropdown, Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function FileSize() {
  const [form] = Form.useForm();

  const handleClear = () => {
    form.resetFields();
  };

  const items = [
    {
      key: '1',
      label: (
        <div
          onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click từ dropdown
        >
          <Form form={form} layout="vertical">
            <Form.Item label="Min size (MB)" name="minSize">
              <Input placeholder="Enter min size" />
            </Form.Item>
            <Form.Item label="Max size (MB)" name="maxSize">
              <Input placeholder="Enter max size" />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="link" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="file-size">
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomLeft">
        <Button>
          File size <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
