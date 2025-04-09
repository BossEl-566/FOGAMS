import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function DashNotepad() {
  return (
    <div>
        <Link to="/create/notepad" >
        <Button>
            create
        </Button>
        </Link>
    </div>
  )
}
