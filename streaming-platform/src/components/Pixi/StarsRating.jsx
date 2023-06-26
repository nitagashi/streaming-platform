import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Sprite, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';
import star from 'images/star2.png'

const StarsRating = ({ onChange }) => {
  const [x, setX] = useState(0);
  const size = 32;
  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0xffff0b, 0.2);
    g.drawRect(0, 0, size*5, size);
    g.endFill();
    g.beginFill(0xffff0b, 1);
    g.drawRect(0, 0, x, size);
    g.endFill();
  }, [x]);

  const handleChange = (value) => {
    setX(value);
    onChange(value/size);
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Sprite
          key={i}
          texture={PIXI.Texture.from(star)}
          width={size}
          height={size}
          x={i * size}
          interactive
          buttonMode
          click={() => handleChange(i * size + size)}
          mouseover={(e) => (e.currentTarget.cursor = 'pointer')}
          mouseout={(e) => (e.currentTarget.cursor = 'default')}
        />
      );
    }
    return stars;
  };
  return (
    <Stage width={size*5} height={size} options={{ backgroundAlpha: 0 }}>
      <Graphics draw={draw} />
      {renderStars()}
    </Stage>
  );
};

export default StarsRating;
