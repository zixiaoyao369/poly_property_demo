import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  DatabaseZap,
  Factory,
  FileSearch,
  Gauge,
  GitBranch,
  Layers3,
  LineChart,
  Network,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  UsersRound,
  Workflow,
  Zap
} from "lucide-react";
import {
  aiInsights,
  buyerTasks,
  clientFacts,
  demandScenario,
  execPoints,
  governanceRows,
  navItems,
  products,
  suite,
  supplierTasks
} from "./data/demoData.js";

const icons = {
  overview: Network,
  front: Search,
  buyer: ClipboardList,
  supplier: Factory,
  ops: DatabaseZap,
  executive: Building2
};

function ProcurementNetwork() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 13);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const points = [
      { name: "AI中枢", position: [0, 0, 0], color: 0x7df9d2, size: 0.62 },
      { name: "项目", position: [-4.6, 2.4, -0.8], color: 0x4fd1ff, size: 0.36 },
      { name: "用户", position: [-5.2, -1.4, 1], color: 0xa7f3d0, size: 0.32 },
      { name: "采购", position: [-1.7, -3.1, -0.6], color: 0xf7c948, size: 0.34 },
      { name: "供应商", position: [4.4, 2.1, 0.8], color: 0xff8a65, size: 0.36 },
      { name: "电商", position: [5.2, -1.2, -1], color: 0x9fb7ff, size: 0.32 },
      { name: "成本", position: [1.7, 3.5, -1], color: 0xffd166, size: 0.3 },
      { name: "目录", position: [0.6, -4, 0.8], color: 0xb2f5ea, size: 0.3 }
    ];

    const nodeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const nodeMaterial = (color) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.42,
        roughness: 0.35,
        metalness: 0.35
      });

    const nodes = points.map((point) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial(point.color));
      mesh.scale.setScalar(point.size);
      mesh.position.set(...point.position);
      group.add(mesh);
      return mesh;
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6ee7d8,
      transparent: true,
      opacity: 0.26
    });

    points.slice(1).forEach((point) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...point.position)
      ]);
      group.add(new THREE.Line(geometry, lineMaterial));
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x9fffe8, size: 0.025, transparent: true, opacity: 0.6 })
    );
    group.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const light = new THREE.PointLight(0x9fffe8, 28, 60);
    light.position.set(2, 4, 7);
    scene.add(light);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let frameId = 0;
    const animate = () => {
      group.rotation.y += 0.003;
      group.rotation.x = Math.sin(Date.now() * 0.0005) * 0.08;
      nodes.forEach((node, index) => {
        const pulse = 1 + Math.sin(Date.now() * 0.002 + index) * 0.08;
        node.scale.setScalar(points[index].size * pulse);
      });
      particles.rotation.y -= 0.0016;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      nodeGeometry.dispose();
      particleGeometry.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="network-stage" aria-label="采购数据网络三维演示">
      <div ref={mountRef} className="network-canvas" />
      <div className="network-legend">
        {["AI中枢", "项目", "采购", "供应商", "电商", "成本"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function MetricStrip() {
  return (
    <div className="metric-strip">
      {clientFacts.map((fact) => (
        <div className="metric" key={fact.label}>
          <span>{fact.label}</span>
          <strong>{fact.value}</strong>
          <small>{fact.detail}</small>
        </div>
      ))}
    </div>
  );
}

function AiPanel({ active }) {
  const [step, setStep] = useState(0);
  const insights = aiInsights[active] || aiInsights.overview;

  useEffect(() => {
    setStep(0);
  }, [active]);

  return (
    <aside className="ai-panel" aria-label="AI采购智能体">
      <div className="ai-orb">
        <Bot size={22} />
      </div>
      <div>
        <p className="panel-kicker">AI 采购智能体</p>
        <h3>正在理解当前工作区</h3>
      </div>
      <div className="ai-thinking">
        {insights.map((item, index) => (
          <button
            className={`thought ${index === step ? "active" : ""}`}
            key={item}
            onClick={() => setStep(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item}
          </button>
        ))}
      </div>
      <button className="ai-action" onClick={() => setStep((step + 1) % insights.length)}>
        生成下一步建议
        <Sparkles size={16} />
      </button>
    </aside>
  );
}

function SystemDock({ active, onChange }) {
  return (
    <nav className="system-dock" aria-label="系统切换">
      <div className="brand-mark">
        <Layers3 size={22} />
        <div>
          <strong>保利物业</strong>
          <span>AI采购商城重建</span>
        </div>
      </div>
      <div className="dock-items">
        {navItems.map((item) => {
          const Icon = icons[item.id];
          return (
            <button
              key={item.id}
              className={`dock-item ${active === item.id ? "active" : ""}`}
              onClick={() => onChange(item.id)}
              aria-pressed={active === item.id}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              <small>{item.short}</small>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function PageHeader({ title, eyebrow, children }) {
  return (
    <header className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
      </div>
      {children && <div className="header-actions">{children}</div>}
    </header>
  );
}

function Overview() {
  return (
    <section className="workspace overview-grid">
      <PageHeader title="不是再做一个商城，而是建设保利自己的采购经营中台" eyebrow="广州交流版">
        <button className="ghost-button">
          <PanelLeftClose size={16} />
          交流模式
        </button>
      </PageHeader>
      <MetricStrip />
      <div className="hero-board">
        <div className="hero-copy">
          <span className="signal">AI Source-to-Pay Operating System</span>
          <h2>AI 把物业场景变成可治理、可比价、可履约的采购任务</h2>
          <p>
            明源云解决不了采购商城的前中后台复杂协同。保利这次要重建的，是面向用户、采购、供应商、运营四类角色的统一采购操作系统。
          </p>
          <div className="flow-chips">
            <span>需求理解</span>
            <span>物料治理</span>
            <span>一品多商</span>
            <span>成本预警</span>
            <span>供应商协同</span>
          </div>
        </div>
        <ProcurementNetwork />
      </div>
      <div className="suite-grid">
        {suite.map((item) => (
          <article className="suite-card" key={item.name}>
            <span>{item.signal}</span>
            <h3>{item.name}</h3>
            <strong>{item.role}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="architecture-card">
        <div>
          <span className="eyebrow">客户架构对齐</span>
          <h3>基于现有架构，重绘为“前台体验 + 四端后台 + AI治理中枢”</h3>
          <p>原图中已有用户触点、采购端后台、供应商后台、平台运营中台、电商集成与智能客服。本原型把 AI 搜索、商品审核、物料治理和成本预警嵌入这些节点。</p>
        </div>
        <img src="/assets/poly-architecture.jpg" alt="保利物业原始系统架构参考" />
      </div>
    </section>
  );
}

function FrontOffice() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="workspace front-grid">
      <PageHeader title="用户前端：从搜索框变成物业场景采购 Copilot" eyebrow="用户体验重塑">
        <button className="primary-button">
          <Search size={16} />
          模拟 AI 找货
        </button>
      </PageHeader>
      <div className="copilot-search">
        <div className="prompt-box">
          <Sparkles size={20} />
          <p>{demandScenario.prompt}</p>
          <button>重新拆解</button>
        </div>
        <div className="parsed-list">
          {demandScenario.parsed.map((item) => (
            <div className="parsed-item" key={item.item}>
              <span>{item.action}</span>
              <strong>{item.item}</strong>
              <small>{item.spec}</small>
              <b>{item.qty}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="clarify-card">
        <h3>AI 需求澄清</h3>
        <p>用户不用先知道标准品名，AI 先把物业场景拆成问题和采购清单。</p>
        {demandScenario.clarifications.map((item) => (
          <button key={item}>
            <FileSearch size={16} />
            {item}
          </button>
        ))}
      </div>
      <div className="product-showcase">
        <div className="product-list">
          {products.map((product, index) => (
            <button
              className={`product-row ${selected === index ? "active" : ""}`}
              key={product.name}
              onClick={() => setSelected(index)}
            >
              <img src={product.image} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <span>{product.spec}</span>
              </div>
              <b>{product.price}</b>
            </button>
          ))}
        </div>
        <article className="product-detail">
          <img src={products[selected].image} alt={products[selected].name} />
          <div>
            <span className="status-pill">{products[selected].tag}</span>
            <h3>{products[selected].name}</h3>
            <p>{products[selected].spec}</p>
            <div className="detail-grid">
              <span>当前价格 <b>{products[selected].price}</b></span>
              <span>历史对比 <b>{products[selected].history}</b></span>
              <span>库存 <b>{products[selected].stock}</b></span>
              <span>货期 <b>{products[selected].delivery}</b></span>
              <span>供应商 <b>{products[selected].supplier}</b></span>
              <span>履约评分 <b>{products[selected].score}</b></span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function BuyerBackstage() {
  return (
    <section className="workspace buyer-grid">
      <PageHeader title="采购端后台：AI 把需求自动分流成可执行任务" eyebrow="采购工作台">
        <button className="primary-button">
          <Workflow size={16} />
          批量生成建议
        </button>
      </PageHeader>
      <div className="budget-panel">
        <div>
          <span>本月预算占用</span>
          <strong>72.4%</strong>
          <p>照明、电气、保洁三类采购增长较快</p>
        </div>
        <div className="radial-meter">
          <span>节省测算</span>
          <b>￥86.3万</b>
        </div>
      </div>
      <div className="task-stream">
        {buyerTasks.map((task, index) => (
          <article className={`task-card risk-${task.risk}`} key={task.title}>
            <div className="task-index">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <span>{task.status}</span>
              <h3>{task.title}</h3>
              <p>{task.saving}</p>
            </div>
            <strong>{task.amount}</strong>
          </article>
        ))}
      </div>
      <div className="comparison-lane">
        <h3>一品多商成本决策</h3>
        {["京东工业", "震坤行供给", "本地协议供应商"].map((name, index) => (
          <div className="compare-row" key={name}>
            <span>{name}</span>
            <div className="compare-bar" style={{ "--bar": `${84 - index * 13}%` }} />
            <b>{["￥39.8", "￥38.6", "￥37.9"][index]}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function SupplierBackstage() {
  return (
    <section className="workspace supplier-grid">
      <PageHeader title="供应商后台：让供应商也被 AI 带着完成协同" eyebrow="供应商协同">
        <button className="primary-button">
          <Truck size={16} />
          查看履约风险
        </button>
      </PageHeader>
      <div className="supplier-health">
        <div>
          <span>履约健康度</span>
          <strong>91</strong>
          <p>报价响应、资质完整、准时交付均高于平台均值</p>
        </div>
        <div className="health-tags">
          <span>报价快</span>
          <span>证照待续</span>
          <span>广州仓充足</span>
        </div>
      </div>
      <div className="supplier-tasks">
        {supplierTasks.map((task) => (
          <article className="supplier-task" key={task.name}>
            <div>
              <span>{task.due}</span>
              <h3>{task.name}</h3>
              <p>{task.desc}</p>
            </div>
            <div className="ai-note">
              <Bot size={15} />
              {task.ai}
            </div>
          </article>
        ))}
      </div>
      <div className="upload-simulator">
        <h3>AI 商品上架审核</h3>
        <div className="audit-steps">
          {["识别商品图片", "补齐关键参数", "重复商品校验", "资质风险校验", "建议上架目录"].map((step) => (
            <span key={step}>
              <CheckCircle2 size={15} />
              {step}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpsBackstage() {
  return (
    <section className="workspace ops-grid">
      <PageHeader title="平台运营后台：把商城从交易入口变成治理中心" eyebrow="数据与成本治理">
        <button className="primary-button">
          <DatabaseZap size={16} />
          启动物料管家
        </button>
      </PageHeader>
      <div className="ops-metrics">
        {[
          ["搜索命中率", "86%", "+31%"],
          ["重复物料减少", "42%", "本周"],
          ["供应商响应率", "93%", "+18%"],
          ["异常采购拦截", "23条", "实时"]
        ].map(([label, value, delta]) => (
          <div className="ops-metric" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{delta}</small>
          </div>
        ))}
      </div>
      <div className="governance-table">
        <div className="table-head">
          <span>治理前</span>
          <span>治理后</span>
          <span>影响</span>
        </div>
        {governanceRows.map((row) => (
          <div className="gov-row" key={row.before}>
            <span>{row.before}</span>
            <strong>{row.after}</strong>
            <b>{row.impact}</b>
          </div>
        ))}
      </div>
      <div className="governance-map">
        {["物料主数据", "供应商主数据", "价格库", "合同目录", "项目成本", "审批规则"].map((node, index) => (
          <div className="map-node" key={node} style={{ "--delay": `${index * 0.08}s` }}>
            {node}
          </div>
        ))}
      </div>
    </section>
  );
}

function ExecutiveTalk() {
  return (
    <section className="workspace executive-grid">
      <PageHeader title="为什么我们比京东工业更适合这次重建" eyebrow="高管交流话术">
        <button className="ghost-button">
          <BarChart3 size={16} />
          对比视角
        </button>
      </PageHeader>
      <div className="executive-hero">
        <div>
          <span className="signal">核心立场</span>
          <h2>京东工业适合做强供给，但保利这次要掌握自己的采购系统和数据资产</h2>
          <p>如果把商城重建交给单一供给方主导，80%+ 的渠道依赖会继续固化。真正的长期价值，是保利拥有开放底座、多供应商协同和可持续治理能力。</p>
        </div>
      </div>
      <div className="talk-grid">
        {execPoints.map((point) => (
          <article className="talk-card" key={point.title}>
            <ChevronRight size={18} />
            <h3>{point.title}</h3>
            <p>{point.detail}</p>
          </article>
        ))}
      </div>
      <div className="roadmap">
        {[
          ["一期", "商城底座", "四端可用，接入电商和供应商，AI 搜索先跑起来"],
          ["二期", "数据治理", "物料、供应商、价格、目录和成本规则沉淀到保利侧"],
          ["三期", "AI 经营中台", "形成预算预警、自动寻源、智能审批和持续降本闭环"]
        ].map(([phase, title, text]) => (
          <div className="roadmap-step" key={phase}>
            <span>{phase}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Screen({ active }) {
  const screens = useMemo(
    () => ({
      overview: <Overview />,
      front: <FrontOffice />,
      buyer: <BuyerBackstage />,
      supplier: <SupplierBackstage />,
      ops: <OpsBackstage />,
      executive: <ExecutiveTalk />
    }),
    []
  );

  return screens[active] || screens.overview;
}

export default function App() {
  const [active, setActive] = useState("overview");

  return (
    <main className="app-shell">
      <SystemDock active={active} onChange={setActive} />
      <div className="content-shell">
        <Screen active={active} />
      </div>
      <AiPanel active={active} />
      <div className="ambient-lines" aria-hidden="true" />
      <div className="mobile-tip">
        <Gauge size={16} />
        横向滑动系统坞查看完整演示
      </div>
    </main>
  );
}
