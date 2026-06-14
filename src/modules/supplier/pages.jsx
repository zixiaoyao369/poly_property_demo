import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FileText,
  PackageCheck,
  RefreshCw,
  Send,
  ShieldCheck,
  Truck,
  UploadCloud
} from "lucide-react";
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

const flowIds = {
  req: "REQ-20260613-018",
  rfq: "RFQ-20260613-006",
  po: "PO-20260613-088",
  supplierOrder: "SO-20260613-221",
  risk: "RISK-PRICE-031"
};

const dashboardTodos = [
  { id: flowIds.rfq, type: "待报价", title: "海珠花园地下车库照明维修", count: "1", status: "6小时截止", tone: "danger", path: "/supplier/inquiries", desc: "LED 支架灯、漏保、阻燃线缆需提交价格、库存、交期和替代品说明。" },
  { id: flowIds.supplierOrder, type: "待发货", title: "照明维修采购单履约", count: "3", status: "明日发货", tone: "warning", path: "/supplier/fulfillment", desc: "广州仓库存充足，线缆建议佛山仓拆单补发，履约节点会回传采购/用户侧。" },
  { id: "QUAL-CCC-2026", type: "待补资质", title: "CCC 强制认证即将到期", count: "2", status: "18天", tone: "danger", path: "/supplier/qualification", desc: "影响电气照明类报价资格、商品审核和供应商风险展示。" },
  { id: "AS-20260613-008", type: "售后待处理", title: "漏保空气开关少发 6 个", count: "1", status: "24小时内", tone: "warning", path: "/supplier/after-sales", desc: "需提交补发方案和凭证，逾期会影响履约评分。" },
  { id: "SKU-AUDIT-041", type: "审核驳回商品", title: "LED 防潮支架灯资料待修正", count: "4", status: "可重提", tone: "processing", path: "/supplier/products", desc: "驳回原因集中在检测报告、质保期限和图片清晰度。" }
];

const productRows = [
  { id: "SKU-LED-1200", name: "LED 防潮支架灯 1200mm", category: "电气照明", completeness: "92%", audit: "审核驳回", stock: "860 / 预警", listing: "已下架", risk: "缺 CCC 新版证书与质保期限", price: "￥38.60" },
  { id: "SKU-BRK-32A", name: "漏保空气开关 2P 32A", category: "电气照明", completeness: "98%", audit: "审核通过", stock: "1240 / 充足", listing: "已上架", risk: "安全必配，报价资格正常", price: "￥46.50" },
  { id: "SKU-CAB-BV25", name: "阻燃铜芯电缆 BV2.5", category: "线缆耗材", completeness: "84%", audit: "待审核", stock: "240 / 预警", listing: "待上架", risk: "检测报告审核中，建议补库存", price: "￥186.00" },
  { id: "SKU-LAMP-600", name: "LED 防潮支架灯 600mm", category: "电气照明", completeness: "76%", audit: "疑似重复", stock: "420 / 正常", listing: "草稿", risk: "与 SKU-LED-1200 相似度 82%", price: "￥29.80" }
];

const inquiryRows = [
  { id: flowIds.rfq, project: "广州海珠花园", demand: "LED 支架灯 160 套 / 漏保 45 个 / 阻燃线缆 24 卷", deadline: "2026-06-15 18:00", status: "待报价", quote: "未提交", risk: "CCC 18 天后到期，仍可报价但需补资质" },
  { id: "RFQ-20260614-011", project: "佛山千灯湖项目", demand: "保洁耗材季度包", deadline: "2026-06-17 12:00", status: "已报价", quote: "￥42.2万 / 2天", risk: "等待采购比价" },
  { id: "RFQ-20260612-003", project: "总部园区", demand: "绝缘手套 / 反光背心 / 警戒带", deadline: "已截止", status: "已过期", quote: "未提交", risk: "不进入有效比价" }
];

