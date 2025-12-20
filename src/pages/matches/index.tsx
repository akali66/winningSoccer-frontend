import React, { useState } from 'react';
import { Table, Button, Space, message, FloatButton, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { mockMatches, mockLeagues, mockTeams } from '../../mock/data';
import type { Match } from '../../mock/data';
import { useNavigate } from 'react-router-dom';

const MatchesPage: React.FC = () => {
  const [data, setData] = useState<Match[]>(mockMatches);
  const navigate = useNavigate();

  const getLeagueName = (id: number) => mockLeagues.find(l => l.id === id)?.name || id;
  const getTeamName = (id: number) => mockTeams.find(t => t.id === id)?.name || id;

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id', width: 60 },
    { 
      title: '所属联赛', 
      dataIndex: 'leagueId', 
      width: 150,
      key: 'leagueId',
      render: (id: number) => getLeagueName(id)
    },
    { 
      title: '主队', 
      dataIndex: 'homeTeamId', 
      width: 150,
      key: 'homeTeamId',
      render: (id: number) => getTeamName(id)
    },
    { 
      title: '比分', 
      dataIndex: 'score', 
      width: 150,
      key: 'score',
      align: 'center' as const,
      render: (text: string) => <span style={{ fontWeight: 'bold' }}>{text}</span>
    },
    { 
      title: '客队', 
      dataIndex: 'awayTeamId', 
      width: 250,
      key: 'awayTeamId',
      render: (id: number) => getTeamName(id)
    },
    { title: '备注', dataIndex: 'remark', key: 'remark', ellipsis: true },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: Match) => (
        <Space size="small" onClick={(e) => e.stopPropagation()}>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确定删除该比赛吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        setData(prev => prev.filter(item => item.id !== id));
        // 同时更新 mock 数据，虽然这里是内存操作
        const index = mockMatches.findIndex(m => m.id === id);
        if (index > -1) mockMatches.splice(index, 1);
        message.success('删除成功');
      },
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>比赛管理</h2>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id"
        scroll={{ x: 800 }}
        onRow={(record) => ({
          onClick: () => navigate(`/matches/${record.id}`),
          style: { cursor: 'pointer' }
        })}
      />

      <FloatButton 
        icon={<PlusOutlined />} 
        type="primary" 
        style={{ right: 24, bottom: 24, marginBottom: 40 }} 
        onClick={() => navigate('/matches/new')} 
        tooltip="添加比赛"
      />
    </div>
  );
};

export default MatchesPage;
