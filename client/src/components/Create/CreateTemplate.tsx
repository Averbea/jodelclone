import React, { FormEvent, useState } from 'react'
import BackHeader from '../Header/BackHeader/BackHeader'
import Container from '../Container/Container'

import './CreateTemplate.css'
import CustomButton from '../Button/CustomButton'

interface Props{
    onSubmit: (e: FormEvent, text: string) => void,
    placeholder: string
}
export default function CreateTemplate({ onSubmit, placeholder}: Props) {
    const [text, setText] = useState("");
  return (
    <>
      <BackHeader />
      <Container>
        <form className='createForm' onSubmit={(e) => onSubmit(e, text)}>
          <textarea required value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} />
          <footer className='createForm-footer'>
            <CustomButton type='submit' text='Send' variant='primary' />
          </footer>
        </form>
      </Container>
    </>
  )
}
