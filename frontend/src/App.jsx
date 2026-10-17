import { useEffect, useState } from "react";

export default function App() {
  const [apiStatus, setApiStatus] = useState("Checking API...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => {
        if (!response.ok) throw new Error("API unavailable");
        return response.json();
      })
      .then((data) => setApiStatus(`API status: ${data.status}`))
      .catch(() => setApiStatus("API not connected. Start the backend on port 5000."));
  }, []);

  return (
    <main style={{ fontFamily: "Arial, sans-serif", maxWidth: 760, margin: "48px auto", padding: 24 }}>
      <p style={{ color: "#5263c3", fontWeight: 700 }}>STUDY SMART</p>
      <h1>Student Task Manager</h1>
      <p>Organize assignments, keep track of due dates, and make progress one task at a time.</p>
      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 18, marginTop: 24 }}>
        <h2>Starter dashboard</h2>
        <p>{apiStatus}</p>
        <p>Next step: connect task list and task forms to the REST API.</p>
      </section>
    </main>
  );
}
