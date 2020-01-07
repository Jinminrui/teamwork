import React, { useState } from 'react';
import { List, Avatar, Tag, Empty } from 'antd';
import IconText from 'components/IconText';

interface ArticleItem {
  id: number;
  title: string;
  description: string;
  tag: Array<string>;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  star: number;
  like: number;
  comment: number;
  updateTime: string;
}

interface Props {
  articleList: Array<ArticleItem>;
}

const ArticleList: React.FC<Props> = (props: Props) => {
  const [pageSize] = useState(5);
  const { articleList } = props;

  if (!articleList.length) {
    return <Empty description="还没有发表过文章喔～快去写一篇吧^_^" />;
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={articleList}
      pagination={{ pageSize }}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              type="star"
              text={`${item.star}`}
              key="list-vertical-star-o"
            />,
            <IconText
              type="like"
              text={`${item.like}`}
              key="list-vertical-like-o"
            />,
            <IconText
              type="message"
              text={`${item.comment}`}
              key="list-vertical-message"
            />,
          ]}
        >
          <List.Item.Meta
            title={<p>{item.title}</p>}
            description={item.tag.map(e => (
              <Tag key={e}>{e}</Tag>
            ))}
          />
          {item.description}
          <div className="article-extra">
            <Avatar
              style={{ marginRight: '8px' }}
              src={item.authorAvatar}
              size={20}
            />
            <span className="username">{item.authorName}</span>
            <span style={{ margin: '0 4px' }}>发布于</span>
            <span style={{ color: 'rgba(0,0,0,.25)' }}>{item.updateTime}</span>
          </div>
        </List.Item>
      )}
    />
  );
};

export default ArticleList;
