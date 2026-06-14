import React, { useMemo, useState } from "react";
import { ArrowRight, Clock3, GitBranch, RefreshCw, RotateCcw } from "lucide-react";
import { DetailDrawer, emitDemoFeedback, MetricGrid, PageHeader, RiskAlertBar, StatusTag, StatusTimeline } from "../../components/ui.jsx";
import { integrations } from "../../data/mock/procurement.js";

function statusTone(status) {
  if (status === "已连接") return "success";
  if (status === "失败") return "danger";
  return "warning";
}

export function IntegrationOverview({ navigate }) {
  const [selected, setSelected] = useState(null);
  const [resolvedIds, setResolvedIds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const totalExceptions = useMemo(
    () => integrations.reduce((sum, item) => sum + (resolvedIds.includes(item.id) ? Math.max(item.exceptions - 1, 0) : item.exceptions), 0),
    [resolvedIds]
  );

  const refreshStatus = () => {
    setRefreshing(true);
    emitDemoFeedback({
      tone: "info",
      title: "同步状态刷新中",
      message: "已模拟拉取京东 IOP、OA、成本、物流等系统状态，不请求真实接口。"
    });
    window.setTimeout(() => setRefreshing(false), 650);
  };

  const retrySync = (item) => {
    if (!resolvedIds.includes(item.id)) setResolvedIds((current) => [...current, item.id]);
    emitDemoFeedback({
      tone: "success",
      title: `已重试：${item.name}`,
      message: `${item.impact} 相关同步已进入前端模拟恢复状态。`,
      actionLabel: "查看影响对象",
      actionPath: item.impactPath
    });
  };

  const viewImpact = (item) => {
    emitDemoFeedback({
      tone: "info",
      title: `已定位影响对象：${item.affected}`,
      message: `${item.name} 异常影响 ${item.impact}，当前仅做前端路由跳转。`
    });
    navigate?.(item.impactPath);
  };

  return (
    <section className="page-stack integration-page">
      <PageHeader
        eyebrow="电商/系统集成总览"
        title="集成支撑：每个异常都说明影响哪个业务环节"
        description="覆盖京东 IOP、其他电商、成本系统、费用系统、IDM、OA、票易通、物流、短信/邮箱；只做前端监控与处理反馈。"
        actions={
          <button className="primary-button" onClick={refreshStatus}>
            <RefreshCw size={16} className={refreshing ? "spin-icon" : ""} />
            刷新同步状态
          </button>
        }
      />
      <MetricGrid
        items={[
          { label: "纳入总览系统", value: "9", detail: "电商/成本/费用/身份/审批/发票/物流/通知" },
          { label: "今日同步", value: "12,860", detail: "商品/库存/审批/轨迹" },
          { label: "异常数", value: `${totalExceptions}`, detail: "可打开详情并模拟处理" },
          { label: "集成支撑阶段", value: "已纳入", detail: "采购运营驾驶舱第 6 段" }
        ]}
      />
      <RiskAlertBar tone="info" title="驾驶舱挂载">
        采购运营驾驶舱的“集成支撑”阶段已跳转到本页；OA、成本、物流等异常会说明影响审批、预算、履约或通知链路。
      </RiskAlertBar>

      <div className="integration-card-grid">
        {integrations.map((item) => {
          const exceptions = resolvedIds.includes(item.id) ? Math.max(item.exceptions - 1, 0) : item.exceptions;
          return (
            <article className="integration-card" key={item.id}>
              <div className="integration-card-head">
                <span>
                  <GitBranch size={16} />
                  {item.name}
                </span>
                <StatusTag tone={statusTone(exceptions === 0 && item.status !== "待接入" ? "已连接" : item.status)}>
                  {exceptions === 0 && item.status !== "待接入" ? "已恢复" : item.status}
                </StatusTag>
              </div>
              <dl>
                <div>
                  <dt>最近同步</dt>
                  <dd>{item.lastSync}</dd>
                </div>
                <div>
                  <dt>异常数</dt>
                  <dd>{exceptions}</dd>
                </div>
                <div>
                  <dt>影响业务</dt>
                  <dd>{item.impact}</dd>
                </div>
                <div>
                  <dt>健康度</dt>
                  <dd>{item.health}</dd>
                </div>
              </dl>
              <p>{item.issue}</p>
              <div className="integration-actions">
                <button onClick={() => setSelected({ ...item, exceptions })}>打开详情</button>
                <button onClick={() => retrySync(item)}>
                  <RotateCcw size={14} />
                  重试同步
                </button>
                <button onClick={() => viewImpact(item)}>
                  查看影响对象 <ArrowRight size={14} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <section className="panel integration-timeline-panel">
        <div className="integration-section-head">
          <div>
            <span className="eyebrow">同步时间线</span>
            <h2>异常如何影响采购链路</h2>
          </div>
          <Clock3 size={20} />
        </div>
        <StatusTimeline
          steps={[
            { label: "商品/库存", text: "京东 IOP 延迟会影响比价库存可信度", state: "doing" },
            { label: "成本/费用", text: "成本占用和支付回传影响审批风险说明", state: "doing" },
            { label: "OA 审批", text: "回调失败会让采购单停留审批中", state: "warning" },
            { label: "物流/通知", text: "轨迹和催办模板影响供应商协同与用户跟踪", state: "doing" }
          ]}
        />
      </section>

      <RiskAlertBar tone="info" title="边界说明">
        本页不设计鉴权、字段映射、真实接口、数据库、同步日志后台或集成异常处理台；所有动作只做前端 Toast、状态变化、抽屉和已有页面跳转。
      </RiskAlertBar>

      <DetailDrawer
        open={!!selected}
        title={selected?.name || "集成异常"}
        subtitle={selected ? `${selected.status} / 影响 ${selected.impact}` : ""}
        onClose={() => setSelected(null)}
        actions={
          selected && (
            <>
              <button className="primary-button" onClick={() => retrySync(selected)}>
                重试同步
              </button>
              <button onClick={() => viewImpact(selected)}>查看影响对象</button>
            </>
          )
        }
      >
        {selected && (
          <>
            <div className="integration-detail-grid">
              <span><small>失败原因</small><b>{selected.reason}</b></span>
              <span><small>影响订单/商品/审批/物流</small><b>{selected.affected}</b></span>
              <span><small>建议处理</small><b>{selected.suggestion}</b></span>
              <span><small>最近同步时间</small><b>{selected.lastSync}</b></span>
            </div>
            <RiskAlertBar tone={selected.exceptions > 0 ? "warning" : "success"} title="模拟处理状态">
              {selected.exceptions > 0 ? "异常仍在队列中，可点击重试同步模拟恢复。" : "该系统异常数已减少，前端状态已更新。"}
            </RiskAlertBar>
          </>
        )}
      </DetailDrawer>
    </section>
  );
}
