import React from 'react'

function Card({children, className}) {
  return (
    <div className={`bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6 ${className}`}>
      {children}
    </div>
  )
}

export default Card
