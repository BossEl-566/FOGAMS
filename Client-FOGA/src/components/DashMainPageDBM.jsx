import { Button, Modal, Card } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import { HiOutlineExclamationCircle, HiPlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function DashMainPageDBM() {
  const { currentUser } = useSelector(state => state.user)
  const [messages, setMessages] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/get-daily-bible-message?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok) {
          setMessages(data.dailyBibleMessage)
          if (data.dailyBibleMessage.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.error(error.message)
        toast.error('Failed to load messages')
      }
    }

    if (currentUser.isAdmin) {
      fetchMessages()
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = messages.length;
    try {
      const res = await fetch(`/api/get-daily-bible-message?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json()
      if (res.ok) {
        setMessages(prev => [...prev, ...data.dailyBibleMessage])
        if (data.dailyBibleMessage.length < 9) {
          setShowMore(false)
        }
      }
    } catch (error) {
      console.error(error.message)
      toast.error('Failed to load more messages')
    }
  }

  const handleDeleteMessage = async () => {
    setShowModal(false)
    try {
      const res = await fetch(`/api/delete-daily-bible-message/${deleteId}/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message || 'Failed to delete message')
      } else {
        setMessages(prev => prev.filter(message => message._id !== deleteId))
        toast.success('Message deleted successfully')
      }
    } catch (error) {
      console.error(error.message)
      toast.error('Error deleting message')
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Daily Bible Messages</h1>
        {currentUser.isAdmin && (
          <Link to="/daily-bible-message">
            <Button gradientDuoTone="purpleToBlue" className="flex items-center gap-2">
              <HiPlus className="h-5 w-5" />
              Create New
            </Button>
          </Link>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No messages found</p>
          {currentUser.isAdmin && (
            <Link to="/daily-bible-message" className="mt-4 inline-block">
              <Button gradientDuoTone="purpleToBlue">Create Your First Message</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map(message => (
            <Card key={message._id} className="hover:shadow-lg transition-shadow">
              <div className="relative pb-2/3 h-48">
                <img 
                  src={message.image} 
                  alt={message.title} 
                  className="absolute h-full w-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                    {message.title}
                  </h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                    {message.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Last updated: {new Date(message.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/daily-bible-message/${message.slug}`}
                    className="text-blue-600 hover:underline dark:text-blue-400 text-sm font-medium"
                  >
                    View Message
                  </Link>
                  {currentUser.isAdmin && (
                    <div className="flex gap-2">
                      <Link to={`/update-daily-bible-message/${message._id}`}>
                        <Button color="light" size="xs" className="!p-2">
                          <HiOutlinePencil className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </Button>
                      </Link>
                      <Button 
                        color="failure" 
                        size="xs" 
                        className="!p-2"
                        onClick={() => {
                          setShowModal(true)
                          setDeleteId(message._id)
                        }}
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showMore && messages.length > 0 && (
        <div className="text-center mt-8">
          <Button color="light" onClick={handleShowMore}>
            Load More Messages
          </Button>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-500 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg font-medium text-gray-700 dark:text-gray-300">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteMessage}>
                Yes, delete it
              </Button>
              <Button color="light" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}