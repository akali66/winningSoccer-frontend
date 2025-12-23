import React from 'react';
import { Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import MatchForm from '../../components/MatchForm';
import { DefaultApi } from '../../apis/DefaultApi';

const NewMatchPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      const newMatch = {
        ...values,
        // 默认值填充，防止 undefined
        theoryWin: values.theoryWin || "5.01",
        theoryDraw: values.theoryDraw || "3.58",
        theoryLose: values.theoryLose || "1.57",
        theoryWater: values.theoryWater || "3.4",
      };
      await DefaultApi.baseUrlMatchesPost(newMatch);
      message.success('添加成功');
      navigate('/matches');
    } catch (e) {
      message.error('添加失败');
    }
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
