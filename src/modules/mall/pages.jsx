import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  ImagePlus,
  ListChecks,
  PackagePlus,
  Search,
  Send,
  ShoppingCart,
  Sparkles,
  Table2
} from "lucide-react";
import {
  AiSuggestionCard,
  DataTable,
  DemoActionButton,
  FilterToolbar,
  MetricGrid,
  PageHeader,
  RiskAlertBar,
  StatusTag,
  StatusTimeline,
  emitDemoFeedback
} from "../../components/ui.jsx";
import { demands, products } from "../../data/mock/procurement.js";

const targetReqId = "REQ-20260613-018";

const mallMetrics = [
  { label: "我的待办", value: "4", detail: "2 个待补参，1 个审批中" },
  { label: "采购进度", value: "7单", detail: `${targetReqId} 正在询价` },
  { label: "采购车金额", value: "￥18.6万", detail: "3 个供应商拆分" },
  { label: "公告提醒", value: "3条", detail: "防汛物资、照明协议价更新" }
];

const scenarios = [
  { name: "地下车库照明", query: "地下车库照明维修，本周到货", category: "电气照明", status: "已拆解 4 类物料", risk: "线缆建议询价" },
  { name: "保洁耗材补货", query: "保洁耗材季度补货，优先协议价", category: "保洁耗材", status: "常买清单可复购", risk: "金额超过直采阈值" },
  { name: "安防巡检", query: "夜间安防巡检物资补充", category: "劳保安防", status: "劳保常备", risk: "低风险" },
  { name: "工程维修", query: "水泵房阀门维修，铭牌不清楚", category: "管阀泵类", status: "需补 DN 口径", risk: "转需求提报" },
  { name: "防汛物资", query: "雨季防汛沙袋和应急工具", category: "防汛物资", status: "库存不足", risk: "建议询价" }
];

const todos = [
  { title: "补充不锈钢球阀 DN 口径", desc: "采购车中 1 项规格不确定，影响采购端分流。", path: "/mall/requirement", tone: "warning" },
  { title: `${targetReqId} 采购处理中`, desc: "需求池已承接，RFQ-20260613-006 正在询价。", path: "/mall/orders", tone: "processing" },
  { title: "防汛物资价格高于历史均价", desc: "建议转需求提报，由采购端统一询价。", path: "/mall/requirement", tone: "danger" }
];

const frequentItems = [
  { name: "LED 防潮支架灯", detail: "海珠花园近 90 天采购 3 次", productId: "P-1001" },
  { name: "全能清洁剂", detail: "佛山千灯湖项目季度补库", productId: "P-1005" },
  { name: "巡检反光背心", detail: "安防夜巡常备物资", productId: "P-1006" }
];

const reqTimeline = [
  { label: "需求提交", text: `${targetReqId} 已由用户端采购车生成`, state: "done" },
  { label: "进入需求池", text: "采购端识别为地下车库照明维修物料需求", state: "done" },
  { label: "询价中", text: "RFQ-20260613-006 已邀请 3 家供应商", state: "active" },
  { label: "审批下单", text: "预计比价后生成 PO-20260613-088", state: "todo" },
  { label: "供应商履约", text: "预计流转到 SO-20260613-221", state: "todo" }
];

function sendStructuredFeedback(payload) {
  emitDemoFeedback(payload);
}

function openProduct(navigate) {
  navigate("/mall/product");
}

