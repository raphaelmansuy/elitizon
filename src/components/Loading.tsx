export default function Loading({ size = 'md', text = 'Loading...' }: { size?: 'sm' | 'md' | 'lg', text?: string }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {text && (
        <p className="text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  )
}

export function LoadingOverlay({ isVisible, text = 'Loading...' }: { isVisible: boolean, text?: string }) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-8 shadow-2xl">
        <Loading size="lg" text={text} />
      </div>
    </div>
  )
}

export function InlineLoading() {
  return (
    <div className="inline-flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  )
}
