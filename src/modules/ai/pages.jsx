import React from "react";
import { ArrowRight, BarChart3, Bot, ClipboardCheck, Layers3, Settings2 } from "lucide-react";
import { AiSuggestionCard, emitDemoFeedback, MetricGrid, PageHeader, StatusTag } from "../../components/ui.jsx";
import { aiCapabilities } from "../../data/mock/procurement.js";

const layerCoverage = [
  { label: "工作台", text: "采购员、供应商、运营人员在待办区看到优先处理建议。", path: "/buyer/workbench" },
  { label: "业务总览", text: "采购运营驾驶舱解释 RFQ、PO、治理和集成堵点。", path: "/ops/flow-overview" },
  { label: "管理后台", text: "商品审核、物料治理、价格库把建议变成人工确认动作。", path: "/ops/audit" },
  { label: "数据看板", text: "AI 采纳率、低置信待确认、补参成功数进入经营结果。", path: "/ops/dashboard" }
];

const suggestionExamples = [
  {
    type: "比价建议",
    title: "推荐华南电气作为 RFQ-20260613-006 首选报价",
    businessObject: "RFQ-20260613-006 / MAT-LIGHT-1200",
    judgment: "价格不是最低，但交期、库存和资质综合最稳",
    evidence: ["历史价低 10.6%", "供应商评分 96", "CCC 资质有效期剩余 128 天"],
    basis: [
      { label: "历史价", value: "90 天均价 ￥43.20" },
      { label: "协议价", value: "当前协议价 ￥38.60" },
      { label: "供应商评分", value: "96 / 准时率 96%" },
      { label: "资质有效期", value: "CCC 剩余 128 天" },
      { label: "相似物料", value: "MAT-LIGHT-1200 命中 34 次采购" },
      { label: "低置信原因", value: "本地仓报价更低但资质待复核" }
    ],
    action: "跳转采购比价",
    path: "/buyer/compare",
    confidence: "高"
  },
  {
    type: "治理建议",
    title: "将车库灯、管灯、长条灯合并到标准物料",
    businessObject: "GOV-MAT-046 / 地下车库照明",
    judgment: "同义词影响搜索命中和价格库口径",
    evidence: ["相似物料 12 条", "搜索命中预计 +22%", "价格库异常依赖统一口径"],
    basis: [
      { label: "历史价", value: "同类物料均价波动 12.8%" },
      { label: "协议价", value: "待绑定标准物料后生效" },
      { label: "供应商评分", value: "关联供应商 89-96 分" },
      { label: "资质有效期", value: "2 家供应商证照临期" },
      { label: "相似物料", value: "车库灯/管灯/LED支架灯" },
      { label: "低置信原因", value: "DN/功率规格仍需人工确认" }
    ],
    action: "跳转物料治理",
    path: "/ops/materials",
    confidence: "需确认"
  }
];

export function AiOverview({ navigate }) {
  const jump = (path, label) => {
    navigate(path);
    emitDemoFeedback({
      tone: "info",
      title: `已打开：${label}`,
      message: "AI 能力中心只做业务端跳转和建议解释，不进入规则配置、提示词管理或训练台。"
    });
  };

  return (
    <section className="page-stack ai-overview-page">
      <PageHeader
        eyebrow="AI 能力中心"
        title="AI 能力动作化总览：每张卡都能进入业务页面"
        description="AI 不是独立聊天窗口，而是嵌入工作台、业务总览、管理后台和数据看板的横向决策层。"
        actions={
          <button className="primary-button" onClick={() => jump("/mall/search", "AI 找货")}>
            <Bot size={16} />
            进入 AI 找货
          </button>
        }
      />
      <MetricGrid
        items={[
          { label: "覆盖结构", value: "4层", detail: "工作台/总览/后台/看板" },
          { label: "动作化能力", value: "7类", detail: "全部绑定业务页" },
          { label: "AI 采纳率", value: "84%", detail: "数据看板指标" },
          { label: "低置信待确认", value: "23", detail: "保留人工复核" }
        ]}
      />

      <div className="ai-capability-grid">
        {aiCapabilities.map((capability) => (
          <button className="ai-capability-card" key={capability.name} onClick={() => jump(capability.path, capability.name)}>
            <div>
              <span>
                <SparkIcon name={capability.name} />
                {capability.name}
              </span>
              <StatusTag tone={capability.confidence === "需确认" ? "warning" : "success"}>{capability.layer}</StatusTag>
            </div>
            <h3>{capability.object}</h3>
            <dl>
              <div>
                <dt>业务页面</dt>
                <dd>{capability.domains}</dd>
              </div>
              <div>
                <dt>判断输入</dt>
                <dd>{capability.input}</dd>
              </div>
              <div>
                <dt>输出</dt>
                <dd>{capability.output}</dd>
              </div>
            </dl>
            <span className="ai-card-route">
              {capability.action} <ArrowRight size={15} />
            </span>
          </button>
        ))}
      </div>

      <section className="panel ai-layer-panel">
        <div className="ai-section-head">
          <div>
            <span className="eyebrow">四层覆盖</span>
            <h2>AI 建议必须出现在真实工作位置</h2>
          </div>
          <Layers3 size={20} />
        </div>
        <div className="ai-layer-grid">
          {layerCoverage.map((item) => (
            <button key={item.label} onClick={() => jump(item.path, item.label)}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </section>

      <div className="ai-suggestion-overview">
        {suggestionExamples.map((item) => (
          <AiSuggestionCard
            key={item.title}
            type={item.type}
            title={item.title}
            businessObject={item.businessObject}
            judgment={item.judgment}
            evidence={item.evidence}
            basis={item.basis}
            confidence={item.confidence}
            action={item.action}
            secondaryAction="转人工确认"
            onPrimaryAction={() => jump(item.path, item.action)}
            lowConfidenceReasons={item.confidence === "需确认" ? ["规格候选接近", "部分资质有效期需人工核验"] : []}
          />
        ))}
      </div>

      <div className="ai-boundary-strip">
        <span><Settings2 size={16} />不做 AI 规则配置</span>
        <span><ClipboardCheck size={16} />不做提示词管理</span>
        <span><BarChart3 size={16} />不做反馈训练台</span>
      </div>
    </section>
  );
}

function SparkIcon({ name }) {
  if (name.includes("审核")) return <ClipboardCheck size={16} />;
  if (name.includes("预警")) return <BarChart3 size={16} />;
  return <Bot size={16} />;
}
