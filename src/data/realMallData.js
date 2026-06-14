export const categories = [
  "全部",
  "工程维修",
  "电气照明",
  "保洁耗材",
  "劳保安防",
  "管阀泵类",
  "员工福利"
];

export const products = [
  {
    id: "P-1001",
    name: "漏保空气开关",
    category: "电气照明",
    scene: "照明回路保护",
    image: "/assets/breaker.png",
    spec: "2P / 32A / 带漏电保护",
    brand: "德力西",
    unit: "个",
    price: 46.5,
    marketPrice: 51.2,
    stock: 2400,
    delivery: "次日达",
    supplier: "华南电气集采供应商",
    rating: 96,
    tags: ["协议价", "车库维修", "安全保护"],
    ai: "适合地下车库照明回路改造，建议与阻燃线缆、绝缘手套一起成套采购。",
    suppliers: [
      { name: "华南电气集采供应商", price: 46.5, delivery: "次日达", stock: 2400, score: 96 },
      { name: "京东工业", price: 48.9, delivery: "次日达", stock: 1800, score: 94 },
      { name: "广州本地电气仓", price: 45.8, delivery: "当日自提", stock: 520, score: 90 }
    ]
  },
  {
    id: "P-1002",
    name: "阻燃铜芯电缆",
    category: "电气照明",
    scene: "维修布线",
    image: "/assets/cable.png",
    spec: "BV 2.5mm² / 国标 / 红蓝双色",
    brand: "珠江电缆",
    unit: "卷",
    price: 186,
    marketPrice: 201,
    stock: 620,
    delivery: "2天",
    supplier: "珠三角线缆联合仓",
    rating: 93,
    tags: ["历史低价", "需比价", "工程常用"],
    ai: "当前价格低于历史均价 7.5%，建议锁定本周报价。",
    suppliers: [
      { name: "珠三角线缆联合仓", price: 186, delivery: "2天", stock: 620, score: 93 },
      { name: "京东工业", price: 198, delivery: "次日达", stock: 900, score: 95 },
      { name: "佛山电缆仓", price: 182, delivery: "3天", stock: 300, score: 89 }
    ]
  },
  {
    id: "P-1003",
    name: "绝缘防护手套",
    category: "劳保安防",
    scene: "电工作业",
    image: "/assets/gloves.png",
    spec: "10kV / 复合橡胶 / L码",
    brand: "安盾",
    unit: "双",
    price: 29.8,
    marketPrice: 32.5,
    stock: 1100,
    delivery: "次日达",
    supplier: "安全劳保优选",
    rating: 91,
    tags: ["安全必配", "合规校验"],
    ai: "电气维修场景建议自动加入劳保清单，降低漏采风险。",
    suppliers: [
      { name: "安全劳保优选", price: 29.8, delivery: "次日达", stock: 1100, score: 91 },
      { name: "京东工业", price: 31.2, delivery: "次日达", stock: 1800, score: 93 },
      { name: "广州安防用品", price: 28.9, delivery: "2天", stock: 420, score: 87 }
    ]
  },
  {
    id: "P-1004",
    name: "绝缘柄螺丝刀套装",
    category: "工程维修",
    scene: "电工检修工具",
    image: "/assets/wrench.png",
    spec: "6件套 / 1000V绝缘 / 十字一字",
    brand: "世达",
    unit: "套",
    price: 89.0,
    marketPrice: 96.5,
    stock: 430,
    delivery: "2天",
    supplier: "华南工具集采供应商",
    rating: 95,
    tags: ["维修工具", "安全作业"],
    ai: "电气维修场景建议配套绝缘工具，避免普通工具混用带来安全风险。",
    suppliers: [
      { name: "华南工具集采供应商", price: 89.0, delivery: "2天", stock: 430, score: 95 },
      { name: "京东工业", price: 92.5, delivery: "次日达", stock: 860, score: 96 },
      { name: "广州工具仓", price: 87.2, delivery: "3天", stock: 180, score: 88 }
    ]
  },
  {
    id: "P-1005",
    name: "中性多用途清洁剂",
    category: "保洁耗材",
    scene: "楼宇保洁",
    image: "/assets/cleaner.png",
    spec: "3.8L / 中性 / 低泡",
    brand: "净立方",
    unit: "桶",
    price: 42.8,
    marketPrice: 45.9,
    stock: 860,
    delivery: "2天",
    supplier: "物业保洁耗材仓",
    rating: 90,
    tags: ["季度补库", "可直采"],
    ai: "适合按项目面积和保洁频次自动估算月消耗量。",
    suppliers: [
      { name: "物业保洁耗材仓", price: 42.8, delivery: "2天", stock: 860, score: 90 },
      { name: "京东工业", price: 44.5, delivery: "次日达", stock: 1200, score: 92 },
      { name: "广州清洁用品", price: 41.2, delivery: "3天", stock: 500, score: 86 }
    ]
  },
  {
    id: "P-1006",
    name: "不锈钢球阀",
    category: "管阀泵类",
    scene: "水泵房维修",
    image: "/assets/valve.png",
    spec: "DN25 / 304不锈钢 / 内螺纹",
    brand: "沪工",
    unit: "个",
    price: 58.2,
    marketPrice: 66.4,
    stock: 310,
    delivery: "3天",
    supplier: "华南管阀备件仓",
    rating: 89,
    tags: ["需确认口径", "可替代"],
    ai: "历史物料存在 DN20、DN25 混用，建议下单前确认现场口径。",
    suppliers: [
      { name: "华南管阀备件仓", price: 58.2, delivery: "3天", stock: 310, score: 89 },
      { name: "京东工业", price: 63.5, delivery: "2天", stock: 640, score: 94 },
      { name: "本地阀门经销商", price: 56.8, delivery: "5天", stock: 120, score: 83 }
    ]
  }
];

