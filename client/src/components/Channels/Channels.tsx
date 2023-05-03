import React, { useEffect, useState } from "react"
import Container from "../Container/Container"
import { ChannelAPIResponse, apiFetchTopChannels, apiSearchChannels } from "../../api"
import useDebounce from "../../hooks/useDebounce"

export default function Channels() {
  let [topChannels, setTopChannels] = useState<ChannelAPIResponse[]>([])
  let [searchResults, setSearchResults] = useState<ChannelAPIResponse[]>([])
  let [searchTerm, setSearchTerm] = useState("")

  const debouncedSearchTerm = useDebounce(searchTerm)

  useEffect(() => {
    apiFetchTopChannels(10).then((response) =>
      setTopChannels(response.data)
    )
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm.trim().length === 0) {
      setSearchResults([])
      return
    }
    apiSearchChannels(10, debouncedSearchTerm).then(response => setSearchResults(response.data))
  }, [debouncedSearchTerm])

  const searchComponents = searchResults.map((el) => (
    <li key={"search" + el._id}>
      {el._id} : {el.count}
    </li>
  ))

  const channelComponents = topChannels.map((el) => (
    <li key={"top" + el._id}>
      {el._id} : {el.count}
    </li>
  ))
  return (
    <Container>
      <h1>Channels</h1>
      Suche einen Channel:
      <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
      <ul>{searchComponents}</ul>
      <h2>Top Channels</h2>
      <ul>{channelComponents}</ul>
    </Container>
  )
}
