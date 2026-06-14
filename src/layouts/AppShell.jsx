import React, { useEffect, useMemo, useState } from "react";
import { Bell, Command, Menu, PanelLeftClose, Search, X } from "lucide-react";
import { commandTargets, moduleById, modules } from "../app/routes.js";
import { SmartServicePanel } from "../components/ui.jsx";

const roleMessages = [
  { role: "用户端", title: "海珠花园采购需求已进入采购端需求池", path: "/buyer/demands" },
  { role: "采购端", title: "线缆报价 6 小时后截止，建议进入比价页", path: "/buyer/compare" },
  { role: "供应商端", title: "CCC 证书 18 天后到期，请维护资质", path: "/supplier/qualification" },
  { role: "运营端", title: "照明类重复物料 42% 待治理", path: "/ops/materials" }
];

export function AppShell({ route, navigate, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [query, setQuery] = useState("");
  const currentModule = moduleById.get(route.moduleId) || modules[0];

  useEffect(() => {
    const onFeedback = (event) => {
      const detail = event.detail || {};
      const payload =
        typeof detail.message === "object"
          ? detail.message
          : {
              tone: detail.tone || "success",
              title: detail.title || "操作反馈",
              message: detail.message || "演示动作已记录",
              actionLabel: detail.actionLabel,
              actionPath: detail.actionPath
            };
      setToast(payload);
      window.clearTimeout(window.__polyDemoToast);
      window.__polyDemoToast = window.setTimeout(() => setToast(null), 3200);
    };
    window.addEventListener("demo-feedback", onFeedback);
    return () => {
      window.removeEventListener("demo-feedback", onFeedback);
      window.clearTimeout(window.__polyDemoToast);
    };
  }, []);

  const commandResults = useMemo(() => {
    if (!query.trim()) return commandTargets.slice(0, 5);
    return commandTargets.filter((item) => item.label.includes(query.trim())).slice(0, 5);
  }, [query]);

  const go = (path) => {
    navigate(path);
    setMessageOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    setMessageOpen(false);
  }, [route.path]);

  return (
    <main className={`v1-shell ${collapsed ? "nav-collapsed" : ""}`}>
      <aside className={`app-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand-block">
          <div className="brand-mark">保</div>
          <div>
            <strong>保利物业商城</strong>
            <span>V1.5 Frontend App Shell</span>
          </div>
          <button className="icon-button mobile-only" onClick={() => setMobileOpen(false)} aria-label="关闭导航">
            <X size={18} />
          </button>
        </div>

        <nav className="module-switcher" aria-label="业务端切换">
          {modules.map((module) => {
            const Icon = module.icon;
            const active = module.id === currentModule.id;
            return (
              <button className={active ? "active" : ""} key={module.id} onClick={() => go(module.home)}>
                <Icon size={18} />
                <span>
                  <b>{module.label}</b>
                  <small>{module.short}</small>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="side-section-title">当前端内页面</div>
        <nav className="page-nav" aria-label="端内导航">
          {currentModule.routes.map((item) => (
            <button className={route.path === item.path ? "active" : ""} key={item.path} onClick={() => go(item.path)}>
              <span>{item.label}</span>
              <small>{item.priority}</small>
            </button>
          ))}
        </nav>

        <button className="collapse-button" onClick={() => setCollapsed((value) => !value)}>
          <PanelLeftClose size={16} />
          <span>{collapsed ? "展开导航" : "收起导航"}</span>
        </button>
      </aside>

      <section className="app-main">
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setMobileOpen(true)} aria-label="打开导航">
            <Menu size={20} />
          </button>
          <div className="command-box">
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索商品、需求、订单、供应商或风险" />
            <Command size={16} />
            {!!query && (
              <div className="command-results">
                {commandResults.map((target) => {
                  const Icon = target.icon;
                  return (
                    <button key={target.path} onClick={() => go(target.path)}>
                      <Icon size={15} />
                      {target.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="topbar-actions">
            <span>总部 / 华南区域 / 近 30 天</span>
            <button className="icon-button" aria-label="消息中心" onClick={() => setMessageOpen((value) => !value)}>
              <Bell size={18} />
              <b>9</b>
            </button>
            {messageOpen && (
              <div className="message-panel">
                {roleMessages.map((item) => (
                  <button key={item.title} onClick={() => go(item.path)}>
                    <span>{item.role}</span>
                    <strong>{item.title}</strong>
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>
        <div className="route-breadcrumb">
          <span>{currentModule.label}</span>
          <strong>{route.label}</strong>
        </div>
        <div className="app-viewport">{children}</div>
      </section>

      <SmartServicePanel route={route} navigate={navigate} />
      {toast && (
        <div className={`demo-toast ${toast.tone || "success"}`}>
          <strong>{toast.title || "操作反馈"}</strong>
          <span>{toast.message || "演示动作已记录"}</span>
          {toast.actionPath && (
            <button onClick={() => navigate(toast.actionPath)}>
              {toast.actionLabel || "查看相关页面"}
            </button>
          )}
        </div>
      )}
    </main>
  );
}