const fulfillmentRows = [
  { id: flowIds.supplierOrder, po: flowIds.po, project: "广州海珠花园", goods: "LED 支架灯等 3 类物料", status: "待确认", deadline: "2026-06-16 发货", logistics: "待填写", risk: "线缆库存不足 24 卷" },
  { id: "SO-20260614-105", po: "PO-20260614-106", project: "佛山千灯湖项目", goods: "保洁耗材季度包", status: "备货中", deadline: "2026-06-17 发货", logistics: "待填写", risk: "无异常" },
  { id: "SO-20260612-094", po: "PO-20260612-071", project: "总部园区", goods: "巡检反光背心 300 件", status: "已发货", deadline: "配送中", logistics: "SF778812340CN", risk: "物流预计明日妥投" }
];

const qualificationRows = [
  { id: "QUAL-CCC-2026", name: "CCC 强制认证", type: "强制认证", status: "即将到期", expire: "2026-07-01", impact: "影响电气照明报价资格、商品审核和供应商风险" },
  { id: "QUAL-BRAND-FSL", name: "佛山照明品牌授权", type: "品牌授权", status: "有效", expire: "2026-12-31", impact: "支持 LED 支架灯上架和比价资质展示" },
  { id: "QUAL-TEST-LED", name: "LED 检测报告", type: "检测报告", status: "审核中", expire: "2027-03-20", impact: "审核通过前新 SKU 只能保存草稿" },
  { id: "QUAL-SAFE-OLD", name: "旧版安全生产证明", type: "供应商证照", status: "已过期", expire: "2026-05-30", impact: "进入供应商风险观察，不影响已下单履约" }
];

function sendStructuredFeedback(title, message, tone = "success", actionLabel, actionPath) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("demo-feedback", { detail: { title, message, tone, actionLabel, actionPath } }));
}

function toneForStatus(status = "") {
  if (status.includes("驳回") || status.includes("过期") || status.includes("不足") || status.includes("预警")) return "danger";
  if (status.includes("即将") || status.includes("待") || status.includes("疑似") || status.includes("审核中")) return "warning";
  if (status.includes("已报价") || status.includes("通过") || status.includes("有效") || status.includes("已发货") || status.includes("上架")) return "success";
  return "processing";
}

function SupplierFlowStrip() {
  return (
    <div className="supplier-flow-strip">
      {[flowIds.req, flowIds.rfq, flowIds.po, flowIds.supplierOrder, flowIds.risk].map((id) => (
        <span key={id}>{id}</span>
      ))}
    </div>
  );
}

function SupplierTaskDrawer({ task, onClose, navigate }) {
  return (
    <DetailDrawer
      open={!!task}
      title={task?.title}
      subtitle={task ? `${task.id} · ${task.type} · ${task.status}` : ""}
      onClose={onClose}
      actions={
        <>
          <DemoActionButton message={`${task?.id || "待办"} 已标记为稍后处理`}>稍后处理</DemoActionButton>
          <button className="primary-button" onClick={() => task?.path && navigate(task.path)}>
            <Send size={16} />
            去处理
          </button>
        </>
      }
    >
      <RiskAlertBar tone={task?.tone === "danger" ? "danger" : "warning"} title={task?.type || "待办"}>{task?.desc}</RiskAlertBar>
      <div className="supplier-drawer-grid">
        <span><b>关联需求</b>{flowIds.req}</span>
        <span><b>关联询价</b>{flowIds.rfq}</span>
        <span><b>采购单</b>{flowIds.po}</span>
        <span><b>履约单</b>{flowIds.supplierOrder}</span>
      </div>
      <AiSuggestionCard
        title="AI 优先处理建议"
        evidence={["先处理今日截止 RFQ，避免采购端比价缺口", "补 CCC 资质可解除商品审核和报价资格风险", "发货前补物流节点可同步采购/用户侧进度"]}
        action="采纳处理顺序"
      />
    </DetailDrawer>
  );
}

