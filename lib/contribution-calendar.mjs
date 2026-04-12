/**
 * @typedef {{ date: string, count: number }} ContributionDay
 */

/**
 * Parse a YYYY-MM-DD key as a local calendar date.
 *
 * @param {string} dateKey
 * @returns {Date}
 */
function parseLocalDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format a Date using local calendar fields instead of UTC.
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Build GitHub-style week columns from daily contribution data.
 *
 * @param {ContributionDay[]} contributions
 * @returns {ContributionDay[][]}
 */
export function buildContributionWeeks(contributions) {
  if (contributions.length === 0) {
    return [];
  }

  const contributionMap = new Map(
    contributions.map((contribution) => [contribution.date, contribution.count])
  );

  const startDate = parseLocalDateKey(contributions[0].date);
  const endDate = parseLocalDateKey(contributions[contributions.length - 1].date);
  const current = new Date(startDate);
  /** @type {ContributionDay[][]} */
  const weeks = [];

  while (current.getDay() !== 0) {
    current.setDate(current.getDate() - 1);
  }

  while (current <= endDate) {
    /** @type {ContributionDay[]} */
    const week = [];

    for (let index = 0; index < 7; index += 1) {
      const date = formatLocalDateKey(current);
      week.push({
        date,
        count: contributionMap.get(date) || 0,
      });
      current.setDate(current.getDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}