function ProductCards({ onOpen, onAdd, items = products }) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <article className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className="product-card-body">
            <span className="scene-chip">{product.scene}</span>
            <h3>{product.name}</h3>
            <p>{product.spec}</p>
            <div className="product-meta">
              <strong>￥{product.price}</strong>
              <span>历史价 ￥{product.history}</span>
              <span>{product.delivery}</span>
              <span>库存 {product.stock}</span>
              <span>履约 {product.fulfillment || product.score}</span>
            </div>
            <div className="tag-row">
              {product.tags.map((tag) => (
                <StatusTag key={tag} tone={tag.includes("缺货") || tag.includes("超") ? "danger" : tag.includes("需") ? "warning" : "success"}>
                  {tag}
                </StatusTag>
              ))}
            </div>
          </div>
          <footer>
            <button onClick={() => onOpen(product)}>详情/比价</button>
            <button className="primary-button" onClick={() => onAdd(product)}>
              <ShoppingCart size={16} />
              加采购车
            </button>
          </footer>
        </article>
      ))}
    </div>
  );
}

function WorkbenchPanel({ navigate }) {
  return (
    <div className="mall-workbench-grid">
      <section className="panel">
        <h2>我的待办 / 待补参</h2>
        {todos.map((todo) => (
          <button className="mall-task-row" key={todo.title} onClick={() => navigate(todo.path)}>
            <StatusTag tone={todo.tone}>{todo.tone === "warning" ? "待补参" : todo.tone === "danger" ? "风险" : "进度"}</StatusTag>
            <strong>{todo.title}</strong>
            <span>{todo.desc}</span>
          </button>
        ))}
      </section>
      <section className="panel">
        <h2>采购进度</h2>
        <StatusTimeline steps={reqTimeline.slice(0, 4)} />
        <button className="full" onClick={() => navigate("/mall/orders")}>
          查看 {targetReqId}
        </button>
      </section>
      <section className="panel">
        <h2>常买物料 / 最近采购</h2>
        {frequentItems.map((item) => (
          <button className="mall-repeat-row" key={item.name} onClick={() => navigate("/mall/product")}>
            <strong>{item.name}</strong>
            <span>{item.detail}</span>
          </button>
        ))}
      </section>
    </div>
  );
}

export function MallHome({ navigate, addToCart }) {
  const addScenarioPack = () => {
    products.slice(0, 3).forEach(addToCart);
    sendStructuredFeedback({
      tone: "success",
      title: "已生成场景采购清单",
      message: "地下车库照明维修已加入 3 项物料，可进入采购车确认项目、预算和供应商拆分。",
      actionLabel: "查看采购车",
      actionPath: "/mall/cart"
    });
  };

  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="用户端商城工作台"
        title="员工一进来就知道怎么找货、有什么待办、采购走到哪一步"
        description="首页从商品浏览升级为采购入口：场景找货、AI 搜索、待补参、采购进度、常买物料和公告提醒在同一工作区完成。"
        actions={
          <>
            <button className="primary-button" onClick={() => navigate("/mall/search")}>
              <Search size={16} />
              AI 找货
            </button>
            <button onClick={() => navigate("/mall/requirement")}>
              <ImagePlus size={16} />
              找不到商品
            </button>
          </>
        }
      />
      <MetricGrid items={mallMetrics} />
      <div className="command-hero mall-command-hero">
        <div>
          <span className="eyebrow">场景采购入口</span>
          <h2>地下车库照明维修，本周到货</h2>
          <p>AI 已识别为电气照明/工程维修场景，建议采购支架灯、漏保开关、阻燃线缆，并提示绝缘劳保属于安全必配项。</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={addScenarioPack}>
              <Sparkles size={16} />
              生成成套清单
            </button>
            <button onClick={() => navigate("/mall/search")}>
              <Search size={16} />
              查看搜索结果
            </button>
            <button onClick={() => navigate("/mall/requirement")}>
              <Camera size={16} />
              图片识别提需求
            </button>
          </div>
        </div>
        <AiSuggestionCard
          type="场景拆解"
          title="建议成套采购，降低漏采和二次审批"
          evidence={["历史 6 次车库维修均包含电气保护件", "支架灯价格低于历史均价 10.6%", "REQ-20260613-018 可与采购端需求池对应"]}
          action="采纳成套清单"
        />
      </div>
      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <button
            className="scenario-card"
            key={scenario.name}
            onClick={() => {
              sendStructuredFeedback({
                tone: scenario.risk.includes("风险") || scenario.risk.includes("询价") ? "warning" : "info",
                title: `已选择场景：${scenario.name}`,
                message: `${scenario.query}。已带入 AI 找货条件。`,
                actionLabel: "进入 AI 找货",
                actionPath: "/mall/search"
              });
              navigate("/mall/search");
            }}
          >
            <span>{scenario.category}</span>
            <strong>{scenario.name}</strong>
            <small>{scenario.status}</small>
            <StatusTag tone={scenario.risk.includes("低") ? "success" : scenario.risk.includes("转") || scenario.risk.includes("库存") ? "danger" : "warning"}>{scenario.risk}</StatusTag>
          </button>
        ))}
      </div>
      <WorkbenchPanel navigate={navigate} />
      <RiskAlertBar tone="info" title="公告 / 消息提醒" action="标记已读">
        华南区域防汛物资进入备货期；照明协议价本周更新；{targetReqId} 已进入采购端询价流程。
      </RiskAlertBar>
      <ProductCards onAdd={addToCart} onOpen={() => openProduct(navigate)} items={products.slice(0, 4)} />
    </section>
  );
}

