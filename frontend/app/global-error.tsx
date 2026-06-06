"use client";

// Root error boundary (catches errors in the root layout too).
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0b1024", color: "#ebeefb", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
          <div style={{ maxWidth: 440, textAlign: "center" }}>
            <h2 style={{ fontSize: 24 }}>Something went wrong</h2>
            <p style={{ fontSize: 13, color: "#b6bcd8", wordBreak: "break-word" }}>
              {error.message || "Unexpected error"}
            </p>
            <button
              onClick={reset}
              style={{ marginTop: 16, padding: "10px 20px", background: "#8aa6ee", color: "#fff", border: 0, borderRadius: 10, fontWeight: 600, cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
