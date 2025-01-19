import React from 'react';

const ResolutionSelector = ({ resolution, handleResolutionChange }) => {
  const containerStyle = {
    marginTop: '20px',
    padding: '16px',
    maxWidth: '300px',
  };

  const labelContainerStyle = {
    position: 'relative',
    display: 'block',
  };

  const labelTextStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  };

  const selectStyle = {
    width: '100%',
    padding: '10px 32px 10px 12px',
    fontSize: '14px',
    color: '#374151',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    appearance: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    outline: 'none',
  };

  const arrowContainerStyle = {
    position: 'absolute',
    right: '8px',
    top: '38px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <label style={labelContainerStyle}>
        <span style={labelTextStyle}>
          Выберите разрешение:
        </span>
        <select 
          value={resolution} 
          onChange={handleResolutionChange}
          style={selectStyle}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db';
            e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
          }}
        >
          <option value="720x1280">720x1280 (HD)</option>
          <option value="1080x1920">1080x1920 (Full HD)</option>
          <option value="1440x2560">1440x2560 (2K)</option>
        </select>
        <div style={arrowContainerStyle}>
          <svg 
            style={{ width: '16px', height: '16px', color: '#6b7280' }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </label>
    </div>
  );
};

export default ResolutionSelector;