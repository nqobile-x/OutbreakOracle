
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">
        OutbreakOracle
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        AI-Powered Epidemiological Intelligence
      </p>
    </header>
  );
};

export default Header;
