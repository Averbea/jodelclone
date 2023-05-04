import React from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

import "./Footer.css"
import Badge from "../Badge/Badge"

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname
  return (
    <div className="footer">
      <Badge
        active={path === "/"}
        onClick={() => navigate("/")}
      >
        Home
      </Badge>
      <Badge
        active={path === "/Channels"}
        onClick={() => navigate("/Channels")}
      >
        Channels
      </Badge>
      <Badge
        active={path === "/Inbox"}
        onClick={() => navigate("/Inbox")}
      >
        Inbox
      </Badge>
      <Badge
        active={path === "/Me"}
        onClick={() => navigate("/")}
      >
        Me
      </Badge>
    </div>
  )
}
