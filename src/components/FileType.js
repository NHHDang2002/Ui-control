import React, { useState } from 'react';
import { Select } from 'antd';
import AllType from '../constant/AllFileType';

export default function FileType() {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (value) => {
    //console.log('Selected values:', value);
    setSelectedValues(value); // Cập nhật giá trị đã chọn
  };
  return (
    <div className="file-type">
      <Select
        mode="multiple"
        style={{ width: 100 }}
        placeholder="Select file types"
        value={selectedValues}
        onChange={handleChange}
        options={AllType.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
      />
    </div>
  );
}
