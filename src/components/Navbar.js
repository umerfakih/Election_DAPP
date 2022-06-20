import React from 'react'

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark shadow mb-5">
      <Link class="navbar-brand" to="/">ElectionDapp</Link>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link text-white" to="/Airdrop">
            Claim
          </Link>
        </li>
      </ul>
    </nav>
  )
}
