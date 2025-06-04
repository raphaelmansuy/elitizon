export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 text-white p-8">
      <h1 className="text-4xl font-bold">Test Page</h1>
      <p className="text-xl mt-4">This is a test page to verify the app is working.</p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Component Tests:</h2>
        <div className="mt-4 p-4 bg-blue-600 rounded">
          <p>Basic styling works</p>
        </div>
        <div className="mt-4 p-4 bg-primary-700 rounded">
          <p>Primary color works</p>
        </div>
        <div className="mt-4 p-4 bg-secondary-600 rounded">
          <p>Secondary color works</p>
        </div>
      </div>
    </div>
  )
}
