import React from 'react';
import NewHeader from '../components/NewHeader';
import NewFooter from '../components/NewFooter';

const NewMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-sans bg-white text-gray-800">
      <NewHeader />
      <main className="pt-16">{children}</main>
      <NewFooter />
    </div>
  );
};

export default NewMainLayout;