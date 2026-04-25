export class FormSubmissionError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "FormSubmissionError";
    this.status = status;
  }
}

function ensureEndpoint(endpoint, label) {
  if (!endpoint) {
    throw new FormSubmissionError(
      `${label} is not configured yet. Add the required Vite environment variable before enabling this form.`
    );
  }
}

export async function submitJsonForm(endpoint, payload, label) {
  ensureEndpoint(endpoint, label);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new FormSubmissionError(`${label} failed with status ${response.status}.`, response.status);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return { ok: true };
}

export async function submitUrlEncodedForm(endpoint, payload, label) {
  ensureEndpoint(endpoint, label);

  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    body.append(key, value ?? "");
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
    },
    body,
  });

  if (!response.ok) {
    throw new FormSubmissionError(`${label} failed with status ${response.status}.`, response.status);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { ok: true, text };
}
