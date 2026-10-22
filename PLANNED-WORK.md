# Planned work

What task-manager is for, and suggestions for how to build it. These are starting points to refer to, not
decisions: change anything here as the real modules take shape.

## Why this exists

task-manager is the start of the tooling. Today the shared task list is one long markdown file
(`~/Sites/TASKS.md`), kept up by hand each session. It works, but:

- finished work either clutters the list or gets deleted, losing its history
- the "Next step" cells have turned into running logs, some of them thousands of characters long
- there's no way to filter: what's assigned to Joshua, what Claude can pick up, what's waiting on a review

The goal is to store tasks in the json-fs-query database instead, with views over them.

## Goals

1. **Done tasks hidden but kept.** Finishing a task removes it from the default view, not from the database,
   so it's still there for historical context.
2. **A real workflow.** Tasks move through statuses, for example to `code-review` when a PR is open, so it's
   clear what needs reviewing.
3. **Assignees and filters.** Show what's assigned to me, what Claude can pick up, what's in a project, what's
   at a given priority.
4. **People and AI agents as partners.** Claude (and later other agents) can read and update tasks directly,
   instead of editing a markdown file.

## Suggested data model

Tables (each a json-fs-query collection under `database/`):

| Table | Fields | Notes |
|---|---|---|
| `tasks` | `_id`, `title`, `project_id`, `priority` (1-4), `status`, `assignee_id`, `created_at`, `updated_at`, `done_at` | `done_at` set = finished; the default view filters these out |
| `projects` | `_id`, `name`, `repo` | e.g. js-build-tools -> `jheagle/js-build-tools` |
| `people` | `_id`, `name`, `kind` (`person` / `agent`) | Joshua and Claude to start with |
| `task_notes` | `_id`, `task_id`, `author_id`, `created_at`, `body` | One dated entry per update ("PR #4 opened", "merged, no release needed"). Replaces the running-log cells. |
| `task_links` | `_id`, `task_id`, `kind` (`pr` / `issue` / `doc`), `url` | Lets a task show its PR, and later react to it opening or merging |

Possible later additions: estimates and time tracking, tags, task dependencies ("blocked by").

## Suggested statuses

```
backlog -> ready -> in-progress -> code-review -> done
```

plus `blocked`, `waiting` (on a person or an outside party, like a support ticket) and `later`.

How the current TASKS.md values map (28 rows as of 2026-10-22):

| TASKS.md today | Status |
|---|---|
| Later (12 rows), Parked for now | `later` |
| Ready, Ready (not scoped) | `ready` (or `backlog` if not scoped) |
| In progress | `in-progress` |
| Waiting on you | `waiting`, assigned to Joshua |
| PR open, waiting on merge | `code-review` |
| Blocked section | `blocked` |
| DONE ..., Done recently section | `done`, with `done_at` |
| Accepted (not planned) | `done` with a note, or its own `wont-do` status |

## Suggested views

- **Active:** everything not done, grouped by priority
- **Mine / Claude's:** filtered by assignee
- **Code review:** status `code-review`, with the PR link
- **By project**
- **History:** done tasks, newest first

## How Claude would use it

The data lives in JSON files that only Node can read, so the page needs a server, as in workout-planner's
`server/server.js`. The same server (or a small CLI over json-fs-query) is what Claude would call from the
terminal: list my tasks, add a note, move a task to `code-review`. That replaces "update TASKS.md each
session".

## Moving off TASKS.md

Once the schema settles, the current TASKS.md becomes seed data: one task per row, the "Next step" text split
into dated notes where it already has dates, and the "Done recently" bullets imported as done tasks. Claude
can write that conversion when you're ready.

## Order of work (suggested)

1. Schema plus a few hand-written seed rows
2. Read-only Active view on the start page
3. Server endpoints: create a task, change status, add a note
4. Filters (assignee, project, priority) and the History view
5. Import TASKS.md
6. A terminal path for Claude (API calls or a CLI)
7. Later: PR status syncing, estimates, time tracking
