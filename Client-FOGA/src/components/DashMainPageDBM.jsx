import { Table } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function DashMainPageDBM() {
  const { currentUser} = useSelector(state => state.user)
  const [dailyBibleMessage, setDailyBibleMessage] = useState([])
  console.log(dailyBibleMessage)
  useEffect(() => {
    const fetchDailyBibleMessage = async () => {
      try {
        const res = await fetch(`/api/get-daily-bible-message?userId=${currentUser._id}`)
        const data = await res.json()
        console.log(data)
        if(res.ok) {
          setDailyBibleMessage(data.dailyBibleMessage)
        
      }
     } catch (error) {
        console.log(error.message)
        
      }
  }
  if(currentUser.isAdmin) {
    fetchDailyBibleMessage()
  }

}, [currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-blue-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && dailyBibleMessage.length > 0 ? (
          <>
          <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>DATE UPDATED</Table.HeadCell>
                <Table.HeadCell>IMAGE</Table.HeadCell>
                <Table.HeadCell>TITLE</Table.HeadCell>
                <Table.HeadCell>CATEGORY</Table.HeadCell>
                <Table.HeadCell>DELETE</Table.HeadCell>
                <Table.HeadCell>
                  <span>EDIT</span>
                </Table.HeadCell>
              </Table.Head>
              {dailyBibleMessage.map((message) => (
                <Table.Body className='divide-y' >
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(message.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/daily-bible-message/${message.slug}`} >
                    <img src={message.image} alt={postMessage.title} className='w-20 h-20 object-cover bg-gray-500' />
                    </Link>
                    
                  </Table.Cell>
                  <Table.Cell>
                  <Link to={`/daily-bible-message/${message.slug}`} className='font-medium text-gray-500 dark:text-white' >
                    {message.title}
                    </Link>
                    </Table.Cell>
                  <Table.Cell>
                    <Link to={`/daily-bible-message/${message.slug}`} >
                    {message.category}
                    </Link>
                    </Table.Cell>
                  <Table.Cell>
                    <button className='bg-red-500 text-white p-2 rounded-md'>Delete</button>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-daily-bible-message/${message._id}`} >
                    <span className='text-blue-500 hover:underline'>Edit</span>
                    </Link>
                  </Table.Cell>
                  </Table.Row>
                </Table.Body>
                ))}
          </Table>
          </>
        ) : (
          <p>There are no daily bible messages yet!</p>
        )

      }

    </div>
  )
}
