import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function DailyBibleMessagePage() {
  const { dailyBibleMessageSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch main post based on `dailyBibleMessageSlug`
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/get-daily-bible-message?slug=${dailyBibleMessageSlug}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        setPost(data.dailyBibleMessage[0]);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [dailyBibleMessageSlug]); // Runs whenever `dailyBibleMessageSlug` changes

  // Fetch recent posts, runs only once
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/get-daily-bible-message?limit=3`);
        if (!res.ok) throw new Error('Failed to fetch recent posts');
        const data = await res.json();
        setRecentPosts(data.dailyBibleMessage || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecentPosts();
  }, []); // Runs only on component mount

  // Conditional rendering for loading and errors
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error loading content. Please try again later.
      </div>
    );
  }

  const { title, category, image, createdAt, content, _id } = post || {};

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {title}
      </h1>
      <Link to={`/search?category=${category}`} className="self-center mt-5">
        <Button color="gray" size="xs" pill>
          {category}
        </Button>
      </Link>
      <img
        src={image}
        alt={title}
        className="mt-10 w-full h-96 object-cover p-3 max-h-[600px]"
      />
      <div className="flex justify-between p-3 text-xs">
        <span>{new Date(createdAt).toLocaleString()}</span>
        <span>{content && (content.length / 1000).toFixed(0) + ' min read'}</span>
      </div>
      <div
        className="p-3 mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={_id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Posts</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))}
        </div>
      </div>
    </main>
  );
}
