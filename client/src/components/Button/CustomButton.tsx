import './CustomButton.css'

interface Props{
  text: string, 
  onClick?: () => void, 
  variant?: "primary" |  "secondary"
  type?: "button" | "submit" | "reset" | undefined
}



export default function CustomButton({text, onClick = () => {}, variant = "primary", type = "button"}:Props) {
  let classes = ""
  switch(variant){
    case "primary":
      classes = "custom-button primary"
      break
    case "secondary":
      classes = "custom-button secondary"
  }
  return (
    <button  type={type} onClick={onClick} className={classes}>{text}</button>
  )
}
