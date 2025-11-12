"use client"
import React, { useState } from 'react';
import Workcardtabs from './workCardComp/Workcardtabs';
import WorkCards from './workCardComp/WorkCards';

const WorkCat = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div>
      <Workcardtabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab_content grid grid-cols-12 py-[80px] gap-[80px] mb-[100px] border-b-[1px] border-dashed border-[#000]">
        <WorkCards activeTab={activeTab} />
      </div>
    </div>
  );
};

export default WorkCat;