import api, { route } from '@forge/api';

const CUSTOM_FIELD_ID = "customfield_10142";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function run(event) {
  console.log("Starting enterprise calculation batch for 'Time Still Open'...");

  const jql = 'project IN (TIM, FMEA) AND status != DONE';
  const maxResults = 50;

  let nextPageToken = null;
  let hasMore = true;

  while (hasMore) {
    const url = nextPageToken
      ? route`/rest/api/3/search/jql?jql=${jql}&maxResults=${maxResults}&fields=created&nextPageToken=${nextPageToken}`
      : route`/rest/api/3/search/jql?jql=${jql}&maxResults=${maxResults}&fields=created`;

    const response = await api.asApp().requestJira(url);

    if (!response.ok) {
      console.error(`Failed to fetch issues batch: ${response.status} - ${response.statusText}`);
      break;
    }

    const data = await response.json();
    const issues = data.issues || [];

    if (issues.length === 0) {
      hasMore = false;
      break;
    }

    for (const issue of issues) {
      const createdDate = new Date(issue.fields.created);
      const today = new Date();
      const diffTime = Math.abs(today - createdDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      const updateResponse = await api.asApp().requestJira(
        route`/rest/api/3/issue/${issue.id}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              [CUSTOM_FIELD_ID]: diffDays
            }
          })
        }
      );

      if (!updateResponse.ok) {
        console.error(`Failed to update issue ${issue.key}:`, await updateResponse.text());
      }

      await sleep(100);
    }

    hasMore = data.isLast === false;
    nextPageToken = data.nextPageToken;
  }

  console.log("Enterprise calculation batch finished successfully.");
}