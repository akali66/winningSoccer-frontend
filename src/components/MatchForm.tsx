import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Select,
  Input,
  Row,
  Col,
  Button,
  Space,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import ScoreInput from "./ScoreInput";
import { DefaultApi } from "../apis/DefaultApi";
import type { League, Team, Match } from "../apis/DefaultApi";

interface StatusSelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  hasError?: boolean;
}

const StatusSelectorHorizontal: React.FC<StatusSelectorProps> = ({
  value,
  onChange,
  readOnly,
  hasError,
}) => {
  const options = [
    { val: 1, label: "胜", color: "#52c41a" },
    { val: 2, label: "平", color: "#1890ff" },
    { val: 0, label: "负", color: "#ff4d4f" },
  ];

  return (
    <Space
      size="small"
      style={{
        border: hasError ? "1px solid #ff4d4f" : "none",
        borderRadius: 4,
        padding: 2,
      }}
    >
      {options.map((opt) => (
        <div
          key={opt.val}
          onClick={() => !readOnly && onChange?.(opt.val)}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: value === opt.val ? opt.color : "#f0f0f0",
            color: value === opt.val ? "#fff" : "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: readOnly ? "default" : "pointer",
            border: "1px solid #d9d9d9",
            fontSize: 12,
            fontWeight: value === opt.val ? "bold" : "normal",
          }}
        >
          {opt.label}
        </div>
      ))}
    </Space>
  );
};

interface MatchFormProps {
  initialValues?: Partial<Match>;
  onFinish?: (values: any) => void;
  onCancel?: () => void;
  readOnly?: boolean;
  form?: any;
}

const TeamAvatar: React.FC<{ size?: number }> = ({ size = 100 }) => {
  const color = React.useMemo(
    () => "#" + Math.floor(Math.random() * 16777215).toString(16),
    []
  );
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        margin: "0 auto 16px",
        border: "4px solid #fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    />
  );
};

// Generate handicap options from -3 to 3 with 0.25 step
const handicapOptions = Array.from({ length: 25 }, (_, i) => {
  const val = (i - 12) * 0.25;
  return { label: val.toString(), value: val.toString() };
});

