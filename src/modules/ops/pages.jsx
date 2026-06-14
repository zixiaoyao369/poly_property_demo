import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardCheck,
  DatabaseZap,
  GitBranch,
  Layers3,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp
} from "lucide-react";
import {
  AiSuggestionCard,
  DataTable,
  DetailDrawer,
  DemoActionButton,
  FilterToolbar,
  MetricGrid,
  PageHeader,
  RiskAlertBar,
  StatusTag,
  StatusTimeline,
  emitDemoFeedback
} from "../../components/ui.jsx";
import { materials, opsQueues } from "../../data/mock/procurement.js";

const governanceMetrics = [
  { label: "商品待审", value: "46", detail: "8 条价格异常 / 5 条资质待核", path: "/ops/audit", tone: "warning", icon: ClipboardCheck },
  { label: "重复物料", value: "128", detail: "GOV-MAT-046 优先治理", path: "/ops/materials", tone: "processing", icon: DatabaseZap },
  { label: "价格异常", value: "23", detail: "含 RISK-PRICE-031", path: "/ops/prices", tone: "danger", icon: TrendingUp },
  { label: "供应商风险", value: "17", detail: "3 家观察 / 2 家资质临期", path: "/ops/suppliers", tone: "warning", icon: Store },
  { label: "集成异常", value: "6", detail: "OA 回调与库存同步延迟", path: "/integration/overview", tone: "danger", icon: GitBranch },
  { label: "治理进度", value: "62%", detail: "本周完成 79/128 条", path: "/ops/materials", tone: "success", icon: CheckCircle2 }
];

const auditQueue = [
  {
    id: "AUD-20260614-017",
    name: "LED 防潮支架灯 1200mm",
    supplier: "华南电气集采供应商",
    category: "工程维修 / 电气照明",
    status: "需人工复核",
    aiStatus: "建议通过",
    risk: "价格低于历史均价 10.6%，资质正常",
    confidence: "92%",
    route: "通过后进入协议商品池，并同步用户端可见"
  },
  {
    id: "AUD-20260614-018",
    name: "防汛沙袋 30x70cm",
    supplier: "应急物资联采仓",
    category: "防汛物资",
    status: "价格复核",
    aiStatus: "转价格观察",
    risk: "高于 90 天历史均价 12.9%，库存为 0",
    confidence: "84%",
    route: "关联 RISK-PRICE-031，采购端审批展示依据"
  },
  {
    id: "AUD-20260614-019",
    name: "不锈钢球阀 DN 口径待确认",
    supplier: "华南管阀备件仓",
    category: "管阀泵类",
    status: "转治理",
    aiStatus: "建议转物料治理",
    risk: "DN20/DN25 混填，历史错采 3 次",
    confidence: "78%",
    route: "生成 GOV-MAT-046 子任务，沉淀规格 BadCase"
  },
  {
    id: "AUD-20260614-020",
    name: "绝缘防护手套 10kV",
    supplier: "安全劳保优选",
    category: "劳保安防",
    status: "待审核",
    aiStatus: "补资质后通过",
    risk: "检测报告有效期剩余 18 天",
    confidence: "81%",
    route: "要求供应商补充最新检测报告"
  }
];

const aiBatchSuggestions = [
  { type: "高置信通过", count: 3, evidence: "资质有效、价格在协议价内、参数完整", action: "批量通过待人工确认" },
  { type: "转物料治理", count: 1, evidence: "DN 口径混填、相似物料 12 条、搜索词命中低", action: "生成 GOV-MAT-046" },
  { type: "价格观察", count: 2, evidence: "高于历史价 12.8%，影响海珠花园项目", action: "同步价格库" },
  { type: "驳回补充", count: 5, evidence: "资质临期、图片缺少铭牌、属性模板缺失", action: "发送供应商反馈" }
];

