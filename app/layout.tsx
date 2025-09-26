export const metadata = { 
  title: "DaadaTech", 
  description: "Tech reviews & guides" 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, fontFamily:"system-ui,Segoe UI,Arial"}}>
        {/* Header */}
        <header style={{padding:"16px 20px", borderBottom:"1px solid #eee"}}>
          <a 
            href="/" 
            style={{textDecoration:"none", color:"#111", fontWeight:700, fontSize:20}}
          >
            DaadaTech
          </a>
        </header>

        {/* Main content */}
        <main style={{maxWidth:980, margin:"28px auto", padding:"0 16px"}}>
          {children}
        </main>

        {/* Footer */}
        <footer 
          style={{
            maxWidth:980, 
            margin:"48px auto 24px", 
            padding:"0 16px", 
            color:"#666", 
            fontSize:14
          }}
        >
          <p>As an Amazon Associate I earn from qualifying purchases.</p>
        </footer>
      </body>
    </html>
  );
}
