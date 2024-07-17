import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className=" flex flex-col items-center justify-center bg-gradient-to-r from-indigo-200 to-blue-200 mt-8">
      <div className="text-black-500 font-bold mb-4">
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;