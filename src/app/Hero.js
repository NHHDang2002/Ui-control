import React from 'react';
import SearchFile from '../components/SearchFile';
import View from '../components/View';
import Sort from '../components/Sort';

export default function Hero() {
  return (
    <div className="hero">
      <SearchFile />
      <div className="hero-right">
        <View />
        <Sort />
      </div>
    </div>
  );
}
