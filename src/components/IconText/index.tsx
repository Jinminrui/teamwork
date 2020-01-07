import React from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';

interface Props {
  type: string;
  text: string;
}

const IconText: React.FC<Props> = (props: Props) => {
  const { type, text } = props;
  return (
    <span>
      <LegacyIcon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
};

export default IconText;
