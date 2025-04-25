import React from 'react';
import { FiArrowRight } from 'react-icons/fi'; // Example icon (can be any react-icon)

const Button = ({
                    children,
                    variant = '',
                    size = 'medium',
                    icon = null,
                    iconPosition = 'left',
                    isLoading = false,
                    disabled = false,
                    fullWidth = false,
                    rounded = 'md',
                    shadow = 'md',
                    className = '',
                    type='',
                    ...props
                }) => {
    // Variant styles
    const variants = {
        orange: 'bg-orange-600 hover:bg-orange-700 text-white border border-orange-600',
        white: 'bg-white hover:bg-orange-900 hover:text-white text-secondary border border-orange-500',
        outline: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent',
        danger: 'bg-red-500 hover:bg-red-600 text-white border border-red-500',
        success: 'bg-green-500 hover:bg-green-600 text-white border border-green-500',
    };

    // Size styles
    const sizes = {
        small: 'py-1 px-3 text-md font-bold',
        medium: 'py-2 px-4 text-md font-bold',
        large: 'py-3 px-6 text-xl font-bold',
    };

    // Rounded styles
    const roundness = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };

    // Shadow styles
    const shadows = {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
    };

    // Loading state
    const loadingClass = isLoading ? 'opacity-75 cursor-not-allowed' : '';

    // Disabled state
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

    // Width
    const widthClass = fullWidth ? 'w-full' : 'w-auto';

    return (
        <button
            type={type}
            className={`
        flex items-center justify-center
        font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${roundness[rounded]}
        ${shadows[shadow]}
        ${loadingClass}
        ${disabledClass}
        ${widthClass}
        ${className}
      `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="mr-2 animate-spin">🌀</span> // Replace with your preferred spinner
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <span className="mr-2">{icon}</span>
                    )}
                    {children}
                    {icon && iconPosition === 'right' && (
                        <span className="ml-2">{icon}</span>
                    )}
                    {!icon && variant === 'orange' && (
                        <FiArrowRight className="ml-2" />
                    )}
                </>
            )}
        </button>
    );
};

export default Button;
