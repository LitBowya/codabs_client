import React from 'react'

const StatCard = ({icon, value, text}) => {
    return (
        <div className="bg-secondary relative text-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className="p-3 bg-primary bg-opacity-20 rounded-full">
                    {icon}
                </div>

                {/* Text Content */}
                <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-sm opacity-80">{text}</p>
                </div>
            </div>
        </div>
    );
};

export default StatCard
