import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const WindowSwitcher = ({ sections, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div style={{width: "100%", margin: "10px"}}>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        {sections.map((section, index) => (
          <Tab key={index} label={section} />
        ))}
      </Tabs>
      {children[activeTab]}
    </div>
  );
};

export default WindowSwitcher;
