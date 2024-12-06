import { Button, Modal, Table } from 'flowbite-react'
import { set } from 'mongoose'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function DashMainPageDBM() {
  const { currentUser} = useSelector(state => state.user)
  const [dailyBibleMessage, setDailyBibleMessage] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState('') 
  useEffect(() => {
    const fetchDailyBibleMessage = async () => {
      try {
        const res = await fetch(`/api/get-daily-bible-message?userId=${currentUser._id}`)
        const data = await res.json()
        console.log(data)
        if(res.ok) {
          setDailyBibleMessage(data.dailyBibleMessage)
          if(data.dailyBibleMessage.length < 9) {
            setShowMore(false);
          }
        
      }
     } catch (error) {
        console.log(error.message)
        
      }
  }
  if(currentUser.isAdmin) {
    fetchDailyBibleMessage()
  }

}, [currentUser._id])
const handleShowMore = async () => {
  const startIndex = dailyBibleMessage.length;
  try {
    const res = await fetch(`/api/get-daily-bible-message?userId=${currentUser._id}&startIndex=${startIndex}`);
    const data = await res.json();
    if(res.ok) {
      setDailyBibleMessage((prev) => [...prev, ...data.dailyBibleMessage]);
      if(data.dailyBibleMessage.length < 9) {
        setShowMore(false);
      }
    }
    
    
  } catch (error) {
    console.log(error.message)
    
  }
 
}
const handleDeleteMessage = async () => {
  setShowModal(false);
  try {
    const res = await fetch(`/api/delete-daily-bible-message/${deleteId}/${currentUser._id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if(!res.ok) {
      console.log(data.message);
    } else {
      setDailyBibleMessage((prev) => prev.filter((message) => message._id !== deleteId));
    } 
     
  } catch (error) {
    console.log(error.message)
    
  }
};

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-blue-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
              {
          currentUser.isAdmin && (
            <Link to={'/daily-bible-message'}>
            <Button type='button' className='w-full mb-2' outline>Create Bible Message</Button>
            </Link>
            
          )
        }
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
                    <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => {
                      setShowModal(true);
                      setDeleteId(message._id);
                    }}>Delete</button>
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
          {showMore && (<button className='w-full text-teal-500 self-center text-sm py-7' onClick={handleShowMore}>Show More</button>)}
          </>
        ) : (
          <p>There are no daily bible messages yet!</p>
        )}
            <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your message? 
            </h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeleteMessage}>Yes I'm Sure</Button>
              <Button color='gray' onClick={()=>setShowModal(false)}>Cancel</Button>
            </div>
          </div>
          </Modal.Body>
      </Modal>

    </div>
  )
}
