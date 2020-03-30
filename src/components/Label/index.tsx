import React, { ReactNode } from 'react';

interface LabelProps {
  icon: ReactNode;
  text: string;
}
const Label: React.FC<LabelProps> = ({ icon, text }) => (
  <div style={{ color: '#8c8c8c', paddingRight: 20 }}>
    <span style={{ fontSize: 16 }}>{icon}</span>
    <span style={{ paddingLeft: 8 }}>{text}</span>
  </div>
);

export default Label;
