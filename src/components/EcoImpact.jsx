import React from 'react';
import { Leaf, Award, BarChart3, TrendingUp } from 'lucide-react';
import { STATUS_FLOW } from '../mockData';

/**
 * Lightweight, dependency-free eco widgets for the GreenCycle UI.
 * Palette: Emerald Green (emerald-*) + Teal (teal-*) + Dark Navy (slate-900) + White.
 * Every number is derived from the existing `requests` state - no new data sources.
 */

const sumKg = (list) => list.reduce((acc, r) => acc + (r.quantityValue || 5), 0);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/** Aggregated eco metrics for a set of pickup requests. */
function getEcoMetrics(requests = []) {
  const collected = requests.filter((r) => r.status === 'Completed');
  const collectedKg = sumKg(collected);
  const categoriesRecycled = new Set(collected.map((r) => r.category)).size;
  const completionRate = requests.length
    ? Math.round((collected.length / requests.length) * 100)
    : 0;

  // Simple demo scoring: volume recycled + category spread + completion rate (0-100).
  const impactScore = clamp(
    Math.round(collectedKg * 1.5 + categoriesRecycled * 5 + completionRate * 0.3),
    0,
    100
  );

  // Rough demo estimate: ~1.5 kg CO2e avoided per kg of recycled material.
  const co2SavedKg = Math.round(collectedKg * 1.5);

  return { collected, collectedKg, categoriesRecycled, completionRate, impactScore, co2SavedKg };
}

const scoreLabel = (score) =>
  score >= 70 ? 'Excellent' : score >= 40 ? 'Good' : score > 0 ? 'Getting started' : 'Not started';

