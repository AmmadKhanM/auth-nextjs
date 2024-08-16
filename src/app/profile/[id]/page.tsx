
export default function UserProfile({params}: any) {
  return (
    <>
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">User profile page {params.id}</h2>
    </div>
    </>
  )
}
