import React, { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck, Send, Workflow } from "lucide-react";
import {
  AiSuggestionCard,
  DataTable,
  DemoActionButton,
  DetailDrawer,
  FilterToolbar,
  MetricGrid,
  PageHeader,
  RiskAlertBar,
  StatusTag,
  StatusTimeline
} from "../../components/ui.jsx";
import { demands, purchaseOrders } from "../../data/mock/procurement.js";

const flowIds = {
  req: "REQ-20260613-018",
  rfq: "RFQ-20260613-006",
  po: "PO-20260613-088",
  approval: "APV-20260613-041",
  supplierOrder: "SO-20260613-221",
  risk: "RISK-PRICE-031"
};

const buyerMetrics = [
  { label: "今日待办", value: "32", detail: "8 项建议优先处理" },
  { label: "待分流需求", value: "18", detail: "4 条需补参，6 条待询价" },
  { label: "待比价/审批", value: "11", detail: "异常金额 ￥68.4万" },
  { label: "供应商未响应", value: "5", detail: `${flowIds.rfq} 还有 1 家未回` }
];

const workbenchTasks = [
  { id: flowIds.req, title: "地下车库照明维修物料", type: "待比价", status: "优先", amount: "￥18.6万", due: "6小时后报价截止", path: "/buyer/compare", tone: "danger" },
  { id: "REQ-20260614-021", title: "保洁耗材季度补库", type: "待发布询价", status: "今日", amount: "￥42.2万", due: "建议邀请 3 家供应商", path: "/buyer/inquiry-publish", tone: "warning" },
  { id: "REQ-20260614-026", title: "水泵房阀门更换", type: "待补参", status: "需确认", amount: "￥9.7万", due: "DN 口径缺失，建议转治理", path: "/buyer/demands", tone: "warning" },
  { id: flowIds.po, title: "照明维修采购单", type: "待审批", status: "经理审批", amount: "￥18.6万", due: "高于 90 天历史均价 12.8%", path: "/buyer/approvals", tone: "danger" }
];

const demandRows = [
  {
    ...demands[0],
    id: flowIds.req,
    source: "用户端采购车",
    status: "待询价",
    budget: "项目预算 ￥20.0万",
    stage: "待询价",
    attachment: "现场照片 3 张、维修清单 1 份",
    history: "近 90 天同类采购 6 次，均价 ￥42.10",
    items: "LED 支架灯 160 套 / 漏保 45 个 / 阻燃线缆 24 卷",
    owner: "工程部 张工",
    ai: "建议支架灯与漏保直采，线缆进入询价，球阀规格转治理确认。"
  },
  { id: "REQ-20260614-021", title: "保洁耗材季度补库", source: "场景找货", project: "佛山千灯湖项目", owner: "运营部 陈经理", amount: "￥42.2万", budget: "项目预算 ￥45.0万", status: "待发布询价", stage: "待询价", risk: "金额超过直采阈值", attachment: "季度补货表 1 份", history: "近 90 天同类采购 4 次", items: "清洁剂 / 垃圾袋 / 拖把头", ai: "建议合并为保洁耗材包，邀请协议供应商与本地仓报价。" },
  { id: "REQ-20260614-026", title: "水泵房阀门更换", source: "需求提报", project: "广州琶洲项目", owner: "工程部 李工", amount: "￥9.7万", budget: "项目预算 ￥10.0万", status: "待补参", stage: "待补参", risk: "12 条相似物料", attachment: "现场照片 2 张", history: "DN20/DN25 历史混填", items: "不锈钢球阀 120 个", ai: "建议退回补充 DN 口径，并同步转物料治理队列。" },
  { id: "REQ-20260614-030", title: "电工安全作业劳保补充", source: "常买清单", project: "总部园区", owner: "行政部 王洁", amount: "￥6.8万", budget: "项目预算 ￥7.5万", status: "审批中", stage: "审批中", risk: "合规必配", attachment: "安全作业清单 1 份", history: "近 90 天采购 2 次", items: "绝缘手套 / 反光背心 / 警戒带", ai: "建议随电气维修采购单合并审批。" },
  { id: "REQ-20260614-035", title: "消防应急备件补货", source: "AI 找货无结果", project: "深圳湾项目", owner: "安防部 周工", amount: "￥24.8万", budget: "项目预算 ￥23.0万", status: "转治理", stage: "转治理", risk: "商品资料缺失且超预算", attachment: "消防巡检记录 1 份", history: "无完整可比历史", items: "消防应急灯 / 标识牌 / 防火耗材", ai: "建议先转运营治理补齐标准物料，再二次询价。" }
];

