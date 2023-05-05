import React, { CSSProperties, useEffect, useState } from "react"
import Container from "../Container/Container"
import { ChannelAPIResponse, apiFetchChannels } from "../../api"
import useDebounce from "../../hooks/useDebounce"
import Badge from "../Badge/Badge"
import { useNavigate } from "react-router-dom"



const badgeNumberStyle: CSSProperties = {
  position: "absolute",
  minWidth: "20px",
  padding: "5px",
  borderRadius: "50%",
  top: "-7px",
  right: "-7px",
  backgroundColor: "var(--primary)",
  fontSize: "8px",
}


export default function Channels() {
  let [topChannels, setTopChannels] = useState<ChannelAPIResponse[]>([])
  let [searchResults, setSearchResults] = useState<ChannelAPIResponse[]>([])
  let [searchTerm, setSearchTerm] = useState("")

  const debouncedSearchTerm = useDebounce(searchTerm)

  const navigate = useNavigate()

  useEffect(() => {
    apiFetchChannels(10).then((response) =>
      setTopChannels(response.data)
    )
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm.trim().length === 0) {
      setSearchResults([])
      return
    }
    apiFetchChannels(10, debouncedSearchTerm).then(response => setSearchResults(response.data))
  }, [debouncedSearchTerm])

  const searchComponents = searchResults.map((el) => (
    <Badge active key={"search" + el._id} onClick={() => navigate(`/Channels/${el._id}`)}>
      <p>{el._id}</p>
      <div style={badgeNumberStyle}>{el.count}</div>
    </Badge>
  ))

  const channelComponents = topChannels.map((el) => (
    <Badge active key={"channel" + el._id} onClick={() => navigate(`/Channels/${el._id}`)}>
      <p>{el._id}</p>
      <div style={badgeNumberStyle}>{el.count}</div>
    </Badge>
  ))
  return (
    <Container>
      <h1>Channels</h1>
      Suche einen Channel:
      <input type="text" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
      <ul>{searchComponents}</ul>
      <h2>Top Channels</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>{channelComponents}</div>
    </Container>
  )
}
