import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, FloatButton, Popconfirm, message, Spin, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { DefaultApi } from '../../apis/DefaultApi';
import type { Team, Match } from '../../apis/DefaultApi';

const TeamDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Team | null>(null);
  const [leagueName, setLeagueName] = useState<string>('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, leaguesRes, matchesRes] = await Promise.all([
          DefaultApi.baseUrlTeamsGet(),
          DefaultApi.baseUrlLeaguesGet(),
          DefaultApi.baseUrlMatchesGet()
        ]);
        
        setAllTeams(teamsRes);
        
        const teamId = Number(id);
        const team = teamsRes.find(item => item.id === teamId);
        
        if (team) {
          setData(team);
          const league = leaguesRes.find(l => l.id === team.leagueId);
          setLeagueName(league?.name || '');
          
          // Filter matches for this team
          const teamMatches = matchesRes.filter(m => m.homeTeamId === teamId || m.awayTeamId === teamId);
          setMatches(teamMatches);
        }
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
    message.success('删除成功');
    navigate('/teams');
  };

  const getTeamName = (teamId: number) => {
    return allTeams.find(t => t.id === teamId)?.name || teamId;
  };

  const matchColumns = [
    { 
      title: '主队', 
      dataIndex: 'homeTeamId', 
      key: 'homeTeamId',
      render: (teamId: number) => (
        <span style={{ fontWeight: teamId === data.id ? 'bold' : 'normal' }}>
          {getTeamName(teamId)}
        </span>
      )
    },
    { 
      title: '比分', 
      dataIndex: 'score', 
      key: 'score',
      align: 'center' as const,
      render: (text: string) => <span style={{ fontWeight: 'bold' }}>{text}</span>
    },
    { 
      title: '客队', 
      dataIndex: 'awayTeamId', 
      key: 'awayTeamId',
      render: (teamId: number) => (
        <span style={{ fontWeight: teamId === data.id ? 'bold' : 'normal' }}>
          {getTeamName(teamId)}
        </span>
      )
    },
    { title: '备注', dataIndex: 'remark', key: 'remark', ellipsis: true },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <a onClick={() => navigate("/teams")} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}>
          <ArrowLeftOutlined /> 返回列表
        </a>
      </div>
      <Card title={`球队详情: ${data.name}`} style={{ marginBottom: 24 }}>
        <Descriptions bordered>
          <Descriptions.Item label="球队名称">{data.name}</Descriptions.Item>
          <Descriptions.Item label="所属联赛">{leagueName}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>比赛记录</span>
          <Tag color="blue">总数: {matches.length}</Tag>
        </div>
      }>
        <Table 
          dataSource={matches} 
          columns={matchColumns} 
          rowKey="id"
          onRow={(record) => ({
            onClick: () => navigate(`/matches/${record.id}`),
            style: { cursor: 'pointer' }
          })}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
        <FloatButton icon={<EditOutlined />} tooltip="编辑" />
        <Popconfirm
            title="确定删除吗？"
            onConfirm={handleDelete}
            okText="是"
            cancelText="否"
          >
            <FloatButton icon={<DeleteOutlined />} type="primary" tooltip="删除" />
        </Popconfirm>
      </FloatButton.Group>
    </div>
  );
};

export default TeamDetail;
