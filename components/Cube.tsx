import React, { useRef, useEffect, useState } from 'react';

interface CubeProps {
  cubeClass: string;
}

const Cube: React.FC<CubeProps> = ({ cubeClass }) => {
  const [imageCounter, setImageCounter] = useState(1);
  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];

  return (
    <div className={`cube ${cubeClass}`}>
      {faces.map((face, index) => {
        const imgNum = ((imageCounter + index - 1) % 6) + 1;
        return (
          <div key={face} className={face}>
            <img
              src={`/assets/img${imgNum}.jpg`}
              alt={`Cube Image ${imgNum}`}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cube;