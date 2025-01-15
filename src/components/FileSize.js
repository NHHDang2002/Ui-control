import React, { useState } from 'react';
import { Button, Dropdown, Form, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function FileSize() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false); // State để kiểm soát sự hiển thị của dropdown

  const handleClear = () => {
    form.resetFields();
  };

  const items = [
    {
      key: '1',
      label: (
        <Form form={form} layout="vertical" style={{ padding: 16, minWidth: 250 }}>
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
      ),
    },
  ];

  return (
    <div className="file-size">
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomLeft"
        open={visible}
        onOpenChange={(newVisible) => setVisible(newVisible)} // Cập nhật state khi dropdown mở hoặc đóng
      >
        <Button>
          File size <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
