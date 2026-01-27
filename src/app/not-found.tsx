// app/not-found.tsx
import Link from "next/link";

export const metadata = {
    title: "404 | Page Not Found",
  };
  
export default function NotFound() {
  return (
    <section
      style={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "64px", marginBottom: "16px" }}>404</h1>
      <p style={{ fontSize: "18px", marginBottom: "24px" }}>
        Oops! This page could not be found.
      </p>

      <Link href="/" style={{ color: "#000", fontWeight: 600 }}>
        Go back to Home →
      </Link>
    </section>
  );
}