const demandStages = ["待分流", "待补参", "待询价", "审批中", "已生成采购单", "转治理"];

const rfqSuppliers = [
  { name: "华南电气集采供应商", status: "已报价", price: "￥38.60", delivery: "次日达", score: "96", note: "报价有效至今日 18:00" },
  { name: "广州本地照明仓", status: "已报价", price: "￥37.90", delivery: "2天", score: "89", note: "资质待复核，库存 420" },
  { name: "京东工业", status: "未响应", price: "-", delivery: "-", score: "94", note: "已读邀请，未提交报价" }
];

const compareRows = [
  { id: "SUP-GZ-014", name: "华南电气集采供应商", price: "92", delivery: "96", stock: "91", score: "96", qualification: "100", historyGap: "-10.6%", total: "95", status: "AI 推荐" },
  { id: "SUP-GZ-022", name: "广州本地照明仓", price: "98", delivery: "84", stock: "72", score: "89", qualification: "76", historyGap: "-12.3%", total: "87", status: "最低价" },
  { id: "SUP-JD-001", name: "京东工业", price: "82", delivery: "96", stock: "99", score: "94", qualification: "100", historyGap: "+4.1%", total: "90", status: "异常报价" }
];

const linkedPurchaseOrders = [
  { id: flowIds.po, title: "海珠花园照明维修采购单", status: "审批中", amount: "￥18.6万", supplier: "华南电气集采供应商", req: flowIds.req, rfq: flowIds.rfq, approval: flowIds.approval, supplierOrder: flowIds.supplierOrder, next: "采购经理审批" },
  ...purchaseOrders.filter((item) => !item.title.includes("海珠花园"))
];

function toneForStatus(status) {
  if (status.includes("补") || status.includes("治理") || status.includes("异常")) return "warning";
  if (status.includes("审批")) return "danger";
  if (status.includes("已生成") || status.includes("已报价") || status.includes("已通过")) return "success";
  return "processing";
}

function sendStructuredFeedback(title, message, tone = "success", actionLabel, actionPath) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("demo-feedback", { detail: { title, message, tone, actionLabel, actionPath } }));
}

function BuyerFlowStrip() {
  return (
    <div className="buyer-flow-strip">
      {[flowIds.req, flowIds.rfq, flowIds.po, flowIds.approval, flowIds.supplierOrder, flowIds.risk].map((id) => (
        <span key={id}>{id}</span>
      ))}
    </div>
  );
}

function DemandDrawer({ item, onClose, onRouteToInquiry }) {
  return (
    <DetailDrawer
      open={!!item}
      title={item?.title}
      subtitle={item ? `${item.id} · ${item.project} · ${item.owner}` : ""}
      onClose={onClose}
      actions={
        <>
          <DemoActionButton message={`${item?.id || "需求"} 已退回用户端补充规格参数`}>退回补参</DemoActionButton>
          <DemoActionButton message={`${item?.id || "需求"} 已标记转运营物料治理`}>转治理</DemoActionButton>
          <button className="primary-button" onClick={onRouteToInquiry}>
            <Send size={16} />
            发起询价
          </button>
        </>
      }
    >
      <RiskAlertBar title={item?.risk || "风险提示"} action="查看历史采购">{item?.ai}</RiskAlertBar>
      <div className="buyer-drawer-grid">
        <span><b>来源</b>{item?.source}</span>
        <span><b>项目</b>{item?.project}</span>
        <span><b>预算</b>{item?.budget}</span>
        <span><b>附件</b>{item?.attachment}</span>
      </div>
      <div className="panel">
        <h2>商品明细</h2>
        <p>{item?.items}</p>
      </div>
      <div className="panel">
        <h2>历史采购</h2>
        <p>{item?.history}</p>
      </div>
      <AiSuggestionCard title="AI 分流建议" evidence={["金额与交期触发询价建议", "线缆历史价波动超过 12%", "规格缺失对象转治理更稳"]} action="采纳分流建议" confidence={item?.stage === "待补参" ? "需确认" : "高"} />
    </DetailDrawer>
  );
}

