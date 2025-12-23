import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FloatButton, message, Modal, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DefaultApi } from '../../apis/DefaultApi';
import type { Match } from '../../apis/DefaultApi';
import MatchForm from '../../components/MatchForm';

const MatchDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleDelete = () => {
    Modal.confirm({
      title: '确定删除该比赛吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: async () => {
        try {
          await DefaultApi.baseUrlMatchesIdDelete(Number(id));
          message.success('删除成功');
          navigate('/matches');
        } catch (e) {
          message.error('删除失败');
        }
      },
    });
  };

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
      <div style={{ marginBottom: 16 }}>
        <a onClick={() => navigate("/matches")} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}>
          <ArrowLeftOutlined /> 返回列表
        </a>
      </div>

      <MatchForm
        initialValues={data}
        readOnly={true}
      />

      <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
        <FloatButton 
          icon={<EditOutlined />} 
          tooltip="编辑" 
          onClick={() => navigate(`/matches/${id}/edit`)}
        />
        <FloatButton 
          icon={<DeleteOutlined />} 
          type="primary" 
          tooltip="删除" 
          onClick={handleDelete}
        />
      </FloatButton.Group>
    </div>
  );
};

export default MatchDetail;
