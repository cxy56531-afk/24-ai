import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Typography, Space } from 'antd';
import { getMockInbox } from '../../services/mockService';
import { AlertItem } from '../../types';

const { Title } = Typography;

const Inbox: React.FC = () => {
  const [data, setData] = useState<AlertItem[]>([]);

  useEffect(() => {
    setData(getMockInbox());
  }, []);

  const columns = [
    {
      title: '警报标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: AlertItem) => (
        <div>
          <div className="font-bold">{text}</div>
          <div className="text-xs text-gray-500">{record.message}</div>
        </div>
      ),
    },
    {
      title: '店铺/平台',
      dataIndex: 'platform',
      key: 'platform',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: '优先级',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const color = level === 'high' ? 'red' : level === 'medium' ? 'orange' : 'blue';
        return <Tag color={color}>{level.toUpperCase()}</Tag>;
      },
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      className: 'text-gray-400 text-xs',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: AlertItem) => (
        <Button type="link" size="small">
          去处理
        </Button>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} style={{ margin: 0 }}>待处理事项 (Inbox)</Title>
        <Space>
           <Button>标为已读</Button>
           <Button type="primary">刷新列表</Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />
    </div>
  );
};

export default Inbox;