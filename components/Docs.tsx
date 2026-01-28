import React from 'react';
import { Book, Shield, Zap } from 'lucide-react';

const Docs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">帮助中心</h1>
        
        <div className="grid gap-8">
          <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Zap className="w-6 h-6 text-indigo-600 mr-2" />
              快速入门 (Quick Start)
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-slate-700">
              <li>
                <strong>注册并登录：</strong> 使用手机号或邮箱完成注册。
              </li>
              <li>
                <strong>绑定店铺/平台：</strong> 在控制台左侧选择对应平台 (Amazon/Taobao)，输入店铺 ID 或产品链接。
              </li>
              <li>
                <strong>配置策略：</strong> 在控制台顶部输入指令，如 "监控 ASIN B08XXXXX"，或开启快捷开关。
              </li>
              <li>
                <strong>接收通知：</strong> 建议扫码绑定微信，重要警报（如跟卖、熔断）会实时推送到微信。
              </li>
            </ol>
          </section>

          <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <Shield className="w-6 h-6 text-emerald-600 mr-2" />
              安全声明 (Security)
            </h2>
            <div className="prose text-slate-700">
              <p className="mb-4">
                ClawdCom 深知电商数据的敏感性，我们采用企业级安全标准保护您的数据。
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>独立 IP 隔离：</strong> 每个企业版账户使用独立的 Docker 容器和 IP 地址，防止关联风险。</li>
                <li><strong>数据不共用：</strong> 您的选品和运营数据仅供您的 AI 模型使用，不会用于训练通用模型。</li>
                <li><strong>只读权限：</strong> 我们建议您仅授权 AWS/店铺后台的必要 API 权限（如广告读取、库存读取）。</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Docs;