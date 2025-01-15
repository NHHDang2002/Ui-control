import React from 'react';
import FileType from '../components/FileType';
import FileSize from '../components/FileSize';

export default function FilterFile() {
  return (
    <div className="filter-file">
      <FileType />
      <FileSize />
    </div>
  );
}
