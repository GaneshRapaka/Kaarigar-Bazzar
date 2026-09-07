import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  LineChart,
  Volume2,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Eye,
  IndianRupee,
  Calendar,
  Layers,
} from 'lucide-react';
import { MOCK_ANALYTICS, MOCK_CRAFT_SHARES } from '../../data/mockData';
import { AnalyticsDataPoint } from '../../types';

type TimeRange = 'week' | 'month' | 'year';
type MetricType = 'earnings' | 'orders' | 'views';
type ChartStyle = 'curve' | 'bars';

export const EarningsAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [metric, setMetric] = useState<MetricType>('earnings');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('curve');
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(6); // Default to latest / peak
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLang, setAudioLang] = useState<'te' | 'en'>('te');

  const currentData = MOCK_ANALYTICS[timeRange];
  const points = currentData.points;
  const activePoint: AnalyticsDataPoint = points[Math.min(selectedPointIndex, points.length - 1)] || points[0];

  // Helper to format values
  const formatValue = (val: number, type: MetricType) => {
    if (type === 'earnings') return `₹${val.toLocaleString('en-IN')}`;
    if (type === 'orders') return `${val} ${val === 1 ? 'order' : 'orders'}`;
    return `${val} views`;
  };

  const getMetricValue = (p: AnalyticsDataPoint, type: MetricType) => {
    if (type === 'earnings') return p.earnings;
    if (type === 'orders') return p.orders;
    return p.views;
  };

  // Color scheme based on metric (Warm Artisan Palette)
  const themeColors = {
    earnings: {
      stroke: '#C85A32', // Terracotta
      fillStart: 'rgba(200, 90, 50, 0.25)',
      fillEnd: 'rgba(200, 90, 50, 0.01)',
      barColor: '#C85A32',
      badgeBg: 'bg-terracotta/10',
      badgeText: 'text-terracotta',
      activeTab: 'bg-terracotta text-white shadow-sm',
    },
    orders: {
      stroke: '#2E7D32', // Forest Green
      fillStart: 'rgba(46, 125, 50, 0.25)',
      fillEnd: 'rgba(46, 125, 50, 0.01)',
      barColor: '#2E7D32',
      badgeBg: 'bg-forest-light',
      badgeText: 'text-forest',
      activeTab: 'bg-forest text-white shadow-sm',
    },
    views: {
      stroke: '#D97706', // Warm Amber
      fillStart: 'rgba(217, 119, 6, 0.25)',
      fillEnd: 'rgba(217, 119, 6, 0.01)',
      barColor: '#D97706',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-800',
      activeTab: 'bg-amber-600 text-white shadow-sm',
    },
  }[metric];

  // Graph SVG dimensions and coordinates calculation
  const svgWidth = 320;
  const svgHeight = 150;
  const padLeft = 32;
  const padRight = 14;
  const padTop = 16;
  const padBottom = 26;

  const chartInnerWidth = svgWidth - padLeft - padRight;
  const chartInnerHeight = svgHeight - padTop - padBottom;

  const rawValues = points.map((p) => getMetricValue(p, metric));
  const maxRawValue = Math.max(...rawValues, 1);
  // Round up max for clean ceiling
  const yMax =
    metric === 'earnings'
      ? Math.ceil(maxRawValue / 500) * 500 || 500
      : metric === 'orders'
      ? Math.max(Math.ceil(maxRawValue * 1.25), 4)
      : Math.ceil(maxRawValue / 100) * 100 || 100;

  // Compute (x, y) coordinates for each point
  const coords = points.map((p, i) => {
    const x =
      points.length === 1
        ? padLeft + chartInnerWidth / 2
        : padLeft + (i / (points.length - 1)) * chartInnerWidth;
    const val = getMetricValue(p, metric);
    const y = padTop + chartInnerHeight - (val / yMax) * chartInnerHeight;
    return { x, y, point: p, index: i, val };
  });

  // Generate SVG path string with smooth Bézier curves
  const createSmoothPath = (coordinates: { x: number; y: number }[]) => {
    if (coordinates.length === 0) return '';
    if (coordinates.length === 1) return `M ${coordinates[0].x} ${coordinates[0].y}`;

    let path = `M ${coordinates[0].x} ${coordinates[0].y}`;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const p0 = coordinates[i === 0 ? i : i - 1];
      const p1 = coordinates[i];
      const p2 = coordinates[i + 1];
      const p3 = coordinates[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = createSmoothPath(coords);
  const areaPath = `${linePath} L ${coords[coords.length - 1]?.x || 0} ${padTop + chartInnerHeight} L ${coords[0]?.x || 0} ${padTop + chartInnerHeight} Z`;

  // Grid tick levels
  const yTicks = [0, 0.5, 1];

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-artisan-text uppercase tracking-wider">
                Sales Analytics
              </h3>
              <span className="text-[10px] font-bold text-terracotta bg-terracotta/10 px-1.5 py-0.5 rounded-md font-telugu">
                విశ్లేషణ
              </span>
            </div>
            <p className="text-[11px] text-artisan-muted">Track orders, growth & peak sales</p>
          </div>
        </div>

        {/* Chart Style Switcher (Curve vs Bar) */}
        <div className="flex items-center bg-[#FAF7F2] p-0.5 rounded-xl border border-artisan-border">
          <button
            onClick={() => setChartStyle('curve')}
            title="Line Trend"
            className={`p-1.5 rounded-lg transition ${
              chartStyle === 'curve' ? 'bg-white shadow-sm text-terracotta border border-terracotta/30' : 'text-artisan-muted hover:text-artisan-text'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setChartStyle('bars')}
            title="Bar Chart"
            className={`p-1.5 rounded-lg transition ${
              chartStyle === 'bars' ? 'bg-white shadow-sm text-terracotta border border-terracotta/30' : 'text-artisan-muted hover:text-artisan-text'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex p-1 bg-[#FAF7F2] rounded-2xl border border-artisan-border">
        {(
          [
            { id: 'week', label: 'This Week', telugu: 'ఈ వారం' },
            { id: 'month', label: 'This Month', telugu: 'ఈ నెల' },
            { id: 'year', label: 'Past 6 Months', telugu: '6 నెలలు' },
          ] as const
        ).map((tab) => {
          const isActive = timeRange === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setTimeRange(tab.id);
                setSelectedPointIndex(tab.id === 'week' ? 6 : tab.id === 'month' ? 3 : 5);
              }}
              className={`flex-1 py-1.5 text-center rounded-xl font-bold transition text-[11px] ${
                isActive
                  ? 'bg-white text-terracotta shadow-sm border border-terracotta/30'
                  : 'text-artisan-muted hover:text-artisan-text'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Metric Selector Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        <button
          onClick={() => setMetric('earnings')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
            metric === 'earnings'
              ? themeColors.activeTab
              : 'bg-[#FAF7F2] text-artisan-muted hover:bg-neutral-100 border border-artisan-border'
          }`}
        >
          <IndianRupee className="w-3 h-3" />
          <span>Earnings</span>
          <span className="text-[10px] opacity-80">({formatValue(currentData.summary.totalEarnings, 'earnings')})</span>
        </button>

        <button
          onClick={() => setMetric('orders')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
            metric === 'orders'
              ? themeColors.activeTab
              : 'bg-[#FAF7F2] text-artisan-muted hover:bg-neutral-100 border border-artisan-border'
          }`}
        >
          <ShoppingBag className="w-3 h-3" />
          <span>Orders</span>
          <span className="text-[10px] opacity-80">({currentData.summary.totalOrders})</span>
        </button>

        <button
          onClick={() => setMetric('views')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
            metric === 'views'
              ? themeColors.activeTab
              : 'bg-[#FAF7F2] text-artisan-muted hover:bg-neutral-100 border border-artisan-border'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Views</span>
          <span className="text-[10px] opacity-80">({currentData.summary.totalViews})</span>
        </button>
      </div>

      {/* Chart Canvas */}
      <div className="relative pt-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-44 overflow-visible touch-none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={themeColors.stroke} stopOpacity="0.25" />
              <stop offset="100%" stopColor={themeColors.stroke} stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={themeColors.barColor} stopOpacity="0.95" />
              <stop offset="100%" stopColor={themeColors.barColor} stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y-axis labels */}
          {yTicks.map((tickRatio, idx) => {
            const y = padTop + chartInnerHeight * (1 - tickRatio);
            const labelVal = Math.round(yMax * tickRatio);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke="#E8DEC9"
                  strokeWidth="1"
                  strokeDasharray={tickRatio === 0 ? 'none' : '3,3'}
                />
                <text
                  x={padLeft - 4}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="#8D8177"
                  fontWeight="600"
                >
                  {metric === 'earnings'
                    ? labelVal >= 1000
                      ? `₹${(labelVal / 1000).toFixed(labelVal % 1000 === 0 ? 0 : 1)}k`
                      : `₹${labelVal}`
                    : labelVal}
                </text>
              </g>
            );
          })}

          {/* Curve Area & Line */}
          {chartStyle === 'curve' && (
            <>
              <path d={areaPath} fill="url(#areaGradient)" />
              <path
                d={linePath}
                fill="none"
                stroke={themeColors.stroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Bar Chart Representation */}
          {chartStyle === 'bars' &&
            coords.map((c) => {
              const barWidth = Math.max(14, Math.min(26, (chartInnerWidth / points.length) * 0.55));
              const barHeight = Math.max(3, (c.val / yMax) * chartInnerHeight);
              const barX = c.x - barWidth / 2;
              const barY = padTop + chartInnerHeight - barHeight;
              const isSelected = selectedPointIndex === c.index;

              return (
                <g
                  key={`bar-${c.index}`}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedPointIndex(c.index)}
                >
                  {/* Invisible touch target */}
                  <rect
                    x={c.x - (chartInnerWidth / points.length) / 2}
                    y={padTop}
                    width={chartInnerWidth / points.length}
                    height={chartInnerHeight}
                    fill="transparent"
                  />
                  {/* Bar */}
                  <rect
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill="url(#barGradient)"
                    opacity={isSelected ? 1 : 0.75}
                    className="transition-opacity hover:opacity-100"
                  />
                  {isSelected && (
                    <rect
                      x={barX - 1.5}
                      y={barY - 1.5}
                      width={barWidth + 3}
                      height={barHeight + 3}
                      rx="5"
                      fill="none"
                      stroke={themeColors.stroke}
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              );
            })}

          {/* Interactive Dots for Curve View */}
          {chartStyle === 'curve' &&
            coords.map((c) => {
              const isSelected = selectedPointIndex === c.index;
              return (
                <g
                  key={`dot-${c.index}`}
                  className="cursor-pointer"
                  onClick={() => setSelectedPointIndex(c.index)}
                >
                  {/* Expanded invisible touch hit-area */}
                  <circle cx={c.x} cy={c.y} r="14" fill="transparent" />

                  {/* Active highlight halo */}
                  {isSelected && (
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="9"
                      fill={themeColors.stroke}
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer dot border */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={isSelected ? '5.5' : '3.5'}
                    fill="#FFFFFF"
                    stroke={themeColors.stroke}
                    strokeWidth={isSelected ? '2.5' : '2'}
                  />

                  {/* Inner center dot when selected */}
                  {isSelected && (
                    <circle cx={c.x} cy={c.y} r="2.5" fill={themeColors.stroke} />
                  )}
                </g>
              );
            })}

          {/* X-Axis Labels */}
          {coords.map((c) => {
            const isSelected = selectedPointIndex === c.index;
            return (
              <text
                key={`label-${c.index}`}
                x={c.x}
                y={svgHeight - 6}
                textAnchor="middle"
                fontSize={isSelected ? '10' : '9.5'}
                fontWeight={isSelected ? '800' : '500'}
                fill={isSelected ? '#C85A32' : '#8D8177'}
                className="cursor-pointer select-none"
                onClick={() => setSelectedPointIndex(c.index)}
              >
                {c.point.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Interactive Tooltip Card for Selected Point */}
      <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-artisan-border space-y-1.5 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-artisan-muted flex items-center gap-1">
            <Calendar className="w-3 h-3 text-terracotta" />
            {activePoint.fullDate}
          </span>
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${themeColors.badgeBg} ${themeColors.badgeText} border border-current/20`}>
            Tap graph to inspect
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-0.5">
          <div>
            <div className="text-xl font-black text-artisan-text">
              {formatValue(getMetricValue(activePoint, metric), metric)}
            </div>
            <div className="text-[11px] text-artisan-muted">
              {activePoint.orders} {activePoint.orders === 1 ? 'order' : 'orders'} • {activePoint.views} views
            </div>
          </div>

          {activePoint.topProduct && (
            <div className="text-right">
              <span className="text-[10px] font-semibold text-artisan-muted block">Top Seller</span>
              <span className="text-xs font-bold text-terracotta block">
                {activePoint.topProduct}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* KPI Performance Badges */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-artisan-border space-y-0.5">
          <span className="text-[10px] font-bold text-artisan-muted block leading-tight">
            Growth Trend
          </span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-forest" />
            <span className="text-xs font-extrabold text-forest">
              +{currentData.summary.growthPercent}%
            </span>
          </div>
        </div>

        <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-artisan-border space-y-0.5">
          <span className="text-[10px] font-bold text-artisan-muted block leading-tight">
            Peak Sales
          </span>
          <span className="text-xs font-extrabold text-artisan-text block truncate">
            {currentData.summary.peakDay}
          </span>
          <span className="text-[10px] font-semibold text-terracotta block">
            {currentData.summary.peakValue}
          </span>
        </div>

        <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-artisan-border space-y-0.5">
          <span className="text-[10px] font-bold text-artisan-muted block leading-tight">
            Average Rate
          </span>
          <span className="text-xs font-extrabold text-artisan-text block">
            {currentData.summary.avgDaily}
          </span>
        </div>
      </div>

      {/* Audio Sahayak / Voice Insight Banner */}
      <div className="bg-[#FFF9F6] p-3 rounded-2xl border border-terracotta/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-artisan-text flex items-center gap-1.5">
                <span>Voice Summary</span>
                <span className="text-[10px] text-terracotta font-telugu font-semibold">వాయిస్ సారాంశం</span>
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setAudioLang(audioLang === 'te' ? 'en' : 'te')}
              className="text-[10px] font-bold text-artisan-muted hover:text-artisan-text px-2 py-0.5 rounded-md bg-white border border-artisan-border"
            >
              {audioLang === 'te' ? 'English' : 'తెలుగు'}
            </button>
            <button
              onClick={handleToggleAudio}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition shadow-sm ${
                isPlayingAudio
                  ? 'bg-terracotta text-white shadow-craft animate-pulse'
                  : 'bg-white text-terracotta border border-artisan-border hover:bg-terracotta/10'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Audio speech text bubble */}
        <div className="bg-white p-2.5 rounded-xl border border-terracotta/20 text-xs text-artisan-text space-y-1 shadow-soft">
          <p className="leading-relaxed font-medium">
            {audioLang === 'te'
              ? currentData.summary.voiceInsightTe
              : currentData.summary.voiceInsightEn}
          </p>
          {isPlayingAudio && (
            <div className="flex items-center gap-1 pt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-forest animate-ping" />
              <span className="text-[10px] font-semibold text-forest">
                {audioLang === 'te' ? 'వాయిస్ చదువుతోంది...' : 'Audio Assistant playing...'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Top Performing Crafts Revenue Breakdown */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-artisan-muted" />
            <h4 className="text-xs font-bold text-artisan-text">Revenue by Craft</h4>
          </div>
          <span className="text-[11px] font-semibold text-artisan-muted">Share of Sales</span>
        </div>

        <div className="space-y-2">
          {MOCK_CRAFT_SHARES.map((craft) => (
            <div key={craft.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-artisan-text">{craft.name}</span>
                  <span className="text-[10px] text-artisan-muted ml-1.5 font-telugu">({craft.teluguName})</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-artisan-text">₹{craft.revenue.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-artisan-muted ml-1">({craft.percentage}%)</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden border border-artisan-border/60">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${craft.percentage}%`,
                    backgroundColor: craft.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
