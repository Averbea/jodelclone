import Badge from '../Badge/Badge'
import Header from './Header'

interface Props {
  setActive: (sort: SortType) => void,
  active: SortType
}

export type SortType = "date" | "votes" | "comments"

export default function SortingHeader({ setActive, active }: Props) {
  return (
    <Header>
      <div style={{ textAlign: 'center' }}>
        <Badge active={active === "date"} onClick={() => setActive("date")}>Neueste</Badge>
        <Badge active={active === "comments"} onClick={() => setActive("comments")}> Meist kommentierte</Badge>
        <Badge active={active === "votes"} onClick={() => setActive("votes")}> Lauteste</Badge>
      </div>
    </Header>

  )
}
