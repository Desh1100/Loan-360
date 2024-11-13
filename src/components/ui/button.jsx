import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ variant, size, children, className, ...props }) => {
  // Define different styles for the variants and sizes
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none';
  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
  };
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    lg: 'px-6 py-3 text-lg',
    default: 'px-4 py-2',
  };

  // Combine the styles based on the props passed
  const buttonClasses = clsx(
    baseStyles,
    variantStyles[variant || 'default'],
    sizeStyles[size || 'default'],
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

// Define the prop types and defaults
Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'lg', 'default']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'default',
  size: 'default',
  className: '',
};

export default Button;
