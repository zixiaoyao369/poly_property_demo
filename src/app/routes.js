import {
  Bot,
  Boxes,
  ClipboardCheck,
  ActivitySquare,
  GitBranch,
  LayoutDashboard,
  PackageCheck,
  Presentation,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Warehouse
} from "lucide-react";

export const modules = [
  {
    id: "executive",
    label: "高层汇报",
    short: "价值、闭环、路线",
    icon: Presentation,
    home: "/executive/overview",
    routes: [{ path: "/executive/overview", label: "高层汇报模式", view: "executive.overview", priority: "P0" }]
  },
  {
    id: "flow",
    label: "采购驾驶舱",
    short: "链路堵点与流转",
    icon: ActivitySquare,
    home: "/ops/flow-overview",
    routes: [{ path: "/ops/flow-overview", label: "采购运营驾驶舱", view: "executive.operations", priority: "P0" }]
  },
  {
    id: "mall",
    label: "用户端商城",
    short: "找货与采购车",
    icon: Store,
    home: "/mall/home",
    routes: [
      { path: "/mall/home", label: "商城门户首页", view: "mall.home", priority: "P0" },
      { path: "/mall/search", label: "AI 找货与商品列表", view: "mall.search", priority: "P0" },
      { path: "/mall/product", label: "商品详情与一品多商", view: "mall.product", priority: "P0" },
      { path: "/mall/cart", label: "采购车", view: "mall.cart", priority: "P0" },
      { path: "/mall/requirement", label: "需求提报", view: "mall.requirement", priority: "P0" },
      { path: "/mall/orders", label: "我的订单/采购跟踪", view: "mall.orders", priority: "P0" }
    ]
  },
  {
    id: "buyer",
    label: "采购端后台",
    short: "需求、询价、审批",
    icon: ClipboardCheck,
    home: "/buyer/workbench",
    routes: [
      { path: "/buyer/workbench", label: "采购工作台", view: "buyer.workbench", priority: "P0" },
      { path: "/buyer/demands", label: "需求池", view: "buyer.demands", priority: "P0" },
      { path: "/buyer/inquiry-publish", label: "询价发布", view: "buyer.inquiryPublish", priority: "P0" },
      { path: "/buyer/inquiry-control", label: "询价管控", view: "buyer.inquiryControl", priority: "P0" },
      { path: "/buyer/compare", label: "询价结果/比价", view: "buyer.compare", priority: "P0" },
      { path: "/buyer/purchase-orders", label: "采购单管理", view: "buyer.purchaseOrders", priority: "P0" },
      { path: "/buyer/approvals", label: "订单审批", view: "buyer.approvals", priority: "P0" },
      { path: "/buyer/cost-alerts", label: "历史价/成本预警", view: "buyer.costAlerts", priority: "P0" }
    ]
  },
  {
    id: "supplier",
    label: "供应商后台",
    short: "报价、履约、资质",
    icon: Warehouse,
    home: "/supplier/workbench",
    routes: [
      { path: "/supplier/workbench", label: "供应商工作台", view: "supplier.workbench", priority: "P0" },
      { path: "/supplier/products", label: "商品维护列表", view: "supplier.products", priority: "P0" },
      { path: "/supplier/product-edit", label: "商品上架/编辑", view: "supplier.productEdit", priority: "P0" },
      { path: "/supplier/inquiries", label: "询价列表 + 参与报价", view: "supplier.inquiries", priority: "P0" },
      { path: "/supplier/fulfillment", label: "订单履约列表", view: "supplier.fulfillment", priority: "P0" },
      { path: "/supplier/after-sales", label: "售后查询/跟进", view: "supplier.afterSales", priority: "P0" },
      { path: "/supplier/qualification", label: "资质管理", view: "supplier.qualification", priority: "P0" }
    ]
  },
  {
    id: "ops",
    label: "平台运营后台",
    short: "治理、审核、看板",
    icon: LayoutDashboard,
    home: "/ops/workbench",
    routes: [
      { path: "/ops/workbench", label: "运营总览工作台", view: "ops.workbench", priority: "P0" },
      { path: "/ops/audit", label: "商品审核 + AI 智能审核", view: "ops.audit", priority: "P0" },
      { path: "/ops/materials", label: "物料治理队列", view: "ops.materials", priority: "P0" },
      { path: "/ops/prices", label: "价格库/成本预警", view: "ops.prices", priority: "P0" },
      { path: "/ops/categories", label: "品类管理", view: "ops.categories", priority: "P0" },
      { path: "/ops/pools", label: "商品池管理", view: "ops.pools", priority: "P0" },
      { path: "/ops/suppliers", label: "供应商店铺管理", view: "ops.suppliers", priority: "P0" },
      { path: "/ops/dashboard", label: "数据看板", view: "ops.dashboard", priority: "P0" }
    ]
  },
  {
    id: "ai",
    label: "AI 能力中心",
    short: "横向能力总览",
    icon: Bot,
    home: "/ai/overview",
    routes: [{ path: "/ai/overview", label: "AI 能力总览", view: "ai.overview", priority: "P0" }]
  },
  {
    id: "integration",
    label: "集成总览",
    short: "电商与系统支撑",
    icon: GitBranch,
    home: "/integration/overview",
    routes: [{ path: "/integration/overview", label: "电商/系统集成总览", view: "integration.overview", priority: "P0" }]
  }
];

export const routeList = modules.flatMap((module) =>
  module.routes.map((route) => ({ ...route, moduleId: module.id }))
);

export const routeByPath = new Map(routeList.map((route) => [route.path, route]));
export const moduleById = new Map(modules.map((module) => [module.id, module]));

export const fallbackPath = "/mall/home";

export const commandTargets = [
  { label: "打开高层汇报模式", path: "/executive/overview", icon: Presentation },
  { label: "打开采购运营驾驶舱", path: "/ops/flow-overview", icon: ActivitySquare },
  { label: "搜索地下车库照明维修", path: "/mall/search", icon: Search },
  { label: "打开采购车", path: "/mall/cart", icon: ShoppingCart },
  { label: "进入需求池", path: "/buyer/demands", icon: Boxes },
  { label: "查看询价比价", path: "/buyer/compare", icon: ShieldCheck },
  { label: "供应商参与报价", path: "/supplier/inquiries", icon: PackageCheck },
  { label: "订单履约处理", path: "/supplier/fulfillment", icon: Truck },
  { label: "商品审核", path: "/ops/audit", icon: ShieldCheck },
  { label: "物料治理", path: "/ops/materials", icon: Bot }
];
