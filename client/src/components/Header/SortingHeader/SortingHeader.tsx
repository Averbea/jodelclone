import Header from '../Header'
import './SortingHeader.css'

interface Props {
  setActive: (sort: SortType) => void,
  active: SortType
}

export type SortType = "date" | "votes" | "comments"

export default function SortingHeader({ setActive, active }: Props) {
  return (
    <Header>
      <div className='header-btn-group'>
        <button
          className={active === "date" ? "headerMenuItem activeSortingItem" : "headerMenuItem "}
          onClick={() => setActive("date")}>
          Neueste
        </button>
        <button
          className={active === "comments" ? "headerMenuItem activeSortingItem" : "headerMenuItem "}
          onClick={() => setActive("comments")}>
          Meist kommentierte
        </button>
        <button
          className={active === "votes" ? "headerMenuItem activeSortingItem" : "headerMenuItem "}
          onClick={() => setActive("votes")}>
          Lauteste
        </button>
      </div>
    </Header>

  )
}
