const routeBuckets = [
  {
    match: ["executive.overview"],
    title: "高层汇报助手",
    context: "解释 V1.5 价值、边界和可演示闭环",
    questions: [
      {
        type: "怎么操作",
        question: "这套商城和普通电商商城有什么区别？",
        answer:
          "它不是单纯下单入口，而是把找货、需求、询价、比价、审核、履约、治理和集成状态放在同一个采购运营链路里。汇报时建议先讲高层价值，再跳到采购运营驾驶舱或商城首页演示业务闭环。",
        actions: [
          { label: "进入商城首页", path: "/mall/home" },
          { label: "查看 AI 能力", path: "/ai/overview" }
        ]
      },
      {
        type: "为什么预警",
        question: "为什么要做 AI 物料管家？",
        answer:
          "高频物业物料存在别名多、规格缺失、价格波动和重复建档问题。AI 的价值是给出依据和下一步动作，例如补参数、转需求池、加入治理队列或触发成本预警。",
        actions: [{ label: "查看物料治理", path: "/ops/materials" }]
      },
      {
        type: "下一步做什么",
        question: "第一期不做后端还能验证什么？",
        answer:
          "可以验证页面结构、跨角色流转、操作反馈、风险解释和客户演示路径。真实接口、权限、数据字典和工单后台都留到后续阶段，不在 V1.5 里展开。",
        actions: [{ label: "查看集成总览", path: "/integration/overview" }]
      }
    ]
  },
  {
    match: ["executive.operations", "/ops/flow-overview", "flow"],
    title: "采购驾驶舱助手",
    context: "定位需求、询价、审批、履约、治理和集成支撑的当前堵点",
    questions: [
      {
        type: "怎么看堵点",
        question: "这页和数据看板有什么区别？",
        answer:
          "采购运营驾驶舱看的是当前流程卡点，不是经营结果报表。它按需求进入、采购处理、审批下单、供应商协同、运营治理和集成支撑六个阶段组织，每个节点都能跳到对应处理页。",
        actions: [
          { label: "进入需求池", path: "/buyer/demands" },
          { label: "查看数据看板", path: "/ops/dashboard" }
        ]
      },
      {
        type: "下一步做什么",
        question: "当前最该先处理哪三个问题？",
        answer:
          "建议先处理 RFQ-20260613-006 供应商未响应，再补齐 REQ-20260613-018 关键规格，最后推进 GOV-MAT-046 物料合并。这样能同时降低询价、审批和后续搜索噪音。",
        actions: [
          { label: "询价管控", path: "/buyer/inquiry-control" },
          { label: "物料治理", path: "/ops/materials" }
        ]
      },
      {
        type: "单据在哪里",
        question: "REQ、RFQ、PO、SO 分别去哪里处理？",
        answer:
          "REQ 在需求池处理，RFQ 在询价管控和比价页处理，PO 在采购单管理和订单审批页处理，SO 在供应商履约页处理。治理和风险对象则进入物料治理、价格库或集成总览。",
        actions: [
          { label: "订单审批", path: "/buyer/approvals" },
          { label: "供应商履约", path: "/supplier/fulfillment" }
        ]
      }
    ]
  },
  {
    match: ["mall.home"],
    title: "商城首页助手",
    context: "帮助员工从物业场景进入找货和采购",
    questions: [
      {
        type: "怎么操作",
        question: "员工找不到商品怎么办？",
        answer:
          "先用场景入口或 AI 找货描述用途，例如地下车库照明维修。若缺规格或无结果，可以转成需求提报，后续由采购在需求池分流为直采、询价或治理任务。",
        actions: [
          { label: "打开 AI 找货", path: "/mall/search" },
          { label: "发起需求提报", path: "/mall/requirement" }
        ]
      },
      {
        type: "单据在哪里",
        question: "常买清单和采购进度从哪里看？",
        answer:
          "首页承载员工工作台能力，常买物料用于快速复购，采购进度可进入我的订单/采购跟踪，查看同一需求从 REQ 到 RFQ、PO、履约的状态。",
        actions: [{ label: "查看采购跟踪", path: "/mall/orders" }]
      },
      {
        type: "下一步做什么",
        question: "支持按物业场景找货吗？",
        answer:
          "支持。当前原型用地下车库照明、保洁耗材、安防巡检、工程维修等场景组织入口，目的是让一线人员按真实工作语言发起采购。",
        actions: [{ label: "进入商品列表", path: "/mall/search" }]
      }
    ]
  },
  {
    match: ["mall.search"],
    title: "AI 找货助手",
    context: "解释模糊需求、图片识别和转需求",
    questions: [
      {
        type: "怎么操作",
        question: "AI 如何理解模糊需求？",
        answer:
          "AI 会把自然语言拆成场景、品类、规格和风险字段，并提示缺失参数。低置信结果不会直接下单，而是引导补参或转需求提报。",
        actions: [{ label: "转需求提报", path: "/mall/requirement" }]
      },
      {
        type: "为什么预警",
        question: "图片识别不确定怎么办？",
        answer:
          "不确定时应显示待确认，而不是假装准确。用户可以补充规格、选择相似商品，或把对象转入物料治理，避免错误物料进入采购链路。",
        actions: [{ label: "查看物料治理", path: "/ops/materials" }]
      },
      {
        type: "下一步做什么",
        question: "能否把无结果搜索转需求？",
        answer:
          "可以。无结果或非标采购应生成需求提报，携带用户描述、图片占位、场景和缺参提示，供采购端在需求池继续分流。",
        actions: [{ label: "打开需求池", path: "/buyer/demands" }]
      }
    ]
  },
  {
    match: ["mall.product"],
    title: "商品详情助手",
    context: "解释一品多商、历史价和供应商选择",
    questions: [
      {
        type: "怎么操作",
        question: "一品多商如何推荐供应商？",
        answer:
          "推荐不只看最低价，还会综合协议价、交期、库存、履约评分、资质状态和历史价格波动。采购动作仍由用户确认。",
        actions: [{ label: "加入采购车", path: "/mall/cart" }]
      },
      {
        type: "为什么预警",
        question: "为什么不只选最低价？",
        answer:
          "最低价可能伴随交期风险、资质临期、报价异常或售后成本。系统会把这些依据呈现出来，帮助用户做可解释的采购选择。",
        actions: [{ label: "查看价格库", path: "/ops/prices" }]
      },
      {
        type: "单据在哪里",
        question: "历史价有什么作用？",
        answer:
          "历史价用于判断当前报价是否异常，也能辅助采购端进行成本预警。若高于 90 天均价或协议价，后续会在比价和价格库里继续提示。",
        actions: [{ label: "查看成本预警", path: "/buyer/cost-alerts" }]
      }
    ]
  },
  {
    match: ["mall.cart"],
    title: "采购车助手",
    context: "解释提交后流转、预算风险和拆单",
    questions: [
      {
        type: "单据在哪里",
        question: "提交后单据去了哪里？",
        answer:
          "提交后会生成需求编号，例如 REQ-20260613-018，并进入采购端需求池。用户侧可以在我的订单/采购跟踪里看到后续询价、审批和下单状态。",
        actions: [
          { label: "查看需求池", path: "/buyer/demands" },
          { label: "查看采购跟踪", path: "/mall/orders" }
        ]
      },
      {
        type: "为什么预警",
        question: "预算风险如何提示？",
        answer:
          "采购车会结合项目、成本中心、历史价和协议价给出超预算或异常涨价提示。V1.5 只做前端模拟反馈，不进入预算规则配置。",
        actions: [{ label: "查看成本预警", path: "/buyer/cost-alerts" }]
      },
      {
        type: "下一步做什么",
        question: "多个供应商会怎么拆单？",
        answer:
          "前端会展示按供应商、交期或资质风险拆分的建议，真实拆单规则不在本轮展开。当前重点是让用户知道提交后由采购承接。",
        actions: [{ label: "进入采购工作台", path: "/buyer/workbench" }]
      }
    ]
  },
  {
    match: ["buyer.demands"],
    title: "需求池助手",
    context: "解释需求分流、补参和转治理",
    questions: [
      {
        type: "怎么操作",
        question: "哪些需求直采，哪些要询价？",
        answer:
          "标准物料、协议价明确且风险低的需求可直采；非标、价格异常、供应商不足或金额较高的需求建议转询价或审批。",
        actions: [{ label: "发布询价", path: "/buyer/inquiry-publish" }]
      },
      {
        type: "为什么预警",
        question: "AI 分流依据是什么？",
        answer:
          "依据包括物料标准化程度、历史采购价格、协议价、预算、供应商覆盖和参数完整度。低置信建议应由采购人工确认。",
        actions: [{ label: "查看 AI 能力", path: "/ai/overview" }]
      },
      {
        type: "下一步做什么",
        question: "缺参数怎么处理？",
        answer:
          "缺关键规格时先补参；无法确认的物料可转运营治理队列，沉淀标准物料、同义词和 BadCase，避免重复问题。",
        actions: [{ label: "转物料治理", path: "/ops/materials" }]
      }
    ]
  },
  {
    match: ["buyer.inquiryPublish", "buyer.inquiryControl", "buyer.compare"],
    title: "询价比价助手",
    context: "解释 RFQ 进度、报价维度和异常处理",
    questions: [
      {
        type: "怎么操作",
        question: "比价要看哪些维度？",
        answer:
          "比价应综合价格、交期、库存、履约评分、资质、历史价差和响应速度。AI 推荐理由要展示证据，不能只给一个结论。",
        actions: [{ label: "查看比价页", path: "/buyer/compare" }]
      },
      {
        type: "单据在哪里",
        question: "供应商未响应怎么办？",
        answer:
          "可以在询价管控页查看 RFQ 响应进度，对未响应供应商发起催办。V1.5 使用 Toast 和行内状态模拟催办反馈。",
        actions: [{ label: "查看询价管控", path: "/buyer/inquiry-control" }]
      },
      {
        type: "为什么预警",
        question: "异常报价如何处理？",
        answer:
          "异常报价需要结合历史价、协议价和市场价判断。高于历史均价或低于合理成本时，应要求澄清、补充比价或进入审批。",
        actions: [{ label: "查看成本预警", path: "/buyer/cost-alerts" }]
      }
    ]
  },
  {
    match: ["supplier.inquiries"],
    title: "供应商询价助手",
    context: "解释报价提交、替代品和过期处理",
    questions: [
      {
        type: "单据在哪里",
        question: "报价后采购端能看到什么？",
        answer:
          "采购端会在询价管控和比价页看到报价状态、价格、库存、交期、替代品说明和备注。当前原型用同一 RFQ 编号串联。",
        actions: [{ label: "采购端比价", path: "/buyer/compare" }]
      },
      {
        type: "怎么操作",
        question: "替代品怎么提交？",
        answer:
          "在参与报价时填写替代品、规格差异、交期和说明。系统会提示采购端对比差异，不把替代品直接当成原商品。",
        actions: [{ label: "维护商品资料", path: "/supplier/products" }]
      },
      {
        type: "下一步做什么",
        question: "报价过期怎么办？",
        answer:
          "过期报价不进入有效比价。供应商需要重新提交或等待采购重新发起询价，轻量反馈通过状态标签和 Toast 表达。",
        actions: [{ label: "回到供应商工作台", path: "/supplier/workbench" }]
      }
    ]
  },
  {
    match: ["ops.audit"],
    title: "商品审核助手",
    context: "解释 AI 审核、人工复核和驳回反馈",
    questions: [
      {
        type: "怎么操作",
        question: "AI 审核能判断什么？",
        answer:
          "AI 可以提示类目、规格、图片、资质、重复物料和价格异常风险，但通过、驳回、转治理仍由人工确认。",
        actions: [{ label: "查看 AI 能力", path: "/ai/overview" }]
      },
      {
        type: "下一步做什么",
        question: "人工如何复核？",
        answer:
          "运营人员查看 AI 依据和商品资料，选择通过、驳回补充或转物料治理。每个动作只做前端状态反馈，不进入规则引擎配置。",
        actions: [{ label: "转物料治理", path: "/ops/materials" }]
      },
      {
        type: "单据在哪里",
        question: "驳回后供应商怎么处理？",
        answer:
          "驳回原因会在供应商商品维护或编辑页展示，供应商补齐规格、资质或图片后重新提交审核。",
        actions: [{ label: "供应商商品编辑", path: "/supplier/product-edit" }]
      }
    ]
  },
  {
    match: ["ops.materials"],
    title: "物料治理助手",
    context: "解释重复物料、合并影响和 BadCase",
    questions: [
      {
        type: "为什么预警",
        question: "什么是重复物料？",
        answer:
          "重复物料通常来自别名、错别字、规格写法不统一或供应商自建商品。治理目标是形成标准物料，提升搜索、比价和价格库准确性。",
        actions: [{ label: "查看 AI 能力", path: "/ai/overview" }]
      },
      {
        type: "下一步做什么",
        question: "合并后影响搜索吗？",
        answer:
          "会影响。合并后同义词、规格和标准物料会反向服务搜索和采购推荐，让一线用户用不同叫法也能找到正确物料。",
        actions: [{ label: "打开 AI 找货", path: "/mall/search" }]
      },
      {
        type: "怎么操作",
        question: "BadCase 如何沉淀？",
        answer:
          "BadCase 只做轻量沉淀，记录期望结果、实际结果、原因和建议修复，不扩成独立复杂后台。",
        actions: [{ label: "查看商品审核", path: "/ops/audit" }]
      }
    ]
  },
  {
    match: ["ops.prices", "buyer.costAlerts"],
    title: "价格库助手",
    context: "解释成本预警、历史价和协议价",
    questions: [
      {
        type: "为什么预警",
        question: "成本预警依据是什么？",
        answer:
          "依据当前报价、90 天历史均价、协议价、项目预算和供应商履约表现。预警只说明风险和建议动作，不替代审批。",
        actions: [{ label: "查看比价页", path: "/buyer/compare" }]
      },
      {
        type: "怎么操作",
        question: "历史价和协议价怎么用？",
        answer:
          "历史价用于识别异常波动，协议价用于判断可采购边界。价格库让运营能追踪价格治理结果，采购端则用于比价和审批依据。",
        actions: [{ label: "进入价格库", path: "/ops/prices" }]
      },
      {
        type: "下一步做什么",
        question: "发现涨价后下一步做什么？",
        answer:
          "可以要求补充比价、发起询价澄清、选择风险更低报价，或提交审批说明。V1.5 不做真实预算规则配置。",
        actions: [{ label: "发布询价", path: "/buyer/inquiry-publish" }]
      }
    ]
  },
  {
    match: ["ops.dashboard"],
    title: "数据看板助手",
    context: "解释采购规模、降本、效率、履约、治理和 AI 效果",
    questions: [
      {
        type: "怎么判断价值",
        question: "这页如何回答系统有没有产生采购价值？",
        answer:
          "先看采购规模是否进入平台，再看询价节省、历史价预警避免金额和协议价覆盖率；随后结合找货/审批效率、履约质量、物料治理和 AI 采纳率判断系统是否真正降本、提效、控险。",
        actions: [
          { label: "查看价格库", path: "/ops/prices" },
          { label: "查看采购单", path: "/buyer/purchase-orders" }
        ]
      },
      {
        type: "怎么操作",
        question: "指标点进去会到哪里？",
        answer:
          "规模类指标跳采购单，降本和价格异常跳价格库，效率跳询价管控，履约跳供应商管理，治理跳物料治理，AI 指标跳 AI 能力中心。当前只做前端下钻，不做真实 BI 或自定义报表。",
        actions: [
          { label: "物料治理", path: "/ops/materials" },
          { label: "供应商管理", path: "/ops/suppliers" }
        ]
      },
      {
        type: "怎么看区别",
        question: "它和采购运营驾驶舱有什么区别？",
        answer:
          "采购运营驾驶舱看当前哪里堵了，按需求、询价、审批、履约、治理、集成阶段组织；数据看板看结果是否改善，按规模、降本、效率、履约、治理和 AI 效果组织。",
        actions: [{ label: "打开采购驾驶舱", path: "/ops/flow-overview" }]
      }
    ]
  },
  {
    match: ["integration.overview"],
    title: "集成总览助手",
    context: "解释模拟集成、影响对象和后续边界",
    questions: [
      {
        type: "单据在哪里",
        question: "现在是否接了真实系统？",
        answer:
          "没有。V1.5 只展示前端模拟的集成状态和影响对象，用于说明后续接 OA、电商、发票、物流等系统时业务如何受影响。",
        actions: [{ label: "查看高层汇报", path: "/executive/overview" }]
      },
      {
        type: "为什么预警",
        question: "集成异常影响哪些业务？",
        answer:
          "集成异常不只是一颗红点，它可能影响商品同步、订单回传、审批状态、履约节点或发票状态。页面需要说明影响对象和建议处理。",
        actions: [{ label: "查看采购车", path: "/mall/cart" }]
      },
      {
        type: "下一步做什么",
        question: "后续如何对接 OA、京东、发票和物流？",
        answer:
          "后续阶段再梳理接口、字段映射、鉴权和运维配置。当前只保留可解释入口，不新增真实接口和数据字典。",
        actions: [{ label: "查看 AI 能力", path: "/ai/overview" }]
      }
    ]
  },
  {
    match: ["ai.overview"],
    title: "AI 能力助手",
    context: "解释 AI 如何嵌入业务动作",
    questions: [
      {
        type: "怎么操作",
        question: "AI 能力中心是不是一个聊天后台？",
        answer:
          "不是。它只解释 AI 如何嵌入找货、补参、分流、比价、审核、治理和预警，并提供跳转到业务页面的入口。",
        actions: [{ label: "打开 AI 找货", path: "/mall/search" }]
      },
      {
        type: "为什么预警",
        question: "低置信建议怎么处理？",
        answer:
          "低置信建议应标记为需确认，并给出人工复核、补充参数或转治理的动作，避免 AI 结论不可解释。",
        actions: [{ label: "查看需求池", path: "/buyer/demands" }]
      },
      {
        type: "下一步做什么",
        question: "AI 建议采纳后会怎样？",
        answer:
          "当前用前端状态和 Toast 表示采纳或驳回。真实建议历史、训练反馈和规则配置不在 V1.5 展开。",
        actions: [{ label: "查看商品审核", path: "/ops/audit" }]
      }
    ]
  }
];

