import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { mockMatches } from '../../mock/data';
import MatchForm from '../../components/MatchForm';

const MatchEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  // Find data
  const matchIndex = mockMatches.findIndex(item => item.id === Number(id));
  const data = mockMatches[matchIndex];

  if (!data) {
    return <div>未找到数据</div>;
  }

  const handleFinish = (values: any) => {
    // Update mock data
    Object.assign(data, values);
    message.success('更新成功');
    navigate(`/matches/${id}`);
  };

  const handleCancel = () => {
    navigate(`/matches/${id}`);
  };

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
      <div style={{ marginBottom: 16 }}>
        <a onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}>
          <ArrowLeftOutlined /> 返回详情
        </a>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h2>编辑比赛</h2>
      </div>

      <MatchForm
        form={form}
        initialValues={data}
        onFinish={handleFinish}
        onCancel={handleCancel}
        readOnly={false}
      />
    </div>
  );
};

export default MatchEdit;
