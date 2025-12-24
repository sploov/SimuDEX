export default function SetupDocs() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black">Setup Guide</h1>
      <p className="text-xl text-muted-foreground">
        Getting SimuDEX running on your local machine or deploying it to your own server.
      </p>

      <h2 className="text-2xl font-bold">Local Installation</h2>
      <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm border border-white/5">
        <code>
          {`git clone https://github.com/sploov/SimuDEX.git
cd SimuDEX/website
npm install
npx prisma db push
npm run dev`}
        </code>
      </pre>

      <h2 className="text-2xl font-bold">Environment Variables</h2>
      <p>You need to provide the following keys in a <code>.env</code> file:</p>
      <ul className="space-y-4">
        <li>
          <strong>DATABASE_URL:</strong> Your Supabase/PostgreSQL connection string.
        </li>
        <li>
          <strong>GITHUB_ID / SECRET:</strong> OAuth credentials from GitHub Developer settings.
        </li>
        <li>
          <strong>AUTH_SECRET:</strong> A random string for session encryption.
        </li>
      </ul>

      <h2 className="text-2xl font-bold">Vercel Deployment</h2>
      <ol>
        <li>Import the repository into Vercel.</li>
        <li>Set the root directory to <code>website</code>.</li>
        <li>Add your environment variables.</li>
        <li>Deploy!</li>
      </ol>
    </div>
  );
}
