import React from 'react';
import { Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import MatchForm from '../../components/MatchForm';
import { mockMatches } from '../../mock/data';
import type { Match } from '../../mock/data';

const NewMatchPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const newId = Math.max(...mockMatches.map(m => m.id), 0) + 1;
    const newMatch: Match = {
      id: newId,
      ...values,
      // 默认值填充，防止 undefined
      theoryWin: "5.01",
      theoryDraw: "3.58",
      theoryLose: "1.57",
      theoryWater: "3.4",
    };
    mockMatches.push(newMatch);
    message.success('添加成功');
    navigate('/matches');
  };

  const handleCancel = () => {
    navigate('/matches');
  };

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>新建比赛</h2>
      <MatchForm 
        form={form}
        onFinish={handleFinish} 
        onCancel={handleCancel} 
        initialValues={{
            theoryWin: "5.01",
            theoryDraw: "3.58",
            theoryLose: "1.57",
            theoryWater: "3.4",
        }}
      />
    </div>
  );
};

export default NewMatchPage;
