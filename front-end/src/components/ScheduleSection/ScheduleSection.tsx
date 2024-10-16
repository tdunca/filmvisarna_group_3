import React from 'react';
import { Link } from 'react-router-dom';
import './ScheduleSection.css';

interface ScheduleSectionProps {
}

const ScheduleSection: React.FC = () => {
  return (
    <section className="schedule-section">
      <div className="schedule-section-title">
        <h2>Next 7 Days</h2>
      </div>
    </section>
  );
};

export default ScheduleSection;