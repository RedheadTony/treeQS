import React from 'react'

import { Button } from './commonStyledComponent/buttons'

export default function MoveButton({ onClick, disabled }) {
  return (
    <Button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      style={{ margin: 10 }}>
      {'<<<'}
    </Button>
  )
}
