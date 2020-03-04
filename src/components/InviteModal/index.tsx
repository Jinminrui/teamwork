import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import './index.scss';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { inviteMember } from 'api/team';
import { useDispatch } from 'react-redux';

interface Props {
  teamId: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const InviteModal = (props: Props) => {
  const { visible, onOk, onCancel, teamId } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="邀请团队成员一起协作"
      okText="邀请"
      cancelText="取消"
      onOk={() => {
        form.validateFields().then(value => {
          const inviteParams: any = {
            ...value,
            teamId,
            senderId: localStorage.getItem('userId'),
          };
          inviteMember(inviteParams).then((res: any) => {
            message.info('邀请成功');
            dispatch({ type: 'SET_MEMBER_LIST_SAGA', teamId });
            form.resetFields();
            onOk();
          });
        });
      }}
      onCancel={() => {
        onCancel();
      }}
    >
      <div className="invite-modal-container">
        <img
          src="https://g.alicdn.com/teambition/web/teambition/images/member.0645aba3.svg"
          alt=""
        />
        <Form name="invite-form" form={form} style={{ marginTop: 10 }}>
          <Form.List name="phones">
            {(fields, { add, remove }) => (
              <div>
                <p className="form-label">邀请团队成员</p>
                {fields.map((field, index) => (
                  <div style={{ display: 'flex' }} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入成员手机号',
                        },
                      ]}
                    >
                      <Input
                        placeholder="请输入成员手机号"
                        style={{ width: '400px', marginRight: 8 }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '400px' }}
                  >
                    <PlusOutlined /> 增加
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Form>
      </div>
    </Modal>
  );
};

export default InviteModal;
