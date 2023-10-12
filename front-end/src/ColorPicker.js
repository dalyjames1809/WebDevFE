import React, { useState } from 'react';

function ColorPicker({ onChange }) {
  const [color, setColor] = useState('');

  const handleInputChange = (e) => {
    setColor(e.target.value);
  }

  const handleSubmit = () => {
    if (color) {
      onChange(color);
    }
  }

  return (
    <div className="color-picker">
      <input
        type="color"
        value={color}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>  ENTER</button>
    </div>
  );
}

export default ColorPicker;
