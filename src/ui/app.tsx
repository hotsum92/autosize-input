import React, { useRef, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export default () => {

  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <NoResizeTextarea />
      <NoResizeInput />
      <ContenteditableSpan />
      <InputWithSpan />
      <Todo
        placeholder='入力してください'
        input={input}
        onChangeInput={setInput}
        checked={checked}
        onClickCheckbox={() => setChecked(!checked)}
      />
    </div>
  )
}

const NoResizeTextarea = () => {
  return (
    <div>
      <label>no resize textarea: </label>
      <textarea />
    </div>
  )
}

const NoResizeInput = () => {
  return (
    <div>
      <label>no resize input: </label>
      <input />
    </div>
  )
}

const ContenteditableSpan = () => {
  return (
    <div>
      <label>Contenteditable: </label>
      <span contentEditable
        style={{
          display: 'inline-block',
          borderWidth:'1px',
          borderStyle:'solid',
          minWidth: '50px',
        }}
      />
    </div>
  )
}

const InputWithSpan = () => {
  const [state, setState] = useState('');

  return (
    <div>
      <label>input with span: </label>
      <span
        style={{
          padding: '0 1rem',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            visibility: 'hidden',
          }}
        >{state}</span>
        <input
          value={state}
          onChange={e => setState(e.target.value)}
          style={{
            position: 'absolute',
            width: '100%',
            left: 0,
            fontSize: '16px',
            font: 'inherit',
            letterSpacing: 'inherit',
          }}
        />
      </span>
    </div>
  )
}

interface Props {
  input: string
  placeholder: string
  onChangeInput: (value: string) => void
  checked: boolean
  onClickCheckbox: () => void
}

const Todo = (props: Props) => {
  const theme = useTheme()
  const inputRef = useRef<HTMLDivElement>(null)

  if(inputRef.current && inputRef.current.innerText !== props.input) {
    // When changing the input value through the props, the caret moves forward.
    inputRef.current.innerText = props.input
  }

  return (
    <Card
      sx={{
        mt: '50px',
        width: '250px',
        minHeight: '80px',
      }}
    >
      <Box
          sx={{
            padding: 2,
            position: 'relative',
          }}
        >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: props.input ? 'none' : undefined,
          }}
        >
          <Typography>{ props.placeholder }</Typography>
        </Box>
        <Box
          style={{
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
          }}
        >
          <IconButton
            onClick={props.onClickCheckbox}
          >
            { props.checked ? (
              <CheckBoxIcon
                fontSize='small'
              />
            ) : (
              <CheckBoxOutlineBlankIcon
                fontSize='small'
              />
            ) }
          </IconButton>
        </Box>
        <Box
          sx={{
            width: '20px',
            height: '20px',
            float: 'right',
          }}
        />
        <div
          ref={inputRef}
          contentEditable
          style={{
            width: '100%',
            minHeight: '20px',
            fontFamily: theme.typography.fontFamily,
            fontSize: '1rem',
            outline: 'none',
          }}
          onInput={
            e => {
              props.onChangeInput(e.currentTarget.innerText)
            }
          }
        />
      </Box>
    </Card>
  )
}