const materialTasks = [
  {
    id: "GOV-MAT-046",
    issue: "重复物料",
    before: "LED支架灯 / 车库灯 / 防潮长条灯",
    standard: "MAT-LIGHT-1200 / LED 防潮支架灯 / 1200mm / IP65",
    match: "相似匹配 94%",
    impact: "影响 REQ-20260613-018 与 34 次历史采购",
    badcase: "用户搜车库灯未命中协议商品",
    next: "合并别名并回流搜索词库"
  },
  {
    id: "GOV-MAT-047",
    issue: "同义词",
    before: "漏保 / 漏电保护器 / 空开",
    standard: "漏保空气开关 / 2P / 32A",
    match: "相似匹配 89%",
    impact: "影响安全必配推荐",
    badcase: "AI 成套清单漏掉安全保护件",
    next: "建立同义词并绑定安全必配标签"
  },
  {
    id: "GOV-MAT-048",
    issue: "规格缺失",
    before: "不锈钢球阀，缺 DN 口径",
    standard: "按 DN20 / DN25 拆分标准物料",
    match: "需人工确认",
    impact: "影响采购端比价与供应商报价",
    badcase: "DN 口径混用造成现场退换",
    next: "转人工确认并写入属性模板"
  },
  {
    id: "GOV-MAT-049",
    issue: "错别字",
    before: "绝缘手套 / 绝源手套 / 电工首套",
    standard: "绝缘防护手套 / 10kV",
    match: "相似匹配 91%",
    impact: "影响劳保安防类目搜索",
    badcase: "错别字商品进入供应商上架审核",
    next: "加入纠错词并生成审核提示"
  }
];

const priceAlerts = [
  {
    id: "RISK-PRICE-031",
    name: "防汛沙袋 30x70cm",
    project: "广州海珠花园",
    current: "￥9.60",
    history: "￥8.50",
    agreement: "￥8.80",
    market: "￥8.70-9.10",
    rise: "+12.9%",
    status: "红色预警",
    suggestion: "要求补充比价或转询价，采购端审批展示该依据"
  },
  {
    id: "RISK-PRICE-032",
    name: "阻燃铜芯电缆 BV2.5",
    project: "佛山千灯湖",
    current: "￥198.00",
    history: "￥186.00",
    agreement: "￥190.00",
    market: "￥184-193",
    rise: "+6.4%",
    status: "黄色预警",
    suggestion: "锁定珠三角线缆联合仓报价，通知采购比价"
  },
  {
    id: "RISK-PRICE-033",
    name: "不锈钢球阀 DN25",
    project: "广州琶洲",
    current: "￥63.50",
    history: "￥58.20",
    agreement: "￥60.00",
    market: "￥57-62",
    rise: "+9.1%",
    status: "黄色预警",
    suggestion: "先完成 DN 规格治理，再更新价格库"
  }
];

const categoryRows = [
  { id: "CAT-0101", level: "工程维修 / 电气照明", template: "功率、长度、防护等级、色温、认证", owner: "类目运营 李曼", front: "前台展示中", status: "启用" },
  { id: "CAT-0102", level: "工程维修 / 管阀泵类", template: "材质、DN 口径、连接方式、耐压", owner: "物料治理 周工", front: "部分展示", status: "属性待完善" },
  { id: "CAT-0201", level: "保洁耗材 / 清洁剂", template: "容量、配方、适用场景、环保认证", owner: "运营 陈敏", front: "前台展示中", status: "启用" },
  { id: "CAT-0301", level: "劳保安防 / 防护用品", template: "防护等级、规格、检测报告、有效期", owner: "供应商管理员 何珊", front: "前台展示中", status: "启用" }
];

const poolRows = [
  { id: "POOL-STD-01", name: "工程维修标准商品池", type: "标准商品池", goods: "1,860", auth: "华南区域 38 项目", status: "上架", risk: "重复物料 18 条待治理" },
  { id: "POOL-AGR-02", name: "电气照明协议商品池", type: "协议商品池", goods: "426", auth: "总部集采 + 广佛项目", status: "上架", risk: "RISK-PRICE-031 同类价格观察" },
  { id: "POOL-STD-03", name: "保洁耗材常买池", type: "标准商品池", goods: "920", auth: "全部项目", status: "上架", risk: "季度补库推荐" },
  { id: "POOL-AGR-04", name: "管阀泵协议商品池", type: "协议商品池", goods: "410", auth: "工程项目", status: "部分授权", risk: "DN 属性模板需补齐" }
];

const supplierRows = [
  { id: "SUP-GZ-014", name: "广州明辉照明设备有限公司", status: "正常", qualification: "CCC 18 天后到期", score: "96", goods: "428", issues: "2", action: "要求补资质" },
  { id: "SUP-JD-001", name: "京东工业", status: "正常", qualification: "资质正常", score: "94", goods: "3,200", issues: "4", action: "价格观察" },
  { id: "SUP-GZ-022", name: "广州本地照明仓", status: "观察", qualification: "授权待复核", score: "89", goods: "112", issues: "7", action: "限制高风险类目" },
  { id: "SUP-FS-018", name: "佛山应急仓", status: "待补资质", qualification: "检测报告过期", score: "82", goods: "86", issues: "9", action: "暂停防汛物资上架" }
];

