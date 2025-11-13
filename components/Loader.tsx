
import React from 'react';

interface LoaderProps {
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Analyzing..." }) => {
  return (
    <div className="flex justify-center items-center my-12">
      <div className="w-16 h-16 border-4 border-sky-400 border-dashed rounded-full animate-spin"></div>
      <p className="ml-4 text-xl text-slate-400">{text}</p>
    </div>
  );
};

export default Loader;
