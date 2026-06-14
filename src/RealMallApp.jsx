import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bot,
  Building2,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Filter,
  LayoutDashboard,
  PackageCheck,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Warehouse
} from "lucide-react";
import {
  aiPrompts,
  buyerRequests,
  categories,
  opsTasks,
  products,
  supplierWork
} from "./data/realMallData.js";
import "./realMall.css";

const systems = [
  { id: "mall", label: "用户商城", desc: "找货与采购车", icon: Store },
  { id: "buyer", label: "采购工作台", desc: "需求与审批", icon: ClipboardCheck },
  { id: "supplier", label: "供应商后台", desc: "报价与履约", icon: Warehouse },
  { id: "ops", label: "运营后台", desc: "目录与治理", icon: LayoutDashboard }
];

const formatMoney = (value) => `￥${value.toFixed(2)}`;

function Money({ value }) {
  return <span className="money">{formatMoney(value)}</span>;
}

function Shell({ active, setActive, cartCount, children }) {
  return (
    <main className="real-app">
      <aside className="real-sidebar">
        <div className="real-brand">
          <div className="brand-icon">
            <Building2 size={22} />
          </div>
          <div>
            <strong>保利物业商城</strong>
            <span>AI Procurement V1</span>
          </div>
        </div>

        <nav className="real-nav" aria-label="系统切换">
          {systems.map((system) => {
            const Icon = system.icon;
            return (
              <button
                className={active === system.id ? "active" : ""}
                key={system.id}
                onClick={() => setActive(system.id)}
              >
                <Icon size={18} />
                <span>
                  <b>{system.label}</b>
                  <small>{system.desc}</small>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-card">
          <div className="mini-orb">
            <Bot size={18} />
          </div>
          <strong>AI 嵌入真实流程</strong>
          <p>搜索、图片识别、需求拆解、一品多商、商品审核、物料治理。</p>
        </div>

        <div className="cart-dock">
          <ShoppingCart size={18} />
          <span>当前采购车</span>
          <b>{cartCount}</b>
        </div>
      </aside>
      <div className="real-content">{children}</div>
    </main>
  );
}

function ProductRow({ product, active, onOpen, onAdd }) {
  return (
    <article className={`product-row-card ${active ? "active" : ""}`}>
      <button className="product-thumb" onClick={() => onOpen(product)}>
        <img src={product.image} alt={product.name} />
      </button>
      <div className="product-main">
        <div className="product-line">
          <div>
            <span className="scene-tag">{product.scene}</span>
            <h3>{product.name}</h3>
          </div>
          <Money value={product.price} />
        </div>
        <p>{product.spec}</p>
        <div className="product-facts">
          <span>{product.supplier}</span>
          <span>{product.delivery}</span>
          <span>库存 {product.stock}{product.unit}</span>
          <span>历史均价 ￥{product.marketPrice}</span>
        </div>
        <div className="product-tags">
          {product.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="row-actions">
        <button onClick={() => onOpen(product)}>详情/比价</button>
        <button className="primary" onClick={() => onAdd(product)}>
          <ShoppingCart size={15} />
          加采购车
        </button>
      </div>
    </article>
  );
}

function DecisionPanel({ product, cart, onAdd, onClearSelected }) {
  return (
    <aside className="decision-panel">
      <div className="panel-section panel-hero">
        <div className="panel-topline">
          <span>商品决策</span>
          <button onClick={onClearSelected}>收起</button>
        </div>
        {product ? (
          <>
            <div className="detail-preview">
              <img src={product.image} alt={product.name} />
              <div>
                <h2>{product.name}</h2>
                <p>{product.spec}</p>
              </div>
            </div>
            <div className="detail-metrics">
              <span>品牌 <b>{product.brand}</b></span>
              <span>履约 <b>{product.rating}</b></span>
              <span>库存 <b>{product.stock}{product.unit}</b></span>
              <span>历史 <b>￥{product.marketPrice}</b></span>
            </div>
          </>
        ) : (
          <p className="empty-text">选择商品后，这里会展示参数、供应商、AI 建议和采购动作。</p>
        )}
      </div>

      {product && (
        <>
          <div className="ai-dark-card">
            <Sparkles size={18} />
            <div>
              <strong>AI 采购建议</strong>
              <p>{product.ai}</p>
            </div>
          </div>

          <div className="panel-section">
            <div className="panel-title">
              <span>一品多商</span>
              <small>按价格、货期、履约综合排序</small>
            </div>
            {product.suppliers.map((supplier, index) => (
              <div className="supplier-quote" key={supplier.name}>
                <div className="quote-rank">{index + 1}</div>
                <div>
                  <strong>{supplier.name}</strong>
                  <span>{supplier.delivery} · 库存 {supplier.stock} · 评分 {supplier.score}</span>
                </div>
                <Money value={supplier.price} />
              </div>
            ))}
          </div>

          <button className="panel-submit" onClick={() => onAdd(product)}>
            <ShoppingCart size={17} />
            加入采购车
          </button>
        </>
      )}

      <div className="panel-section cart-panel">
        <div className="panel-title">
          <span>采购车</span>
          <small>{cart.length} 个商品</small>
        </div>
        {cart.length ? (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <span>{item.name}</span>
              <b>{formatMoney(item.price)}</b>
            </div>
          ))
        ) : (
          <p className="empty-text">从商品结果加入后，可流转到采购工作台。</p>
        )}
      </div>
    </aside>
  );
}

function MallFront({ cart, onAdd, toast }) {
  const [query, setQuery] = useState("地下车库照明维修");
  const [category, setCategory] = useState("全部");
  const [selected, setSelected] = useState(products[0]);

  const filtered = useMemo(() => {
    const q = query.trim();
    return products.filter((item) => {
      const categoryOk = category === "全部" || item.category === category;
      const sceneIntent = q.includes("车库") || q.includes("照明") || q.includes("维修") || q.includes("电工");
      const sceneOk = sceneIntent && ["电气照明", "工程维修", "劳保安防"].includes(item.category);
      const textOk =
        !q ||
        sceneOk ||
        [item.name, item.category, item.scene, item.spec, item.tags.join(""), item.ai].some((field) =>
          field.includes(q.replace("维修", ""))
        );
      return categoryOk && textOk;
    });
  }, [category, query]);

  return (
    <section className="screen mall-screen">
      <header className="commerce-header">
        <div>
          <span className="small-label">用户商城</span>
          <h1>从场景找货，到一品多商决策</h1>
          <p>面向员工、采购人和项目现场的真实采购入口。AI 负责理解需求，页面负责让用户完成找货、比价和加采购车。</p>
        </div>
        <div className="header-kpis">
          <span><b>{filtered.length}</b> 匹配商品</span>
          <span><b>{cart.length}</b> 采购车</span>
          <span><b>4</b> AI 澄清项</span>
        </div>
      </header>

      <div className="commerce-grid">
        <div className="left-rail">
          <section className="catalog-card">
            <div className="rail-title">
              <Filter size={16} />
              采购目录
            </div>
            {categories.map((item) => (
              <button
                className={item === category ? "active" : ""}
                key={item}
                onClick={() => setCategory(item)}
              >
                {item}
                <ChevronRight size={15} />
              </button>
            ))}
          </section>

          <section className="ai-prompt-card">
            <Bot size={18} />
            <strong>AI 找货样例</strong>
            <div>
              {aiPrompts.map((prompt) => (
                <button key={prompt} onClick={() => setQuery(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          </section>
        </div>

        <main className="commerce-main">
          <section className="command-card">
            <div className="search-shell">
              <Search size={20} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} />
              <button>
                <Camera size={16} />
                拍照识别
              </button>
              <button className="primary">
                <Sparkles size={16} />
                AI 找货
              </button>
            </div>
            <div className="ai-interpretation">
              <Sparkles size={15} />
              已识别为“地下车库照明维修”场景，自动扩展到电气照明、工程维修、劳保安防目录。
            </div>
          </section>

          <section className="results-card">
            <div className="results-toolbar">
              <div>
                <strong>商品结果</strong>
                <span>综合推荐 · 协议价优先 · 供应商履约评分参与排序</span>
              </div>
              <button>综合推荐</button>
            </div>
            <div className="product-list">
              {filtered.map((product) => (
                <ProductRow
                  active={selected?.id === product.id}
                  key={product.id}
                  product={product}
                  onAdd={(item) => {
                    onAdd(item);
                    setSelected(item);
                  }}
                  onOpen={setSelected}
                />
              ))}
            </div>
          </section>
        </main>

        <DecisionPanel
          cart={cart}
          product={selected}
          onAdd={onAdd}
          onClearSelected={() => setSelected(null)}
        />
      </div>
      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

function WorkHeader({ label, title, text, action, icon: Icon }) {
  return (
    <header className="work-header">
      <div>
        <span className="small-label">{label}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <button className="primary">
        <Icon size={17} />
        {action}
      </button>
    </header>
  );
}

function BuyerDesk({ cart }) {
  const lanes = ["待处理", "询价比价", "审批中", "需治理"];
  return (
    <section className="screen desk-screen">
      <WorkHeader
        action="生成采购单"
        icon={Send}
        label="采购工作台"
        text="采购人看到的是可处理任务，而不是散落的商品和订单。AI 负责分流直采、询价、审批和治理。"
        title="需求池、采购车和异常预警在一个工作台里处理"
      />
      <div className="kanban-grid">
        {lanes.map((lane, laneIndex) => (
          <section className="kanban-lane" key={lane}>
            <div className="lane-title">
              <span>{lane}</span>
              <b>{laneIndex === 0 ? buyerRequests.length : laneIndex + 1}</b>
            </div>
            {buyerRequests
              .filter((_, index) => index % lanes.length === laneIndex || laneIndex === 0)
              .slice(0, laneIndex === 0 ? 4 : 2)
              .map((request) => (
                <article className="request-card" key={`${lane}-${request.id}`}>
                  <span>{request.id}</span>
                  <h3>{request.title}</h3>
                  <p>{request.owner} · {request.amount}</p>
                  <div className="ai-inline">
                    <Sparkles size={14} />
                    {request.ai}
                  </div>
                </article>
              ))}
          </section>
        ))}
      </div>

      <aside className="bottom-workbench">
        <div>
          <span className="small-label">当前采购车转任务</span>
          <h2>{cart.length ? `${cart.length} 个商品待生成采购单` : "采购车为空"}</h2>
        </div>
        <div className="cart-lines">
          {cart.length ? (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>{item.name}</span>
                <b>{formatMoney(item.price)}</b>
              </div>
            ))
          ) : (
            <p className="empty-text">在用户商城加入商品后，会在这里形成采购任务。</p>
          )}
        </div>
        <div className="ai-dark-card compact-dark">
          <Sparkles size={18} />
          <p>协议目录商品可直采；高于历史价商品触发比价；规格不完整商品转物料治理。</p>
        </div>
      </aside>
    </section>
  );
}

function SupplierDesk() {
  return (
    <section className="screen supplier-screen">
      <WorkHeader
        action="批量处理"
        icon={PackageCheck}
        label="供应商后台"
        text="供应商每天只需要处理报价、上架、履约、资质四类待办。AI 帮他补资料、查风险、给报价建议。"
        title="供应商后台从表单堆叠，变成待办优先的工作台"
      />
      <div className="supplier-layout">
        <div className="supplier-work-grid">
          {supplierWork.map((work) => (
            <article className="work-card" key={work.title}>
              <span>{work.type}</span>
              <h3>{work.title}</h3>
              <b>{work.status}</b>
              <div className="ai-inline">
                <Bot size={14} />
                {work.ai}
              </div>
            </article>
          ))}
        </div>
        <aside className="supplier-editor">
          <div>
            <span className="small-label">商品上架审核</span>
            <h2>AI 帮供应商把粗糙资料变成可检索商品</h2>
            <p>参数补齐、重复商品识别、资质校验和目录建议都在提交前完成。</p>
          </div>
          <div className="form-preview">
            <label>商品名称 <input defaultValue="LED 防潮支架灯" /></label>
            <label>规格参数 <input defaultValue="18W / 600mm / IP65" /></label>
            <label>资质文件 <button><FileText size={15} /> 上传检测报告</button></label>
          </div>
          <div className="ai-dark-card">
            <CheckCircle2 size={18} />
            <div>
              <strong>AI 审核通过 5/6</strong>
              <p>建议补充质保期限，避免运营审核退回。</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function OpsDesk() {
  return (
    <section className="screen ops-screen">
      <WorkHeader
        action="启动物料治理"
        icon={ShieldCheck}
        label="运营后台"
        text="运营后台负责商城长期可用：目录、商品、供应商、价格和治理规则沉淀在保利侧。"
        title="让商城可运营，而不是只会上架商品"
      />
      <div className="ops-grid-real">
        {opsTasks.map((task) => (
          <article className="ops-task" key={task.title}>
            <span>{task.title}</span>
            <strong>{task.count}</strong>
            <p>{task.desc}</p>
          </article>
        ))}
      </div>
      <div className="governance-workbench">
        <div>
          <span className="small-label">物料管家治理队列</span>
          <h2>治理前后的叫法、规格、目录一屏对齐</h2>
          <div className="governance-list">
            {["LED支架灯 18w 防潮", "车库灯 管灯 长条灯", "电线 2.5 红色 蓝色", "劳保手套 电工手套"].map((before, index) => (
              <div className="governance-item" key={before}>
                <span>治理前：{before}</span>
                <ChevronRight size={16} />
                <b>{["LED 防潮支架灯 / 18W / IP65", "地下车库照明场景目录", "阻燃铜芯电缆 / BV 2.5mm²", "绝缘手套 / 10kV"][index]}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="ai-dark-card ops-ai">
          <AlertTriangle size={18} />
          <div>
            <strong>AI 治理提醒</strong>
            <p>照明、电气、保洁、劳保是保利高频目录，建议优先建立标准物料池和协议价价格库。</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RealMallApp() {
  const [active, setActive] = useState("mall");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  const addToCart = (product) => {
    setCart((current) => {
      const exists = current.some((item) => item.id === product.id);
      setToast(exists ? "采购车中已有该商品" : `${product.name} 已加入采购车`);
      window.setTimeout(() => setToast(""), 1500);
      return exists ? current : [...current, product];
    });
  };

  return (
    <Shell active={active} cartCount={cart.length} setActive={setActive}>
      {active === "mall" && <MallFront cart={cart} onAdd={addToCart} toast={toast} />}
      {active === "buyer" && <BuyerDesk cart={cart} />}
      {active === "supplier" && <SupplierDesk />}
      {active === "ops" && <OpsDesk />}
    </Shell>
  );
}
