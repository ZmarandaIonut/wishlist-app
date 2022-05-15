import React from 'react'

export default function Loading({size}) {
  return (
    <div className={size ? `lds-ring ${size}` : "lds-ring"}><div></div><div></div><div></div><div></div></div>
  )
}
