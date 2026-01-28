import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Tag, Badge, Tabs, Typography, Empty } from 'antd';
import { Plus, RefreshCw, Link } from 'lucide-react';
import { getMockIntegrations } from '../../services/mockService';
import { Integration } from '../../types';

const { Title, Paragraph } = Typography;

const IntegrationHub: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  useEffect(() => {
    setIntegrations(getMockIntegrations());
  }, []);

  const getStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return <Badge status="success" text="运行正常" />;
      case 'error': return <Badge status="error" text="连接失败" />;
      case 'token_expired': return <Badge status="warning" text="授权过期" />;
      default: return <Badge status="default" text="未连接" />;
    }
  };

  const renderCard = (item: Integration) => (
    <Col xs={24} md={12} xl={8} key={item.id}>
      <Card 
        actions={[
          <Button type="text" key="config" icon={<Link size={16} />}>配置权限</Button>,
          <Button type="text" key="sync" icon={<RefreshCw size={16} />}>立即同步</Button>
        ]}
        className="shadow-sm hover:shadow-md transition-all"
      >
        <Card.Meta
          avatar={
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-bold text-gray-500">
              {item.name.substring(0, 1)}
            </div>
          }
          title={
            <div className="flex justify-between items-center">
              <span className="truncate max-w-[140px]">{item.name}</span>
              <span className="text-xs font-normal">{getStatusBadge(item.status)}</span>
            </div>
          }
          description={
            <div className="mt-2 space-y-2">
              <div className="text-xs text-gray-400">上次同步: {item.lastSync}</div>
              <div className="flex flex-wrap gap-1">
                {item.capabilities.map(cap => (
                  <Tag key={cap} color={cap === 'action' ? 'red' : cap === 'monitor' ? 'blue' : 'purple'} bordered={false}>
                    {cap === 'action' ? '可执行' : cap === 'monitor' ? '监控' : '读取'}
                  </Tag>
                ))}
              </div>
            </div>
          }
        />
      </Card>
    </Col>
  );

  const items = [
    {
      key: 'all',
      label: '全部平台',
      children: (
        <Row gutter={[16, 16]}>
          {integrations.map(renderCard)}
          <Col xs={24} md={12} xl={8}>
            <Button type="dashed" block className="h-full min-h-[180px] flex flex-col items-center justify-center text-gray-400">
              <Plus size={24} className="mb-2" />
              连接新店铺
            </Button>
          </Col>
        </Row>
      ),
    },
    {
      key: 'domestic',
      label: '国内电商',
      children: <Row gutter={[16, 16]}>{integrations.filter(i => i.type === 'domestic').map(renderCard)}</Row>,
    },
    {
      key: 'crossborder',
      label: '跨境电商',
      children: <Row gutter={[16, 16]}>{integrations.filter(i => i.type === 'crossborder').map(renderCard)}</Row>,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex justify-between items-end">
        <div>
          <Title level={3} style={{ marginBottom: 0 }}>集成中心</Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>管理全球电商平台连接，配置数据读取与执行权限。</Paragraph>
        </div>
        <Button type="primary" icon={<Plus size={16} />}>添加新店铺</Button>
      </div>

      <Tabs defaultActiveKey="all" items={items} />
    </div>
  );
};

export default IntegrationHub;