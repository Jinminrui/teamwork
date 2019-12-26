import React from 'react';
import { Icon } from 'antd';

interface Props {
  type: string;
  text: string;
}

const IconText: React.FC<Props> = (props: Props) => {
  const { type, text } = props;
  return (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
};

export default IconText;