const dashboardMetricGroups = [
  {
    category: "采购规模",
    summary: "看采购体量是否进入统一平台",
    path: "/buyer/purchase-orders",
    tone: "scale",
    icon: PackageCheck,
    metrics: [
      { label: "采购金额", value: "￥3.2亿", detail: "近12个月前端模拟口径" },
      { label: "采购单数", value: "18,642", detail: "PO-20260613-088 可追溯" },
      { label: "需求数", value: "42,810", detail: "含 REQ-20260613-018" }
    ]
  },
  {
    category: "降本效果",
    summary: "看询价、历史价和协议价是否产生节省",
    path: "/ops/prices",
    tone: "saving",
    icon: TrendingUp,
    metrics: [
      { label: "询价节省金额", value: "￥486万", detail: "综合比价后节省" },
      { label: "历史价预警避免金额", value: "￥68.4万", detail: "含 RISK-PRICE-031" },
      { label: "协议价覆盖率", value: "73%", detail: "电气照明 86%" }
    ]
  },
  {
    category: "效率指标",
    summary: "看找货、处理、响应和审批周期是否缩短",
    path: "/buyer/inquiry-control",
    tone: "efficiency",
    icon: ClipboardCheck,
    metrics: [
      { label: "平均找货耗时", value: "6.8分钟", detail: "较手工找货 -42%" },
      { label: "需求处理时长", value: "1.6天", detail: "待补参拉长 0.4天" },
      { label: "询价响应时长", value: "9.2小时", detail: "3 家供应商未响应" },
      { label: "审批时长", value: "4.1小时", detail: "超预算单据更慢" }
    ]
  },
  {
    category: "履约指标",
    summary: "看供应商交付是否稳定",
    path: "/ops/suppliers",
    tone: "fulfillment",
    icon: Store,
    metrics: [
      { label: "准时发货率", value: "93.6%", detail: "照明类 96.2%" },
      { label: "妥投率", value: "98.1%", detail: "SO-20260613-221 在途" },
      { label: "售后率", value: "1.8%", detail: "低于上月 0.4pt" },
      { label: "异常订单数", value: "37", detail: "物流异常 11 单" }
    ]
  },
  {
    category: "治理指标",
    summary: "看商品、物料和审核质量是否改善",
    path: "/ops/materials",
    tone: "governance",
    icon: DatabaseZap,
    metrics: [
      { label: "重复物料数", value: "128", detail: "GOV-MAT-046 优先" },
      { label: "已合并物料数", value: "79", detail: "本周 +14" },
      { label: "商品资料完整率", value: "91%", detail: "铭牌/资质/参数齐全" },
      { label: "审核通过率", value: "87%", detail: "AI 预审后 +6pt" }
    ]
  },
  {
    category: "AI 指标",
    summary: "看 AI 是否真正减少人工判断成本",
    path: "/ai/overview",
    tone: "ai",
    icon: Sparkles,
    metrics: [
      { label: "AI 建议采纳率", value: "84%", detail: "比价/审核/治理" },
      { label: "低置信待确认数", value: "26", detail: "不自动放行" },
      { label: "AI 补参成功数", value: "312", detail: "找货与上架补参" },
      { label: "AI 识别重复数", value: "146", detail: "已转治理 58 条" }
    ]
  }
];

const dashboardTrendRows = [
  { month: "2月", purchase: "2.1亿", saving: "260万", efficiency: "2.4天", fulfillment: "90.8%", width: "52%" },
  { month: "3月", purchase: "2.4亿", saving: "312万", efficiency: "2.1天", fulfillment: "91.7%", width: "60%" },
  { month: "4月", purchase: "2.7亿", saving: "368万", efficiency: "1.9天", fulfillment: "92.4%", width: "68%" },
  { month: "5月", purchase: "3.0亿", saving: "426万", efficiency: "1.7天", fulfillment: "93.1%", width: "76%" },
  { month: "6月", purchase: "3.2亿", saving: "486万", efficiency: "1.6天", fulfillment: "93.6%", width: "86%" }
];

const dashboardStructureRows = [
  { label: "工程维修", amount: "￥8600万", share: "27%", path: "/ops/pools", width: "86%" },
  { label: "电气照明", amount: "￥6200万", share: "19%", path: "/ops/prices", width: "74%" },
  { label: "保洁耗材", amount: "￥4100万", share: "13%", path: "/ops/categories", width: "58%" },
  { label: "劳保安防", amount: "￥2300万", share: "7%", path: "/ops/audit", width: "38%" },
  { label: "管阀泵类", amount: "￥1900万", share: "6%", path: "/ops/materials", width: "31%" }
];

