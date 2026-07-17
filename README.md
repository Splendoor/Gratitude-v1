# Gratitude Journal 

An app that helps you cultivate a gratitude jorunaling habit — by inviting you, not nagging you.

> **Status:** v1 in progress. This is my first app, built as a hands-on way to learn to create software with AI assistance. The reasoning behind every major choice lives in [`docs/adr`](docs/adr) — that decision log is as much the point of this project as the code.

## What it does

Once a (yet to be determined ), at a moment of the day you choose, the app invites you to jot one thing you're grateful for, acknowledges it, and saves it — locally, on your own device.

## Why it's built this way

The design deliberately drops "coercion" (forced pop-ups you can't dismiss), which was my original idea, but after going thru some findings delivered by Claude (Opus 4.8 at the time), changed it in favour of *autonomy-supportive habit design*: a self-chosen cue, a one-line effort, an immediate small acknowledgment, and a forgiving streak. The short reason: forcing a gratitude practice tends to backfire, and habits form through low-friction repetition and positive emotion rather than willpower. The full reasoning, with its trade-offs, is in the decision log below.

## Live demo

*Coming soon* — will be hosted free on GitHub Pages. 

## Tech

- Plain HTML, CSS, and JavaScript (no framework)
- Installable PWA (web-app manifest + service worker) — opens like a regular program and runs across platforms
- Local storage only: no accounts, no server, no tracking

## Roadmap

- **v1 (now):** self-chosen prompt time, one-line entry, local save, small acknowledgment, skip anytime.
- **Later:** reread past entries, forgiving streak indicator, optional reminder, a "learn more" page, and — much later — additional habits sharing the same engine.

## Decision log

The interesting part for a learning project. Each record captures one decision, why it was made, and what it trades off:

- [ADR-0001](docs/adr/0001-record-architecture-decisions.md) — Keep a decision log
- [ADR-0002](docs/adr/0002-build-as-installable-pwa.md) — Build as an installable PWA
- [ADR-0003](docs/adr/0003-autonomy-supportive-not-coercive.md) — Autonomy-supportive design, not coercion
- [ADR-0004](docs/adr/0004-single-user-local-only.md) — Single-user, local-only for v1
- [ADR-0005](docs/adr/0005-config-driven-single-habit.md) — One configurable habit, engine-ready for more

## Running it locally

*To be added once v1 exists* — it will be roughly: clone the repo and open `index.html`, or serve the folder with any static file server.

---

Built with AI assistance (Anthropic's Claude, mostly Fable 5 and Opus 4.8) as a learning project. Feedback welcome — especially on the reasoning in the decision log.
