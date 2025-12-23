import React, { useState, useEffect } from 'react';
import { Input, Popover, Button, Row, Col } from 'antd';

interface ScoreInputProps {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const ScoreInput: React.FC<ScoreInputProps> = ({ value, onChange, readOnly }) => {
  const [home, setHome] = useState('0');
  const [away, setAway] = useState('0');
  const [activeField, setActiveField] = useState<'home' | 'away' | null>(null);

  useEffect(() => {
    if (value) {
      const parts = value.split(':');
      if (parts.length === 2) {
        setHome(parts[0]);
        setAway(parts[1]);
      }
    } else {
        // Default to 0:0 if no value
        if (onChange) {
             // Only trigger onChange if it's not already 0:0 to avoid loops if parent updates on change
             // But here we just set local state. 
             // Actually, if value is undefined, we should probably treat it as 0:0
        }
        setHome('0');
        setAway('0');
    }
  }, [value]);

  // Trigger initial 0:0 if value is missing
  useEffect(() => {
      if (!value && onChange) {
          onChange('0:0');
      }
  }, []);

  const handleNumClick = (num: number) => {
    if (!activeField) return;
    
    let currentVal = activeField === 'home' ? home : away;
    if (currentVal === '0') currentVal = ''; // Clear leading zero
    
    const newVal = currentVal + num.toString();
    updateValue(activeField, newVal);
  };

  const handleBackspace = () => {
    if (!activeField) return;
    let currentVal = activeField === 'home' ? home : away;
    const newVal = currentVal.slice(0, -1) || '0';
    updateValue(activeField, newVal);
  };
  
  const handleClear = () => {
      if (!activeField) return;
      updateValue(activeField, '0');
  }

  const updateValue = (field: 'home' | 'away', val: string) => {
    const newHome = field === 'home' ? val : home;
    const newAway = field === 'away' ? val : away;
    
    if (field === 'home') setHome(val);
    else setAway(val);

    onChange?.(`${newHome}:${newAway}`);
  };

  const content = (
    <div style={{ width: 200 }}>
      <Row gutter={[8, 8]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <Col span={8} key={num}>
            <Button block onClick={() => handleNumClick(num)} size="large" style={{ fontWeight: 'bold' }}>{num}</Button>
          </Col>
        ))}
        <Col span={8}><Button block onClick={handleClear} size="large" danger>C</Button></Col>
        <Col span={8}><Button block onClick={() => handleNumClick(0)} size="large" style={{ fontWeight: 'bold' }}>0</Button></Col>
        <Col span={8}><Button block onClick={handleBackspace} size="large">←</Button></Col>
      </Row>
    </div>
  );

  if (readOnly) {
      return <div style={{ fontSize: 32, fontWeight: 'bold' }}>{value || '0:0'}</div>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <Popover 
        content={content} 
        trigger="click" 
        open={activeField === 'home'} 
        onOpenChange={(open) => !open && setActiveField(null)}
        placement="bottom"
      >
        <Input 
          value={home} 
          readOnly 
          style={{ 
              width: 80, 
              textAlign: 'center', 
              fontSize: 24, 
              fontWeight: 'bold', 
              cursor: 'pointer',
              backgroundColor: activeField === 'home' ? '#e6f7ff' : '#fff',
              borderColor: activeField === 'home' ? '#1890ff' : '#d9d9d9'
            }} 
          onClick={() => setActiveField('home')}
        />
      </Popover>
      <span style={{ fontSize: 24, fontWeight: 'bold' }}>:</span>
      <Popover 
        content={content} 
        trigger="click" 
        open={activeField === 'away'} 
        onOpenChange={(open) => !open && setActiveField(null)}
        placement="bottom"
      >
        <Input 
          value={away} 
          readOnly 
          style={{ 
              width: 80, 
              textAlign: 'center', 
              fontSize: 24, 
              fontWeight: 'bold', 
              cursor: 'pointer',
              backgroundColor: activeField === 'away' ? '#e6f7ff' : '#fff',
              borderColor: activeField === 'away' ? '#1890ff' : '#d9d9d9'
            }} 
          onClick={() => setActiveField('away')}
        />
      </Popover>
    </div>
  );
};

export default ScoreInput;
