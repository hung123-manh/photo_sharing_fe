const baseURL = "https://f92c2c-8081.csb.app";

export default async function fetchModel(url) {
  const response = await fetch(`${baseURL}${url}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response}`);
  }

  return await response.json();
}