const MatchForm: React.FC<MatchFormProps> = ({
  initialValues,
  onFinish,
  onCancel,
  readOnly,
  form,
}) => {
  const navigate = useNavigate();
  const [internalForm] = Form.useForm();
  const formInstance = form || internalForm;
  const selectedLeagueId = Form.useWatch("leagueId", formInstance);
  const selectedHomeTeamId = Form.useWatch("homeTeamId", formInstance);
  const selectedAwayTeamId = Form.useWatch("awayTeamId", formInstance);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const filteredTeams = React.useMemo(() => {
    if (!selectedLeagueId) return [];
    return teams.filter((t) => t.leagueId === selectedLeagueId);
  }, [teams, selectedLeagueId]);

  const handleTeamDropdownVisibleChange = (open: boolean) => {
    if (open && !selectedLeagueId) {
      message.warning("先选择联赛");
    }
  };

  const handleValuesChange = (changedValues: any) => {
    const changedKeys = Object.keys(changedValues);
    if (changedKeys.some((key) => errorFields.includes(key))) {
      setErrorFields((prev) =>
        prev.filter((key) => !changedKeys.includes(key) || !changedValues[key])
      );
    }
  };

  const handleFormFinish = (values: any) => {
    const requiredFields = [
      { key: "matchTime", label: "比赛时间" },
      { key: "leagueId", label: "联赛" },
      { key: "homeTeamRank", label: "主队名次" },
      { key: "homeTeamId", label: "主队" },
      { key: "awayTeamRank", label: "客队名次" },
      { key: "awayTeamId", label: "客队" },
      { key: "homeForm1", label: "主队近期战绩" },
      { key: "homeForm2", label: "主队近期战绩" },
      { key: "homeForm3", label: "主队近期战绩" },
      { key: "homeForm4", label: "主队近期战绩" },
      { key: "homeForm5", label: "主队近期战绩" },
      { key: "homeForm6", label: "主队近期战绩" },
      { key: "historyH2H1", label: "历史交锋" },
      { key: "historyH2H2", label: "历史交锋" },
      { key: "historyH2H3", label: "历史交锋" },
      { key: "awayForm1", label: "客队近期战绩" },
      { key: "awayForm2", label: "客队近期战绩" },
      { key: "awayForm3", label: "客队近期战绩" },
      { key: "awayForm4", label: "客队近期战绩" },
      { key: "awayForm5", label: "客队近期战绩" },
      { key: "awayForm6", label: "客队近期战绩" },
    ];

    const missingFields = requiredFields.filter((field) => {
      const val = values[field.key];
      return val === undefined || val === null || val === "";
    });

    if (missingFields.length > 0) {
      setErrorFields(missingFields.map((f) => f.key));
      message.error("请完善比赛信息");
      return;
    }

    onFinish?.(values);
  };

  const teamNotFoundContent = (
    <div style={{ padding: 8, textAlign: "center" }}>
      <div style={{ marginBottom: 8 }}>当前联赛无球队</div>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          navigate("/teams", {
            state: { action: "add", leagueId: selectedLeagueId },
          });
        }}
      >
        添加球队
      </Button>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaguesRes, teamsRes] = await Promise.all([
          DefaultApi.baseUrlLeaguesGet(),
          DefaultApi.baseUrlTeamsGet(),
        ]);
        setLeagues(leaguesRes);
        setTeams(teamsRes);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  // Helper to render text or form item
  const renderField = (
    name: string,
    renderInput: React.ReactNode,
    renderText: () => React.ReactNode,
    rules: any[] = []
  ) => {
    if (readOnly) {
      return (
        <div
          style={{
            minHeight: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderText()}
        </div>
      );
    }
    return (
      <Form.Item name={name} rules={rules} style={{ marginBottom: 0 }}>
        {renderInput}
      </Form.Item>
    );
  };

  const getLeagueName = (id?: number) =>
    leagues.find((l) => l.id === id)?.name || "-";
  const getTeamName = (id?: number) =>
    teams.find((t) => t.id === id)?.name || "-";

  return (
    <Form
      form={formInstance}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFormFinish}
      onValuesChange={handleValuesChange}
    >
      {/* 联赛选择 */}
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Col span={8} style={{ textAlign: "center" }}>
          {readOnly ? (
            <div style={{ fontSize: 18, fontWeight: "bold", padding: "4px 0" }}>
              {getLeagueName(initialValues?.leagueId)}
            </div>
          ) : (
            <Form.Item
              name="leagueId"
              validateStatus={errorFields.includes("leagueId") ? "error" : ""}
            >
              <Select
                placeholder="选择联赛"
                size="large"
                style={{ textAlign: "center" }}
              >
                {leagues.map((l) => (
                  <Select.Option key={l.id} value={l.id}>
                    {l.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Col>
      </Row>

      {/* 时间信息 */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: "bold" }}>比赛时间:</span>
            <Form.Item
              name="matchTime"
              getValueProps={(i) => ({ value: i ? dayjs(i) : null })}
              getValueFromEvent={(e) => (e ? e.toISOString() : null)}
              style={{ marginBottom: 0 }}
              validateStatus={errorFields.includes("matchTime") ? "error" : ""}
            >
              {readOnly ? (
                <span style={{ fontSize: 16, fontWeight: "bold" }}>
                  {initialValues?.matchTime
                    ? dayjs(initialValues.matchTime).format("YYYY-MM-DD HH:mm")
                    : "-"}
                </span>
              ) : (
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="选择比赛时间"
                />
              )}
            </Form.Item>
          </div>
        </Col>
        <Col>
          <div style={{ color: "#999", fontSize: 12 }}>
            {initialValues?.dataUpdateTime
              ? dayjs(initialValues.dataUpdateTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              : ""}
          </div>
        </Col>
      </Row>

      <Row gutter={48} align="top">
        {/* 主队区域 */}
        <Col span={8} style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 8, color: "#888" }}>
            名次
            {readOnly ? (
              <span
                style={{ marginLeft: 8, fontWeight: "bold", color: "#000" }}
              >
                {initialValues?.homeTeamRank}
              </span>
            ) : (
              <Form.Item name="homeTeamRank" noStyle>
                <InputNumber
                  size="small"
                  style={{
                    width: 60,
                    marginLeft: 8,
                    border: errorFields.includes("homeTeamRank")
                      ? "1px solid #ff4d4f"
                      : undefined,
                  }}
                  min={1}
                  readOnly={!selectedHomeTeamId}
                  onClick={() =>
                    !selectedHomeTeamId && message.warning("请先选择球队")
                  }
                />
              </Form.Item>
            )}
          </div>
          <TeamAvatar />
          {readOnly ? (
            <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 24 }}>
              {getTeamName(initialValues?.homeTeamId)}
            </div>
          ) : (
            <Form.Item
              name="homeTeamId"
              validateStatus={errorFields.includes("homeTeamId") ? "error" : ""}
            >
              <Select
                placeholder="选择主队"
                size="large"
                onDropdownVisibleChange={handleTeamDropdownVisibleChange}
                notFoundContent={selectedLeagueId ? teamNotFoundContent : null}
              >
                {filteredTeams.map((t) => (
                  <Select.Option key={t.id} value={t.id}>
                    {t.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <div style={{ marginTop: 24 }}>
            <div style={{ marginBottom: 16, fontWeight: "bold" }}>
              主队近期战绩
            </div>
            <Space direction="vertical">
              <Space>
                <Form.Item name="homeForm1" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("homeForm1")}
                  />
                </Form.Item>
                <Form.Item name="homeForm2" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("homeForm2")}
                  />
                </Form.Item>
                <Form.Item name="homeForm3" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("homeForm3")}
                  />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item name="homeForm4" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("homeForm4")}
                  />
                </Form.Item>
                <Form.Item name="homeForm5" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("homeForm5")}
                  />
                </Form.Item>
                <Form.Item name="homeForm6" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("homeForm6")}
                  />
                </Form.Item>
              </Space>
            </Space>
          </div>
        </Col>

        {/* 中间区域 */}
        <Col span={8} style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 32,
              marginTop: 40,
            }}
          >
            {readOnly ? (
              <ScoreInput value={initialValues?.score} readOnly={true} />
            ) : (
              <Form.Item name="score" style={{ marginBottom: 0 }}>
                <ScoreInput />
              </Form.Item>
            )}
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 16, fontWeight: "bold" }}>历史交锋</div>
            <Space direction="vertical">
              <Form.Item name="historyH2H1" noStyle>
                <StatusSelectorHorizontal
                  readOnly={readOnly}
                  hasError={errorFields.includes("historyH2H1")}
                />
              </Form.Item>
              <div style={{ height: 8 }} />
              <Form.Item name="historyH2H2" noStyle>
                <StatusSelectorHorizontal
                  readOnly={readOnly}
                  hasError={errorFields.includes("historyH2H2")}
                />
              </Form.Item>
              <div style={{ height: 8 }} />
              <Form.Item name="historyH2H3" noStyle>
                <StatusSelectorHorizontal
                  readOnly={readOnly}
                  hasError={errorFields.includes("historyH2H3")}
                />
              </Form.Item>
            </Space>
          </div>

          <div style={{ marginTop: 32 }}>
            <div style={{ marginBottom: 8, fontWeight: "bold" }}>理论赔率</div>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="theoryWin">
                  <Input
                    variant="outlined"
                    readOnly
                    style={{ textAlign: "center", color: "#000" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="theoryDraw">
                  <Input
                    variant="outlined"
                    readOnly
                    style={{ textAlign: "center", color: "#000" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="theoryLose">
                  <Input
                    variant="outlined"
                    readOnly
                    style={{ textAlign: "center", color: "#000" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={24}>
                <Form.Item name="theoryWater">
                  <Input
                    variant="outlined"
                    readOnly
                    style={{ textAlign: "center", color: "#000" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {readOnly ? (
            <div
              style={{
                marginTop: 16,
                padding: 12,
                background: "#f5f5f5",
                borderRadius: 8,
                minHeight: 80,
                textAlign: "left",
              }}
            >
              <div style={{ color: "#888", fontSize: 12, marginBottom: 4 }}>
                备注
              </div>
              {initialValues?.remark || "无备注"}
            </div>
          ) : (
            <>
              <Form.Item name="remark">
                <Button block size="large" style={{ marginTop: 16 }}>
                  备注
                </Button>
              </Form.Item>
              <Form.Item name="remark" noStyle>
                <Input.TextArea rows={4} placeholder="备注信息" />
              </Form.Item>
            </>
          )}
        </Col>

        {/* 客队区域 */}
        <Col span={8} style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 8, color: "#888" }}>
            名次
            {readOnly ? (
              <span
                style={{ marginLeft: 8, fontWeight: "bold", color: "#000" }}
              >
                {initialValues?.awayTeamRank}
              </span>
            ) : (
              <Form.Item name="awayTeamRank" noStyle>
                <InputNumber
                  size="small"
                  style={{
                    width: 60,
                    marginLeft: 8,
                    border: errorFields.includes("awayTeamRank")
                      ? "1px solid #ff4d4f"
                      : undefined,
                  }}
                  min={1}
                  readOnly={!selectedAwayTeamId}
                  onClick={() =>
                    !selectedAwayTeamId && message.warning("请先选择球队")
                  }
                />
              </Form.Item>
            )}
          </div>
          <TeamAvatar />
          {readOnly ? (
            <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 24 }}>
              {getTeamName(initialValues?.awayTeamId)}
            </div>
          ) : (
            <Form.Item
              name="awayTeamId"
              validateStatus={errorFields.includes("awayTeamId") ? "error" : ""}
            >
              <Select
                placeholder="选择客队"
                size="large"
                onDropdownVisibleChange={handleTeamDropdownVisibleChange}
                notFoundContent={selectedLeagueId ? teamNotFoundContent : null}
              >
                {filteredTeams.map((t) => (
                  <Select.Option key={t.id} value={t.id}>
                    {t.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <div style={{ marginTop: 24 }}>
            <div style={{ marginBottom: 16, fontWeight: "bold" }}>
              客队近期战绩
            </div>
            <Space direction="vertical">
              <Space>
                <Form.Item name="awayForm1" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("awayForm1")}
                  />
                </Form.Item>
                <Form.Item name="awayForm2" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("awayForm2")}
                  />
                </Form.Item>
                <Form.Item name="awayForm3" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("awayForm3")}
                  />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item name="awayForm4" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("awayForm4")}
                  />
                </Form.Item>
                <Form.Item name="awayForm5" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("awayForm5")}
                  />
                </Form.Item>
                <Form.Item name="awayForm6" noStyle>
                  <StatusSelectorHorizontal
                    readOnly={readOnly}
                    hasError={errorFields.includes("awayForm6")}
                  />
                </Form.Item>
              </Space>
            </Space>
          </div>

          <div style={{ marginTop: 32, textAlign: "left" }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>欧洲赔率</div>
            <Row gutter={8}>
              <Col span={8} style={{ textAlign: "center" }}>
                胜
              </Col>
              <Col span={8} style={{ textAlign: "center" }}>
                平
              </Col>
              <Col span={8} style={{ textAlign: "center" }}>
                负
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                {renderField(
                  "euroInitWin",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.euroInitWin
                )}
              </Col>
              <Col span={8}>
                {renderField(
                  "euroInitDraw",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.euroInitDraw
                )}
              </Col>
              <Col span={8}>
                {renderField(
                  "euroInitLose",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.euroInitLose
                )}
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                {renderField(
                  "euroCurWin",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.euroCurWin
                )}
              </Col>
              <Col span={8}>
                {renderField(
                  "euroCurDraw",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.euroCurDraw
                )}
              </Col>
              <Col span={8}>
                {renderField(
                  "euroCurLose",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.euroCurLose
                )}
              </Col>
            </Row>

            <div
              style={{ textAlign: "center", marginBottom: 8, marginTop: 16 }}
            >
              亚洲盘口
            </div>
            <Row gutter={8}>
              <Col span={8} style={{ textAlign: "center" }}>
                主
              </Col>
              <Col span={8} style={{ textAlign: "center" }}>
                盘
              </Col>
              <Col span={8} style={{ textAlign: "center" }}>
                客
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                {renderField(
                  "asiaInitHomeOdds",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.asiaInitHomeOdds
                )}
              </Col>
              <Col span={8}>
                {renderField(
                  "asiaInitHandicap",
                  <Select
                    style={{ width: "100%" }}
                    size="small"
                    options={handicapOptions}
                  />,
                  () => initialValues?.asiaInitHandicap
                )}
              </Col>
              <Col span={8}>
                {renderField(
                  "asiaInitAwayOdds",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.asiaInitAwayOdds
                )}
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                {renderField(
                  "asiaCurHomeOdds",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.asiaCurHomeOdds
                )}
              </Col>
              <Col span={8}>
                {renderField(
                  "asiaCurHandicap",
                  <Select
                    style={{ width: "100%" }}
                    size="small"
                    options={handicapOptions}
                  />,
                  () => initialValues?.asiaCurHandicap
                )}
              </Col>
              <Col span={8}>
                {renderField(
                  "asiaCurAwayOdds",
                  <InputNumber
                    style={{ width: "100%" }}
                    step="0.01"
                    stringMode
                    precision={2}
                    size="small"
                  />,
                  () => initialValues?.asiaCurAwayOdds
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {!readOnly && (
        <div style={{ textAlign: "center", marginTop: 40, marginBottom: 40 }}>
          <Space size="large">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: 120 }}
            >
              确定
            </Button>
            <Button size="large" onClick={onCancel} style={{ width: 120 }}>
              取消
            </Button>
          </Space>
        </div>
      )}
    </Form>
  );
};

export default MatchForm;
