import React from 'react';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';

interface Props {
  type: string;
  text: string;
}

const IconText: React.FC<Props> = (props: Props) => {
  const { type, text } = props;
  const map: Record<string, any> = {
    star: <StarOutlined />,
    like: <LikeOutlined />,
    message: <MessageOutlined />,
  };
  return (
    <span>
      {map[type]} {text}
    </span>
  );
};

export default IconText;
