import React, { useMemo, useState } from "react";
import { AlertTriangle, Bot, CheckCircle2, ChevronRight, Circle, Headphones, Info, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { createFreeformAnswer, getSmartServiceContext } from "../data/mock/smartService.js";

export function emitDemoFeedback(message = "演示动作已记录") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("demo-feedback", { detail: { message } }));
}

export function DemoActionButton({ children, message, onClick, className = "", ...props }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented) emitDemoFeedback(message || `${String(children).replace(/\[object Object\]/g, "").trim() || "操作"}已进入演示状态`);
  };
  return (
    <button className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export function StatusTag({ children, tone = "neutral" }) {
  return <span className={`status-tag ${tone}`}>{children}</span>;
}

export function RiskAlertBar({ tone = "warning", title, children, action }) {
  const [handled, setHandled] = useState(false);
  const Icon = tone === "success" ? CheckCircle2 : tone === "info" ? Info : AlertTriangle;
  return (
    <div className={`risk-alert ${tone}`}>
      <Icon size={18} />
      <div>
        <strong>{title}</strong>
        {children && <span>{children}</span>}
      </div>
      {action && (
        <button
          onClick={() => {
            setHandled(true);
            emitDemoFeedback(`${action}：已生成演示处理记录`);
          }}
        >
          {handled ? "已处理" : action}
        </button>
      )}
    </div>
  );
}

export function AiSuggestionCard({
  type = "建议",
  title,
  businessObject,
  judgment,
  evidence = [],
  basis = [],
  action = "采纳建议",
  secondaryAction,
  confidence = "高",
  lowConfidenceReasons = [],
  onPrimaryAction,
  onSecondaryAction
}) {
  const [state, setState] = useState("ready");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const basisItems = basis.length ? basis : evidence.map((item) => ({ label: "判断依据", value: item }));
  return (
    <>
      <article className={`ai-card ${state}`}>
        <div className="ai-card-head">
          <span>
            <Bot size={16} />
            {type}
          </span>
          <StatusTag tone={state === "accepted" ? "success" : state === "rejected" || confidence === "需确认" ? "warning" : "success"}>
            {state === "accepted" ? "已采纳" : state === "rejected" ? "已驳回" : `置信度 ${confidence}`}
          </StatusTag>
        </div>
        <h3>{title}</h3>
        {(businessObject || judgment) && (
          <div className="ai-card-meta">
            {businessObject && (
              <span>
                <small>业务对象</small>
                <b>{businessObject}</b>
              </span>
            )}
            {judgment && (
              <span>
                <small>AI 判断</small>
                <b>{judgment}</b>
              </span>
            )}
          </div>
        )}
        <ul>
          {evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="ai-card-actions">
          <button
            className="primary-button"
            onClick={() => {
              setState("accepted");
              onPrimaryAction?.();
              emitDemoFeedback(`${action}：AI 建议已采纳`);
            }}
          >
            {state === "accepted" ? "已采纳" : action}
          </button>
          <button
            className="text-button"
            onClick={() => {
              setDrawerOpen(true);
              emitDemoFeedback(`已展开依据：${evidence.slice(0, 2).join("；") || "查看 AI 判断来源"}`);
            }}
          >
            查看依据
          </button>
          <button
            className="text-button"
            onClick={() => {
              setState("rejected");
              onSecondaryAction?.();
              emitDemoFeedback(`${secondaryAction || "驳回建议"}：已保留人工复核状态`);
            }}
          >
            {secondaryAction || "驳回"}
          </button>
        </div>
      </article>
      <DetailDrawer
        open={drawerOpen}
        title={title}
        subtitle={`${businessObject || "当前业务对象"} / 置信度 ${confidence}`}
        onClose={() => setDrawerOpen(false)}
        actions={
          <>
            <button
              className="primary-button"
              onClick={() => {
                setState("accepted");
                setDrawerOpen(false);
                emitDemoFeedback(`${action}：已从解释抽屉采纳`);
              }}
            >
              {action}
            </button>
            <button
              onClick={() => {
                setState("rejected");
                setDrawerOpen(false);
                emitDemoFeedback("AI 建议已驳回，保留人工复核记录");
              }}
            >
              驳回建议
            </button>
          </>
        }
      >
        <div className="ai-explain-grid">
          {basisItems.map((item) => (
            <span key={`${item.label}-${item.value}`}>
              <small>{item.label}</small>
              <b>{item.value}</b>
            </span>
          ))}
        </div>
        {!!lowConfidenceReasons.length && (
          <RiskAlertBar tone="warning" title="低置信原因">
            {lowConfidenceReasons.join("；")}
          </RiskAlertBar>
        )}
      </DetailDrawer>
    </>
  );
}

export function MetricGrid({ items }) {
  return (
    <div className="metric-grid">
      {items.map((item) => (
        <article className="metric-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <small>{item.detail}</small>
        </article>
      ))}
    </div>
  );
}

export function FilterToolbar({ tabs = [], active, onChange, extra }) {
  return (
    <div className="filter-toolbar">
      <div className="segmented">
        {tabs.map((tab) => (
          <button className={active === tab ? "active" : ""} key={tab} onClick={() => onChange?.(tab)}>
            {tab}
          </button>
        ))}
      </div>
      {extra && <div className="toolbar-extra">{extra}</div>}
    </div>
  );
}

export function DataTable({ columns, rows, onOpen }) {
  return (
    <div className="data-table" role="table" style={{ "--cols": columns.length }}>
      <div className="table-row table-head" role="row">
        {columns.map((column) => (
          <span key={column.key} role="columnheader">
            {column.label}
          </span>
        ))}
        <span role="columnheader">动作</span>
      </div>
      {rows.map((row, index) => (
        <button
          className="table-row"
          key={row.id || row.title || row.name || `${columns[0]?.key || "row"}-${row[columns[0]?.key]}-${index}`}
          onClick={() => (onOpen ? onOpen(row) : emitDemoFeedback(`已定位：${row.title || row.name || row.id || "当前对象"} 的详情`))}
          role="row"
        >
          {columns.map((column) => (
            <span key={column.key} role="cell">
              {column.render ? column.render(row[column.key], row) : row[column.key]}
            </span>
          ))}
          <span className="row-link" role="cell">
            详情 <ChevronRight size={15} />
          </span>
        </button>
      ))}
    </div>
  );
}

export function DetailDrawer({ open, title, subtitle, children, onClose, actions }) {
  return (
    <aside className={`detail-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="drawer-panel">
        <header>
          <div>
            <span className="eyebrow">详情抽屉</span>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="icon-button" onClick={onClose} aria-label="关闭详情">
            <X size={18} />
          </button>
        </header>
        <div className="drawer-body">{children}</div>
        {actions && <footer>{actions}</footer>}
      </div>
    </aside>
  );
}

export function StatusTimeline({ steps }) {
  return (
    <div className="timeline">
      {steps.map((step) => (
        <div className={`timeline-step ${step.state}`} key={step.label}>
          <Circle size={12} />
          <div>
            <strong>{step.label}</strong>
            <span>{step.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function emitSmartServiceFeedback(detail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("demo-feedback", { detail }));
}

export function SmartServicePanel({ route, navigate }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const context = useMemo(() => getSmartServiceContext(route), [route]);
  const [messages, setMessages] = useState([]);

  const ask = (item) => {
    setMessages((current) => [...current, item]);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    ask(createFreeformAnswer(draft, route));
    setDraft("");
  };

  const jumpTo = (path) => {
    navigate(path);
    setOpen(false);
    emitSmartServiceFeedback({
      tone: "info",
      title: "已为你打开相关页面",
      message: "智能客服仅执行前端路由跳转，不创建后台工单。"
    });
  };

  const createTicket = () => {
    emitSmartServiceFeedback({
      tone: "warning",
      title: "已记录转人工请求",
      message: "当前为 V1.5 前端轻量提示，不进入完整客服后台或真实工单流。",
      actionLabel: "查看需求池",
      actionPath: "/buyer/demands"
    });
  };

  const lastMessages = messages.slice(-3);

  return (
    <section className={`smart-service ${open ? "open" : ""}`} aria-label="全局智能客服">
      {open && (
        <div className="smart-service-panel" role="dialog" aria-modal="false" aria-label="智能客服面板">
          <header className="smart-service-head">
            <div>
              <span>
                <Sparkles size={14} />
                {context.title}
              </span>
              <strong>业务助手 / 操作引导 / 当前页面问题推荐</strong>
              <small>{context.context}</small>
            </div>
            <button className="icon-button" onClick={() => setOpen(false)} aria-label="关闭智能客服">
              <X size={18} />
            </button>
          </header>

          <div className="smart-question-list">
            {context.questions.map((item) => (
              <button key={item.question} onClick={() => ask(item)}>
                <span>{item.type}</span>
                <strong>{item.question}</strong>
              </button>
            ))}
          </div>

          <div className="smart-answer-stream" aria-live="polite">
            {lastMessages.length === 0 ? (
              <div className="smart-empty">
                <Bot size={18} />
                <span>选择一个推荐问题，或直接输入你的业务问题。</span>
              </div>
            ) : (
              lastMessages.map((item, index) => (
                <article className="smart-answer" key={`${item.question}-${index}`}>
                  <div>
                    <span className="smart-answer-type">{item.type}</span>
                    <strong>{item.question}</strong>
                  </div>
                  <p>{item.answer}</p>
                  {!!item.actions?.length && (
                    <div className="smart-answer-actions">
                      {item.actions.map((action) => (
                        <button key={`${item.question}-${action.path}`} onClick={() => jumpTo(action.path)}>
                          {action.label}
                          <ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </article>
              ))
            )}
          </div>

          <form className="smart-service-input" onSubmit={submit}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="输入问题，例如：这个预警为什么出现？" />
            <button type="submit" aria-label="发送问题">
              <Send size={16} />
            </button>
          </form>

          <button className="smart-human-entry" onClick={createTicket}>
            <Headphones size={16} />
            转人工 / 创建工单
          </button>
        </div>
      )}
      <button className="smart-service-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="打开智能客服">
        <MessageCircle size={22} />
        <span>智能客服</span>
      </button>
    </section>
  );
}
