import React from 'react';

const StatCard = ({
                      title,
                      value,
                      change,
                      icon,
                      iconColor = 'text-blue-500',
                      iconBg = 'bg-white'
                  }) => {
    // Determine trending icon and color
    const trendingIcon = change >= 0 ? (
        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
    ) : (
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    );

    const changeColor = change >= 0 ? 'text-green-600' : 'text-red-600';

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-800">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </h3>
                </div>
                <div className={`p-2 rounded-lg ${iconBg} shadow-xs`}>
                    {React.cloneElement(icon, { className: `${iconColor} w-6 h-6` })}
                </div>
            </div>

            <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${changeColor} flex items-center`}>
          {trendingIcon}
            <span className="ml-1">
            {Math.abs(change)}% {change >= 0 ? 'increase' : 'decrease'}
          </span>
        </span>
                <span className="text-xs text-gray-500 ml-2">vs last period</span>
            </div>
        </div>
    );
};
