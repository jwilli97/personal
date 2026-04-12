import test from "node:test";
import assert from "node:assert/strict";

import { loadContributionData } from "./github-contributions.mjs";
import { buildContributionWeeks } from "./contribution-calendar.mjs";

test("returns an empty contribution payload when the GitHub token is missing", async () => {
  let fetchCalls = 0;

  const result = await loadContributionData({
    token: undefined,
    usernames: ["alice", "bob"],
    fetchImpl: async () => {
      fetchCalls += 1;
      throw new Error("fetch should not be called without a token");
    },
  });

  assert.deepEqual(result, {
    contributions: [],
    totalContributions: 0,
    usernames: ["alice", "bob"],
  });
  assert.equal(fetchCalls, 0);
});

test("uses account-specific GitHub tokens from the environment when a shared token is not configured", async () => {
  const requests = [];

  const result = await loadContributionData({
    usernames: ["jwilli97", "jwilli-asc", "Lebowski97", "jcincin"],
    env: {
      ASC_GITHUB_TOKEN: "asc-token",
      JWILLI_GITHUB_TOKEN: "jwilli-token",
      LEBOWSKI_GITHUB_TOKEN: "lebowski-token",
      CINCIN_GITHUB_TOKEN: "cincin-token",
    },
    fetchImpl: async (_url, init) => {
      const body = JSON.parse(init.body);
      const username = body.variables.username;
      const contributionCount = requests.length + 1;
      requests.push({
        username,
        authorization: init.headers.Authorization,
      });

      return {
        ok: true,
        async json() {
          return {
            data: {
              user: {
                contributionsCollection: {
                  contributionCalendar: {
                    weeks: [
                      {
                        contributionDays: [
                          {
                            date: `2026-01-0${contributionCount}`,
                            contributionCount,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          };
        },
      };
    },
  });

  assert.deepEqual(requests, [
    { username: "jwilli97", authorization: "Bearer jwilli-token" },
    { username: "jwilli-asc", authorization: "Bearer asc-token" },
    { username: "Lebowski97", authorization: "Bearer lebowski-token" },
    { username: "jcincin", authorization: "Bearer cincin-token" },
  ]);
  assert.equal(result.totalContributions, 10);
  assert.equal(result.contributions.length, 4);
});

test("buildContributionWeeks preserves local calendar dates without UTC shifting", () => {
  const weeks = buildContributionWeeks([
    { date: "2026-01-01", count: 4 },
    { date: "2026-01-02", count: 2 },
  ]);

  assert.equal(weeks[0][4].date, "2026-01-01");
  assert.equal(weeks[0][4].count, 4);
  assert.equal(weeks[0][5].date, "2026-01-02");
  assert.equal(weeks[0][5].count, 2);
});
