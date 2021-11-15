import React from 'react'

const TableLoader = () => {
    return (
        <div
            className="absolute bottom-0 left-0 w-full h-full rounded-md bg-opacity-50 bg-primary-dark text-lg font-bold flex items-center justify-center text-white"
            style={{ top: '32px' }}
        >
            <svg className="spinner" viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                ></circle>
            </svg>
        </div>
    )
}

export default TableLoader
