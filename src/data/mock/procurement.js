export const products = [
  {
    id: "P-1001",
    name: "LED 防潮支架灯",
    category: "电气照明",
    scene: "地下车库照明维修",
    spec: "18W / 600mm / IP65 / 6500K",
    brand: "佛山照明",
    image: "/assets/bolt.png",
    price: 38.6,
    history: 43.2,
    stock: 1860,
    delivery: "次日达",
    supplier: "华南电气集采供应商",
    score: 96,
    risk: "低于历史均价 10.6%",
    qualification: "资质正常",
    historyGap: "-10.6%",
    fulfillment: "96",
    tags: ["协议价", "工程常用", "AI 推荐"],
    ai: "适配地下车库潮湿环境，建议与漏保空气开关、阻燃线缆成套采购。",
    suppliers: [
      { name: "华南电气集采供应商", price: "￥38.60", stock: "1860", delivery: "次日达", score: "96", qualification: "资质正常", historyGap: "-10.6%", status: "推荐" },
      { name: "京东工业", price: "￥40.20", stock: "3200", delivery: "次日达", score: "94", qualification: "资质正常", historyGap: "-6.9%", status: "备选" },
      { name: "广州本地照明仓", price: "￥37.90", stock: "420", delivery: "2天", score: "89", qualification: "待复核", historyGap: "-12.3%", status: "低价" }
    ]
  },
  {
    id: "P-1002",
    name: "漏保空气开关",
    category: "电气照明",
    scene: "照明回路保护",
    spec: "2P / 32A / 带漏电保护",
    brand: "德力西",
    image: "/assets/breaker.png",
    price: 46.5,
    history: 51.2,
    stock: 2400,
    delivery: "次日达",
    supplier: "华南电气集采供应商",
    score: 95,
    risk: "安全必配，库存充足",
    qualification: "资质正常",
    historyGap: "-9.2%",
    fulfillment: "95",
    tags: ["安全保护", "可直采", "协议价"],
    ai: "同一维修场景已有 3 次漏采记录，建议作为安全必配项加入采购车。",
    suppliers: [
      { name: "华南电气集采供应商", price: "￥46.50", stock: "2400", delivery: "次日达", score: "95", qualification: "资质正常", historyGap: "-9.2%", status: "推荐" },
      { name: "京东工业", price: "￥48.90", stock: "1800", delivery: "次日达", score: "94", qualification: "资质正常", historyGap: "-4.5%", status: "备选" },
      { name: "广州本地电气仓", price: "￥45.80", stock: "520", delivery: "当日自提", score: "90", qualification: "资质正常", historyGap: "-10.5%", status: "低价" }
    ]
  },
  {
    id: "P-1003",
    name: "阻燃铜芯电缆",
    category: "电气照明",
    scene: "维修布线",
    spec: "BV 2.5mm2 / 国标 / 红蓝双色",
    brand: "珠江电缆",
    image: "/assets/cable.png",
    price: 186,
    history: 201,
    stock: 620,
    delivery: "2天",
    supplier: "珠三角线缆联合仓",
    score: 93,
    risk: "低于历史均价 7.5%",
    qualification: "资质正常",
    historyGap: "-7.5%",
    fulfillment: "93",
    tags: ["历史低价", "需比价", "工程常用"],
    ai: "当前报价低于历史价，建议锁定本周报价并同步价格库。",
    suppliers: [
      { name: "珠三角线缆联合仓", price: "￥186.00", stock: "620", delivery: "2天", score: "93", qualification: "资质正常", historyGap: "-7.5%", status: "推荐" },
      { name: "京东工业", price: "￥198.00", stock: "900", delivery: "次日达", score: "95", qualification: "资质正常", historyGap: "-1.5%", status: "高价" },
      { name: "佛山电缆仓", price: "￥182.00", stock: "300", delivery: "3天", score: "89", qualification: "资质即将到期", historyGap: "-9.5%", status: "低价" }
    ]
  },
  {
    id: "P-1004",
    name: "不锈钢球阀",
    category: "管阀泵类",
    scene: "水泵房维修",
    spec: "DN25 / 304 不锈钢 / 内螺纹",
    brand: "沪工",
    image: "/assets/valve.png",
    price: 58.2,
    history: 66.4,
    stock: 310,
    delivery: "3天",
    supplier: "华南管阀备件仓",
    score: 89,
    risk: "需确认 DN 口径",
    qualification: "资质正常",
    historyGap: "-12.3%",
    fulfillment: "89",
    tags: ["需确认口径", "可替代", "治理线索"],
    ai: "历史物料存在 DN20、DN25 混用，建议下单前确认现场口径。",
    suppliers: [
      { name: "华南管阀备件仓", price: "￥58.20", stock: "310", delivery: "3天", score: "89", qualification: "资质正常", historyGap: "-12.3%", status: "需确认" },
      { name: "京东工业", price: "￥63.50", stock: "640", delivery: "2天", score: "94", qualification: "资质正常", historyGap: "-4.4%", status: "备选" },
      { name: "本地阀门经销商", price: "￥56.80", stock: "120", delivery: "5天", score: "83", qualification: "资质待补", historyGap: "-14.5%", status: "低价" }
    ]
  },
  {
    id: "P-1005",
    name: "全能清洁剂",
    category: "保洁耗材",
    scene: "保洁耗材补货",
    spec: "3.8L / 中性配方 / 地面墙面通用",
    brand: "白云清洁",
    image: "/assets/cleaner.png",
    price: 42.8,
    history: 45.6,
    stock: 980,
    delivery: "次日达",
    supplier: "物业保洁耗材仓",
    score: 92,
    risk: "季度补货建议合并采购",
    qualification: "资质正常",
    historyGap: "-6.1%",
    fulfillment: "92",
    tags: ["常买物料", "协议价", "可直采"],
    ai: "当前项目近 90 天采购频率高，建议与垃圾袋、拖把头合并为保洁补货包。",
    suppliers: [
      { name: "物业保洁耗材仓", price: "￥42.80", stock: "980", delivery: "次日达", score: "92", qualification: "资质正常", historyGap: "-6.1%", status: "推荐" },
      { name: "京东工业", price: "￥44.90", stock: "1400", delivery: "次日达", score: "94", qualification: "资质正常", historyGap: "-1.5%", status: "备选" },
      { name: "广州保洁用品仓", price: "￥41.60", stock: "220", delivery: "3天", score: "86", qualification: "资质正常", historyGap: "-8.8%", status: "低价" }
    ]
  },
  {
    id: "P-1006",
    name: "巡检反光背心",
    category: "劳保安防",
    scene: "安防巡检",
    spec: "荧光黄 / 反光条 / 多口袋",
    brand: "安盾",
    image: "/assets/helmet.png",
    price: 28.5,
    history: 30.8,
    stock: 760,
    delivery: "2天",
    supplier: "安全劳保优选",
    score: 91,
    risk: "安防巡检常备",
    qualification: "资质正常",
    historyGap: "-7.5%",
    fulfillment: "91",
    tags: ["劳保安防", "常买物料", "低风险"],
    ai: "安防夜巡场景建议与手电、警戒带、对讲机电池一并补货。",
    suppliers: [
      { name: "安全劳保优选", price: "￥28.50", stock: "760", delivery: "2天", score: "91", qualification: "资质正常", historyGap: "-7.5%", status: "推荐" },
      { name: "京东工业", price: "￥29.90", stock: "1300", delivery: "次日达", score: "94", qualification: "资质正常", historyGap: "-2.9%", status: "备选" },
      { name: "广州安防用品仓", price: "￥27.80", stock: "180", delivery: "4天", score: "84", qualification: "资质正常", historyGap: "-9.7%", status: "低价" }
    ]
  },
  {
    id: "P-1007",
    name: "防汛沙袋",
    category: "防汛物资",
    scene: "防汛物资",
    spec: "30x70cm / 加厚帆布 / 可重复使用",
    brand: "安汛",
    image: "/assets/wrench.png",
    price: 9.6,
    history: 8.5,
    stock: 0,
    delivery: "5天",
    supplier: "应急物资联采仓",
    score: 88,
    risk: "缺货，建议转需求提报",
    qualification: "资质正常",
    historyGap: "+12.9%",
    fulfillment: "88",
    tags: ["缺货", "超历史价", "需询价"],
    ai: "华南雨季即将到来，当前库存不足且价格高于历史均价，建议转需求池询价。",
    suppliers: [
      { name: "应急物资联采仓", price: "￥9.60", stock: "0", delivery: "5天", score: "88", qualification: "资质正常", historyGap: "+12.9%", status: "缺货" },
      { name: "京东工业", price: "￥10.20", stock: "240", delivery: "3天", score: "94", qualification: "资质正常", historyGap: "+20.0%", status: "高价" },
      { name: "佛山应急仓", price: "￥8.90", stock: "120", delivery: "4天", score: "82", qualification: "资质待补", historyGap: "+4.7%", status: "资质风险" }
    ]
  }
];