const dashboardExceptionRows = [
  { rank: "01", object: "RISK-PRICE-031 防汛沙袋价格异常", value: "￥18.6万", impact: "高于历史均价 12.9%，影响审批", path: "/ops/prices" },
  { rank: "02", object: "SUP-GZ-022 履约评分连续下降", value: "7次", impact: "未响应 RFQ 与延期发货", path: "/ops/suppliers" },
  { rank: "03", object: "GOV-MAT-046 照明物料重复", value: "34次", impact: "影响搜索命中和比价口径", path: "/ops/materials" },
  { rank: "04", object: "RFQ-20260613-006 响应超时", value: "3家", impact: "拉长询价响应时长", path: "/buyer/inquiry-control" }
];

const dashboardGovernanceRows = [
  { label: "重复物料治理", before: "128", after: "49", result: "已合并 79 条，照明类搜索噪音下降 38%", path: "/ops/materials" },
  { label: "价格异常治理", before: "23", after: "9", result: "14 条已同步价格库和采购审批依据", path: "/ops/prices" },
  { label: "商品资料治理", before: "82%", after: "91%", result: "AI 补参 + 人工审核后通过率提升 6pt", path: "/ops/audit" },
  { label: "供应商履约治理", before: "89.4%", after: "93.6%", result: "低分供应商进入观察，准时发货率提升", path: "/ops/suppliers" }
];

const drawerSteps = [
  { label: "AI 命中", text: "识别风险、相似项和建议动作", state: "done" },
  { label: "人工确认", text: "运营人员确认通过、驳回或转治理", state: "current" },
  { label: "结果回流", text: "同步供应商反馈、商品池、搜索和采购端预警", state: "todo" }
];

function governanceToast(title, message, tone = "success", actionLabel, actionPath) {
  emitDemoFeedback({ title, message, tone, actionLabel, actionPath });
}

function OpsDrawer({ item, type, onClose }) {
  if (!item) return null;
  const title = item.name || item.issue || item.level || item.id;
  const subtitle = item.id || item.supplier || item.project || item.type;
  return (
    <DetailDrawer
      open={!!item}
      title={title}
      subtitle={subtitle}
      onClose={onClose}
      actions={
        <>
          <button className="secondary-button" onClick={() => governanceToast("已记录人工确认", "当前为前端模拟状态，结果会以 Toast 和行内状态表达。", "info")}>记录确认</button>
          <button className="primary-button" onClick={() => governanceToast("治理动作已完成", `${title} 已形成前端演示闭环。`, "success")}>完成处理</button>
        </>
      }
    >
      <div className="drawer-section">
        <h3>治理依据</h3>
        <p>{item.risk || item.impact || item.suggestion || item.risk || "当前对象需要运营人员维护状态、范围和前台展示影响。"}</p>
        <div className="ops-evidence-grid">
          {Object.entries(item)
            .filter(([key]) => !["name", "id"].includes(key))
            .slice(0, 6)
            .map(([key, value]) => (
              <span key={key}>
                <small>{key}</small>
                <strong>{value}</strong>
              </span>
            ))}
        </div>
      </div>
      <div className="drawer-section">
        <h3>{type === "material" ? "BadCase 轻量沉淀" : "闭环路径"}</h3>
        {type === "material" ? (
          <div className="badcase-mini">
            <strong>{item.badcase}</strong>
            <span>期望：搜索、比价、审核都使用标准物料；实际：别名和规格混写导致命中错误。</span>
            <span>根因：同义词和属性模板缺失；修复：写入标准物料建议和审核提示。</span>
          </div>
        ) : (
          <StatusTimeline steps={drawerSteps} />
        )}
      </div>
    </DetailDrawer>
  );
}

function GovernanceActionPanel({ title, children, actions }) {
  return (
    <article className="ops-action-panel">
      <div>
        <Sparkles size={16} />
        <strong>{title}</strong>
      </div>
      <p>{children}</p>
      <div>{actions}</div>
    </article>
  );
}

