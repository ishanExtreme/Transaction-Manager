/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Button, ButtonProps, Stack } from 'react-bootstrap'

export default function IconButton (props: { children: React.ReactNode, text: string } & ButtonProps) {
  return (
    <Button {...props} className="text-center">
      <Stack direction="horizontal" gap={1}>
        {props.children}
        {props.text}
      </Stack>
    </Button>
  )
}