export const demands = [
  { id: "REQ-20260613-018", title: "海珠花园地下车库照明维修", project: "广州海珠花园", owner: "工程部 张工", amount: "￥18.6万", status: "询价中", risk: "1 项品牌需确认", ai: "建议直采 3 项，线缆进入询价比价。" },
  { id: "R-2406-021", title: "保洁耗材季度补库", project: "佛山千灯湖项目", owner: "运营部 陈经理", amount: "￥42.2万", status: "建议询价", risk: "金额超过直采阈值", ai: "建议邀请 3 家保洁耗材供应商报价。" },
  { id: "R-2406-026", title: "水泵房阀门更换", project: "广州琶洲项目", owner: "工程部 李工", amount: "￥9.7万", status: "需治理", risk: "12 条相似物料", ai: "建议转入物料治理队列，统一 DN 口径。" },
  { id: "R-2406-030", title: "电工安全作业劳保补充", project: "总部园区", owner: "行政部 王洁", amount: "￥6.8万", status: "待审批", risk: "合规必配", ai: "建议随电气维修采购单合并审批。" }
];

export const inquiries = [
  { id: "Q-2406-11", title: "LED 防潮支架灯 160 套", deadline: "6小时后截止", status: "2/3 已报价", best: "华南电气 ￥38.60", risk: "京东报价高于历史均价 4%" },
  { id: "Q-2406-12", title: "阻燃铜芯电缆 80 卷", deadline: "明日 12:00", status: "1/4 已报价", best: "珠三角线缆 ￥186.00", risk: "建议催办 2 家供应商" },
  { id: "Q-2406-13", title: "保洁耗材季度包", deadline: "2天后", status: "草稿", best: "待发布", risk: "供应商不足" }
];