export function OpsWorkbench({ navigate }) {
  return (
    <section className="page-stack ops-governance-page">
      <PageHeader
        eyebrow="运营总览工作台"
        title="总部运营的治理入口，不替代采购和供应商日常处理"
        description="聚合商品质量、物料标准、价格风险、供应商表现和集成异常，帮助运营人员判断先处理什么。"
        actions={<button className="primary-button" onClick={() => navigate("/ops/audit")}><ShieldCheck size={16} />处理商品审核</button>}
      />
      <div className="ops-governance-grid">
        {governanceMetrics.map((item) => {
          const Icon = item.icon;
          return (
            <button className={`ops-governance-card ${item.tone}`} key={item.label} onClick={() => navigate(item.path)}>
              <Icon size={18} />
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.detail}</small>
            </button>
          );
        })}
      </div>
      <div className="ops-cockpit-split">
        <div className="panel">
          <h2>今日治理队列</h2>
          {opsQueues.map((queue) => (
            <article className="task-line" key={queue.title}>
              <StatusTag tone={queue.title.includes("价格") ? "danger" : "processing"}>{queue.count}</StatusTag>
              <div>
                <strong>{queue.title}</strong>
                <span>{queue.desc} / {queue.risk}</span>
              </div>
              <button onClick={() => navigate(queue.title.includes("物料") ? "/ops/materials" : queue.title.includes("价格") ? "/ops/prices" : queue.title.includes("供应商") ? "/ops/suppliers" : "/ops/audit")}>进入</button>
            </article>
          ))}
          <article className="task-line">
            <StatusTag tone="danger">6</StatusTag>
            <div>
              <strong>集成异常</strong>
              <span>库存同步延迟、OA 回调失败，影响审批和商品可售状态。</span>
            </div>
            <button onClick={() => navigate("/integration/overview")}>查看</button>
          </article>
        </div>
        <div className="ops-governance-column">
          <AiSuggestionCard
            title="先处理 GOV-MAT-046 与 RISK-PRICE-031"
            evidence={["照明类搜索占本周 34%", "重复物料 128 条中 42% 属于照明", "价格异常已影响采购端审批"]}
            action="启动治理队列"
          />
          <GovernanceActionPanel
            title="四类治理解释"
            actions={
              <>
                <button onClick={() => navigate("/ops/audit")}>商品质量</button>
                <button onClick={() => navigate("/ops/materials")}>物料标准</button>
                <button onClick={() => navigate("/ops/prices")}>价格风险</button>
                <button onClick={() => navigate("/ops/suppliers")}>供应商表现</button>
              </>
            }
          >
            商品审核控制准入，物料治理沉淀标准，价格库解释成本预警，供应商管理约束资质和履约质量。
          </GovernanceActionPanel>
        </div>
      </div>
    </section>
  );
}

export function ProductAudit() {
  const [tab, setTab] = useState("待审队列");
  const [selected, setSelected] = useState(auditQueue[0]);
  const rows = tab === "AI 批量建议" ? aiBatchSuggestions.map((item, index) => ({ id: `BATCH-${index + 1}`, ...item })) : auditQueue;

  return (
    <section className="detail-layout ops-governance-page">
      <div className="page-stack">
        <PageHeader
          eyebrow="商品审核 + AI 智能审核"
          title="待审队列、审核详情、AI 建议和人工确认在同一页完成"
          description="AI 只给建议和依据，最终通过、驳回、转治理由运营人员确认。"
        />
        <FilterToolbar
          tabs={["待审队列", "AI 批量建议", "风险命中", "人工确认"]}
          active={tab}
          onChange={setTab}
          extra={<button className="secondary-button" onClick={() => governanceToast("批量建议已生成", "3 条建议通过、1 条转物料治理、2 条进入价格观察。", "info")}>生成批量建议</button>}
        />
        <div className="ops-review-strip">
          {aiBatchSuggestions.map((item) => (
            <article key={item.type}>
              <strong>{item.count}</strong>
              <span>{item.type}</span>
              <small>{item.evidence}</small>
            </article>
          ))}
        </div>
        <DataTable
          columns={
            tab === "AI 批量建议"
              ? [
                  { key: "type", label: "建议类型" },
                  { key: "count", label: "数量" },
                  { key: "evidence", label: "依据" },
                  { key: "action", label: "人工确认动作" }
                ]
              : [
                  { key: "id", label: "审核单" },
                  { key: "name", label: "商品" },
                  { key: "supplier", label: "供应商" },
                  { key: "aiStatus", label: "AI 建议" },
                  { key: "risk", label: "风险命中" },
                  { key: "confidence", label: "置信度" }
                ]
          }
          rows={rows}
          onOpen={(row) => setSelected(row)}
        />
      </div>
      <aside className="sticky-panel ops-inspector">
        <h2>审核详情抽屉</h2>
        <p>{selected.name || selected.type}</p>
        <StatusTag tone={selected.status?.includes("转") ? "warning" : "processing"}>{selected.status || selected.action}</StatusTag>
        <div className="ops-inspector-block">
          <strong>AI 审核建议</strong>
          <span>{selected.aiStatus || selected.evidence}</span>
        </div>
        <div className="ops-inspector-block">
          <strong>风险命中</strong>
          <span>{selected.risk || selected.evidence}</span>
        </div>
        <div className="ops-action-row">
          <DemoActionButton className="secondary-button" message="商品审核：已记录驳回原因，供应商端可查看修改建议">驳回</DemoActionButton>
          <DemoActionButton className="secondary-button" message="商品审核：已转入 GOV-MAT-046 物料治理队列">转治理</DemoActionButton>
          <DemoActionButton className="primary-button" message="商品审核：已通过并进入商品池，前台展示状态待发布">通过</DemoActionButton>
        </div>
        <RiskAlertBar tone="info" title="供应商反馈">驳回和补充要求会回到供应商商品维护页；转治理只生成轻量治理任务。</RiskAlertBar>
      </aside>
    </section>
  );
}

