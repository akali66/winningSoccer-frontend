import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FloatButton, message, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { mockMatches } from '../../mock/data';
import MatchForm from '../../components/MatchForm';

const MatchDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find data
  const matchIndex = mockMatches.findIndex(item => item.id === Number(id));
  const data = mockMatches[matchIndex];

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
      onOk() {
        mockMatches.splice(matchIndex, 1);
        message.success('删除成功');
        navigate('/matches');
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
          danger 
          tooltip="删除" 
          onClick={handleDelete}
        />
      </FloatButton.Group>
    </div>
  );
};

export default MatchDetail;
