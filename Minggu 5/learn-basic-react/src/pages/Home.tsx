export default function Home() {
  const token = localStorage.getItem("access_token")

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Home</h1>
      <p>Access Token:</p>
      <pre>{token}</pre>
    </div>
  )
}
