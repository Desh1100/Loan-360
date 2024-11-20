// src/ui/button.jsx
import React from 'react';

const Button = ({ children, variant, onClick }) => {
  // Define inline styles for the button
  const baseStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  // Define variant styles
  const ghostStyle = {
    ...baseStyle,
    backgroundColor: 'transparent',
    color: '#ff6219',
    border: '2px solid #ff6219',
  };

  const ghostHoverStyle = {
    ...ghostStyle,
    backgroundColor: '#ff6219',
    color: 'white',
  };

  const defaultStyle = {
    ...baseStyle,
    backgroundColor: '#ff6219',
    color: 'white',
  };

  const defaultHoverStyle = {
    ...defaultStyle,
    backgroundColor: '#ff4500',
  };

  // Choose the appropriate styles based on the variant
  const buttonStyle =
    variant === 'ghost' ? ghostStyle : defaultStyle;
  const buttonHoverStyle =
    variant === 'ghost' ? ghostHoverStyle : defaultHoverStyle;

  // Handle mouse hover for button styles
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  // Apply the hover effect
  const appliedStyle = hovered ? buttonHoverStyle : buttonStyle;

  return (
    <button
      style={appliedStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;