export const aiPrompts = [
  "地下车库照明维修，本周到货",
  "保洁耗材季度补库，按小区面积估算",
  "水泵房阀门更换，需要确认口径",
  "电工安全作业劳保用品"
];

export const buyerRequests = [
  { id: "R-2406-018", title: "海珠花园地下车库照明维修", status: "待生成采购单", owner: "工程部 张工", amount: "￥18.6万", ai: "4 类物料已匹配，1 项需确认品牌" },
  { id: "R-2406-021", title: "保洁耗材季度补库", status: "待询价", owner: "运营部 陈经理", amount: "￥42.2万", ai: "建议 3 家供应商比价" },
  { id: "R-2406-026", title: "水泵房阀门更换", status: "需物料治理", owner: "工程部 李工", amount: "￥9.7万", ai: "检测到 12 条相似物料" },
  { id: "R-2406-030", title: "员工端福利采购", status: "待审批", owner: "行政部 王洁", amount: "￥68.0万", ai: "超项目预算 11%" }
];

export const supplierWork = [
  { type: "报价邀请", title: "LED 防潮支架灯 160 套", status: "待报价", ai: "建议报价区间 ￥37.9-39.2" },
  { type: "商品上架", title: "12 个电气 SKU 参数缺失", status: "待补齐", ai: "AI 已识别 9 项说明书参数" },
  { type: "订单履约", title: "海珠花园维修订单", status: "备货中", ai: "建议拆广州仓与佛山仓发货" },
  { type: "资质管理", title: "CCC 证书即将到期", status: "18 天", ai: "到期后将影响电气类商品报价" }
];

export const opsTasks = [
  { title: "商品审核", count: 46, desc: "供应商新上架商品待审核" },
  { title: "重复物料", count: 128, desc: "同义词、错别字、规格缺失待治理" },
  { title: "目录授权", count: 9, desc: "项目公司申请新增采购目录" },
  { title: "价格异常", count: 23, desc: "高于历史价或协议价阈值" }
];