export function MaterialsQueue() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("全部");
  const rows = filter === "全部" ? materialTasks : materialTasks.filter((item) => item.issue === filter);

  return (
    <section className="page-stack ops-governance-page">
      <PageHeader eyebrow="物料治理队列" title="GOV-MAT-046 串起重复物料、同义词、规格缺失和 BadCase" description="治理结果回流用户端搜索、采购端比价、供应商上架校验和价格库关联。" />
      <MetricGrid items={[{ label: "待治理", value: "128", detail: "照明类 54 条" }, { label: "标准物料建议", value: "36", detail: "AI 高置信 21 条" }, { label: "相似匹配", value: "94%", detail: "GOV-MAT-046" }, { label: "BadCase", value: "7", detail: "轻量沉淀" }]} />
      <FilterToolbar tabs={["全部", "重复物料", "同义词", "规格缺失", "错别字"]} active={filter} onChange={setFilter} />
      <DataTable
        columns={[
          { key: "id", label: "治理任务" },
          { key: "issue", label: "问题类型" },
          { key: "before", label: "治理前" },
          { key: "standard", label: "标准物料建议" },
          { key: "match", label: "相似匹配" },
          { key: "next", label: "下一步" }
        ]}
        rows={rows}
        onOpen={(row) => setSelected(row)}
      />
      <div className="ops-compare-grid">
        {materials.map((item) => (
          <article key={item.before}>
            <span>治理前</span>
            <strong>{item.before}</strong>
            <span>标准化后</span>
            <strong>{item.after}</strong>
            <small>{item.impact} / 置信度 {item.confidence}</small>
          </article>
        ))}
      </div>
      <OpsDrawer item={selected} type="material" onClose={() => setSelected(null)} />
    </section>
  );
}

export function PriceGovernance() {
  const [selected, setSelected] = useState(priceAlerts[0]);
  const rows = priceAlerts;
  return (
    <section className="detail-layout ops-governance-page">
      <div className="page-stack">
        <PageHeader eyebrow="价格库/成本预警" title="用历史价、协议价、市场价解释采购端 RISK-PRICE-031" description="运营端负责维护价格依据和处置建议，采购端在审批与比价时引用这些前端模拟依据。" />
        <MetricGrid items={[{ label: "价格异常", value: "23", detail: "高于历史/协议价" }, { label: "已处理", value: "9", detail: "同步采购端" }, { label: "协议价待更新", value: "5", detail: "供应商调价" }, { label: "影响金额", value: "￥68.4万", detail: "近30天" }]} />
        <RiskAlertBar tone="danger" title="RISK-PRICE-031">防汛沙袋高于 90 天历史均价 12.9%，已同步采购端订单审批风险摘要。</RiskAlertBar>
        <DataTable
          columns={[
            { key: "id", label: "风险编号" },
            { key: "name", label: "物料" },
            { key: "project", label: "项目维度" },
            { key: "current", label: "当前价" },
            { key: "history", label: "历史价" },
            { key: "agreement", label: "协议价" },
            { key: "rise", label: "异常涨幅" }
          ]}
          rows={rows}
          onOpen={(row) => setSelected(row)}
        />
      </div>
      <aside className="sticky-panel ops-inspector">
        <h2>处置建议</h2>
        <p>{selected.id} / {selected.name}</p>
        <div className="ops-price-ladder">
          <span><small>历史价</small><strong>{selected.history}</strong></span>
          <span><small>协议价</small><strong>{selected.agreement}</strong></span>
          <span><small>市场价</small><strong>{selected.market}</strong></span>
          <span><small>当前价</small><strong>{selected.current}</strong></span>
        </div>
        <RiskAlertBar tone={selected.status.includes("红") ? "danger" : "warning"} title={selected.status}>{selected.suggestion}</RiskAlertBar>
        <div className="ops-action-row">
          <DemoActionButton className="secondary-button" message="价格库：已通知采购经理，采购端 RISK-PRICE-031 风险说明已更新">通知采购</DemoActionButton>
          <DemoActionButton className="primary-button" message="价格库：已标记为已处置，保留历史价/协议价解释依据">标记已处置</DemoActionButton>
        </div>
      </aside>
    </section>
  );
}

