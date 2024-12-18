import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import CommentSection from '../components/CommentSection'

export default function DailyBibleMessagePage() {
  const { dailyBibleMessageSlug } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(null)
 

  useEffect(() => {
    const fetchDailyBibleMessage = async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await fetch(`/api/get-daily-bible-message?slug=${dailyBibleMessageSlug}`)
        const data = await res.json()
        console.log(data)
        if (!res.ok){
          setError(true)
          setLoading(false)
          return;
        }
        if (res.ok) {
          setPost(data.dailyBibleMessage[0])
          setLoading(false)
          setError(false)
        }
        
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
        
      }
  }
    fetchDailyBibleMessage()

  }, [dailyBibleMessageSlug])
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size='xl'/>
    </div>
  )
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 pp-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link to={`/search?category=${post.category}`} className='self-center mt-5'>
        <Button color='gray' size='xs' pill>
          {post && post.category}
        </Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className='mt-10 w-full h-96 object-cover p-3 max-h-[600px]' />
      <div className="flex justify-between p-3 text-xs">
        <span>{post && new Date(post.createdAt).toLocaleString()}</span>
        <span>
        {post && (post.content.length / 1000).toFixed(0) + ' min read'}
  
        </span>
      </div>
      <div className='p-3 mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: post && post.content}}></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id}/>
    </main>
  )
}