export function MallSearch({ navigate, addToCart }) {
  const [category, setCategory] = useState("全部");
  const [viewMode, setViewMode] = useState("卡片");
  const [noResult, setNoResult] = useState(false);
  const filtered = useMemo(() => {
    if (noResult) return [];
    return category === "全部" ? products : products.filter((item) => item.category === category);
  }, [category, noResult]);

  const columns = [
    { key: "name", label: "商品" },
    { key: "price", label: "协议价", render: (value) => `￥${value}` },
    { key: "history", label: "历史价", render: (value) => `￥${value}` },
    { key: "stock", label: "库存" },
    { key: "delivery", label: "交期" },
    { key: "score", label: "履约评分" },
    { key: "risk", label: "风险标签" }
  ];

  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="AI 找货 + 商品列表"
        title="自然语言、图片识别、参数不确定和无结果提报在同一页完成"
        description="搜索结果展示协议价、历史价、库存、交期、履约评分和风险标签，支持商品卡/表格视图切换。"
        actions={
          <button onClick={() => setNoResult((value) => !value)}>
            {noResult ? "恢复结果" : "模拟无结果"}
          </button>
        }
      />
      <div className="search-command">
        <Search size={20} />
        <input defaultValue={noResult ? "老旧水泵铭牌模糊，找不到同款机械密封" : "地下车库照明维修，本周到货"} />
        <DemoActionButton
          message={{
            tone: "info",
            title: "图片识别已完成",
            message: "AI 识别到 LED 支架灯和漏保开关，水泵房阀门仍需确认 DN 口径。",
            actionLabel: "转需求提报",
            actionPath: "/mall/requirement"
          }}
        >
          <Camera size={16} />
          上传现场照片
        </DemoActionButton>
      </div>
      <RiskAlertBar tone={noResult ? "warning" : "info"} title={noResult ? "无结果转需求提报" : "AI 意图解释"} action={noResult ? "转需求提报" : "查看依据"}>
        {noResult
          ? "当前描述缺少品牌、型号和安装尺寸。建议转需求提报，由 AI 拆解后进入采购端需求池。"
          : "识别为“电气照明维修”，已扩展到支架灯、漏保、线缆、绝缘工具。缺少安装高度，低置信字段已标记。"}
      </RiskAlertBar>
      <FilterToolbar
        tabs={["全部", "电气照明", "工程维修", "保洁耗材", "劳保安防", "管阀泵类", "防汛物资"]}
        active={category}
        onChange={setCategory}
        extra={
          <div className="segmented">
            <button className={viewMode === "卡片" ? "active" : ""} onClick={() => setViewMode("卡片")}>
              <ListChecks size={15} />
              卡片
            </button>
            <button className={viewMode === "表格" ? "active" : ""} onClick={() => setViewMode("表格")}>
              <Table2 size={15} />
              表格
            </button>
          </div>
        }
      />
      {filtered.length ? (
        viewMode === "卡片" ? (
          <ProductCards onAdd={addToCart} onOpen={() => openProduct(navigate)} items={filtered} />
        ) : (
          <DataTable columns={columns} rows={filtered} onOpen={() => openProduct(navigate)} />
        )
      ) : (
        <div className="mall-empty-state">
          <AlertTriangle size={28} />
          <strong>没有找到可直接采购的标准商品</strong>
          <span>可上传照片、补充规格，或直接提报需求。提交后会生成 {targetReqId} 同类需求编号并进入采购端需求池。</span>
          <button className="primary-button" onClick={() => navigate("/mall/requirement")}>
            转需求提报
          </button>
        </div>
      )}
    </section>
  );
}

