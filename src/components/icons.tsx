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
    <div
      style={{
        width: '120px',
        height: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: isSelected ? 'drop-shadow(0 0 8px rgba(0, 220, 220, 0.9))' : 'none',
        transition: 'filter 0.3s ease',
      }}
    >
      {/* Increased viewBox to give more space */}
      <svg viewBox="-85 -85 170 170" width="100%" height="100%">
        <title>MD15342X1 Schematic</title>
        
        {/* Top Assembly - moved further up */}
        <g transform="translate(0, -65)">
          <rect x="-45" y="8" width="90" height="4" fill={railColor} /> {/* Main Rail */}
          <rect x="-40" y="9" width="5" height="2" fill="#ADC1B2" /> {/* Notch detail */}
          <rect x="35" y="9" width="5" height="2" fill="#ADC1B2" /> {/* Notch detail */}
          <rect x="-40" y="-2" width="80" height="5" fill={magnetRed} />
          <rect x="-40" y="3" width="80" height="5" fill={magnetBlue} />
          <rect x="-5" y="-10" width="10" height="6" fill={sensorColor} />
        </g>

        {/* Left Assembly (as viewed from center) - moved further left and down */}
        <g transform="translate(-70, 10)">
           <rect x="8" y="-45" width="4" height="90" fill={railColor} /> {/* Main Rail */}
           <rect x="9" y="-40" width="2" height="5" fill="#ADC1B2" /> {/* Notch detail */}
           <rect x="9" y="35" width="2" height="5" fill="#ADC1B2" /> {/* Notch detail */}
           <rect x="-2" y="-40" width="5" height="80" fill={magnetRed} />
           <rect x="3" y="-40" width="5" height="80" fill={magnetBlue} />
           <rect x="-10" y="-5" width="6" height="10" fill={sensorColor} />
        </g>
        
        {/* Right Assembly (as viewed from center) - moved further right and down */}
        <g transform="translate(70, 10)">
           {/* Main Rail (left yoke) - made longer */}
           <rect x="-12" y="-55" width="4" height="110" fill={railColor} />
           {/* Second Rail (right yoke) - made longer */}
           <rect x="8" y="-65" width="4" height="130" fill={railColor} />
           {/* Magnets - made longer and repositioned to prevent overlap */}
           <rect x="-7" y="-50" width="5" height="100" fill={magnetBlue} />
           <rect x="-2" y="-50" width="5" height="100" fill={magnetRed} />
           {/* Sensor - repositioned within the longer assembly */}
           <rect x="1" y="40" width="4" height="10" fill={sensorColor} />
        </g>
      </svg>
    </div>
  );
};

export const WLF01Camera: React.FC<CameraIconProps> = ({ isSelected }) => {
  // Colors sampled from the reference image, with yokes being near-white as requested.
  const magnetColor = '#e5e9e3'; // Very light off-white/green
  const sensorColor = '#8f9e8b'; // Darker green for sensors
  
  // Real-world dimensions for scaling
  const MD15342X1_WIDTH_MM = 14.81;
  const WLF01_WIDTH_MM = 10.96;

  // SVG content dimensions (approximate)
  const MD15342X1_SVG_WIDTH = 162;
  const MD15342X1_VIEWBOX_WIDTH = 170;
  // The new WLF01 is a 100x100 graphic (plus sensor overhang)
  const WLF01_SVG_WIDTH = 100; 
  const WLF01_VIEWBOX_WIDTH = 130;

  // Calculate apparent size ratio to determine scale factor
  const md15342x1_apparent_ratio = MD15342X1_SVG_WIDTH / MD15342X1_VIEWBOX_WIDTH;
  const wlf01_apparent_ratio = WLF01_SVG_WIDTH / WLF01_VIEWBOX_WIDTH;
  const real_size_ratio = WLF01_WIDTH_MM / MD15342X1_WIDTH_MM;
  
  const current_apparent_size_ratio = (wlf01_apparent_ratio / md15342x1_apparent_ratio);
  const scale_factor = real_size_ratio / current_apparent_size_ratio;


  return (
    <div
      style={{
        width: '120px',
        height: '120px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: isSelected ? 'drop-shadow(0 0 8px rgba(0, 220, 220, 0.9))' : 'none',
        transition: 'filter 0.3s ease',
      }}
    >
      <svg viewBox="-65 -65 130 130" width="100%" height="100%">
        <title>WLF01 Schematic</title>
        <g transform={`scale(${scale_factor.toFixed(2)})`}>
          <g>
            {/* Magnets - made thinner based on 0.64mm thickness to prevent overlap */}
            {/* Top Magnet */}
            <rect x="-37.5" y="-50" width="75" height="6" fill={magnetColor} />
            {/* Bottom Magnet */}
            <rect x="-37.5" y="44" width="75" height="6" fill={magnetColor} />
            {/* Left Magnet */}
            <rect x="-50" y="-37.5" width="6" height="75" fill={magnetColor} />
            {/* Right Magnet */}
            <rect x="44" y="-37.5" width="6" height="75" fill={magnetColor} />

            {/* Hall Sensors - shortened and positioned so they don't extend past magnets */}
            {/* Left Sensor */}
            <rect x="-49" y="-30" width="4" height="12" fill={sensorColor} rx="1" />
            {/* Bottom Sensor */}
            <rect x="25" y="45" width="12" height="4" fill={sensorColor} rx="1" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const GenericWideCamera: React.FC<CameraIconProps> = ({ isSelected }) => {
  const bgColor = '#3b4252';
  const selectedStrokeColor = '#88c0d0';
  const unselectedStrokeColor = '#4c566a';
  const selectedTextColor = '#e5e9f0';
  const unselectedTextColor = '#d8dee9';

  const textColor = isSelected ? selectedTextColor : unselectedTextColor;
  const strokeColor = isSelected ? selectedStrokeColor : unselectedStrokeColor;
  const strokeWidth = isSelected ? 4 : 2;
  const padding = strokeWidth / 2;

  return (
    <svg 
      width="100" 
      height="58" 
      viewBox="0 0 100 58" 
      aria-labelledby="camera-title"
      role="img"
    >
      <title id="camera-title">Generic Wide Camera</title>
      <rect 
        x={padding}
        y={padding}
        width={100 - strokeWidth}
        height={58 - strokeWidth}
        rx="12" 
        fill={bgColor}
        stroke={strokeColor} 
        strokeWidth={strokeWidth}
      />
      <text 
        x="50" 
        y="25" 
        fontFamily="Inter, sans-serif" 
        fontSize="12" 
        fontWeight="600"
        fill={textColor} 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        Generic
      </text>
      <text 
        x="50" 
        y="40" 
        fontFamily="Inter, sans-serif" 
        fontSize="12" 
        fontWeight="600"
        fill={textColor} 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        Wide
      </text>
    </svg>
  );
};