export function EcoImpactCard({ requests = [], className = '' }) {
  const { collected, collectedKg, categoriesRecycled, completionRate, impactScore, co2SavedKg } =
    getEcoMetrics(requests);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col gap-5 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Eco Impact</h3>
            <p className="text-[11px] text-slate-500">Your recycling contribution at a glance</p>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 whitespace-nowrap">
          {scoreLabel(impactScore)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:items-center">
        <div className="bg-slate-900 text-white rounded-xl p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            Total Waste Collected
          </div>
          <div className="text-3xl font-extrabold mt-1 leading-none">
            {collectedKg}
            <span className="text-base font-bold text-emerald-300"> kg</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-2">
            Across {collected.length} completed pickup{collected.length === 1 ? '' : 's'}
          </p>
        </div>

        <div>
          <div className="flex items-end justify-between gap-2">
            <span className="text-xs font-semibold text-slate-700">Environmental Impact Score</span>
            <span className="text-lg font-extrabold text-emerald-700 leading-none">
              {impactScore}
              <span className="text-[11px] text-slate-400 font-bold">/100</span>
            </span>
          </div>
          <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all"
              style={{ width: `${impactScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Based on kg recycled, category spread and completion rate.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-base font-bold text-slate-900">{categoriesRecycled}</div>
          <div className="text-[10px] text-slate-500 font-medium leading-tight">Categories recycled</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-base font-bold text-teal-700">~{co2SavedKg} kg</div>
          <div className="text-[10px] text-slate-500 font-medium leading-tight">CO&#8322;e avoided (est.)</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-base font-bold text-emerald-700">{completionRate}%</div>
          <div className="text-[10px] text-slate-500 font-medium leading-tight">Completion rate</div>
        </div>
      </div>

    </div>
  );
}

const GREEN_POINT_TIERS = [
  { name: 'Seedling', min: 0 },
  { name: 'Recycler', min: 200 },
  { name: 'Eco Champion', min: 500 },
  { name: 'Green Hero', min: 1000 },
];

/** Green Points: 50 pts per completed pickup + 5 pts per kg recycled. */
function getGreenPoints(requests = []) {
  const { collected, collectedKg } = getEcoMetrics(requests);
  return collected.length * 50 + Math.round(collectedKg * 5);
}

export function GreenPointsCard({ requests = [], className = '' }) {
  const points = getGreenPoints(requests);
  const tierIndex = GREEN_POINT_TIERS.reduce(
    (acc, tier, index) => (points >= tier.min ? index : acc),
    0
  );
  const tier = GREEN_POINT_TIERS[tierIndex];
  const nextTier = GREEN_POINT_TIERS[tierIndex + 1];
  const progress = nextTier
    ? clamp(Math.round(((points - tier.min) / (nextTier.min - tier.min)) * 100), 0, 100)
    : 100;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-300 flex items-center justify-center">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Green Points</h3>
          <p className="text-[11px] text-slate-500">Rewards for completed pickups</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="text-3xl font-extrabold text-slate-900 leading-none">
          {points}
          <span className="text-sm font-bold text-slate-500"> pts</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
          {tier.name}
        </span>
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
          <span className="font-semibold text-slate-700">
            {nextTier ? `Next tier: ${nextTier.name}` : 'Top tier unlocked'}
          </span>
          <span className="font-mono">{nextTier ? `${points}/${nextTier.min}` : `${points} pts`}</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          {nextTier
            ? `${nextTier.min - points} more points to reach ${nextTier.name}.`
            : 'Amazing work - you have reached the highest GreenCycle tier.'}
        </p>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-3">
        <TrendingUp className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
        <span>50 pts per completed pickup + 5 pts per kg recycled</span>
      </div>
    </div>
  );
}

/**
 * Waste volume by category - a dependency-free horizontal bar chart.
 * Emerald = already collected, Teal = still in the pipeline.
 */
export function CategoryImpactChart({ requests = [], className = '' }) {
  const buckets = new Map();
  requests.forEach((r) => {
    const key = r.category || 'Other';
    const entry = buckets.get(key) || { category: key, collectedKg: 0, pipelineKg: 0 };
    const kg = r.quantityValue || 5;
    if (r.status === 'Completed') entry.collectedKg += kg;
    else entry.pipelineKg += kg;
    buckets.set(key, entry);
  });

  const rows = [...buckets.values()]
    .map((d) => ({ ...d, totalKg: d.collectedKg + d.pipelineKg }))
    .sort((a, b) => b.totalKg - a.totalKg);

  const maxKg = Math.max(1, ...rows.map((d) => d.totalKg));
  const totalCollected = rows.reduce((acc, d) => acc + d.collectedKg, 0);
  const totalPipeline = rows.reduce((acc, d) => acc + d.pipelineKg, 0);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Waste by Category</h3>
            <p className="text-[11px] text-slate-500">
              {totalCollected} kg collected &middot; {totalPipeline} kg in pipeline
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" /> Collected
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2.5 h-2.5 rounded-sm bg-teal-400" /> In pipeline
          </span>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-xs text-slate-400 py-6 text-center">
          No waste records yet - book a pickup to start building your impact chart.
        </p>
      ) : (
        <div className="space-y-3.5">
          {rows.map((row) => (
            <div key={row.category}>
              <div className="flex items-center justify-between gap-2 text-[11px] mb-1.5">
                <span className="font-semibold text-slate-700">{row.category}</span>
                <span className="font-mono text-slate-500 text-right">
                  {row.collectedKg} kg collected
                  {row.pipelineKg > 0 ? ` + ${row.pipelineKg} kg pending` : ''}
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  className="h-full bg-emerald-600"
                  style={{ width: `${(row.collectedKg / maxKg) * 100}%` }}
                  title={`${row.category}: ${row.collectedKg} kg collected`}
                />
                <div
                  className="h-full bg-teal-400"
                  style={{ width: `${(row.pipelineKg / maxKg) * 100}%` }}
                  title={`${row.category}: ${row.pipelineKg} kg in pipeline`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



/** Compact 4-step pickup status indicator (Pending -> Scheduled -> In Progress -> Completed). */
export function PickupProgress({ status, showLabel = true, className = '' }) {
  const currentIndex = Math.max(0, STATUS_FLOW.indexOf(status));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="flex items-center gap-1"
        title={`${status} - step ${currentIndex + 1} of ${STATUS_FLOW.length}`}
      >
        {STATUS_FLOW.map((step, index) => {
          const isDone = index < currentIndex || (index === currentIndex && status === 'Completed');
          return (
            <span
              key={step}
              className={`h-1.5 w-6 sm:w-9 rounded-full transition-colors ${
                isDone ? 'bg-emerald-600' : index === currentIndex ? 'bg-teal-500' : 'bg-slate-200'
              }`}
            />
          );
        })}
      </div>
      {showLabel && (
        <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">
          {status} &middot; {currentIndex + 1}/{STATUS_FLOW.length}
        </span>
      )}
    </div>
  );
}
