import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#fcfcf6] flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default MainLayout;