export const purchaseOrders = [
  { id: "PO-2406-1021", title: "海珠花园照明维修采购单", status: "审批中", amount: "￥18.6万", supplier: "华南电气集采供应商", next: "采购经理审批" },
  { id: "PO-2406-1017", title: "保洁耗材季度补库", status: "已下单", amount: "￥42.2万", supplier: "物业保洁耗材仓", next: "供应商备货" },
  { id: "PO-2406-1008", title: "水泵房阀门备件", status: "待提交", amount: "￥9.7万", supplier: "待比价确认", next: "补充规格参数" }
];

export const supplierTasks = [
  { type: "报价邀请", title: "LED 防潮支架灯 160 套", status: "待报价", due: "6小时", ai: "建议报价区间 ￥37.9-39.2，交期填次日达更有竞争力。" },
  { type: "商品上架", title: "12 个电气 SKU 参数缺失", status: "待补齐", due: "今日", ai: "AI 已识别 9 项说明书参数，可一键应用。" },
  { type: "订单履约", title: "海珠花园维修订单", status: "备货中", due: "明日发货", ai: "建议广州仓与佛山仓拆单发货。" },
  { type: "资质管理", title: "CCC 证书即将到期", status: "18 天", due: "高风险", ai: "到期后将影响电气类商品报价资格。" }
];