export function SupplierWorkbench({ navigate }) {
  const [selected, setSelected] = useState(dashboardTodos[0]);
  return (
    <section className="page-stack supplier-page">
      <PageHeader
        eyebrow="供应商工作台"
        title="进入系统先看待办，而不是找菜单"
        description="待报价、待发货、待补资质、售后待处理和审核驳回商品聚合为供应商日常工作队列。"
        actions={<button className="primary-button" onClick={() => navigate("/supplier/inquiries")}><PackageCheck size={16} />处理 {flowIds.rfq}</button>}
      />
      <SupplierFlowStrip />
      <MetricGrid items={[
        { label: "待报价", value: "1", detail: `${flowIds.rfq} 今日截止` },
        { label: "待发货", value: "3", detail: `${flowIds.supplierOrder} 待确认` },
        { label: "待补资质", value: "2", detail: "CCC 18 天后到期" },
        { label: "售后待处理", value: "1", detail: "24 小时 SLA" }
      ]} />
      <div className="supplier-workbench-grid">
        <div className="panel">
          <h2>今日待办队列</h2>
          {dashboardTodos.map((task) => (
            <button className="supplier-task-card" key={task.id} onClick={() => setSelected(task)}>
              <StatusTag tone={task.tone}>{task.type}</StatusTag>
              <strong>{task.title}</strong>
              <span>{task.id} · {task.status} · {task.desc}</span>
            </button>
          ))}
        </div>
        <div className="panel">
          <h2>快捷动作</h2>
          <div className="supplier-action-grid">
            <button onClick={() => navigate("/supplier/inquiries")}>参与报价</button>
            <button onClick={() => navigate("/supplier/fulfillment")}>确认接单/发货</button>
            <button onClick={() => navigate("/supplier/products")}>修正驳回商品</button>
            <button onClick={() => navigate("/supplier/qualification")}>补充资质</button>
          </div>
        </div>
        <AiSuggestionCard
          title={`${flowIds.rfq} 和 CCC 资质是当前优先级最高的两件事`}
          evidence={["RFQ 截止倒计时 6 小时，采购端比价依赖报价", "CCC 到期会影响电气类商品审核和后续报价资格", `${flowIds.supplierOrder} 发货节点会回传采购/用户侧进度`]}
          action="采纳优先处理建议"
        />
      </div>
      <SupplierTaskDrawer task={selected} onClose={() => setSelected(null)} navigate={navigate} />
    </section>
  );
}