export function BuyerWorkbench({ navigate }) {
  return (
    <section className="page-stack buyer-page">
      <PageHeader
        eyebrow="采购工作台"
        title="采购员今天先处理什么"
        description="待办、风险和下一步动作聚合在一个入口，优先处理超时、异常报价、未响应供应商和审批卡点。"
        actions={<button className="primary-button" onClick={() => navigate("/buyer/demands")}><Workflow size={16} />进入需求池</button>}
      />
      <BuyerFlowStrip />
      <MetricGrid items={buyerMetrics} />
      <div className="buyer-workbench-grid">
        <div className="panel">
          <h2>今日待办队列</h2>
          {workbenchTasks.map((task) => (
            <button className="buyer-task-card" key={task.id} onClick={() => navigate(task.path)}>
              <StatusTag tone={task.tone}>{task.type}</StatusTag>
              <strong>{task.title}</strong>
              <span>{task.id} · {task.amount} · {task.due}</span>
            </button>
          ))}
        </div>
        <div className="panel">
          <h2>待办分布</h2>
          <div className="buyer-action-grid">
            {["待分流需求 18", "待发布询价 6", "待比价 4", "待审批 7", "异常报价 3", "供应商未响应 5"].map((item) => (
              <button key={item} onClick={() => navigate(item.includes("询价") ? "/buyer/inquiry-control" : item.includes("审批") ? "/buyer/approvals" : "/buyer/demands")}>{item}</button>
            ))}
          </div>
        </div>
        <AiSuggestionCard
          title={`${flowIds.rfq} 应优先催办并推进比价`}
          evidence={["截止倒计时 6 小时", "京东工业未响应会影响三家比价完整度", `${flowIds.risk} 显示京东报价历史偏高 12.8%`]}
          action="采纳优先处理建议"
        />
      </div>
    </section>
  );
}

export function DemandPool({ navigate }) {
  const [selected, setSelected] = useState(demandRows[0]);
  const [view, setView] = useState("看板");
  const [handled, setHandled] = useState(false);
  const stageCounts = useMemo(
    () => demandStages.map((stage) => ({ stage, rows: demandRows.filter((row) => (stage === "待分流" ? row.status === "待分流" : row.stage === stage)) })),
    []
  );

  const routeToInquiry = () => {
    setHandled(true);
    sendStructuredFeedback("已承接需求并进入询价发布", `${flowIds.req} 已带入物料、附件和 AI 分流建议。`, "success", "发布询价", "/buyer/inquiry-publish");
    navigate("/buyer/inquiry-publish");
  };

  return (
    <section className="page-stack buyer-page">
      <PageHeader eyebrow="需求池" title="从用户端承接需求，并完成分流到询价、审批、采购单或治理" description={`${flowIds.req} 已从用户端采购车进入需求池，当前准备发布 ${flowIds.rfq}。`} />
      <FilterToolbar tabs={["看板", "列表"]} active={view} onChange={setView} extra={<StatusTag tone={handled ? "success" : "processing"}>{handled ? "已进入询价发布" : "待处理 REQ-20260613-018"}</StatusTag>} />
      {view === "看板" ? (
        <div className="buyer-kanban">
          {stageCounts.map(({ stage, rows }) => (
            <article className="buyer-kanban-col" key={stage}>
              <header><strong>{stage}</strong><span>{rows.length} 条</span></header>
              {(rows.length ? rows : [{ id: `${stage}-empty`, title: "暂无积压", risk: "保持关注" }]).map((row) => (
                <button key={row.id} onClick={() => row.project && setSelected(row)}>
                  <StatusTag tone={toneForStatus(row.status || stage)}>{row.status || stage}</StatusTag>
                  <strong>{row.title}</strong>
                  <span>{row.id} · {row.risk}</span>
                </button>
              ))}
            </article>
          ))}
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "id", label: "编号" },
            { key: "source", label: "来源" },
            { key: "project", label: "项目" },
            { key: "amount", label: "预算/金额" },
            { key: "status", label: "状态", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
            { key: "risk", label: "风险" }
          ]}
          rows={demandRows}
          onOpen={setSelected}
        />
      )}
      <div className="action-footer">
        <DemoActionButton message={`${flowIds.req} 已退回用户端补参，消息中心同步提醒`}>批量补参</DemoActionButton>
        <DemoActionButton message="已将 1 条规格缺失需求转入 GOV-MAT-046 物料治理">批量转治理</DemoActionButton>
        <button className="primary-button" onClick={routeToInquiry}><ClipboardCheck size={16} />承接 {flowIds.req}</button>
      </div>
      <DemandDrawer item={selected} onClose={() => setSelected(null)} onRouteToInquiry={routeToInquiry} />
    </section>
  );
}