export function ProductDetail({ addToCart }) {
  const [selectedSupplier, setSelectedSupplier] = useState("华南电气集采供应商");
  const product = products[0];
  const rows = product.suppliers.map((supplier) => ({
    ...supplier,
    selected: supplier.name === selectedSupplier ? "已选" : "可选"
  }));

  return (
    <section className="detail-layout">
      <div className="page-stack">
        <PageHeader eyebrow="商品详情 + 一品多商" title={product.name} description="详情页支撑用户决策：一品多商同时看价格、交期、库存、履约评分、资质状态、历史价差和 AI 推荐理由。" />
        <div className="product-detail-panel">
          <img src={product.image} alt={product.name} />
          <div>
            <span className="scene-chip">{product.scene}</span>
            <h2>{product.spec}</h2>
            <div className="spec-grid">
              <span>品牌 <b>{product.brand}</b></span>
              <span>协议价 <b>￥{product.price}</b></span>
              <span>历史均价 <b>￥{product.history}</b></span>
              <span>库存 <b>{product.stock}</b></span>
              <span>交期 <b>{product.delivery}</b></span>
              <span>履约评分 <b>{product.score}</b></span>
              <span>资质状态 <b>{product.qualification}</b></span>
              <span>历史价差 <b>{product.historyGap}</b></span>
              <span>风险标签 <b>{product.risk}</b></span>
            </div>
          </div>
        </div>
        <DataTable
          columns={[
            { key: "name", label: "供应商" },
            { key: "price", label: "报价" },
            { key: "delivery", label: "交期" },
            { key: "stock", label: "库存" },
            { key: "score", label: "履约评分" },
            { key: "qualification", label: "资质状态" },
            { key: "historyGap", label: "历史价差" },
            { key: "status", label: "AI 判断" }
          ]}
          rows={rows}
          onOpen={(row) => {
            setSelectedSupplier(row.name);
            sendStructuredFeedback({
              tone: row.status === "推荐" ? "success" : "info",
              title: `已选择供应商：${row.name}`,
              message: `${row.price} / ${row.delivery} / 履约评分 ${row.score}，可加入采购车继续确认。`
            });
          }}
        />
      </div>
      <aside className="sticky-panel">
        <AiSuggestionCard
          title={`推荐 ${selectedSupplier}，不只按最低价排序`}
          evidence={["价格低于历史均价 10.6%", "资质状态正常，履约评分高于 95", "广州仓次日达覆盖当前项目，降低维修等待时间"]}
          action="采纳推荐供应商"
        />
        <RiskAlertBar tone="success" title="当前决策" action="查看价格依据">
          已选 {selectedSupplier}。如果只选最低价，可能带来资质复核或交期延迟。
        </RiskAlertBar>
        <button className="full primary-button" onClick={() => addToCart({ ...product, supplier: selectedSupplier })}>
          <PackagePlus size={16} />
          加入采购车
        </button>
      </aside>
    </section>
  );
}

