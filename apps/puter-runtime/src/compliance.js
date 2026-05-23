/*
 * Puter runtime compliance report scaffold.
 *
 * Compliance is graph-driven. This module should read backend graph state
 * once the graph API is operational.
 */

export const complianceLevels = {
  scaffolded: {
    id: 'level.0.scaffolded',
    requirements: ['docs_exist', 'graph_exists', 'parser_exists'],
  },
  operational: {
    id: 'level.1.operational',
    requirements: [
      'webhook_receives_commands',
      'comments_are_published',
      'policy_is_enforced',
      'command_runs_are_persisted',
    ],
  },
  autonomousSafe: {
    id: 'level.2.autonomous_safe',
    requirements: [
      'ci_diagnostics_work',
      'pr_review_works',
      'merge_conflict_assist_works',
      'safe_fixes_open_prs',
      'audit_logs_complete',
    ],
  },
  ecosystemNative: {
    id: 'level.3.ecosystem_native',
    requirements: [
      'backend_database_source_of_truth',
      'graph_sync_operational',
      'memory_store_operational',
      'puter_runtime_operational',
      'marketplace_ready',
      'docker_extension_ready',
    ],
  },
};

export function generateComplianceReport(signals = {}) {
  return Object.values(complianceLevels).map((level) => {
    const passed = level.requirements.filter((requirement) => Boolean(signals[requirement]));
    const missing = level.requirements.filter((requirement) => !signals[requirement]);

    return {
      level: level.id,
      passed,
      missing,
      complete: missing.length === 0,
    };
  });
}