export function InquiryPublish() {
  const [published, setPublished] = useState(false);
  const publish = () => {
    setPublished(true);
    sendStructuredFeedback("询价已发布", `${flowIds.rfq} 已邀请 3 家供应商，供应商端待报价 +1。`, "success", "查看询价管控", "/buyer/inquiry-control");
  };

  return (
    <section className="form-layout buyer-page">
      <div className="page-stack">
        <PageHeader eyebrow="询价发布" title={`发布 ${flowIds.rfq}`} description={`${flowIds.req} 已带入供应商选择、截止时间、询价模板、附件和澄清说明。`} />
        <div className="form-card">
          <label>关联需求单<input defaultValue={`${flowIds.req} 海珠花园地下车库照明维修`} /></label>
          <label>询价模板<input defaultValue="物业工程维修物料标准询价模板" /></label>
          <label>邀请供应商<input defaultValue="华南电气集采供应商、广州本地照明仓、京东工业" /></label>
          <label>截止时间<input defaultValue="2026-06-15 18:00" /></label>
          <label>附件<input defaultValue="现场照片 3 张、维修清单 1 份、规格确认表 1 份" /></label>
          <label>澄清说明<textarea defaultValue="需本周到货；报价需包含 LED 防潮支架灯、漏保空气开关与阻燃铜芯电缆；如库存不足请说明替代品和交期。" /></label>
          <button className="primary-button" onClick={publish}>{published ? "已发布询价" : "发布询价"}</button>
        </div>
      </div>
      <aside className="sticky-panel">
        <AiSuggestionCard title="推荐邀请 3 家供应商，覆盖低价、现货和履约稳定" evidence={["华南电气历史准时率 96%", "广州本地仓价格最低但资质需复核", "京东工业库存最充足但近期报价偏高"]} action="应用推荐供应商" />
        <RiskAlertBar tone={published ? "success" : "info"} title={published ? `${flowIds.rfq} 已生成` : "发布前校验"}>{published ? "已进入询价管控，未响应供应商会进入采购工作台待办。" : "供应商不少于 3 家，附件齐全，截止时间未过期。"}</RiskAlertBar>
      </aside>
    </section>
  );
}

