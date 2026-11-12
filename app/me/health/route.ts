import { createHash, timingSafeEqual } from "node:crypto"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
}

const digest = (value: string) => createHash("sha256").update(value).digest()
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
)

export function GET(request: Request) {
  const password = process.env.PERSONAL_HEALTH_PASSWORD
  if (!password || password.length < 24) {
    return new Response("Private dashboard setup is pending.", { status: 503, headers: privateHeaders })
  }

  const expected = "Basic " + Buffer.from("william:" + password).toString("base64")
  if (!timingSafeEqual(digest(request.headers.get("authorization") ?? ""), digest(expected))) {
    return new Response("Sign in to view the private health dashboard.", {
      status: 401,
      headers: { ...privateHeaders, "WWW-Authenticate": 'Basic realm="Private health dashboard", charset="UTF-8"' },
    })
  }

  const records = process.env.PERSONAL_HEALTH_RECORDS?.trim()
  const content = records
    ? `<div class="records">${escapeHtml(records)}</div>`
    : "<p>No records have been imported yet.</p>"

  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Private health dashboard</title>
<style>
body{margin:0;background:#f4f0e7;color:#222822;font:1rem/1.6 system-ui,sans-serif}
main{max-width:58rem;margin:auto;padding:3rem 1.5rem}
h1{font:400 clamp(2.4rem,7vw,4.5rem)/1 Georgia,serif;margin:1rem 0 2rem}
a{color:#395644}.records{background:#fff;border:1px solid #bebfb1;border-radius:.75rem;padding:1.5rem;white-space:pre-wrap;overflow-wrap:anywhere}
</style></head><body><main><a href="/me">Personal homepage</a><h1>Health dashboard</h1>${content}</main></body></html>`, {
    headers: { ...privateHeaders, "Content-Type": "text/html; charset=utf-8" },
  })
}
