import Badge from "../Badge/Badge"


interface Props {
    setActive: (sort: SortType) => void,
    active: SortType
  }
  
  export type SortType = "date" | "votes" | "comments"

export default function SortingComponent({ setActive, active }: Props) {
  return (
    <div style={{
        justifySelf: "flex-start", width: "fit-content"
      }}>
        < Badge active={active === "date"
        } onClick={() => setActive("date")}>Neueste</Badge>
        <Badge active={active === "comments"} onClick={() => setActive("comments")}> Meist kommentierte</Badge>
        <Badge active={active === "votes"} onClick={() => setActive("votes")}> Lauteste</Badge>
      </div>
  )
}
