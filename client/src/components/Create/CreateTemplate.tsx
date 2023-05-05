import React, { FormEvent, useState } from 'react'
import BackHeader from '../Header/BackHeader'
import Container from '../Container/Container'

import './CreateTemplate.css'
import CustomButton from '../Button/CustomButton'

interface CommonProps {
  placeholder: string
}
type ConditionalProps = {
  variant: "comment"
  onSubmit: (text: string) => void,
} |
{
  variant: "post"
  onSubmit: (text: string, channel: string) => void,
}


export default function CreateTemplate({ onSubmit, placeholder, variant }: CommonProps & ConditionalProps) {
  const [text, setText] = useState("");
  const [channel, setChannel] = useState("main")

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (variant === "comment") {
      onSubmit(text)
    } else {
      onSubmit(text, channel)
    }
  }

  return (
    <>
      <BackHeader />
      <Container>
        <form className='createForm' onSubmit={(e) => submitForm(e)}>
          {variant === "post" && <input required type='text' value={"@" + channel} onChange={(e) => setChannel(e.target.value.slice(1))} />}
          <textarea required value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} />
          <footer className='createForm-footer'>
            <CustomButton type='submit' text='Send' variant='primary' />
          </footer>
        </form>
      </Container>
    </>
  )
}
