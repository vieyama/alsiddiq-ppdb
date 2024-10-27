import { Head as InertiaHead } from '@inertiajs/react'
import React from 'react'

const Head = ({title}) => {
  return (
      <InertiaHead>
          <title>{title ?? ''}</title>
          <meta head-key="description" name="description" content="AL SIDDIQ INTERNATIONAL SCHOOL PPDB" />
          <link rel="icon" type="image/svg+xml" href="/logo-white.png" />
      </InertiaHead>
  )
}

export default Head
