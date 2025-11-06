
import React from 'react';

interface CameraIconProps {
  isSelected: boolean;
}

export const MD15342X1Camera: React.FC<CameraIconProps> = ({ isSelected }) => {
  const railColor = '#d8e2dc';
  const sensorColor = '#c0ccc4';
  const magnetRed = '#ff0000';
  const magnetBlue = '#0000ff';

  return (
    <svg viewBox="-85 -85 170 170" width="100%" height="100%">
      <title>MD15342X1 Schematic</title>
      <g transform="translate(0, -65)">
        <rect x="-45" y="8" width="90" height="4" fill={railColor} />
        <rect x="-40" y="9" width="5" height="2" fill="#ADC1B2" />
        <rect x="35" y="9" width="5" height="2" fill="#ADC1B2" />
        <rect x="-40" y="-2" width="80" height="5" fill={magnetRed} />
        <rect x="-40" y="3" width="80" height="5" fill={magnetBlue} />
        <rect x="-5" y="-10" width="10" height="6" fill={sensorColor} />
      </g>
      <g transform="translate(-70, 10)">
          <rect x="8" y="-45" width="4" height="90" fill={railColor} />
          <rect x="9" y="-40" width="2" height="5" fill="#ADC1B2" />
          <rect x="9" y="35" width="2" height="5" fill="#ADC1B2" />
          <rect x="-2" y="-40" width="5" height="80" fill={magnetRed} />
          <rect x="3" y="-40" width="5" height="80" fill={magnetBlue} />
          <rect x="-10" y="-5" width="6" height="10" fill={sensorColor} />
      </g>
      <g transform="translate(70, 10)">
          <rect x="-12" y="-55" width="4" height="110" fill={railColor} />
          <rect x="8" y="-65" width="4" height="130" fill={railColor} />
          <rect x="-7" y="-50" width="5" height="100" fill={magnetBlue} />
          <rect x="-2" y="-50" width="5" height="100" fill={magnetRed} />
          <rect x="1" y="40" width="4" height="10" fill={sensorColor} />
      </g>
    </svg>
  );
};

export const WLF01Camera: React.FC<CameraIconProps> = ({ isSelected }) => {
  const magnetColor = '#e5e9e3';
  const sensorColor = '#000000'; // Changed to black

  return (
      <svg viewBox="-65 -65 130 130" width="100%" height="100%">
        <title>WLF01 Schematic</title>
        <rect x="-41" y="-50" width="82" height="6.4" fill={magnetColor} />
        <rect x="-41" y="43.6" width="82" height="6.4" fill={magnetColor} />
        <rect x="-50" y="-41" width="6.4" height="82" fill={magnetColor} />
        <rect x="43.6" y="-41" width="6.4" height="82" fill={magnetColor} />
        {/* Sensor on the left magnet, moved closer to the top edge */}
        <rect x="-49" y="-36" width="4" height="12" fill={sensorColor} rx="1" />
        {/* Sensor on the bottom magnet, moved closer to the right edge */}
        <rect x="24" y="45" width="12" height="4" fill={sensorColor} rx="1" />
      </svg>
  );
};
