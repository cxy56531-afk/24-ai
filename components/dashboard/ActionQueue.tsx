import React, { useEffect, useState } from 'react';
import { List, Button, Tag, Typography, Modal, Space, notification } from 'antd';
import { Check, X, AlertCircle } from 'lucide-react';
import { getMockActionQueue } from '../../services/mockService';
import { ActionTask } from '../../types';

const { Title, Text, Paragraph } = Typography;

const ActionQueue: React.FC = () => {
  const [tasks, setTasks] = useState<ActionTask[]>([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setTasks(getMockActionQueue());
  }, []);

  const handleApprove = (task: ActionTask) => {
    Modal.confirm({
      title: '确认执行此高风险操作？',
      icon: <AlertCircle className="text-yellow-500 mr-2" size={24} />,
      content: `系统将立即对 ${task.platform} 执行 "${task.title}"。此操作不可撤销。`,
      okText: '确认执行',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setTasks(prev => prev.filter(t => t.id !== task.id));
        api.success({
          message: '指令已下发',
          description: `正在执行：${task.title}`,
        });
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {contextHolder}
      <div className="mb-6">
        <Title level={3}>待执行动作队列 (Action Queue)</Title>
        <Paragraph type="secondary">
          为了您的账号安全，所有高风险操作（如发送律师函、暂停广告、调整价格超过10%）均需人工确认。
        </Paragraph>
      </div>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={tasks}
        renderItem={(item) => (
          <List.Item>
            <div className="bg-white p-6 rounded-lg border-l-4 border-l-orange-500 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <Text strong className="text-lg">{item.title}</Text>
                   <Tag color="red">High Risk</Tag>
                   <Tag>{item.platform}</Tag>
                </div>
                <div className="text-gray-500 mb-2">{item.description}</div>
                <div className="text-xs text-gray-400 flex gap-4">
                  <span>创建时间: {item.createdAt}</span>
                  <span>自动过期: {item.autoExpireAt}</span>
                </div>
              </div>
              
              <Space>
                <Button danger icon={<X size={16} />}>拒绝</Button>
                <Button 
                  type="primary" 
                  danger 
                  icon={<Check size={16} />} 
                  onClick={() => handleApprove(item)}
                  size="large"
                >
                  确认执行
                </Button>
              </Space>
            </div>
          </List.Item>
        )}
      />
      
      {tasks.length === 0 && (
         <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Check size={48} className="text-[#52c41a] mb-4 mx-auto" />
            <Title level={4}>太棒了！</Title>
            <Text type="secondary">当前没有待审批的高风险动作。</Text>
         </div>
      )}
    </div>
  );
};

export default ActionQueue;