export function CartPage({ cart, navigate }) {
  const [project, setProject] = useState("广州海珠花园 / 地下车库照明维修");
  const rows = cart.length ? cart : products.slice(0, 3);
  const supplierGroups = Array.from(new Set(rows.map((item) => item.supplier || item.suppliers?.[0]?.name))).filter(Boolean);

  const submitCart = () => {
    sendStructuredFeedback({
      tone: "success",
      title: `已生成需求编号 ${targetReqId}`,
      message: "采购车已提交到采购端需求池，后续会进入询价、审批、下单和履约跟踪。",
      actionLabel: "查看采购跟踪",
      actionPath: "/mall/orders"
    });
    navigate("/mall/orders");
  };

  return (
    <section className="page-stack">
      <PageHeader eyebrow="采购车" title="提交前确认项目、成本中心、预算和供应商拆分" description="采购车输出给采购端需求池，用户端只展示可理解的缺货、超预算、资质风险和后续进度。" />
      <div className="cart-context-grid">
        <label>
          项目
          <input value={project} onChange={(event) => setProject(event.target.value)} />
        </label>
        <label>
          成本中心
          <input defaultValue="CC-GZ-HZ-ENGINEERING / 工程维修" />
        </label>
        <label>
          预算提示
          <input defaultValue="本月可用预算 ￥22.0万，当前占用 ￥18.6万" />
        </label>
      </div>
      <RiskAlertBar title="采购车风险汇总" action="补齐参数">
        供应商将拆分为 {supplierGroups.length || 3} 组；不锈钢球阀缺 DN 口径；防汛沙袋缺货且高于历史均价；当前未超预算。
      </RiskAlertBar>
      <DataTable
        columns={[
          { key: "name", label: "商品" },
          { key: "supplier", label: "供应商" },
          { key: "price", label: "协议价", render: (value) => `￥${value}` },
          { key: "delivery", label: "交期" },
          { key: "stock", label: "库存" },
          { key: "risk", label: "风险/提示" }
        ]}
        rows={rows}
      />
      <div className="supplier-split-grid">
        {supplierGroups.map((supplier, index) => (
          <article className="panel" key={supplier}>
            <h2>供应商拆分 {index + 1}</h2>
            <strong>{supplier}</strong>
            <p>{rows.filter((item) => (item.supplier || item.suppliers?.[0]?.name) === supplier).length} 项物料，将进入同一采购需求下的分组处理。</p>
          </article>
        ))}
      </div>
      <div className="action-footer">
        <button onClick={() => navigate("/mall/requirement")}>转需求提报</button>
        <button onClick={() => navigate("/buyer/demands")}>查看采购端承接</button>
        <button className="primary-button" onClick={submitCart}>
          <Send size={16} />
          提交采购处理
        </button>
      </div>
    </section>
  );
}

