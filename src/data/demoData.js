export const navItems = [
  { id: "overview", label: "总览指挥台", short: "总览" },
  { id: "front", label: "用户前端", short: "用户" },
  { id: "buyer", label: "采购端后台", short: "采购" },
  { id: "supplier", label: "供应商后台", short: "供应商" },
  { id: "ops", label: "平台运营后台", short: "运营" },
  { id: "executive", label: "高管话术", short: "话术" }
];

export const clientFacts = [
  { label: "商城采购体量", value: "3亿+", detail: "远高于当前 API 合作规模" },
  { label: "京东占比", value: "80%+", detail: "单一渠道依赖已形成" },
  { label: "当前系统", value: "明源云", detail: "地产系统，不是采购商城底座" },
  { label: "京东报价", value: "2000万+", detail: "客户预算预计低于 1000 万" }
];

export const suite = [
  {
    name: "企数采",
    role: "商城交易与采购流程底座",
    text: "承接用户、采购、供应商、运营四端流程，覆盖寻品、下单、询价、审批、订单、结算、售后。",
    signal: "Procure-to-Pay"
  },
  {
    name: "物料管家",
    role: "物料主数据与目录治理中枢",
    text: "把历史物料、供应商商品、电商商品归一到统一目录，补属性、去重复、建价格库和成本标签。",
    signal: "Master Data"
  },
  {
    name: "玲珑寻品",
    role: "AI 找货、澄清、寻源入口",
    text: "把用户说不清、搜不到、比不了的采购需求，转成标准物料、候选商品和可执行采购任务。",
    signal: "AI Copilot"
  }
];

export const demandScenario = {
  prompt: "广州海珠某小区地下车库照明维修，需要灯具、线缆和安全施工耗材，最好本周到货。",
  parsed: [
    { item: "LED 防潮支架灯", spec: "18W / 600mm / IP65", qty: "160 套", action: "可直采" },
    { item: "阻燃铜芯电缆", spec: "BV 2.5mm² / 国标", qty: "24 卷", action: "需比价" },
    { item: "绝缘手套", spec: "10kV / 复合橡胶", qty: "36 双", action: "安全必选" },
    { item: "空气开关", spec: "2P 32A / 漏保", qty: "45 个", action: "需确认品牌" }
  ],
  clarifications: [
    "是否要求灯具接入原有消防联动线路？",
    "车库潮湿区域是否需要 IP65 以上防护等级？",
    "线缆是否由施工方自带，还是统一由物业采购？"
  ]
};

export const products = [
  {
    name: "漏保空气开关",
    image: "/assets/breaker.png",
    spec: "2P 32A 带漏电保护",
    price: "￥38.60",
    history: "历史均价 ￥42.10",
    stock: "广州仓 2,400 个",
    delivery: "次日达",
    supplier: "华南电气集采供应商",
    score: "96",
    tag: "车库照明回路保护"
  },
  {
    name: "阻燃铜芯电缆",
    image: "/assets/cable.png",
    spec: "BV 2.5mm² 红蓝双色",
    price: "￥186.00",
    history: "历史均价 ￥201.00",
    stock: "佛山仓 620 卷",
    delivery: "2天",
    supplier: "珠三角线缆联合仓",
    score: "93",
    tag: "工程维修常购"
  },
  {
    name: "绝缘防护手套",
    image: "/assets/gloves.png",
    spec: "10kV 复合橡胶 L码",
    price: "￥29.80",
    history: "历史均价 ￥32.50",
    stock: "深圳仓 1,100 双",
    delivery: "次日达",
    supplier: "安全劳保优选",
    score: "91",
    tag: "安全合规必配"
  }
];

