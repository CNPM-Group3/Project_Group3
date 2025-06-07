import React from 'react';

interface SidebarWrapperProps {
  Sidebar: React.ComponentType | null;
}

const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ Sidebar }) => {
  if (!Sidebar) return null;
  return <Sidebar />;
};

export default SidebarWrapper; 