const fallbackBucket = {
  title: "业务助手",
  context: "根据当前页面解释对象、风险和下一步动作",
  questions: [
    {
      type: "怎么操作",
      question: "当前页面我应该先看哪里？",
      answer:
        "先看页面顶部的待办、风险和状态标签，再进入列表或详情处理具体对象。每个关键动作都会通过 Toast 或状态变化给出反馈。",
      actions: [{ label: "回到商城首页", path: "/mall/home" }]
    },
    {
      type: "单据在哪里",
      question: "同一需求如何跨页面追踪？",
      answer:
        "用统一样例编号追踪：REQ 表示需求，RFQ 表示询价，PO 表示采购单，SO 表示供应商履约。不同角色页面会看到同一对象的不同视角。",
      actions: [{ label: "查看需求池", path: "/buyer/demands" }]
    },
    {
      type: "下一步做什么",
      question: "遇到风险提示下一步做什么？",
      answer:
        "先查看风险依据，再选择补参、询价、比价、审批、转治理或联系人工。V1.5 只做前端模拟反馈，不进入真实后端流程。",
      actions: [{ label: "查看运营工作台", path: "/ops/workbench" }]
    }
  ]
};

export function getSmartServiceContext(route) {
  const view = route?.view || "";
  const path = route?.path || "";
  const moduleId = route?.moduleId || "";
  const bucket =
    routeBuckets.find((item) => item.match.includes(view) || item.match.includes(path) || item.match.includes(moduleId)) ||
    fallbackBucket;

  return {
    ...bucket,
    questions: bucket.questions.slice(0, 5)
  };
}

export function createFreeformAnswer(input, route) {
  const normalized = input.trim();
  const lower = normalized.toLowerCase();
  const type = /预警|风险|异常|为什么/.test(normalized)
    ? "为什么预警"
    : /在哪|哪里|单据|编号|查/.test(normalized)
      ? "单据在哪里"
      : /下一步|然后|处理/.test(normalized)
        ? "下一步做什么"
        : "怎么操作";

  const routePath = route?.path || "/mall/home";
  const actions =
    lower.includes("ai") || normalized.includes("AI")
      ? [{ label: "查看 AI 能力", path: "/ai/overview" }]
      : [{ label: "查看当前页面", path: routePath }, { label: "进入需求池", path: "/buyer/demands" }];

  return {
    type,
    question: normalized,
    answer:
      `我先按“${type}”理解这个问题。当前原型会基于页面对象、状态、风险依据和可执行动作给出模拟业务答复；如果涉及接口、权限、真实工单或知识库配置，本轮只保留前端提示，不进入后端实现。`,
    actions
  };
}
