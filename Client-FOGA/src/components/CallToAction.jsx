import { current } from '@reduxjs/toolkit'
import { Button, Textarea } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Welcome to FOGAMS
            </h2>
            <p className='text-gray-500 my-2'>
                We are a community of believers who are passionate about the gospel of our Lord Jesus Christ. We are committed to spreading the gospel to all nations and making disciples
            </p>
            <Link to="/how-to-join-us">
            <Button outline gradientDuoTone="purpleToBlue" className='rounded-tl-xl rounded-bl-none'>
                Join Us
            </Button>
            </Link> 
        </div>
        <div className="p-7 flex-1">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFjD6yCpTkNWBeBWnqSuElUnzOQKQPpnhYFw&s" alt="wecome" className="rounded-full" />
        </div>
    </div>
  )
}
