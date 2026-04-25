function Star({
  fill,
  size = 'default',
}: {
  fill: 'empty' | 'half' | 'full'
  size?: 'default' | 'sm'
}) {
  const id = `half-${Math.random().toString(36).slice(2, 7)}`
  const width = size === 'default' ? '32px' : '14px'
  const height = size === 'default' ? '32px' : '14px'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="drop-shadow-sm"
      style={{ width, height }}
    >
      {fill === 'half' && (
        <defs>
          <linearGradient id={id} suppressHydrationWarning>
            <stop offset="50%" stopColor="#F6CB32" suppressHydrationWarning />
            <stop offset="50%" stopColor="#FFFFFF50" suppressHydrationWarning />
          </linearGradient>
        </defs>
      )}
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={
          fill === 'full'
            ? '#F6CB32'
            : fill === 'half'
              ? `url(#${id})`
              : '#FFFFFF50'
        }
        suppressHydrationWarning
      />
    </svg>
  )
}

export default Star