export const opsQueues = [
  { title: "商品审核", count: 46, desc: "供应商新上架商品待审核", risk: "其中 8 条价格异常" },
  { title: "重复物料", count: 128, desc: "同义词、错别字、规格缺失待治理", risk: "照明类占比 42%" },
  { title: "供应商风险", count: 17, desc: "资质到期、履约延期、报价异常", risk: "3 家建议观察" },
  { title: "价格异常", count: 23, desc: "高于历史价或协议价阈值", risk: "异常金额 ￥68.4万" }
];

export const materials = [
  { before: "LED支架灯 18w 防潮", after: "LED 防潮支架灯 / 18W / IP65", impact: "关联 34 次采购", confidence: "高" },
  { before: "车库灯 管灯 长条灯", after: "地下车库照明场景目录", impact: "搜索命中 +22%", confidence: "中" },
  { before: "阀门 DN20/DN25 混填", after: "按 DN 口径拆分标准物料", impact: "减少错采风险", confidence: "需确认" },
  { before: "电工手套/绝缘手套", after: "绝缘防护手套 / 10kV", impact: "合规标签统一", confidence: "高" }
];

export const aiCapabilities = [
  { name: "AI 搜索", domains: "用户端工作台", input: "自然语言、图片、场景", output: "类目扩展、商品推荐、缺参提示", action: "跳转 AI 找货", path: "/mall/search", object: "REQ-20260613-018", layer: "工作台", confidence: "高" },
  { name: "参数补全", domains: "供应商后台", input: "图片、说明书、标题", output: "标准标题、规格参数、类目建议", action: "跳转商品编辑", path: "/supplier/product-edit", object: "SKU-LED-1200", layer: "管理后台", confidence: "高" },
  { name: "需求拆解", domains: "采购端后台", input: "采购车、需求单、项目场景", output: "直采/询价/审批/治理建议", action: "跳转需求池", path: "/buyer/demands", object: "REQ-20260613-018", layer: "工作台", confidence: "高" },
  { name: "比价建议", domains: "采购端后台", input: "报价、交期、库存、履约评分", output: "综合评分与推荐报价", action: "跳转采购比价", path: "/buyer/compare", object: "RFQ-20260613-006", layer: "业务总览", confidence: "高" },
  { name: "商品审核", domains: "平台运营后台", input: "商品、资质、价格、类目", output: "通过/驳回建议、风险依据", action: "跳转商品审核", path: "/ops/audit", object: "AUDIT-LED-042", layer: "管理后台", confidence: "需确认" },
  { name: "物料治理", domains: "平台运营后台", input: "别名、错别字、规格变体", output: "标准物料、同义词、价格库关联", action: "跳转物料治理", path: "/ops/materials", object: "GOV-MAT-046", layer: "管理后台", confidence: "高" },
  { name: "成本预警", domains: "采购端/运营端", input: "报价、历史价、预算、履约", output: "异常涨幅、超预算、协议价失效", action: "跳转价格库/预警", path: "/ops/prices", object: "RISK-PRICE-031", layer: "数据看板", confidence: "需确认" }
];

