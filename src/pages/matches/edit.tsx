import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DefaultApi } from '../../apis/DefaultApi';
import type { Match } from '../../apis/DefaultApi';
import MatchForm from '../../components/MatchForm';

const MatchEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const match = await DefaultApi.baseUrlMatchesIdGet(Number(id));
        setData(match);
      } catch (error) {
        message.error('获取数据失败');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div style={{ padding: 24, textAlign: 'center' }}><Spin /></div>;
  if (!data) {
    return <div>未找到数据</div>;
  }

  const handleFinish = async (values: any) => {
    try {
      await DefaultApi.baseUrlMatchesIdPut(Number(id), values);
      message.success('更新成功');
      navigate(`/matches/${id}`);
    } catch (e) {
      message.error('更新失败');
    }
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