export function Categories() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="page-stack ops-governance-page">
      <PageHeader eyebrow="品类管理" title="类目树、属性模板、负责人和前台展示状态统一维护" />
      <div className="ops-category-layout">
        <aside className="ops-tree-panel">
          {["工程维修", "保洁耗材", "劳保安防", "防汛物资"].map((item, index) => (
            <button className={index === 0 ? "active" : ""} key={item}><Layers3 size={15} />{item}<span>{[42, 28, 16, 9][index]}</span></button>
          ))}
        </aside>
        <DataTable
          columns={[
            { key: "id", label: "类目编码" },
            { key: "level", label: "类目树" },
            { key: "template", label: "属性模板" },
            { key: "owner", label: "负责人" },
            { key: "front", label: "前台展示状态" },
            { key: "status", label: "启停" }
          ]}
          rows={categoryRows}
          onOpen={(row) => setSelected(row)}
        />
      </div>
      <OpsDrawer item={selected} type="category" onClose={() => setSelected(null)} />
    </section>
  );
}

export function ProductPools() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="page-stack ops-governance-page">
      <PageHeader eyebrow="商品池管理" title="标准商品池、协议商品池、项目授权和上下架状态" actions={<button className="primary-button" onClick={() => governanceToast("项目授权已打开", "当前仅做前端授权范围演示，不进入真实权限配置。", "info")}><PackageCheck size={16} />项目授权</button>} />
      <MetricGrid items={[{ label: "标准商品池", value: "3,190", detail: "覆盖 86 个类目" }, { label: "协议商品池", value: "836", detail: "华南区域优先" }, { label: "部分授权", value: "9", detail: "需运营确认" }, { label: "下架风险", value: "14", detail: "价格/资质异常" }]} />
      <DataTable
        columns={[
          { key: "id", label: "商品池编号" },
          { key: "name", label: "商品池" },
          { key: "type", label: "类型" },
          { key: "goods", label: "商品数" },
          { key: "auth", label: "项目授权" },
          { key: "status", label: "上下架" },
          { key: "risk", label: "提示" }
        ]}
        rows={poolRows}
        onOpen={(row) => setSelected(row)}
      />
      <OpsDrawer item={selected} type="pool" onClose={() => setSelected(null)} />
    </section>
  );
}

export function SupplierStores() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="page-stack ops-governance-page">
      <PageHeader eyebrow="供应商店铺管理" title="供应商状态、资质风险、履约评分、商品数和异常次数" />
      <MetricGrid items={[{ label: "正常供应商", value: "126", detail: "可参与报价" }, { label: "风险观察", value: "17", detail: "资质/履约/价格" }, { label: "资质临期", value: "8", detail: "影响商品审核" }, { label: "停用/限制", value: "3", detail: "不进入推荐" }]} />
      <DataTable
        columns={[
          { key: "id", label: "供应商编号" },
          { key: "name", label: "供应商" },
          { key: "status", label: "供应商状态" },
          { key: "qualification", label: "资质风险" },
          { key: "score", label: "履约评分" },
          { key: "goods", label: "商品数" },
          { key: "issues", label: "异常次数" },
          { key: "action", label: "启停/处置" }
        ]}
        rows={supplierRows}
        onOpen={(row) => setSelected(row)}
      />
      <RiskAlertBar tone="info" title="跨端影响">资质风险会影响商品审核、供应商端资质提醒、采购端供应商推荐和前台可见商品。</RiskAlertBar>
      <OpsDrawer item={selected} type="supplier" onClose={() => setSelected(null)} />
    </section>
  );
}