export const buyerTasks = [
  { title: "地下车库照明维修", status: "可直采", amount: "￥18.6万", risk: "低", saving: "预计节省 8.4%" },
  { title: "保洁耗材季度补库", status: "需询价", amount: "￥42.2万", risk: "中", saving: "3 家供应商待响应" },
  { title: "水泵房阀门更换", status: "需治理", amount: "￥9.7万", risk: "中", saving: "发现 12 个重复物料" },
  { title: "员工福利采购", status: "需审批", amount: "￥68.0万", risk: "高", saving: "超项目预算 11%" },
  { title: "消防应急备件", status: "成本异常", amount: "￥24.8万", risk: "高", saving: "高于历史价 18%" }
];

export const supplierTasks = [
  { name: "报价邀请", desc: "LED 防潮支架灯 160 套，本周到货", due: "2小时内", ai: "建议报价 ￥37.9-39.2" },
  { name: "商品资料补齐", desc: "12 个 SKU 缺少防护等级和质保字段", due: "今日", ai: "已从说明书识别 9 项参数" },
  { name: "资质到期", desc: "电气类 CCC 证书 18 天后到期", due: "18天", ai: "建议立即补传新证书" },
  { name: "履约预警", desc: "车库照明订单可能受广州暴雨影响", due: "明日", ai: "建议改从佛山仓拆单发货" }
];

export const governanceRows = [
  { before: "LED支架灯 18w 防潮", after: "LED 防潮支架灯 / 18W / IP65 / 600mm", impact: "合并 27 条" },
  { before: "车库灯 管灯 长条灯", after: "场景标签：地下车库照明", impact: "搜索命中 +31%" },
  { before: "电线 2.5 红色 蓝色", after: "阻燃铜芯电缆 / BV 2.5mm² / 国标", impact: "价格可比" },
  { before: "劳保手套 电工手套", after: "绝缘手套 / 10kV / 复合橡胶", impact: "合规校验" }
];

export const execPoints = [
  {
    title: "京东工业强在供给，但这次不是只买货",
    detail: "保利要重建的是自己的商城系统、供应商协同和成本治理能力，不能只把入口交给单一供给方。"
  },
  {
    title: "开放底座比单一渠道更关键",
    detail: "未来商城要能接京东、震坤行、本地供应商和其他电商，同时保留保利自己的目录、规则和数据资产。"
  },
  {
    title: "预算更适合分阶段建设",
    detail: "在预计低于 1000 万的预算内，优先建设可迭代平台底座，再逐步叠加治理和 AI 能力。"
  },
  {
    title: "真正沉淀的是采购经营数据",
    detail: "物料、价格、供应商、项目成本和审批规则沉淀在保利侧，后续才有持续降本和治理空间。"
  }
];

export const aiInsights = {
  overview: [
    "检测到京东占比 80%+，建议本次重建优先建立多供应商目录和价格库。",
    "明源云适合地产管理，不适合作为采购商城交易和供应商协同底座。",
    "建议把一期目标定义为：可用商城 + AI 搜索 + 供应商协同 + 价格沉淀。"
  ],
  front: [
    "用户输入的是场景需求，不是标准物料。已拆解为 4 类可采购物料。",
    "车库潮湿环境建议提高灯具防护等级到 IP65。",
    "线缆和劳保品属于高频耗材，可优先使用协议价目录。"
  ],
  buyer: [
    "消防应急备件高于历史价 18%，建议触发二次比价。",
    "水泵房阀门存在重复物料，建议先治理再采购。",
    "保洁耗材季度补库适合发起一品多商询价。"
  ],
  supplier: [
    "有 12 个 SKU 缺少关键参数，补齐后可提升搜索命中率。",
    "照明订单建议拆分仓发货，降低天气造成的延迟风险。",
    "资质到期会影响上架和报价资格，建议前置提醒。"
  ],
  ops: [
    "重复物料正在造成搜索噪声和价格不可比。",
    "建议先治理照明、电气、保洁、劳保四个高频目录。",
    "价格库已识别 23 条异常波动，采购端可实时预警。"
  ],
  executive: [
    "对高管建议聚焦三个词：开放、沉淀、可迭代。",
    "不要把议题带成商品供给对比，要带成商城重建方法论。",
    "预算对比页应强调 2000 万重型工程与千万元内分阶段落地的差异。"
  ]
};
