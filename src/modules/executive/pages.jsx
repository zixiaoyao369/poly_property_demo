import React from "react";
import { AlertTriangle, ArrowRight, Bot, CheckCircle2, Clock3, Gauge, GitBranch, Network, Route, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { AiSuggestionCard, emitDemoFeedback, PageHeader, RiskAlertBar, StatusTag } from "../../components/ui.jsx";

const valueCards = [
  {
    title: "采购规模可运营",
    value: "3亿+",
    detail: "把商城采购体量纳入标准目录、价格库和治理看板。"
  },
  {
    title: "找货与提报提效",
    value: "场景化",
    detail: "AI 找货、图片识别、非标需求结构化进入采购闭环。"
  },
  {
    title: "成本风险可控",
    value: "可解释",
    detail: "历史价、协议价、比价、审批风险联动提示。"
  },
  {
    title: "供应商与物料可治理",
    value: "可沉淀",
    detail: "资质、履约、重复物料、规格参数持续治理。"
  }
];

const flowNodes = [
  { label: "员工找货", text: "从物业场景和模糊需求进入", path: "/mall/search" },
  { label: "采购需求池", text: "承接提报并做 AI 分流", path: "/buyer/demands" },
  { label: "询价比价", text: "综合价格、货期、履约与风险", path: "/buyer/compare" },
  { label: "供应商报价履约", text: "报价、确认、发货和异常反馈", path: "/supplier/inquiries" },
  { label: "总部审核治理", text: "商品审核、物料治理和价格库", path: "/ops/materials" },
  { label: "数据看板与集成支撑", text: "管理看板收口，系统集成支撑", path: "/ops/dashboard" }
];

const aiCapabilities = [
  { title: "AI 找货", text: "把场景描述转成类目、商品和采购意图。" },
  { title: "图片/非标识别", text: "承接找不到商品、拍照不确定和非标物料。" },
  { title: "商品参数补全", text: "供应商上架和运营审核时补齐关键属性。" },
  { title: "询价与比价建议", text: "提示直采、询价、补参、报价风险和推荐方案。" },
  { title: "商品审核与物料治理", text: "识别重复物料、缺规格、错别名和审核异常。" },
  { title: "成本预警与风险解释", text: "解释历史价、协议价、预算和履约风险来源。" }
];

const demoPaths = [
  {
    title: "5 分钟高层速览",
    text: "从商城首页进入，快速串起找货、比价、治理和 AI。",
    path: "/mall/home",
    icon: Gauge
  },
  {
    title: "15 分钟完整闭环",
    text: "从员工找货讲到采购、供应商、运营、看板和集成。",
    path: "/mall/home",
    icon: Route
  },
  {
    title: "直接看治理与 AI",
    text: "跳到 AI 能力中心，随后进入物料治理和数据看板。",
    path: "/ai/overview",
    icon: Bot
  }
];

const operationsSummary = [
  { label: "今日新增需求", value: "18", detail: "6 单待补参", path: "/buyer/demands", tone: "processing" },
  { label: "询价中", value: "9", detail: "RFQ-20260613-006 未满 3 家报价", path: "/buyer/inquiry-control", tone: "warning" },
  { label: "待审批", value: "7", detail: "PO-20260613-088 超预算 8.6%", path: "/buyer/approvals", tone: "danger" },
  { label: "履约异常", value: "4", detail: "SO-20260613-221 延迟确认", path: "/supplier/fulfillment", tone: "danger" },
  { label: "治理待办", value: "23", detail: "GOV-MAT-046 阻塞搜索命中", path: "/ops/materials", tone: "warning" },
  { label: "集成异常", value: "3", detail: "OA 审批回写延迟", path: "/integration/overview", tone: "warning" }
];

const flowStages = [
  {
    stage: "需求进入",
    count: "18",
    risk: "地下车库照明需求参数缺口集中",
    timeout: "6 单超过 4 小时未补参",
    object: "REQ-20260613-018",
    owner: "用户端 / 采购分流",
    path: "/buyer/demands",
    tone: "processing"
  },
  {
    stage: "采购处理",
    count: "9",
    risk: "供应商响应不足，影响比价可信度",
    timeout: "2 个 RFQ 距截止不足 6 小时",
    object: "RFQ-20260613-006",
    owner: "采购端 / 询价比价",
    path: "/buyer/inquiry-control",
    tone: "warning"
  },
  {
    stage: "审批下单",
    count: "7",
    risk: "价格高于 90 天均价，需审批说明",
    timeout: "3 单审批超过 SLA",
    object: "PO-20260613-088",
    owner: "采购经理 / 审批人",
    path: "/buyer/approvals",
    tone: "danger"
  },
  {
    stage: "供应商协同",
    count: "11",
    risk: "中标供应商待确认交期",
    timeout: "SO 延迟确认 1 天",
    object: "SO-20260613-221",
    owner: "供应商端 / 履约",
    path: "/supplier/fulfillment",
    tone: "danger"
  },
  {
    stage: "运营治理",
    count: "23",
    risk: "同义物料未合并，反复触发补参",
    timeout: "8 条治理建议未确认",
    object: "GOV-MAT-046",
    owner: "运营端 / 物料治理",
    path: "/ops/materials",
    tone: "warning"
  },
  {
    stage: "集成支撑",
    count: "9",
    risk: "OA 回写、成本占用、物流轨迹异常影响审批下单和履约展示",
    timeout: "OA 最长延迟 32 分钟，物流轨迹延迟 2 单",
    object: "OA / 成本系统 / 京东 IOP / 物流",
    owner: "集成支撑 / 业务链路影响",
    path: "/integration/overview",
    tone: "warning",
    impact: "影响审批回写、预算校验、比价库存、履约轨迹和催办通知"
  }
];

const sampleObjects = [
  { id: "REQ-20260613-018", text: "地下车库照明维修物料需求", path: "/buyer/demands" },
  { id: "RFQ-20260613-006", text: "支架灯、漏保、线缆联合询价", path: "/buyer/compare" },
  { id: "PO-20260613-088", text: "综合比价后生成的采购单", path: "/buyer/purchase-orders" },
  { id: "SO-20260613-221", text: "供应商接单与履约跟踪", path: "/supplier/fulfillment" },
  { id: "GOV-MAT-046", text: "同义物料合并与规格补全", path: "/ops/materials" },
  { id: "RISK-PRICE-031", text: "报价高于 90 天均价 12.8%", path: "/ops/prices" }
];

const operationBlockers = [
  {
    title: "先处理 RFQ-20260613-006 的供应商未响应",
    evidence: ["当前仅 2 家有效报价，低于比价阈值", "6 小时后截止，继续等待会拖慢 PO-20260613-088 审批", "可从询价管控页发起催办或补邀供应商"],
    path: "/buyer/inquiry-control"
  },
  {
    title: "补齐 REQ-20260613-018 的关键规格，避免反复退回",
    evidence: ["缺少支架灯功率与线缆长度", "同类缺参需求今日新增 6 单", "补参后可直接进入询价或转 GOV-MAT-046 治理"],
    path: "/buyer/demands"
  },
  {
    title: "合并 GOV-MAT-046，降低后续搜索和比价噪音",
    evidence: ["照明类重复物料影响 18 条搜索结果", "RISK-PRICE-031 的价格异常依赖标准物料口径", "治理完成会反哺商城搜索、供应商上架和价格库"],
    path: "/ops/materials"
  }
];

function stageToneToLabel(tone) {
  if (tone === "danger") return "高风险";
  if (tone === "warning") return "需关注";
  return "流转中";
}

export function ExecutiveOverview({ navigate }) {
  return (
    <section className="page-stack executive-page">
      <PageHeader
        eyebrow="高层汇报模式"
        title="保利物业采购商城：从交易入口升级为 AI 驱动的采购运营平台"
        description="覆盖员工找货、采购处理、供应商协同、总部治理和系统集成，聚焦降本、提效、控险、可治理。"
        actions={
          <button className="primary-button" onClick={() => navigate("/mall/home")}>
            <TrendingUp size={16} />
            进入 V1 演示
          </button>
        }
      />

      <div className="executive-value-grid">
        {valueCards.map((card) => (
          <article className="executive-value-card" key={card.title}>
            <span>{card.title}</span>
            <strong>{card.value}</strong>
            <p>{card.detail}</p>
          </article>
        ))}
      </div>

      <section className="panel executive-flow-panel">
        <div className="executive-section-head">
          <div>
            <span className="eyebrow">业务闭环流程</span>
            <h2>从找货入口到总部治理，再回到数据与集成支撑</h2>
          </div>
          <button onClick={() => navigate("/integration/overview")}>
            <GitBranch size={16} />
            查看集成总览
          </button>
        </div>
        <div className="executive-flow">
          {flowNodes.map((node, index) => (
            <React.Fragment key={node.label}>
              <button className="executive-flow-node" onClick={() => navigate(node.path)}>
                <Network size={17} />
                <strong>{node.label}</strong>
                <span>{node.text}</span>
              </button>
              {index < flowNodes.length - 1 && (
                <div className="executive-flow-arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="executive-ai-band">
        <div className="executive-section-head">
          <div>
            <span className="eyebrow">AI 能力带</span>
            <h2>AI 物料管家只绑定业务动作，不做独立聊天入口</h2>
          </div>
          <Sparkles size={22} />
        </div>
        <div className="executive-ai-grid">
          {aiCapabilities.map((item) => (
            <article key={item.title}>
              <Bot size={16} />
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="executive-paths">
        {demoPaths.map((path) => {
          const Icon = path.icon;
          return (
            <button className="executive-path-card" key={path.title} onClick={() => navigate(path.path)}>
              <Icon size={20} />
              <span>
                <strong>{path.title}</strong>
                <small>{path.text}</small>
              </span>
              <ArrowRight size={18} />
            </button>
          );
        })}
      </section>

      <RiskAlertBar tone="info" title="V1 演示边界">
        当前为前端高保真原型，用于展示业务闭环、交互形态和系统边界；接口、字段、权限、审计和真实集成后续接后端时再展开。
      </RiskAlertBar>
    </section>
  );
}

export function ProcurementOperationsCockpit({ navigate }) {
  const jump = (path, label) => {
    emitDemoFeedback({
      tone: "info",
      title: `已定位：${label}`,
      message: "采购运营驾驶舱已跳转到对应处理页面，当前仅做前端路由和演示反馈。",
      actionLabel: "留在驾驶舱",
      actionPath: "/ops/flow-overview"
    });
    navigate(path);
  };

  return (
    <section className="page-stack ops-cockpit-page">
      <PageHeader
        eyebrow="全局业务总览 / 流程看板"
        title="采购运营驾驶舱"
        description="按采购链路阶段定位堵点：从需求进入、采购处理、审批下单，到供应商协同、运营治理和集成支撑。它不是静态汇报页，而是跨端处理入口。"
        actions={
          <>
            <button className="primary-button" onClick={() => jump("/buyer/demands", "需求池")}>
              <Route size={16} />
              处理最高堵点
            </button>
            <button onClick={() => jump("/integration/overview", "集成总览")}>
              <GitBranch size={16} />
              查看集成影响
            </button>
          </>
        }
      />

      <div className="ops-summary-grid">
        {operationsSummary.map((item) => (
          <button className="ops-summary-card" key={item.label} onClick={() => jump(item.path, item.label)}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.detail}</small>
            <StatusTag tone={item.tone}>{item.tone === "danger" ? "堵点" : item.tone === "warning" ? "预警" : "新增"}</StatusTag>
          </button>
        ))}
      </div>

      <section className="panel ops-flow-panel">
        <div className="ops-cockpit-head">
          <div>
            <span className="eyebrow">六阶段流程看板</span>
            <h2>一眼看出采购链路卡在哪里，并从节点进入对应处理页</h2>
          </div>
          <div className="ops-health-pill">
            <AlertTriangle size={16} />
            当前 3 个主堵点影响 REQ / RFQ / PO 流转
          </div>
        </div>

        <div className="ops-stage-grid">
          {flowStages.map((stage, index) => (
            <button className={`ops-stage-card ${stage.tone}`} key={stage.stage} onClick={() => jump(stage.path, stage.stage)}>
              <div className="ops-stage-top">
                <span>{index + 1}</span>
                <StatusTag tone={stage.tone}>{stageToneToLabel(stage.tone)}</StatusTag>
              </div>
              <h3>{stage.stage}</h3>
              <div className="ops-stage-count">
                <strong>{stage.count}</strong>
                <small>{stage.owner}</small>
              </div>
              <dl>
                <div>
                  <dt>风险</dt>
                  <dd>{stage.risk}</dd>
                </div>
                <div>
                  <dt>超时</dt>
                  <dd>{stage.timeout}</dd>
                </div>
                <div>
                  <dt>代表单据</dt>
                  <dd>{stage.object}</dd>
                </div>
                {stage.impact && (
                  <div>
                    <dt>影响业务</dt>
                    <dd>{stage.impact}</dd>
                  </div>
                )}
              </dl>
              <span className="ops-stage-link">
                进入处理 <ArrowRight size={15} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="ops-cockpit-split">
        <section className="panel">
          <div className="ops-cockpit-head">
            <div>
              <span className="eyebrow">统一业务样例对象</span>
              <h2>同一条链路在不同端的对象视角</h2>
            </div>
            <CheckCircle2 size={20} />
          </div>
          <div className="ops-object-list">
            {sampleObjects.map((item) => (
              <button key={item.id} onClick={() => jump(item.path, item.id)}>
                <strong>{item.id}</strong>
                <span>{item.text}</span>
                <ArrowRight size={15} />
              </button>
            ))}
          </div>
        </section>

        <section className="ops-ai-panel">
          <div className="ops-cockpit-head">
            <div>
              <span className="eyebrow">AI 建议区</span>
              <h2>当前最该处理的 3 个堵点</h2>
            </div>
            <Clock3 size={20} />
          </div>
          <div className="ops-ai-list">
            {operationBlockers.map((item, index) => (
              <article className="ops-ai-item" key={item.title}>
                <AiSuggestionCard type={`堵点 ${index + 1}`} title={item.title} evidence={item.evidence} action="采纳处理顺序" confidence={index === 0 ? "高" : "需确认"} />
                <button className="full" onClick={() => jump(item.path, item.title)}>
                  进入对应页面 <ArrowRight size={15} />
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

      <RiskAlertBar tone="info" title="范围边界">
        当前驾驶舱只做前端 mock、状态定位、Toast 反馈和已有页面跳转；不做真实流程引擎、权限、组织数据、后端接口、数据库或复杂大屏动画。
      </RiskAlertBar>
    </section>
  );
}
