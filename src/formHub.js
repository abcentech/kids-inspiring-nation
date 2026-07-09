// Form Hub client — every form on the site reports to one Google Apps Script
// web app (apps-script/FormHub.gs), which appends a row to one Google Sheet
// (a tab per form type) and pings Telegram. Setup guide: FORM_HUB_SETUP.md.
//
// Two modes:
//   submitToHub(form, data)  — primary submission; throws on failure.
//   notifyHub(form, data)    — fire-and-forget mirror for forms whose primary
//                              channel is FormSubmit email; never throws.
//
// Requests are urlencoded (not JSON) — that keeps them "simple" requests, so
// the browser skips the CORS preflight that Apps Script can't answer.

import { SITE } from "./siteConfig.js";
import { submitUrlEncodedForm } from "./formSubmit.js";

export const HUB_URL = import.meta.env.VITE_FORM_HUB_URL || SITE.formHubUrl || "";

export function hubConfigured() {
  return Boolean(HUB_URL);
}

// Primary submission — use when the hub is the form's backend.
export async function submitToHub(form, data, label = form) {
  return submitUrlEncodedForm(HUB_URL, { _form: form, ...data }, label);
}

// Best-effort mirror — sheet + Telegram ride along, but a hub outage can
// never break the user's submission.
export function notifyHub(form, data) {
  if (!HUB_URL) return;
  try {
    const body = new URLSearchParams();
    body.append("_form", form);
    Object.entries(data).forEach(([k, v]) => body.append(k, v ?? ""));
    fetch(HUB_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
    }).catch(() => {});
  } catch {
    /* never let reporting break a form */
  }
}
