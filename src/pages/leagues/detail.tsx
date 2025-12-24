import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Descriptions,
  FloatButton,
  Popconfirm,
  message,
  Spin,
  Table,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { DefaultApi } from "../../apis/DefaultApi";
import type { League, Team } from "../../apis/DefaultApi";

const LeagueDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<League | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaguesRes, teamsRes] = await Promise.all([
          DefaultApi.baseUrlLeaguesGet(),
          DefaultApi.baseUrlTeamsGet(),
        ]);

        const leagueId = Number(id);
        const league = leaguesRes.find((item) => item.id === leagueId);
        setData(league || null);

        if (league) {
          const leagueTeams = teamsRes.filter((t) => t.leagueId === leagueId);
          setTeams(leagueTeams);
        }
      } catch (error) {
        message.error("获取数据失败");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <Spin />
      </div>
    );
  }

  if (!data) {
    return <div>未找到数据</div>;
  }

  const handleDelete = () => {
    message.success("删除成功");
    navigate("/leagues");
  };

  const teamColumns = [
    {
      title: "球队名称",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <a
          onClick={() => navigate("/leagues")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "inherit",
          }}
        >
          <ArrowLeftOutlined /> 返回列表
        </a>
      </div>
      <Card title={`联赛详情: ${data.name}`} style={{ marginBottom: 24 }}>
        <Descriptions bordered>
          <Descriptions.Item label="联赛名称">{data.name}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>包含球队</span>
            <Tag color="blue">总数: {teams.length}</Tag>
          </div>
        }
      >
        <Table
          dataSource={teams}
          columns={teamColumns}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => navigate(`/teams/${record.id}`),
            style: { cursor: "pointer" },
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
          <FloatButton
            icon={<DeleteOutlined />}
            type="primary"
            tooltip="删除"
          />
        </Popconfirm>
      </FloatButton.Group>
    </div>
  );
};

export default LeagueDetail;