export function SupplierProducts() {
  const [selected, setSelected] = useState(productRows[0]);
  const [batchDone, setBatchDone] = useState(false);
  const rows = productRows.map((row) => ({ ...row, audit: batchDone && row.audit === "审核驳回" ? "已重新提交" : row.audit }));
  return (
    <section className="page-stack supplier-page">
      <PageHeader eyebrow="商品维护列表" title="资料完整度、审核、库存和上下架状态一屏处理" description="商品维护只处理供应商可执行动作；审核规则和类目治理仍由运营端承接。" />
      <RiskAlertBar tone="danger" title="审核反馈">{rows[0].id} 驳回原因：CCC 新版证书缺失、图片水印遮挡、质保期限未填写。修正后可再次提交运营审核。</RiskAlertBar>
      <DataTable
        columns={[
          { key: "id", label: "SKU" },
          { key: "name", label: "商品" },
          { key: "completeness", label: "资料完整度" },
          { key: "audit", label: "审核状态", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
          { key: "stock", label: "库存预警", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
          { key: "listing", label: "上架状态", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
          { key: "risk", label: "处理提示" }
        ]}
        rows={rows}
        onOpen={setSelected}
      />
      <div className="action-footer">
        <button onClick={() => sendStructuredFeedback("批量下架已记录", "已选择库存预警 SKU，状态变为下架待确认。", "warning")}>批量下架</button>
        <button onClick={() => { setBatchDone(true); sendStructuredFeedback("批量提交审核成功", "SKU-LED-1200 已带修正资料重新提交，运营端商品审核待办 +1。", "success", "查看商品上架", "/supplier/product-edit"); }}>批量提交审核</button>
        <DemoActionButton message="商品批量导入已进入前端占位流程，不处理真实文件">批量导入</DemoActionButton>
      </div>
      <ProductFeedbackDrawer item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProductFeedbackDrawer({ item, onClose }) {
  return (
    <DetailDrawer
      open={!!item}
      title={item?.name}
      subtitle={item ? `${item.id} · ${item.category} · ${item.price}` : ""}
      onClose={onClose}
      actions={
        <>
          <DemoActionButton message={`${item?.id || "商品"} 已定位到编辑页对应字段`}>定位字段</DemoActionButton>
          <DemoActionButton className="primary-button" message={`${item?.id || "商品"} 已重新提交运营审核`}>再次提交</DemoActionButton>
        </>
      }
    >
      <div className="supplier-drawer-grid">
        <span><b>资料完整度</b>{item?.completeness}</span>
        <span><b>审核状态</b>{item?.audit}</span>
        <span><b>库存</b>{item?.stock}</span>
        <span><b>上架状态</b>{item?.listing}</span>
      </div>
      <RiskAlertBar tone={toneForStatus(item?.audit) === "danger" ? "danger" : "warning"} title="驳回原因 / 修改建议">{item?.risk}</RiskAlertBar>
      <AiSuggestionCard title="AI 审核退回解释" evidence={["检测报告附件与类目资质不匹配", "主图存在水印，影响运营审核", "质保期限为电气类目必填项"]} action="应用修改建议" />
    </DetailDrawer>
  );
}

export function ProductEdit() {
  const [applied, setApplied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="form-layout supplier-page">
      <div className="page-stack">
        <PageHeader eyebrow="商品上架/编辑" title="提交运营审核前先完成资料质量校验" description="类目、规格 SKU、图片和资质附件在供应商端补齐；运营端只接收可审核资料。" />
        <div className="form-card">
          <div className="supplier-form-grid">
            <label>商品名称<input defaultValue={applied ? "LED 防潮支架灯 1200mm / IP65 / 18W" : "LED 防潮支架灯"} /></label>
            <label>建议类目<input defaultValue={applied ? "电气照明 / 工程维修 / 防潮支架灯" : "电气照明 / 工程维修"} /></label>
            <label>品牌<input defaultValue="佛山照明" /></label>
            <label>质保期限<input defaultValue={applied ? "24 个月" : ""} placeholder="必填" /></label>
          </div>
          <label>规格参数<textarea defaultValue={applied ? "18W / 1200mm / IP65 / 6500K / 铝合金灯体 / 适配地下车库潮湿环境" : "18W / 600mm / IP65 / 6500K / 铝合金灯体"} /></label>
          <div className="supplier-sku-grid">
            {[
              ["SKU-LED-1200-A", "1200mm / 18W", "￥38.60", "广州仓 860"],
              ["SKU-LED-600-A", "600mm / 12W", "￥29.80", "佛山仓 420"],
              ["SKU-LED-1200-E", "应急款 / 18W", "￥52.00", "广州仓 160"]
            ].map(([sku, spec, price, stock]) => (
              <span key={sku}><b>{sku}</b>{spec}<small>{price} · {stock}</small></span>
            ))}
          </div>
          <div className="supplier-upload-grid">
            <button onClick={() => sendStructuredFeedback("图片已上传", "主图与场景图已进入前端附件占位。", "success")}><UploadCloud size={16} />商品图片占位</button>
            <button onClick={() => sendStructuredFeedback("资质附件已上传", "CCC 证书和检测报告已绑定当前 SKU。", "success")}><FileText size={16} />资质附件占位</button>
            <button onClick={() => sendStructuredFeedback("重复识别已打开", "发现 SKU-LED-600-A 与旧商品相似度 82%，建议沿用规格模板。", "warning")}><RefreshCw size={16} />查看重复项</button>
          </div>
          <div className="action-footer">
            <DemoActionButton message="商品草稿已保存">保存草稿</DemoActionButton>
            <button className="primary-button" onClick={() => { setSubmitted(true); sendStructuredFeedback("提交审核成功", "SKU-LED-1200 已提交运营审核，商品审核待办 +1。", "success", "查看商品维护", "/supplier/products"); }}>
              <Send size={16} />
              {submitted ? "已提交审核" : "提交运营审核"}
            </button>
          </div>
        </div>
      </div>
      <aside className="sticky-panel">
        <AiSuggestionCard
          title="AI 已补齐 6 个参数，并发现 2 条相似商品"
          evidence={["说明书提取 IP65 防护等级", "类目必填质保期限缺失", "与 SKU-LED-600-A 相似度 82%"]}
          action="一键应用参数"
          confidence="需确认"
        />
        <button className="full primary-button" onClick={() => { setApplied(true); sendStructuredFeedback("AI 参数已应用", "标准标题、类目、质保和规格参数已填入表单。", "success"); }}>
          <CheckCircle2 size={16} />
          应用 AI 补全
        </button>
        <RiskAlertBar tone={submitted ? "success" : "warning"} title={submitted ? "已提交审核" : "提交前校验"}>{submitted ? "运营端可看到商品资料、资质附件和重复识别提示。" : "仍需确认资质有效期和重复 SKU 处理方式。"}</RiskAlertBar>
      </aside>
    </section>
  );
}

export function SupplierInquiries() {
  const [selected, setSelected] = useState(inquiryRows[0]);
  const [quoted, setQuoted] = useState(false);
  const rows = inquiryRows.map((row) => row.id === flowIds.rfq && quoted ? { ...row, status: "已报价", quote: "￥38.60 / 库存 860 / 次日达" } : row);
  return (
    <section className="detail-layout supplier-page">
      <div className="page-stack">
        <PageHeader eyebrow="询价列表 + 参与报价" title={`承接采购端 ${flowIds.rfq}`} description="供应商看到截止时间、需求明细、报价状态，并提交价格、库存、交期、替代品和备注。" />
        <FilterToolbar tabs={["全部", "待报价", "已报价", "已过期"]} active={quoted ? "已报价" : "待报价"} onChange={() => {}} extra={<StatusTag tone={quoted ? "success" : "danger"}>{quoted ? "已提交报价" : "RFQ 待报价"}</StatusTag>} />
        <DataTable
          columns={[
            { key: "id", label: "询价单" },
            { key: "project", label: "项目" },
            { key: "demand", label: "需求明细" },
            { key: "deadline", label: "截止时间" },
            { key: "status", label: "报价状态", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
            { key: "quote", label: "报价" },
            { key: "risk", label: "提示" }
          ]}
          rows={rows}
          onOpen={setSelected}
        />
        <RiskAlertBar tone={quoted ? "success" : "info"} title="报价如何被采购端使用">{quoted ? "采购端比价页会看到价格、库存、交期、替代品备注和资质风险，并纳入综合评分。" : "提交后会同步到采购端询价管控和比价页，不直接生成采购单。"}</RiskAlertBar>
      </div>
      <aside className="sticky-panel">
        <h2>{selected?.id} 报价单</h2>
        <div className="supplier-mini-list">
          <span><b>报价</b><input defaultValue="38.60" /></span>
          <span><b>库存</b><input defaultValue="广州仓 860 套；佛山仓 220 套" /></span>
          <span><b>交期</b><input defaultValue="次日达；线缆可 2 天补齐" /></span>
          <span><b>替代品</b><input defaultValue="可替代 600mm 规格，但需采购确认" /></span>
          <span><b>备注</b><textarea defaultValue="报价含税含运；若线缆需同批到货，建议拆仓发货。" /></span>
        </div>
        <AiSuggestionCard title="AI 报价建议与竞争力提示" evidence={["建议报价 ￥38.60，低于 90 天均价 8.3%", "次日达会提升交期评分", "CCC 临期需在备注中承诺补证"]} action="填入建议价" />
        <button className="full primary-button" onClick={() => { setQuoted(true); sendStructuredFeedback("报价已提交", `${flowIds.rfq} 已提交价格、库存、交期和替代品备注；采购端比价页可使用该报价。`, "success", "查看采购端比价", "/buyer/compare"); }}>
          <Send size={16} />
          {quoted ? "已提交报价" : "提交报价"}
        </button>
      </aside>
    </section>
  );
}

export function Fulfillment() {
  const [selected, setSelected] = useState(fulfillmentRows[0]);
  const [stage, setStage] = useState("待确认");
  const [tracking, setTracking] = useState("");
  const rows = fulfillmentRows.map((row) => row.id === flowIds.supplierOrder ? { ...row, status: stage, logistics: tracking || row.logistics } : row);
  const advance = (next, title, message) => {
    setStage(next);
    sendStructuredFeedback(title, message, "success", "查看用户侧进度", "/mall/orders");
  };
  return (
    <section className="page-stack supplier-page">
      <PageHeader eyebrow="订单履约列表" title={`${flowIds.supplierOrder} 确认接单、备货、发货和异常上报`} description="履约节点需要能与采购端采购单、用户侧订单跟踪对应。" />
      <SupplierFlowStrip />
      <RiskAlertBar tone={stage === "异常" ? "danger" : "warning"} title="履约建议">线缆库存不足 24 卷，建议广州仓先发支架灯与漏保，佛山仓补线缆并在备注中说明。</RiskAlertBar>
      <DataTable
        columns={[
          { key: "id", label: "供应商订单" },
          { key: "po", label: "采购单" },
          { key: "project", label: "项目" },
          { key: "goods", label: "商品" },
          { key: "status", label: "履约状态", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
          { key: "deadline", label: "交期" },
          { key: "logistics", label: "物流单号" },
          { key: "risk", label: "异常/建议" }
        ]}
        rows={rows}
        onOpen={setSelected}
      />
      <div className="action-footer">
        <button onClick={() => advance("已确认", "已确认接单", `${flowIds.supplierOrder} 已确认接单，采购端可见供应商已响应。`)}><CheckCircle2 size={16} />确认接单</button>
        <button onClick={() => advance("备货中", "备货状态已更新", "广州仓与佛山仓已进入备货，预计明日发货。")}><ClipboardList size={16} />进入备货</button>
        <button className="primary-button" onClick={() => { setTracking("SF778812340CN"); advance("已发货", "发货信息已更新", `${flowIds.supplierOrder} 已填写物流单号 SF778812340CN，采购/用户侧进度同步为配送中。`); }}><Truck size={16} />填写发货</button>
        <button onClick={() => advance("异常", "履约异常已上报", "线缆库存不足已同步采购端，建议采购确认部分发货。")}><AlertTriangle size={16} />异常上报</button>
      </div>
      <FulfillmentDrawer item={selected} stage={stage} tracking={tracking} onClose={() => setSelected(null)} />
    </section>
  );
}

function FulfillmentDrawer({ item, stage, tracking, onClose }) {
  return (
    <DetailDrawer open={!!item} title={item?.id} subtitle={item ? `${item.po} · ${item.project}` : ""} onClose={onClose}>
      <StatusTimeline steps={[
        { label: "采购端下单", text: `${flowIds.po} 已选择华南电气报价`, state: "done" },
        { label: "供应商确认", text: stage === "待确认" ? "等待供应商确认接单" : "供应商已确认接单", state: stage === "待确认" ? "active" : "done" },
        { label: "备货", text: stage === "备货中" || stage === "已发货" ? "广州仓与佛山仓拆单备货" : "待确认后进入备货", state: stage === "备货中" || stage === "已发货" ? "done" : "todo" },
        { label: "发货", text: tracking || "待填写物流单号", state: stage === "已发货" ? "active" : "todo" },
        { label: "用户侧跟踪", text: "发货后用户端我的订单显示配送中", state: "todo" }
      ]} />
      <AiSuggestionCard title="AI 履约建议" evidence={["支架灯广州仓库存 860 套，满足本次需求", "线缆库存不足，建议部分发货并补充计划", "异常说明会同步采购端，避免用户侧只看到停滞"]} action="生成异常说明" />
    </DetailDrawer>
  );
}

export function AfterSales() {
  const [handled, setHandled] = useState(false);
  return (
    <section className="page-stack supplier-page">
      <PageHeader eyebrow="售后查询/跟进" title="轻量处理退换、补发、维修、争议和凭证" description="只做供应商侧售后协同，不展开完整客服后台或退款财务流程。" />
      <DataTable
        columns={[
          { key: "id", label: "售后单" },
          { key: "order", label: "关联订单" },
          { key: "title", label: "问题" },
          { key: "status", label: "状态", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
          { key: "risk", label: "处理时限" }
        ]}
        rows={[
          { id: "AS-20260613-008", order: flowIds.supplierOrder, title: "漏保空气开关少发 6 个", status: handled ? "处理中" : "待响应", risk: "需 24 小时内处理" },
          { id: "AS-20260614-009", order: "SO-20260614-105", title: "保洁剂外包装破损", status: "处理中", risk: "已上传照片凭证" }
        ]}
      />
      <div className="action-footer">
        <button onClick={() => { setHandled(true); sendStructuredFeedback("售后处理意见已提交", "已同意补发漏保 6 个，并上传补发说明；采购/用户侧售后进度同步更新。", "success"); }}>同意补发</button>
        <DemoActionButton message="已提交维修说明和处理凭证">上传凭证</DemoActionButton>
        <DemoActionButton message="争议售后已请求平台介入，仅做前端提示">平台介入</DemoActionButton>
      </div>
    </section>
  );
}

export function Qualification() {
  const [submitted, setSubmitted] = useState(false);
  const rows = qualificationRows.map((row) => row.id === "QUAL-CCC-2026" && submitted ? { ...row, status: "审核中", impact: "已提交新版证书，运营审核通过后解除报价/审核风险" } : row);
  return (
    <section className="page-stack supplier-page">
      <PageHeader eyebrow="资质管理" title="证照有效期直接影响报价资格、商品审核和供应商风险" description="资质不是独立资料库，它要在询价、商品维护和履约风险中被解释出来。" />
      <RiskAlertBar tone={submitted ? "info" : "danger"} title={submitted ? "新版 CCC 已提交审核" : "资质到期风险"}>{submitted ? "运营审核通过前，电气类商品仍显示资质审核中。" : "CCC 证书 18 天后到期，到期后将影响电气类商品报价资格和商品审核通过率。"}</RiskAlertBar>
      <DataTable
        columns={[
          { key: "name", label: "证照/资质" },
          { key: "type", label: "证照类型" },
          { key: "status", label: "状态", render: (value) => <StatusTag tone={toneForStatus(value)}>{value}</StatusTag> },
          { key: "expire", label: "有效期" },
          { key: "impact", label: "影响范围" }
        ]}
        rows={rows}
      />
      <div className="supplier-workbench-grid">
        <AiSuggestionCard title="建议先更新 CCC，再重新提交 LED SKU" evidence={["影响 28 个电气照明 SKU", `影响 ${flowIds.rfq} 报价资格展示`, "运营端供应商风险会从高风险降为审核中"]} action="生成补办待办" />
        <div className="panel">
          <h2>影响关系</h2>
          <div className="supplier-action-grid">
            <span>报价资格：电气类 RFQ 会显示临期风险</span>
            <span>商品审核：缺证 SKU 审核容易被驳回</span>
            <span>供应商风险：运营端店铺管理会标记观察</span>
            <span>履约展示：不阻断已下单，但会提示风险</span>
          </div>
        </div>
        <div className="panel">
          <h2>资质动作</h2>
          <div className="supplier-action-grid">
            <button onClick={() => { setSubmitted(true); sendStructuredFeedback("资质已提交审核", "新版 CCC 证书已提交运营审核，商品审核与报价页显示为审核中。", "success"); }}><UploadCloud size={16} />上传新版证书</button>
            <DemoActionButton message="已通知运营优先审核 CCC 证书">通知运营审核</DemoActionButton>
            <DemoActionButton message="已生成 28 个受影响 SKU 清单">查看影响商品</DemoActionButton>
            <DemoActionButton message={`${flowIds.rfq} 报价页已带入资质风险说明`}>同步报价说明</DemoActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
