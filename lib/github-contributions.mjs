const CONTRIBUTION_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

export const GITHUB_USERNAMES = ["jwilli97", "jwilli-asc", "Lebowski97", "jcincin"];
export const GITHUB_TOKEN_ENV_NAMES = [
  "GITHUB_TOKEN",
  "ASC_GITHUB_TOKEN",
  "CINCIN_GITHUB_TOKEN",
  "JWILLI_GITHUB_TOKEN",
  "LEBOWSKI_GITHUB_TOKEN",
];

const GITHUB_TOKEN_ENV_BY_USERNAME = {
  jwilli97: "JWILLI_GITHUB_TOKEN",
  "jwilli-asc": "ASC_GITHUB_TOKEN",
  Lebowski97: "LEBOWSKI_GITHUB_TOKEN",
  jcincin: "CINCIN_GITHUB_TOKEN",
};

/**
 * @typedef {{ date: string, count: number }} ContributionDay
 * @typedef {{ contributions: ContributionDay[], totalContributions: number, usernames: string[] }} ContributionData
 * @typedef {{ contributionCount: number, date: string }} GitHubContributionDay
 * @typedef {{
 *   data?: {
 *     user?: {
 *       contributionsCollection?: {
 *         contributionCalendar?: {
 *           weeks?: Array<{ contributionDays?: GitHubContributionDay[] }>
 *         }
 *       }
 *     }
 *   }
 * }} GitHubResponse
 */

/**
 * @param {string[]} usernames
 * @returns {ContributionData}
 */
export function createEmptyContributionData(usernames) {
  return {
    contributions: [],
    totalContributions: 0,
    usernames,
  };
}

/**
 * @param {string | undefined} value
 * @returns {string | undefined}
 */
function normalizeToken(value) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * @param {Record<string, string | undefined>} env
 * @returns {string | undefined}
 */
function getSharedTokenFromEnv(env) {
  for (const envName of GITHUB_TOKEN_ENV_NAMES) {
    const token = normalizeToken(env[envName]);
    if (token) {
      return token;
    }
  }

  return undefined;
}

/**
 * @param {string} username
 * @param {{
 *   token?: string,
 *   tokenByUsername?: Record<string, string | undefined>,
 *   env?: Record<string, string | undefined>
 * }} options
 * @returns {string | undefined}
 */
export function resolveGitHubToken(
  username,
  { token, tokenByUsername = {}, env = {} } = {}
) {
  const directToken = normalizeToken(tokenByUsername[username]) ?? normalizeToken(token);
  if (directToken) {
    return directToken;
  }

  const usernameEnvName = GITHUB_TOKEN_ENV_BY_USERNAME[username];
  const usernameToken = usernameEnvName
    ? normalizeToken(env[usernameEnvName])
    : undefined;

  return usernameToken ?? getSharedTokenFromEnv(env);
}

/**
 * @param {string} username
 * @param {{ token: string, fetchImpl?: typeof fetch }} options
 * @returns {Promise<Map<string, number>>}
 */
async function fetchUserContributions(username, { token, fetchImpl = fetch }) {
  const response = await fetchImpl("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTION_QUERY,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  /** @type {GitHubResponse} */
  const json = await response.json();
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar?.weeks) {
    return new Map();
  }

  const contributions = new Map();

  for (const week of calendar.weeks) {
    for (const day of week.contributionDays ?? []) {
      contributions.set(day.date, day.contributionCount);
    }
  }

  return contributions;
}

/**
 * @param {{
 *   token?: string,
 *   tokenByUsername?: Record<string, string | undefined>,
 *   usernames?: string[],
 *   env?: Record<string, string | undefined>,
 *   fetchImpl?: typeof fetch
 * }} options
 * @returns {Promise<ContributionData>}
 */
export async function loadContributionData({
  token,
  tokenByUsername = {},
  usernames = GITHUB_USERNAMES,
  env = {},
  fetchImpl = fetch,
} = {}) {
  const tokensByUsername = new Map(
    usernames.map((username) => [
      username,
      resolveGitHubToken(username, { token, tokenByUsername, env }),
    ])
  );

  if (![...tokensByUsername.values()].some(Boolean)) {
    return createEmptyContributionData(usernames);
  }

  const allContributions = await Promise.all(
    usernames.map((username) => {
      const resolvedToken = tokensByUsername.get(username);
      if (!resolvedToken) {
        return new Map();
      }

      return fetchUserContributions(username, {
        token: resolvedToken,
        fetchImpl,
      });
    })
  );

  const aggregated = new Map();

  for (const userContributions of allContributions) {
    for (const [date, count] of userContributions) {
      aggregated.set(date, (aggregated.get(date) || 0) + count);
    }
  }

  const contributions = Array.from(aggregated.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    contributions,
    totalContributions: contributions.reduce((sum, day) => sum + day.count, 0),
    usernames,
  };
}
