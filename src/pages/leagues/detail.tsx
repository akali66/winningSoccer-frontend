import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, FloatButton, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { mockLeagues } from '../../mock/data';

const LeagueDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = mockLeagues.find(item => item.id === Number(id));

  if (!data) {
    return <div>未找到数据</div>;
  }

  const handleDelete = () => {
    message.success('删除成功');
    navigate('/leagues');
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <a onClick={() => navigate("/leagues")} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}>
          <ArrowLeftOutlined /> 返回列表
        </a>
      </div>
      <Card title={`联赛详情: ${data.name}`}>
        <Descriptions bordered>
          <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
          <Descriptions.Item label="联赛名称">{data.name}</Descriptions.Item>
        </Descriptions>
      </Card>

      <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
        <FloatButton icon={<EditOutlined />} tooltip="编辑" />
        <Popconfirm
            title="确定删除吗？"
            onConfirm={handleDelete}
            okText="是"
            cancelText="否"
          >
            <FloatButton icon={<DeleteOutlined />} type="primary" danger tooltip="删除" />
        </Popconfirm>
      </FloatButton.Group>
    </div>
  );
};

export default LeagueDetail;
