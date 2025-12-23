import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Row, Col, Button, Space, InputNumber } from 'antd';
import { DefaultApi } from '../apis/DefaultApi';
import type { League, Team, Match } from '../apis/DefaultApi';

interface StatusSelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

const StatusSelectorHorizontal: React.FC<StatusSelectorProps> = ({ value, onChange, readOnly }) => {
    const options = [
      { val: 1, label: '胜', color: '#52c41a' },
      { val: 2, label: '平', color: '#1890ff' },
      { val: 0, label: '负', color: '#ff4d4f' },
    ];
  
    return (
      <Space size="small">
        {options.map((opt) => (
          <div
            key={opt.val}
            onClick={() => !readOnly && onChange?.(opt.val)}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: value === opt.val ? opt.color : '#f0f0f0',
              color: value === opt.val ? '#fff' : '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: readOnly ? 'default' : 'pointer',
              border: '1px solid #d9d9d9',
              fontSize: 12,
              fontWeight: value === opt.val ? 'bold' : 'normal',
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
  const color = React.useMemo(() => '#' + Math.floor(Math.random()*16777215).toString(16), []);
  return (
    <div style={{ 
      width: size, 
      height: size, 
      borderRadius: '50%', 
      backgroundColor: color, 
      margin: '0 auto 16px',
      border: '4px solid #fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }} />
  );
};

// Generate handicap options from -3 to 3 with 0.25 step
const handicapOptions = Array.from({ length: 25 }, (_, i) => {
  const val = (i - 12) * 0.25;
  return { label: val.toString(), value: val.toString() };
});

const MatchForm: React.FC<MatchFormProps> = ({ initialValues, onFinish, onCancel, readOnly, form }) => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaguesRes, teamsRes] = await Promise.all([
          DefaultApi.baseUrlLeaguesGet(),
          DefaultApi.baseUrlTeamsGet()
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
  const renderField = (name: string, renderInput: React.ReactNode, renderText: () => React.ReactNode, rules: any[] = []) => {
    if (readOnly) {
      return <div style={{ minHeight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{renderText()}</div>;
    }
    return (
      <Form.Item name={name} rules={rules} style={{ marginBottom: 0 }}>
        {renderInput}
      </Form.Item>
    );
  };

  const getLeagueName = (id?: number) => leagues.find(l => l.id === id)?.name || '-';
  const getTeamName = (id?: number) => teams.find(t => t.id === id)?.name || '-';

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      {/* 联赛选择 */}
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Col span={8} style={{ textAlign: 'center' }}>
            {readOnly ? (
                <div style={{ fontSize: 18, fontWeight: 'bold', padding: '4px 0' }}>
                    {getLeagueName(initialValues?.leagueId)}
                </div>
            ) : (
                <Form.Item name="leagueId" rules={[{ required: true, message: '请选择联赛' }]}>
                    <Select placeholder="选择联赛" size="large" style={{ textAlign: 'center' }}>
                    {leagues.map(l => <Select.Option key={l.id} value={l.id}>{l.name}</Select.Option>)}
                    </Select>
                </Form.Item>
            )}
        </Col>
      </Row>

      <Row gutter={48} align="top">
        {/* 主队区域 */}
        <Col span={8} style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 8, color: '#888' }}>
            名次
            {readOnly ? (
               <span style={{ marginLeft: 8, fontWeight: 'bold', color: '#000' }}>{initialValues?.homeTeamRank}</span>
            ) : (
               <Form.Item name="homeTeamRank" noStyle>
                 <InputNumber size="small" style={{ width: 60, marginLeft: 8 }} min={1} />
               </Form.Item>
            )}
          </div>
          <TeamAvatar />
          {readOnly ? (
             <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 24 }}>{getTeamName(initialValues?.homeTeamId)}</div>
          ) : (
            <Form.Item name="homeTeamId" rules={[{ required: true, message: '请选择主队' }]}>
                <Select placeholder="选择主队" size="large">
                {teams.map(t => <Select.Option key={t.id} value={t.id}>{t.name}</Select.Option>)}
                </Select>
            </Form.Item>
          )}
          
          <div style={{ marginTop: 24 }}>
            <div style={{ marginBottom: 16, fontWeight: 'bold' }}>主队近期战绩</div>
            <Space direction="vertical">
                <Space>
                    <Form.Item name="homeForm1" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                    <Form.Item name="homeForm2" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                    <Form.Item name="homeForm3" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                </Space>
                <Space>
                    <Form.Item name="homeForm4" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                    <Form.Item name="homeForm5" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                    <Form.Item name="homeForm6" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                </Space>
            </Space>
          </div>
        </Col>

        {/* 中间区域 */}
        <Col span={8} style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, marginTop: 40 }}>
             {readOnly ? (
                 <div style={{ fontSize: 32, fontWeight: 'bold' }}>{initialValues?.score || '-:-'}</div>
             ) : (
                <Form.Item name="score" style={{ marginBottom: 0, width: 120 }}>
                    <Input placeholder="比分" style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }} />
                </Form.Item>
             )}
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 16, fontWeight: 'bold' }}>历史交锋</div>
            <Space direction="vertical">
                <Form.Item name="historyH2H1" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                <div style={{ height: 8 }} />
                <Form.Item name="historyH2H2" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                <div style={{ height: 8 }} />
                <Form.Item name="historyH2H3" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
            </Space>
          </div>

          <div style={{ marginTop: 32 }}>
            <div style={{ marginBottom: 8, fontWeight: 'bold' }}>理论赔率</div>
            <Row gutter={16}>
                <Col span={8}><Form.Item name="theoryWin"><Input variant="outlined" readOnly style={{ textAlign: 'center', borderBottom: '1px solid #d9d9d9', color: '#000' }} /></Form.Item></Col>
                <Col span={8}><Form.Item name="theoryDraw"><Input variant="outlined" readOnly style={{ textAlign: 'center', borderBottom: '1px solid #d9d9d9', color: '#000' }} /></Form.Item></Col>
                <Col span={8}><Form.Item name="theoryLose"><Input variant="outlined" readOnly style={{ textAlign: 'center', borderBottom: '1px solid #d9d9d9', color: '#000' }} /></Form.Item></Col>
            </Row>
            <Row justify="center">
                <Col span={24}><Form.Item name="theoryWater" ><Input variant="outlined" readOnly style={{ textAlign: 'center', color: '#000' }} /></Form.Item></Col>
            </Row>
          </div>
          
          {readOnly ? (
              <div style={{ marginTop: 16, padding: 12, background: '#f5f5f5', borderRadius: 8, minHeight: 80, textAlign: 'left' }}>
                  <div style={{ color: '#888', fontSize: 12, marginBottom: 4 }}>备注</div>
                  {initialValues?.remark || '无备注'}
              </div>
          ) : (
            <>
                <Form.Item name="remark">
                    <Button block size="large" style={{ marginTop: 16 }}>备注</Button>
                </Form.Item>
                <Form.Item name="remark" noStyle>
                    <Input.TextArea rows={4} placeholder="备注信息" />
                </Form.Item>
            </>
          )}

        </Col>

        {/* 客队区域 */}
        <Col span={8} style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 8, color: '#888' }}>
            名次
            {readOnly ? (
               <span style={{ marginLeft: 8, fontWeight: 'bold', color: '#000' }}>{initialValues?.awayTeamRank}</span>
            ) : (
               <Form.Item name="awayTeamRank" noStyle>
                 <InputNumber size="small" style={{ width: 60, marginLeft: 8 }} min={1} />
               </Form.Item>
            )}
          </div>
          <TeamAvatar />
          {readOnly ? (
             <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 24 }}>{getTeamName(initialValues?.awayTeamId)}</div>
          ) : (
            <Form.Item name="awayTeamId" rules={[{ required: true, message: '请选择客队' }]}>
                <Select placeholder="选择客队" size="large">
                {teams.map(t => <Select.Option key={t.id} value={t.id}>{t.name}</Select.Option>)}
                </Select>
            </Form.Item>
          )}

          <div style={{ marginTop: 24 }}>
            <div style={{ marginBottom: 16, fontWeight: 'bold' }}>客队近期战绩</div>
            <Space direction="vertical">
                <Space>
                    <Form.Item name="awayForm1" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                    <Form.Item name="awayForm2" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                    <Form.Item name="awayForm3" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                </Space>
                <Space>
                    <Form.Item name="awayForm4" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                    <Form.Item name="awayForm5" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                    <Form.Item name="awayForm6" noStyle><StatusSelectorHorizontal readOnly={readOnly} /></Form.Item>
                </Space>
            </Space>
          </div>

          <div style={{ marginTop: 32, textAlign: 'left' }}>
             <div style={{ textAlign: 'center', marginBottom: 8 }}>欧洲赔率</div>
             <Row gutter={8}>
                <Col span={8} style={{ textAlign: 'center' }}>胜</Col>
                <Col span={8} style={{ textAlign: 'center' }}>平</Col>
                <Col span={8} style={{ textAlign: 'center' }}>负</Col>
             </Row>
             <Row gutter={8}>
                <Col span={8}>{renderField("euroInitWin", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.euroInitWin)}</Col>
                <Col span={8}>{renderField("euroInitDraw", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.euroInitDraw)}</Col>
                <Col span={8}>{renderField("euroInitLose", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.euroInitLose)}</Col>
             </Row>
             <Row gutter={8}>
                <Col span={8}>{renderField("euroCurWin", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.euroCurWin)}</Col>
                <Col span={8}>{renderField("euroCurDraw", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.euroCurDraw)}</Col>
                <Col span={8}>{renderField("euroCurLose", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.euroCurLose)}</Col>
             </Row>

             <div style={{ textAlign: 'center', marginBottom: 8, marginTop: 16 }}>亚洲盘口</div>
             <Row gutter={8}>
                <Col span={8} style={{ textAlign: 'center' }}>主</Col>
                <Col span={8} style={{ textAlign: 'center' }}>盘</Col>
                <Col span={8} style={{ textAlign: 'center' }}>客</Col>
             </Row>
             <Row gutter={8}>
                <Col span={8}>{renderField("asiaInitHomeOdds", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.asiaInitHomeOdds)}</Col>
                <Col span={8}>{renderField("asiaInitHandicap", <Select style={{ width: '100%' }} size="small" options={handicapOptions} />, () => initialValues?.asiaInitHandicap)}</Col>
                <Col span={8}>{renderField("asiaInitAwayOdds", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.asiaInitAwayOdds)}</Col>
             </Row>
             <Row gutter={8}>
                <Col span={8}>{renderField("asiaCurHomeOdds", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.asiaCurHomeOdds)}</Col>
                <Col span={8}>{renderField("asiaCurHandicap", <Select style={{ width: '100%' }} size="small" options={handicapOptions} />, () => initialValues?.asiaCurHandicap)}</Col>
                <Col span={8}>{renderField("asiaCurAwayOdds", <InputNumber style={{ width: '100%' }} step="0.01" stringMode precision={2} size="small" />, () => initialValues?.asiaCurAwayOdds)}</Col>
             </Row>
          </div>
        </Col>
      </Row>

      {!readOnly && (
        <div style={{ textAlign: 'center', marginTop: 40, marginBottom: 40 }}>
            <Space size="large">
                <Button type="primary" htmlType="submit" size="large" style={{ width: 120 }}>确定</Button>
                <Button size="large" onClick={onCancel} style={{ width: 120 }}>取消</Button>
            </Space>
        </div>
      )}
    </Form>
  );
};

export default MatchForm;