import React, { useEffect, useMemo, useState } from "react";
import { AppShell } from "../layouts/AppShell.jsx";
import { fallbackPath, routeByPath } from "./routes.js";
import { ExecutiveOverview, ProcurementOperationsCockpit } from "../modules/executive/pages.jsx";
import { MallHome, MallSearch, ProductDetail, CartPage, RequirementPage, OrdersPage } from "../modules/mall/pages.jsx";
import { BuyerWorkbench, DemandPool, InquiryPublish, InquiryControl, ComparePage, PurchaseOrders, Approvals, CostAlerts } from "../modules/buyer/pages.jsx";
import { SupplierWorkbench, SupplierProducts, ProductEdit, SupplierInquiries, Fulfillment, AfterSales, Qualification } from "../modules/supplier/pages.jsx";
import { OpsWorkbench, ProductAudit, MaterialsQueue, PriceGovernance, Categories, ProductPools, SupplierStores, DataDashboard } from "../modules/ops/pages.jsx";
import { AiOverview } from "../modules/ai/pages.jsx";
import { IntegrationOverview } from "../modules/integration/pages.jsx";

function normalizeHash() {
  const raw = window.location.hash.replace(/^#/, "");
  return raw.startsWith("/") ? raw : fallbackPath;
}

function useHashRoute() {
  const [path, setPath] = useState(normalizeHash);
  useEffect(() => {
    if (!window.location.hash) window.location.hash = fallbackPath;
    const onHashChange = () => setPath(normalizeHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const navigate = (nextPath) => {
    window.location.hash = nextPath;
    setPath(nextPath);
  };
  return [path, navigate];
}

export default function App() {
  const [path, navigate] = useHashRoute();
  const [cart, setCart] = useState([]);
  const route = routeByPath.get(path) || routeByPath.get(fallbackPath);

  const addToCart = (product) => {
    setCart((current) => (current.some((item) => item.id === product.id) ? current : [...current, product]));
    window.dispatchEvent(
      new CustomEvent("demo-feedback", {
        detail: {
          tone: "success",
          title: "已加入采购车",
          message: `${product.name} 已进入采购车，可继续确认项目、成本中心、预算和供应商拆分。`,
          actionLabel: "查看采购车",
          actionPath: "/mall/cart"
        }
      })
    );
  };

  const pages = useMemo(
    () => ({
      "executive.overview": <ExecutiveOverview navigate={navigate} />,
      "executive.operations": <ProcurementOperationsCockpit navigate={navigate} />,
      "mall.home": <MallHome navigate={navigate} addToCart={addToCart} />,
      "mall.search": <MallSearch navigate={navigate} addToCart={addToCart} />,
      "mall.product": <ProductDetail addToCart={addToCart} />,
      "mall.cart": <CartPage cart={cart} navigate={navigate} />,
      "mall.requirement": <RequirementPage navigate={navigate} />,
      "mall.orders": <OrdersPage />,
      "buyer.workbench": <BuyerWorkbench navigate={navigate} />,
      "buyer.demands": <DemandPool navigate={navigate} />,
      "buyer.inquiryPublish": <InquiryPublish />,
      "buyer.inquiryControl": <InquiryControl navigate={navigate} />,
      "buyer.compare": <ComparePage navigate={navigate} />,
      "buyer.purchaseOrders": <PurchaseOrders />,
      "buyer.approvals": <Approvals />,
      "buyer.costAlerts": <CostAlerts />,
      "supplier.workbench": <SupplierWorkbench navigate={navigate} />,
      "supplier.products": <SupplierProducts />,
      "supplier.productEdit": <ProductEdit />,
      "supplier.inquiries": <SupplierInquiries />,
      "supplier.fulfillment": <Fulfillment />,
      "supplier.afterSales": <AfterSales />,
      "supplier.qualification": <Qualification />,
      "ops.workbench": <OpsWorkbench navigate={navigate} />,
      "ops.audit": <ProductAudit />,
      "ops.materials": <MaterialsQueue />,
      "ops.prices": <PriceGovernance />,
      "ops.categories": <Categories />,
      "ops.pools": <ProductPools />,
      "ops.suppliers": <SupplierStores />,
      "ops.dashboard": <DataDashboard navigate={navigate} />,
      "ai.overview": <AiOverview navigate={navigate} />,
      "integration.overview": <IntegrationOverview navigate={navigate} />
    }),
    [cart]
  );

  return (
    <AppShell route={route} navigate={navigate}>
      {pages[route.view] || pages["mall.home"]}
    </AppShell>
  );
}
