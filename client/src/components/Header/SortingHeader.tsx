import BackButton from './BackButton'
import HeaderTemplate from './HeaderTemplate'
import SortingComponent from './SortingComponent'

interface Props {
  setActive: (sort: SortType) => void,
  active: SortType,
  displayBackButton?: boolean,
  channel?: string
}

export type SortType = "date" | "votes" | "comments"

export default function SortingHeader({ setActive, active, displayBackButton, channel }: Props) {
  return (
    <HeaderTemplate
      left={
        displayBackButton ? <BackButton /> : null
      }
      center={
        <SortingComponent active={active} setActive={setActive} />
      }
      right={
        channel && <span style={{ color: '#403f3f' }} >@{channel}</span>
      }
    />
  )
}
