import React, { useState, useEffect } from 'react';
import './index.scss';
import { PageHeader, Input, Button, Card, Form, Select } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { RouteComponentProps } from 'react-router-dom';
import { GetDocListParams, getDocList } from 'api/doc';
import ArticleList from 'components/ArticleList';
import EditorModal from 'components/EditorModal';

const { Option } = Select;

export const docsTag = ['全部', '技术分享', '项目文档', '团队规范', '会议记录'];

const Docs = (props: RouteComponentProps) => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [authors, setAuthors] = useState<Array<string>>([]);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [pageNum, setpageNum] = useState<any>(1);
  const [loading, setLoading] = useState(false);
  const [editorModalVisible, setEditorModalVisible] = useState(false);
  const { memberList, teamId } = useSelector((store: Store) => store.team);

  const Content = () => (
    <div className="header-content">
      <span className="header-detail-wrap">
        <Input.Search
          placeholder="请输入文档名称"
          enterButton="搜索"
          size="large"
          style={{ maxWidth: '552px', width: '100%' }}
          onSearch={value => {
            let title;
            if (value === '') {
              title = undefined;
            } else {
              title = value;
            }
            setLoading(true);
            getDocList({ title, teamId }).then(res => {
              setList(res.data.list);
              setTotal(res.data.total);
              setLoading(false);
            });
          }}
        />
      </span>
    </div>
  );

  const authorOptions = memberList.map(item => (
    <Option value={item.pkId} key={item.pkId}>
      {item.username}
    </Option>
  ));

  const handleTagChange = (item: string, checked: boolean) => {
    if (item === '全部') {
      if (checked) {
        setTags(docsTag);
      } else {
        setTags([]);
      }
    } else if (checked) {
      setTags([...tags, item]);
    } else {
      setTags(tags.filter(e => e !== item));
    }
  };

  const handleAuhtorSelectChange = (e: any) => {
    setAuthors(e);
  };

  useEffect(() => {
    if (teamId) {
      const params: GetDocListParams = {
        authorIds: authors,
        types: tags,
        pageNum,
        pageSize: 5,
        teamId,
      };
      setLoading(true);
      getDocList(params).then(res => {
        setList(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
      });
    }
  }, [tags, authors, teamId, pageNum]);

  return (
    <div>
      <EditorModal
        visible={editorModalVisible}
        setVisibleFalse={() => {
          setEditorModalVisible(false);
        }}
      />
      <div className="teamDocs-pageHeader">
        <PageHeader
          title="团队文档"
          subTitle="建立属于团队的知识库"
          extra={[
            <Button
              key="1"
              icon={<FileAddOutlined />}
              type="link"
              onClick={() => {
                setEditorModalVisible(true);
              }}
            >
            新建文档
            </Button>,
          ]}
        >
          <Content />
        </PageHeader>
      </div>

      <div className="teamDocs-wrapper" style={{ marginTop: 24, marginBottom: 24 }}>
        <Card>
          <Form layout="inline">
            <div className="search-docs-form-row">
              <div className="form-row-label">
                <span>所属类别</span>
              </div>
              <div className="form-row-content">
                {docsTag.map(item => (
                  <CheckableTag
                    checked={tags.includes(item)}
                    key={item}
                    onChange={checked => {
                      handleTagChange(item, checked);
                    }}
                  >
                    {item}
                  </CheckableTag>
                ))}
              </div>
            </div>
            <div className="search-docs-form-row">
              <div className="form-row-label">
                <span>作者</span>
              </div>
              <div className="form-row-content">
                <Select
                  mode="tags"
                  placeholder="请选择作者"
                  defaultValue={[]}
                  onChange={handleAuhtorSelectChange}
                  style={{ maxWidth: '400px', width: '100%' }}
                >
                  {authorOptions}
                </Select>
              </div>
            </div>
            <div className="search-docs-form-row">
              <div className="form-row-label">
                <span>所属项目</span>
              </div>
              <div className="form-row-content">
                <Select
                  mode="tags"
                  placeholder="请选择项目"
                  defaultValue={[]}
                  style={{ maxWidth: '200px', width: '100%' }}
                >
                  {authorOptions}
                </Select>
              </div>
            </div>
          </Form>
        </Card>
        <Card style={{ marginTop: 24 }}>
          <ArticleList
            pageSize={5}
            articleList={list}
            total={total}
            loading={loading}
            onPageChange={(page, pageSize) => {
              setpageNum(page);
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Docs;