export const integrations = [
  { id: "jd", name: "京东 IOP", type: "电商", status: "延迟", lastSync: "2026-06-14 10:32", exceptions: 2, health: "99.2%", impact: "商品库存 / 比价", issue: "2 条库存同步延迟", reason: "京东库存批次回传超时，LED 支架灯安全库存未更新。", affected: "商品 P-1001、RFQ-20260613-006", suggestion: "刷新库存批次，若 15 分钟内未恢复则在比价页标记库存需确认。", impactPath: "/buyer/compare" },
  { id: "market", name: "其他电商", type: "电商", status: "联调中", lastSync: "2026-06-14 09:48", exceptions: 4, health: "82.0%", impact: "商品池 / 供应商报价", issue: "4 条商品状态未回传", reason: "外部电商商品上下架状态返回不完整。", affected: "协议商品池 12 条 SKU", suggestion: "保留商城内当前状态，运营复核后再开放前台可见。", impactPath: "/ops/pools" },
  { id: "cost", name: "成本系统", type: "成本", status: "已连接", lastSync: "2026-06-14 10:40", exceptions: 1, health: "97.4%", impact: "预算校验 / 成本预警", issue: "预算占用每日同步", reason: "广州海珠花园成本中心预算占用晚于采购审批。", affected: "PO-20260613-088、RISK-PRICE-031", suggestion: "先保留审批风险说明，再重试成本占用同步。", impactPath: "/ops/prices" },
  { id: "expense", name: "费用系统", type: "费用", status: "延迟", lastSync: "2026-06-14 10:18", exceptions: 3, health: "88.5%", impact: "支付状态 / 对账提示", issue: "支付结果回传延迟", reason: "费用单状态回写队列积压，已下单但支付状态未确认。", affected: "PO-20260613-088 关联费用单", suggestion: "重试同步并提示采购端暂不重复提交付款。", impactPath: "/buyer/purchase-orders" },
  { id: "idm", name: "IDM", type: "身份", status: "已连接", lastSync: "2026-06-14 10:25", exceptions: 3, health: "98.1%", impact: "组织用户 / 项目归属", issue: "3 个项目组织待补全", reason: "新增项目组织未完成同步，影响需求归属展示。", affected: "REQ-20260613-018 项目成员", suggestion: "刷新组织同步，保持前端角色入口不变。", impactPath: "/buyer/demands" },
  { id: "oa", name: "OA", type: "审批", status: "失败", lastSync: "2026-06-14 10:12", exceptions: 1, health: "96.8%", impact: "审批回写 / 下单确认", issue: "1 条审批回调失败", reason: "OA 回调超时，审批通过状态未回写商城。", affected: "APV-20260613-019、PO-20260613-088", suggestion: "重试审批回写，采购单保持审批中并提醒审批人。", impactPath: "/buyer/approvals" },
  { id: "invoice", name: "票易通", type: "发票", status: "待接入", lastSync: "未同步", exceptions: 0, health: "76.0%", impact: "发票申请 / 开票回传", issue: "V1 仅展示状态", reason: "V1.5 不接真实发票接口，仅展示后续对接位置。", affected: "订单开票状态占位", suggestion: "只保留状态说明，不展开鉴权、字段映射或真实开票流程。", impactPath: "/supplier/after-sales" },
  { id: "logistics", name: "物流", type: "履约", status: "延迟", lastSync: "2026-06-14 10:05", exceptions: 2, health: "92.6%", impact: "物流轨迹 / 妥投确认", issue: "2 条轨迹更新延迟", reason: "第三方物流节点未及时回传，用户侧订单停留在配送中。", affected: "SO-20260613-221", suggestion: "重试轨迹同步，并在供应商履约页保留异常说明。", impactPath: "/supplier/fulfillment" },
  { id: "notify", name: "短信/邮箱", type: "通知", status: "已连接", lastSync: "2026-06-14 10:43", exceptions: 4, health: "95.6%", impact: "消息提醒 / 催办通知", issue: "短信模板 4 条待审核", reason: "供应商催办短信模板未审核，可能影响未响应供应商触达。", affected: "RFQ-20260613-006 催办通知", suggestion: "先走站内消息和邮件，短信模板审核后再启用。", impactPath: "/buyer/inquiry-control" }
];
