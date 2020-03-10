import React from 'react';
import { List, Avatar, Tag, Empty } from 'antd';
import IconText from 'components/IconText';

interface Props {
  total: number;
  articleList: Array<any>;
  loading: boolean;
  onPageChange: (page?: number, pageSize?: number) => void;
  pageSize: number;
}

const ArticleList: React.FC<Props> = (props: Props) => {
  const { articleList, loading, total, onPageChange, pageSize } = props;

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={articleList}
      pagination={{
        pageSize,
        total,
        onChange: onPageChange,
        hideOnSinglePage: true,
      }}
      loading={loading}
      locale={{
        emptyText: <Empty description="还没有发表过文章喔～快去写一篇吧^_^" />,
      }}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              type="star"
              text={`${item.stared}`}
              key="list-vertical-star-o"
            />,
            <IconText
              type="like"
              text={`${item.liked}`}
              key="list-vertical-like-o"
            />,
            <IconText type="message" text="0" key="list-vertical-message" />,
          ]}
        >
          <List.Item.Meta
            title={
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <p
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.location.hash = `/home/doc-detail?id=${item.pkId}`;
                }}
              >
                {item.title}
              </p>
            }
            description={<Tag>{item.type}</Tag>}
          />
          <div className="article-extra">
            <Avatar
              style={{ marginRight: '8px' }}
              src={item.authorInfo.avatar}
              size={20}
            />
            <span style={{ color: 'rgba(0,0,0,.65)' }}>{item.authorInfo.username}</span>
            <span style={{ margin: '0 4px' }}>发布于</span>
            <span style={{ color: 'rgba(0,0,0,.25)' }}>{item.updateTime}</span>
          </div>
        </List.Item>
      )}
    />
  );
};

export default ArticleList;
