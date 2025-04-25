import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const InputField = React.forwardRef((props, ref) => {
    const {
        label,
        variant = 'outline', // 'outline' | 'filled' | 'flushed'
        size = 'md',        // 'sm' | 'md' | 'lg'
        error,
        leftIcon,
        rightIcon,
        className = '',
        containerClassName = '',
        ...inputProps
    } = props;

    // Variant styles
    const variantStyles = {
        outline: 'border border-gray-300 focus:border-primary-500',
        filled: 'bg-gray-100 focus:bg-white focus:border-primary-500',
        flushed: 'border-b-2 border-gray-300 focus:border-primary-500 rounded-none',
    };

    // Size styles
    const sizeStyles = {
        sm: 'py-1.5 px-3 text-sm',
        md: 'py-2 px-4 text-base',
        lg: 'py-3 px-4 text-lg',
    };

    return (
        <div className={`mb-4 ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputProps.id}
                    className={`block mb-1 text-sm font-medium ${
                        error ? 'text-red-500' : 'text-gray-700'
                    }`}
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {leftIcon}
                    </div>
                )}

                <input
                    ref={ref}
                    className={`
            w-full rounded-md transition-all
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon || error ? 'pr-10' : ''}
            ${error ? 'border-red-500' : ''}
            focus:outline-none focus:ring-2 focus:ring-primary-200
            ${className}
          `}
                    {...inputProps}
                />

                {(rightIcon || error) && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {error ? (
                            <FiAlertCircle className="text-red-500" />
                        ) : (
                            rightIcon
                        )}
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
});

export default InputField;
