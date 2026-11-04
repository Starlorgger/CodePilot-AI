import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Code2, 
  FileCheck, 
  Filter, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  FileJson
} from 'lucide-react';
import { UnitTestSummaryReport, UnitTestResult, UnitTestStatus } from '../types/project';

interface UnitTestCoverageReportProps {
  report?: UnitTestSummaryReport;
  onDownloadJson?: () => void;
}

export const UnitTestCoverageReport: React.FC<UnitTestCoverageReportProps> = ({ 
  report,
  onDownloadJson
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | UnitTestStatus>('all');
  const [expandedTestId, setExpandedTestId] = useState<string | null>(null);

  if (!report) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-3">
        <Activity className="w-8 h-8 text-indigo-400 mx-auto animate-pulse" />
        <h4 className="text-sm font-bold text-white">Unit Test Runner Standing By</h4>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Click "Run Diagnostics" above to execute automated unit test suites against your application's generated code and evaluate code coverage.
        </p>
      </div>
    );
  }

  const { coverage, tests, totalTests, passed, failed, unverified, durationTotalMs, unverifiedFeatures } = report;

  const filteredTests = tests.filter(test => {
    if (statusFilter === 'all') return true;
    return test.status === statusFilter;
  });

  const getMetricColor = (pct: number) => {
    if (pct >= 85) return 'text-emerald-400 bg-emerald-500';
    if (pct >= 70) return 'text-amber-400 bg-amber-500';
    return 'text-rose-400 bg-rose-500';
  };

  const getStatusBadge = (status: UnitTestStatus) => {
    switch (status) {
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Passed
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        );
      case 'unverified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-3 h-3" /> Unverified (External)
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      {/* Top Banner: Test Health & Timing */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FileCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Automated Unit Test & Coverage Report
              </h3>
              <p className="text-xs text-slate-400">
                Live test assertions evaluated in {durationTotalMs}ms across state, navigation, DOM binding, and validation.
              </p>
            </div>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-[10px] font-bold uppercase text-slate-400">Tests</div>
            <div className="text-sm font-extrabold text-white">{totalTests}</div>
          </div>
          <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-[10px] font-bold uppercase text-emerald-400">Passed</div>
            <div className="text-sm font-extrabold text-emerald-400">{passed}</div>
          </div>
          {failed > 0 && (
            <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <div className="text-[10px] font-bold uppercase text-rose-400">Failed</div>
              <div className="text-sm font-extrabold text-rose-400">{failed}</div>
            </div>
          )}
          <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <div className="text-[10px] font-bold uppercase text-amber-400">Unverified</div>
            <div className="text-sm font-extrabold text-amber-400">{unverified}</div>
          </div>
          <div className="px-3.5 py-2 bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 rounded-xl text-center shadow-inner">
            <div className="text-[10px] font-bold uppercase text-indigo-300">Coverage</div>
            <div className="text-sm font-black text-indigo-200">{coverage.overallPercentage}%</div>
          </div>
        </div>
      </div>

      {/* Visual Unit Test Coverage Percentage & Prominent Progress Bar */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Unit Test Coverage Percentage
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                coverage.overallPercentage >= 85 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : coverage.overallPercentage >= 70 
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {coverage.overallPercentage >= 85 ? 'High Coverage (Ready)' : coverage.overallPercentage >= 70 ? 'Moderate Coverage' : 'Low Coverage'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Evaluates execution branches, interactive DOM click paths, form state persistence, and AST statement coverage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                {coverage.overallPercentage}%
              </span>
              <span className="text-[10px] text-slate-500 block uppercase font-semibold">Total Verified Coverage</span>
            </div>

            {onDownloadJson && (
              <button
                onClick={onDownloadJson}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-sm"
                title="Download full test coverage and health report as JSON"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span>Export JSON</span>
              </button>
            )}
          </div>
        </div>

        {/* The Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-900 h-4 rounded-full p-0.5 border border-slate-800 overflow-hidden shadow-inner relative">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                coverage.overallPercentage >= 85
                  ? 'bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500 shadow-lg shadow-emerald-500/20'
                  : coverage.overallPercentage >= 70
                  ? 'bg-gradient-to-r from-amber-500 to-emerald-400 shadow-lg shadow-amber-500/20'
                  : 'bg-gradient-to-r from-rose-500 to-amber-500 shadow-lg shadow-rose-500/20'
              }`}
              style={{ width: `${Math.max(coverage.overallPercentage, 2)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono px-0.5">
            <span>0% (Untested)</span>
            <span>25%</span>
            <span className="text-indigo-400/90 font-bold">50% (Standard)</span>
            <span>75%</span>
            <span className="text-emerald-400/90 font-bold">100% (Full Verification)</span>
          </div>
        </div>
      </div>

      {/* 4 Coverage Metrics Bar Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            Code Coverage Breakdown
          </span>
          <span className="text-[11px] text-slate-400">Calculated across verified script AST execution paths</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Statements */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Statements</span>
              <span className={`font-black ${getMetricColor(coverage.statements.percentage).split(' ')[0]}`}>
                {coverage.statements.percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getMetricColor(coverage.statements.percentage).split(' ')[1]} transition-all duration-500`}
                style={{ width: `${coverage.statements.percentage}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500">
              {coverage.statements.covered} of {coverage.statements.total} executed
            </div>
          </div>

          {/* Branches */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Branches</span>
              <span className={`font-black ${getMetricColor(coverage.branches.percentage).split(' ')[0]}`}>
                {coverage.branches.percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getMetricColor(coverage.branches.percentage).split(' ')[1]} transition-all duration-500`}
                style={{ width: `${coverage.branches.percentage}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500">
              {coverage.branches.covered} of {coverage.branches.total} paths tested
            </div>
          </div>

          {/* Functions */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Functions</span>
              <span className={`font-black ${getMetricColor(coverage.functions.percentage).split(' ')[0]}`}>
                {coverage.functions.percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getMetricColor(coverage.functions.percentage).split(' ')[1]} transition-all duration-500`}
                style={{ width: `${coverage.functions.percentage}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500">
              {coverage.functions.covered} of {coverage.functions.total} declared
            </div>
          </div>

          {/* Lines */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Executable Lines</span>
              <span className={`font-black ${getMetricColor(coverage.lines.percentage).split(' ')[0]}`}>
                {coverage.lines.percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getMetricColor(coverage.lines.percentage).split(' ')[1]} transition-all duration-500`}
                style={{ width: `${coverage.lines.percentage}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-500">
              {coverage.lines.covered} of {coverage.lines.total} covered
            </div>
          </div>
        </div>
      </div>

      {/* Test Filter Tabs */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            Executed Test Cases & Verification Evidence
          </span>

          <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                statusFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({totalTests})
            </button>
            <button
              onClick={() => setStatusFilter('passed')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                statusFilter === 'passed' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Passed ({passed})
            </button>
            {failed > 0 && (
              <button
                onClick={() => setStatusFilter('failed')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  statusFilter === 'failed' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Failed ({failed})
              </button>
            )}
            <button
              onClick={() => setStatusFilter('unverified')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                statusFilter === 'unverified' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Unverified ({unverified})
            </button>
          </div>
        </div>

        {/* Test List Accordion */}
        <div className="space-y-2">
          {filteredTests.map((test) => {
            const isExpanded = expandedTestId === test.id;
            return (
              <div
                key={test.id}
                className="bg-slate-950/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all hover:border-slate-700"
              >
                <div
                  onClick={() => setExpandedTestId(isExpanded ? null : test.id)}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400/90 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {test.suite}
                      </span>
                      <span className="text-xs font-bold text-white">{test.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-1">
                      {test.assertion}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {test.durationMs}ms
                    </span>
                    {getStatusBadge(test.status)}
                    <button className="text-slate-500 hover:text-slate-300 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 bg-slate-900/40 space-y-2.5 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Assertion Requirement</span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{test.assertion}</p>
                    </div>

                    {test.evidence && (
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                        <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1 mb-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified Evidence
                        </span>
                        <p className="text-[11px] text-slate-300 font-mono leading-relaxed">{test.evidence}</p>
                      </div>
                    )}

                    {test.errorDetails && (
                      <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-3 text-rose-300">
                        <span className="text-[10px] font-bold uppercase text-rose-400 flex items-center gap-1 mb-1">
                          <XCircle className="w-3 h-3" /> Failure Cause & Fix Recommendation
                        </span>
                        <p className="text-[11px] leading-relaxed">{test.errorDetails}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explicit Unverified External Features Section */}
      {unverifiedFeatures && unverifiedFeatures.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4.5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              Unverified Features (Production Scope Boundaries)
            </h4>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Evidence Guaranteed
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            In accordance with our strict verification principles, CodePilot AI never fabricates test results or claims external production systems are live without real API credentials.
          </p>
          <div className="space-y-2">
            {unverifiedFeatures.map((item, idx) => (
              <div key={idx} className="bg-slate-950/90 border border-amber-500/20 rounded-xl p-3 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-200">{item.feature}</span>
                  <span className="text-[10px] text-amber-400/80 uppercase font-mono">Requires Config</span>
                </div>
                <p className="text-slate-400 text-[11px]">{item.reason}</p>
                <div className="text-[10px] text-indigo-400 font-mono mt-1">
                  Required in production: {item.externalRequirement}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
