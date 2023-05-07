import { FormEvent, useEffect, useState } from 'react'
import BackHeader from '../Header/BackHeader'
import Container from '../Container/Container'
import './CreateTemplate.css'
import CustomButton from '../Button/CustomButton'
import { getRandomInt } from '../../Utils'

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

type ColorProps = {
  color: string,
  setColor: (color: string) => any
} | {
  color?: never,
  setColor?: never
}




type Props = CommonProps & ConditionalProps & ColorProps;


const COLORS = ["#9D79BC", "#FF751F", "#52A362", "#2095AC", "#D03E2E"]

export default function CreateTemplate({ onSubmit, placeholder, variant, setColor, color }: Props) {
  const [text, setText] = useState("");
  const [channel, setChannel] = useState("main")



  useEffect(() => { if (setColor) setColor(COLORS[getRandomInt(0, COLORS.length - 1)]) }, [setColor])

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
        <form style={{ backgroundColor: color }} className='createForm' onSubmit={(e) => submitForm(e)}>
          {variant === "post" && <input required type='text' value={"@" + channel} onChange={(e) => setChannel(e.target.value.slice(1))} />}
          <textarea required value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} />
          <footer className='createForm-footer'>
            {color && setColor && <div className="createForm-colorSelector">
              {COLORS.map((col) => <ColorButton color={col} setColor={setColor} />)}
            </div>}
            <CustomButton type='submit' text='Send' variant='primary' />
          </footer>
        </form>
      </Container>
    </>
  )
}



interface ColorButtonProps {
  color: string,
  setColor: (color: string) => void
}
function ColorButton({ color, setColor }: ColorButtonProps) {
  return (
    <button type="button" style={{ backgroundColor: color }} className="createForm-colorButton" onClick={() => setColor(color)} />
  )
}