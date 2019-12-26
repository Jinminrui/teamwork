import React, { useState, useEffect } from 'react';
import { getArticleList } from 'api/article';
import { List, Avatar, Tag } from 'antd';
import IconText from 'components/IconText';
import { useSelector } from 'react-redux';
import { Store } from 'types';

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
  setArticleNum: Function;
}

const ArticleList: React.FC<Props> = (props: Props) => {
  const [list, setList] = useState<Array<ArticleItem>>([]);
  const [pageSize, setPageSize] = useState(8);
  const [pageNum, setPageNum] = useState(1);
  const userId = useSelector((store: Store) => store.user.id);
  const { setArticleNum } = props;
  useEffect(() => {
    getArticleList({ userId, pageSize, pageNum }).then(res => {
      setList(res.data.list);
      setArticleNum(res.data.total);
    });
  }, [userId, pageSize, pageNum, setArticleNum]);
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={list}
      locale={{ emptyText: '还没有发表过文章喔～快去写一篇吧^_^' }}
      pagination={{ pageSize }}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              type="star-o"
              text={`${item.star}`}
              key="list-vertical-star-o"
            />,
            <IconText
              type="like-o"
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
              <Tag>{e}</Tag>
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