export function DataDashboard({ navigate }) {
  const jump = (path, title) => {
    navigate?.(path);
    governanceToast("已下钻到业务页面", `${title} 的经营结果已关联到 ${path}，当前不做真实 BI 报表。`, "info");
  };

  return (
    <section className="page-stack ops-governance-page ops-dashboard-page">
      <PageHeader
        eyebrow="数据看板"
        title="经营结果看板：回答系统有没有产生采购价值"
        description="区别于采购运营驾驶舱的堵点视角，这里聚焦采购规模、降本、效率、履约、治理和 AI 效果；每个指标都能下钻到现有业务页面。"
        actions={<button className="secondary-button" onClick={() => jump("/ops/flow-overview", "采购运营驾驶舱")}>对比流程堵点</button>}
      />

      <div className="ops-dashboard-value-strip">
        <article>
          <span>规模进入平台</span>
          <strong>￥3.2亿</strong>
          <small>18,642 张采购单 / 42,810 条需求</small>
        </article>
        <article>
          <span>降本可解释</span>
          <strong>￥554.4万</strong>
          <small>询价节省 + 历史价预警避免</small>
        </article>
        <article>
          <span>效率有改善</span>
          <strong>-42%</strong>
          <small>平均找货耗时下降，需求处理 1.6 天</small>
        </article>
        <article>
          <span>治理能回流</span>
          <strong>91%</strong>
          <small>商品资料完整率，重复物料已合并 79 条</small>
        </article>
      </div>

      <div className="ops-dashboard-metric-groups">
        {dashboardMetricGroups.map((group) => {
          const Icon = group.icon;
          return (
            <button className={`ops-dashboard-group ${group.tone}`} key={group.category} onClick={() => jump(group.path, group.category)}>
              <header>
                <span><Icon size={17} />{group.category}</span>
                <small>{group.summary}</small>
              </header>
              <div>
                {group.metrics.map((metric) => (
                  <span key={metric.label}>
                    <small>{metric.label}</small>
                    <strong>{metric.value}</strong>
                    <em>{metric.detail}</em>
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="ops-dashboard-analytics-grid">
        <section className="panel ops-dashboard-trend">
          <div className="ops-dashboard-section-head">
            <div>
              <span className="eyebrow">趋势</span>
              <h2>采购价值趋势</h2>
            </div>
            <button onClick={() => jump("/buyer/purchase-orders", "采购价值趋势")}>查看采购单</button>
          </div>
          {dashboardTrendRows.map((row) => (
            <div className="ops-trend-row" key={row.month}>
              <b>{row.month}</b>
              <div><span style={{ "--bar": row.width }} /></div>
              <small>采购 {row.purchase} / 节省 {row.saving} / 处理 {row.efficiency} / 准时 {row.fulfillment}</small>
            </div>
          ))}
        </section>

        <section className="panel ops-dashboard-structure">
          <div className="ops-dashboard-section-head">
            <div>
              <span className="eyebrow">结构占比</span>
              <h2>采购金额品类结构</h2>
            </div>
            <button onClick={() => jump("/ops/pools", "采购结构占比")}>看商品池</button>
          </div>
          {dashboardStructureRows.map((row) => (
            <button className="ops-structure-row" key={row.label} onClick={() => jump(row.path, row.label)}>
              <span>{row.label}</span>
              <div style={{ "--bar": row.width }} />
              <b>{row.amount}</b>
              <small>{row.share}</small>
            </button>
          ))}
        </section>
      </div>

      <div className="ops-dashboard-analytics-grid">
        <section className="panel ops-dashboard-ranking">
          <div className="ops-dashboard-section-head">
            <div>
              <span className="eyebrow">异常排行</span>
              <h2>最影响采购价值的对象</h2>
            </div>
            <button onClick={() => jump("/ops/prices", "异常排行")}>价格异常</button>
          </div>
          {dashboardExceptionRows.map((row) => (
            <button className="ops-rank-row" key={row.rank} onClick={() => jump(row.path, row.object)}>
              <b>{row.rank}</b>
              <span>
                <strong>{row.object}</strong>
                <small>{row.impact}</small>
              </span>
              <em>{row.value}</em>
            </button>
          ))}
        </section>

        <section className="panel ops-dashboard-governance">
          <div className="ops-dashboard-section-head">
            <div>
              <span className="eyebrow">治理成效</span>
              <h2>治理前后对比</h2>
            </div>
            <button onClick={() => jump("/ops/materials", "治理成效")}>物料治理</button>
          </div>
          {dashboardGovernanceRows.map((row) => (
            <button className="ops-governance-result" key={row.label} onClick={() => jump(row.path, row.label)}>
              <strong>{row.label}</strong>
              <span><small>治理前</small><b>{row.before}</b></span>
              <span><small>治理后</small><b>{row.after}</b></span>
              <em>{row.result}</em>
            </button>
          ))}
        </section>
      </div>

      <AiSuggestionCard
        type="管理建议"
        title="优先推进工程维修与电气照明价格库治理"
        evidence={["两类目占采购金额 46%", "异常金额占比最高", "AI 识别重复数 146 条，已转治理 58 条"]}
        action="采纳经营建议"
      />
    </section>
  );
}