export function InquiryControl({ navigate }) {
  const [urged, setUrged] = useState(false);
  const rows = rfqSuppliers.map((supplier) => ({ ...supplier, id: supplier.name, status: urged && supplier.status === "未响应" ? "已催办" : supplier.status }));
  return (
    <section className="page-stack buyer-page">
      <PageHeader eyebrow="询价管控" title={`${flowIds.rfq} 报价进度、未响应供应商和澄清记录`} description="RFQ 管控页负责避免询价超时：看进度、催办、处理澄清，并在截止后进入比价。" />
      <MetricGrid items={[{ label: "已邀请", value: "3", detail: "覆盖协议、本地、电商" }, { label: "已报价", value: "2", detail: "华南电气、本地仓" }, { label: "未响应", value: urged ? "0" : "1", detail: urged ? "已催办京东工业" : "京东工业未响应" }, { label: "截止倒计时", value: "6h", detail: "今日 18:00 截止" }]} />
      <DataTable
        columns={[
          { key: "name", label: "供应商" },
          { key: "status", label: "报价进度", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
          { key: "price", label: "报价" },
          { key: "delivery", label: "交期" },
          { key: "score", label: "履约" },
          { key: "note", label: "澄清/备注" }
        ]}
        rows={rows}
      />
      <div className="buyer-clarify-panel">
        <strong>澄清记录</strong>
        <span>10:20 华南电气确认可分两批发货；11:05 广州本地仓补充资质扫描件；14:30 京东工业已读未报价。</span>
      </div>
      <div className="action-footer">
        <button onClick={() => { setUrged(true); sendStructuredFeedback("催办已发送", "已向京东工业发送 RFQ 催办，工作台未响应数量同步减少。", "warning"); }}>催办未响应</button>
        <DemoActionButton message="已记录澄清说明，供应商端可见">追加澄清</DemoActionButton>
        <button className="primary-button" onClick={() => navigate("/buyer/compare")}>进入比价页</button>
      </div>
    </section>
  );
}

export function ComparePage({ navigate }) {
  const [locked, setLocked] = useState(false);
  const lockQuote = () => {
    setLocked(true);
    sendStructuredFeedback("已锁定推荐供应商", `已选择华南电气并准备生成 ${flowIds.po}，推荐理由已写入审批摘要。`, "success", "生成采购单", "/buyer/purchase-orders");
  };
  return (
    <section className="detail-layout buyer-page">
      <div className="page-stack">
        <PageHeader eyebrow="询价结果/比价" title={`${flowIds.rfq} 综合评分矩阵`} description="价格、交期、库存、履约、资质、历史价差一起决策，避免只选最低价。" />
        <DataTable
          columns={[
            { key: "name", label: "供应商" },
            { key: "price", label: "价格" },
            { key: "delivery", label: "交期" },
            { key: "stock", label: "库存" },
            { key: "score", label: "履约" },
            { key: "qualification", label: "资质" },
            { key: "historyGap", label: "历史价差" },
            { key: "total", label: "综合" },
            { key: "status", label: "判断", render: (value) => <StatusTag tone={value.includes("异常") ? "danger" : value.includes("推荐") ? "success" : "processing"}>{value}</StatusTag> }
          ]}
          rows={compareRows}
        />
        <RiskAlertBar tone="danger" title={flowIds.risk} action="要求澄清">京东工业报价高于 90 天历史均价 12.8%，且协议价即将失效，不建议直接中选。</RiskAlertBar>
      </div>
      <aside className="sticky-panel">
        <AiSuggestionCard title="推荐华南电气：综合分最高且风险可解释" evidence={["价格比最低价高 1.8%，但履约高 7 分", "库存满足本周到货", "资质正常且历史售后率低"]} action="锁定推荐报价" />
        <button className="full primary-button" onClick={lockQuote}><CheckCircle2 size={16} />{locked ? "已锁定华南电气" : "锁定推荐报价"}</button>
        <button className="full primary-button" onClick={() => { sendStructuredFeedback("采购单已生成", `${flowIds.po} 已关联 ${flowIds.req}、${flowIds.rfq} 和 ${flowIds.approval}。`, "success", "查看采购单", "/buyer/purchase-orders"); navigate("/buyer/purchase-orders"); }}><Send size={16} />生成 {flowIds.po}</button>
      </aside>
    </section>
  );
}

export function PurchaseOrders() {
  return (
    <section className="page-stack buyer-page">
      <PageHeader eyebrow="采购单管理" title={`${flowIds.po} 关联需求、询价、审批和供应商订单`} description="采购单不是孤立列表，每一行都能追溯从需求到供应商履约的链路。" />
      <DataTable
        columns={[
          { key: "id", label: "采购单" },
          { key: "req", label: "关联需求" },
          { key: "rfq", label: "关联询价" },
          { key: "approval", label: "审批单" },
          { key: "supplierOrder", label: "供应商订单" },
          { key: "status", label: "状态", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
          { key: "amount", label: "金额" },
          { key: "next", label: "下一步" }
        ]}
        rows={linkedPurchaseOrders}
      />
      <StatusTimeline steps={[
        { label: "需求承接", text: `${flowIds.req} 已进入采购端需求池`, state: "done" },
        { label: "询价比价", text: `${flowIds.rfq} 已完成 2 家报价并锁定推荐供应商`, state: "done" },
        { label: "采购单审批", text: `${flowIds.po} 正在等待 ${flowIds.approval} 审批`, state: "active" },
        { label: "供应商履约", text: `审批后生成 ${flowIds.supplierOrder}`, state: "todo" }
      ]} />
    </section>
  );
}

export function Approvals() {
  const [decision, setDecision] = useState("待审批");
  const [opinion, setOpinion] = useState("同意按华南电气报价执行，需保留京东工业异常报价澄清记录。");
  const decide = (next) => {
    setDecision(next);
    sendStructuredFeedback(`审批${next === "已通过" ? "通过" : "驳回"}已记录`, `${flowIds.approval} 已写入审批意见，${flowIds.po} 状态已更新为${next}。`, next === "已通过" ? "success" : "warning", "查看采购单", "/buyer/purchase-orders");
  };
  return (
    <section className="detail-layout buyer-page">
      <div className="page-stack">
        <PageHeader eyebrow="订单审批" title={`${flowIds.approval} 风险摘要与审批意见`} description="审批页展示历史价、协议价、预算对比和 AI 风险摘要，动作只做前端状态反馈。" />
        <RiskAlertBar tone="danger" title="风险摘要" action="展开依据">{flowIds.risk}：京东工业报价高于 90 天均价 12.8%，当前选定华南电气可规避异常价，但仍需记录澄清。</RiskAlertBar>
        <div className="buyer-compare-cards">
          <article><span>历史价</span><strong>￥42.10</strong><small>90 天均价</small></article>
          <article><span>协议价</span><strong>￥39.20</strong><small>协议 12 天后到期</small></article>
          <article><span>本次推荐价</span><strong>￥38.60</strong><small>低于历史价 8.3%</small></article>
          <article><span>项目预算</span><strong>￥20.0万</strong><small>本单占用 93%</small></article>
        </div>
        <DataTable columns={[
          { key: "id", label: "单号" },
          { key: "title", label: "审批对象" },
          { key: "amount", label: "金额" },
          { key: "status", label: "状态" },
          { key: "next", label: "动作" }
        ]} rows={[{ ...linkedPurchaseOrders[0], status: decision }]} />
      </div>
      <aside className="sticky-panel">
        <label className="buyer-opinion">
          审批意见
          <textarea value={opinion} onChange={(event) => setOpinion(event.target.value)} />
        </label>
        <button className="full primary-button" onClick={() => decide("已通过")}>通过审批</button>
        <button className="full" onClick={() => decide("已驳回")}>驳回并要求补充比价</button>
      </aside>
    </section>
  );
}

export function CostAlerts() {
  return (
    <section className="page-stack buyer-page">
      <PageHeader eyebrow="历史价/成本预警" title={`${flowIds.risk} 的依据和建议动作`} description="成本风险要能解释来源，并给采购员下一步处理动作；不进入预算规则配置。" />
      <MetricGrid items={[{ label: "异常金额", value: "￥68.4万", detail: "23 条预警" }, { label: "高于历史价", value: "11项", detail: "最高 +18%" }, { label: "协议价失效", value: "5项", detail: "需运营更新价格库" }, { label: "需补充比价", value: "3单", detail: "含 RFQ-20260613-006" }]} />
      <div className="buyer-cost-layout">
        <div className="chart-panel">
          <h2>价格趋势</h2>
          {[
            { label: "90 天均价", value: "￥42.10", bar: "78%" },
            { label: "协议价", value: "￥39.20", bar: "72%" },
            { label: "华南电气", value: "￥38.60", bar: "70%" },
            { label: "京东工业", value: "￥47.50", bar: "88%" }
          ].map((row) => (
            <div className="bar-row" key={row.label} style={{ "--bar": row.bar }}>
              <span>{row.label}</span>
              <div />
              <b>{row.value}</b>
            </div>
          ))}
        </div>
        <div className="panel">
          <h2>异常原因</h2>
          <p>京东工业报价高于 90 天历史均价 12.8%，且协议价剩余有效期 12 天，若直接选高价供应商会触发审批说明和成本归因。</p>
          <h2>建议动作</h2>
          <div className="buyer-action-grid">
            <DemoActionButton message="已要求京东工业澄清异常报价">要求澄清</DemoActionButton>
            <DemoActionButton message="已将华南电气作为推荐报价带入比价页">选择低风险报价</DemoActionButton>
            <DemoActionButton message="已向采购经理发送成本风险摘要">通知采购经理</DemoActionButton>
            <DemoActionButton message="已把协议价失效线索同步到运营价格库">同步价格库</DemoActionButton>
          </div>
        </div>
      </div>
      <DataTable
        columns={[
          { key: "riskId", label: "风险编号" },
          { key: "object", label: "对象" },
          { key: "current", label: "当前价" },
          { key: "history", label: "历史/协议" },
          { key: "reason", label: "异常原因" },
          { key: "action", label: "建议动作" }
        ]}
        rows={[
          { id: flowIds.risk, riskId: flowIds.risk, object: `${flowIds.rfq} 京东工业报价`, current: "￥47.50", history: "历史均价 ￥42.10 / 协议价 ￥39.20", reason: "高于历史均价 12.8%", action: "澄清或不推荐中选" },
          { id: "RISK-BUDGET-014", riskId: "RISK-BUDGET-014", object: flowIds.po, current: "￥18.6万", history: "项目预算 ￥20.0万", reason: "预算占用 93%", action: "审批意见说明" }
        ]}
      />
    </section>
  );
}
