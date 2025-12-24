import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Drawer, Form, Input, Popconfirm, message, FloatButton, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DefaultApi } from '../../apis/DefaultApi';
import type { Team, League } from '../../apis/DefaultApi';
import { useNavigate, useLocation } from 'react-router-dom';

const TeamsPage: React.FC = () => {
  const [data, setData] = useState<Team[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Team | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchTeams = async (name?: string) => {
    try {
      const teamsRes = await DefaultApi.baseUrlTeamsGet(name);
      setData(teamsRes);
    } catch (e) {
      message.error('加载球队失败');
    }
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const [teamsRes, leaguesRes] = await Promise.all([
          DefaultApi.baseUrlTeamsGet(),
          DefaultApi.baseUrlLeaguesGet()
        ]);
        setData(teamsRes);
        setLeagues(leaguesRes);
      } catch (e) {
        message.error('加载失败');
      }
    };
    initData();
  }, []);

  useEffect(() => {
    if (location.state?.action === 'add' && location.state?.leagueId) {
      setEditingItem(null);
      form.resetFields();
      form.setFieldsValue({ leagueId: location.state.leagueId });
      setIsDrawerOpen(true);
      // 清除 state，避免刷新或返回时重复触发
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, form, navigate, location.pathname]);

  const handleSearch = (value: string) => {
    fetchTeams(value);
  };

  const getLeagueName = (leagueId: number) => {
    return leagues.find(l => l.id === leagueId)?.name || '未知联赛';
  };

  const columns = [
    {
      title: '球队名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属联赛',
      dataIndex: 'leagueId',
      key: 'leagueId',
      render: (leagueId: number) => getLeagueName(leagueId),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Team) => (
        <Space size="middle" onClick={(e) => e.stopPropagation()}>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="确定删除该球队吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  const handleEdit = (record: Team) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleSave = () => {
    form.validateFields().then(async values => {
      if (editingItem) {
        setData(data.map(item => item.id === editingItem.id ? { ...item, ...values } : item));
        message.success('更新成功');
      } else {
        try {
          const newTeam = await DefaultApi.baseUrlTeamsPost(values);
          setData([...data, newTeam]);
          message.success('添加成功');
        } catch (e) {
          message.error('添加失败');
        }
      }
      setIsDrawerOpen(false);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>球队管理</h2>
        <Input.Search
          placeholder="搜索球队名称"
          allowClear
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
      </div>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id"
        onRow={(record) => ({
          onClick: () => navigate(`/teams/${record.id}`),
          style: { cursor: 'pointer' }
        })}
      />

      <FloatButton 
        icon={<PlusOutlined />} 
        type="primary" 
        style={{ right: 24, bottom: 24, marginBottom: 40}} 
        onClick={handleAdd} 
        tooltip="添加球队"
      />

      <Drawer
        title={editingItem ? "编辑球队" : "添加球队"}
        width={400}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button onClick={() => setIsDrawerOpen(false)}>取消</Button>
            <Button type="primary" onClick={handleSave}>保存</Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="球队名称"
            rules={[{ required: true, message: '请输入球队名称' }]}
          >
            <Input placeholder="请输入球队名称" />
          </Form.Item>
          <Form.Item
            name="leagueId"
            label="所属联赛"
            rules={[{ required: true, message: '请选择所属联赛' }]}
          >
            <Select placeholder="请选择所属联赛">
              {leagues.map(league => (
                <Select.Option key={league.id} value={league.id}>{league.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default TeamsPage;