export function RequirementPage({ navigate }) {
  const [submitted, setSubmitted] = useState(false);
  const submit = () => {
    setSubmitted(true);
    sendStructuredFeedback({
      tone: "success",
      title: `需求已提交：${targetReqId}`,
      message: "图片、AI 拆解和待补参数已随需求进入采购端需求池。",
      actionLabel: "查看采购跟踪",
      actionPath: "/mall/orders"
    });
  };

  return (
    <section className="form-layout">
      <div className="page-stack">
        <PageHeader eyebrow="需求提报" title="找不到商品、图片识别不确定、非标需求都从这里进入采购闭环" description="AI 先拆解需求并推荐相似商品，用户补齐必要参数后提交。提交成功会生成与采购端对应的需求编号。" />
        {submitted && (
          <RiskAlertBar tone="success" title={`提交成功 ${targetReqId}`} action="查看采购端需求池">
            需求已进入采购端需求池，采购端可继续分流为直采、询价、审批或转治理。
          </RiskAlertBar>
        )}
        <div className="form-card">
          <label>
            需求描述
            <textarea defaultValue="水泵房阀门更换，现场铭牌不清楚，可能是 DN25，需要本周内到货。" />
          </label>
          <label>
            项目/场景
            <input defaultValue="广州琶洲项目 / 水泵房维修" />
          </label>
          <label>
            数量与期望到货
            <input defaultValue="20 个 / 本周五前" />
          </label>
          <label>
            图片上传占位
            <DemoActionButton
              message={{
                tone: "info",
                title: "图片已识别",
                message: "AI 读取到 304 不锈钢阀门，但 DN20 与 DN25 候选接近，需人工确认。"
              }}
            >
              <Camera size={16} />
              上传铭牌或现场照片
            </DemoActionButton>
          </label>
        </div>
        <div className="action-footer">
          <button onClick={() => navigate("/mall/search")}>返回找货</button>
          <button className="primary-button" onClick={submit}>
            <FileText size={16} />
            提交需求
          </button>
        </div>
      </div>
      <aside className="sticky-panel">
        <AiSuggestionCard title="AI 拆解结果：管阀泵类非标需求" evidence={["图片识别到 304 不锈钢", "DN20 与 DN25 候选相似度接近", "建议补充连接方式和现场口径"]} confidence="需确认" action="采纳拆解" />
        <section className="panel">
          <h2>相似商品推荐</h2>
          {products.slice(3, 4).map((product) => (
            <button className="mall-repeat-row" key={product.id} onClick={() => navigate("/mall/product")}>
              <strong>{product.name}</strong>
              <span>{product.spec} / ￥{product.price}</span>
            </button>
          ))}
        </section>
        <RiskAlertBar tone="warning" title="缺失参数提示" action="记录待补">
          仍缺 DN 口径、连接方式、现场照片清晰度。可先提交，采购端会在需求池要求补参。
        </RiskAlertBar>
      </aside>
    </section>
  );
}

export function OrdersPage() {
  return (
    <section className="page-stack">
      <PageHeader eyebrow="我的订单/采购跟踪" title="同一需求编号贯穿需求池、询价、审批、下单和履约" description={`用户侧只查看状态和补参动作，不进入采购端处理规则。${targetReqId} 可与采购运营驾驶舱和采购端需求池对应。`} />
      <article className="tracking-card order-focus-card">
        <div>
          <StatusTag tone="processing">询价中</StatusTag>
          <h3>{targetReqId} 海珠花园地下车库照明维修</h3>
          <p>采购端需求池已承接，当前关联 RFQ-20260613-006，预计生成 PO-20260613-088 与 SO-20260613-221。</p>
        </div>
        <StatusTimeline steps={reqTimeline} />
        <div className="action-footer">
          <DemoActionButton
            message={{
              tone: "warning",
              title: "已发起补参提醒",
              message: "采购端会收到 DN 口径补充说明，用户侧保留当前跟踪状态。"
            }}
          >
            <ClipboardList size={16} />
            补充参数
          </DemoActionButton>
          <DemoActionButton
            message={{
              tone: "info",
              title: "售后入口已记录",
              message: "V1.5 仅做轻量入口，不展开完整售后流程。"
            }}
          >
            申请售后
          </DemoActionButton>
        </div>
      </article>
      {demands.slice(1, 4).map((demand) => (
        <article className="tracking-card" key={demand.id}>
          <div>
            <StatusTag tone={demand.status.includes("审批") ? "warning" : demand.status.includes("治理") ? "danger" : "processing"}>{demand.status}</StatusTag>
            <h3>{demand.id} {demand.title}</h3>
            <p>{demand.project} · {demand.amount} · {demand.risk}</p>
          </div>
          <StatusTimeline
            steps={[
              { label: "已提交", text: "用户端提交采购", state: "done" },
              { label: "采购处理中", text: demand.ai, state: "active" },
              { label: "下单/履约", text: "待采购端确认后流转", state: "todo" }
            ]}
          />
        </article>
      ))}
    </section>
  );
}
