import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, FloatButton, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DefaultApi } from '../../apis/DefaultApi';
import type { Match, League, Team } from '../../apis/DefaultApi';
import { useNavigate } from 'react-router-dom';

const MatchesPage: React.FC = () => {
  const [data, setData] = useState<Match[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesRes, leaguesRes, teamsRes] = await Promise.all([
          DefaultApi.baseUrlMatchesGet(),
          DefaultApi.baseUrlLeaguesGet(),
          DefaultApi.baseUrlTeamsGet()
        ]);
        setData(matchesRes);
        setLeagues(leaguesRes);
        setTeams(teamsRes);
      } catch (e) {
        message.error('加载失败');
      }
    };
    fetchData();
  }, []);

  const getLeagueName = (id: number) => leagues.find(l => l.id === id)?.name || id;
  const getTeamName = (id: number) => teams.find(t => t.id === id)?.name || id;

  const columns = [
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
      onOk: async () => {
        try {
          await DefaultApi.baseUrlMatchesIdDelete(id);
          setData(prev => prev.filter(item => item.id !== id));
          message.success('删除成功');
        } catch (e) {
          message.error('删除失败');
        }
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
