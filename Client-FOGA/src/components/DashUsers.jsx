import { Button, Modal, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { toast } from 'react-hot-toast'


export default function DashUsers() {
  const { currentUser} = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState('') 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if(res.ok) {
          setUsers(data.users)
          if(data.users.length < 9) {
            setShowMore(false);
          }
        
      }
     } catch (error) {
      toast.error("Failed to fetch users!")
        console.log(error.message)
        
      }
  }
  if(currentUser.isAdmin) {
    fetchUsers()
  }

}, [currentUser._id])
const handleShowMore = async () => {
  const startIndex = users.length;
  try {
    const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
    const data = await res.json();
    if(res.ok) {
      setUsers((prev) => [...prev, ...data.users]);
      if(data.users.length < 9) {
        setShowMore(false);
        
      }
    }
    
    
  } catch (error) {
    console.log(error.message)
    toast.error("Failed to load more users!")
    
  }
 
}
const handleDeleteUser = async () => {
  try {
    const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
      method: 'DELETE',
    });
    const data = await res.json();
      if(res.ok) {
        setUsers((prev) => prev.filter(user => user._id !== userIdToDelete));
        setShowModal(false);
        toast.success("User deleted successfully!")
      } else {
        toast.error(data.message || "Failed to delete user.")
        console.log(data.message)
      }

  } catch (error) {
    toast.error("Error deleting user!")
    console.log(error.message)
    
  }
}


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-blue-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser.isAdmin && users.length > 0 ? (
          <>
          <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>DATE CREATED</Table.HeadCell>
                <Table.HeadCell>USER IMAGE</Table.HeadCell>
                <Table.HeadCell>USERNAME</Table.HeadCell>
                <Table.HeadCell>EMAIL</Table.HeadCell>
                <Table.HeadCell>ADMIN</Table.HeadCell>
                <Table.HeadCell>PASTOR</Table.HeadCell>
                <Table.HeadCell>DEPT HEAD</Table.HeadCell>
                <Table.HeadCell>MEMBER</Table.HeadCell>
                <Table.HeadCell>DELETE</Table.HeadCell>
                <Table.HeadCell>
                  <span>EDIT</span>
                </Table.HeadCell>
              </Table.Head>
              {users.map((user) => (
                <Table.Body className='divide-y' key={user._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(user.createdAt))}</Table.Cell>
                  <Table.Cell>

                <img src={user.profilePicture} alt={user.username} className='w-20 h-10 object-cover bg-gray-500 rounded-full' />
                    
                  </Table.Cell>
                  <Table.Cell>

                    {user.username}
                    </Table.Cell>
                  <Table.Cell>

                    {user.email}

                    </Table.Cell>
                    <Table.Cell>

{user.isAdmin ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}

</Table.Cell>
<Table.Cell>

{user.isPastor ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}

</Table.Cell>
<Table.Cell>

{user.isDeptHead ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}

</Table.Cell>
<Table.Cell>

{user.isMember ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500'/>)}

</Table.Cell>

                  <Table.Cell>
                    <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }}>Delete</button>
                  </Table.Cell>
                  <Table.Cell>

                    <span className='text-blue-500 hover:underline'>Edit</span>

                  </Table.Cell>
                  </Table.Row>
                </Table.Body>
                ))}
          </Table>
          {showMore && (<button className='w-full text-teal-500 self-center text-sm py-7' onClick={handleShowMore}>Show More</button>)}
          </>
        ) : (
          <p>There are no user yet!</p>
        )}
            <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user? 
            </h3>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeleteUser}>Yes I'm Sure</Button>
              <Button color='gray' onClick={()=>setShowModal(false)}>Cancel</Button>
            </div>
          </div>
          </Modal.Body>
      </Modal>

    </div>
  )
}
