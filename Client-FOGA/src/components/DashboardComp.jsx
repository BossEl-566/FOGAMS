import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiArrowNarrowDown,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartPie,
  HiTrendingUp,
  HiCalendar
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function DashboardComp() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const [userGrowth, setUserGrowth] = useState(0);
    const [postGrowth, setPostGrowth] = useState(0);
    const [commentGrowth, setCommentGrowth] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
              const res = await fetch('/api/user/getusers?limit=5');
              const data = await res.json();
              if (res.ok) {
                setUsers(data.users);
                setTotalUsers(data.totalUsers);
                setLastMonthUsers(data.totalLastMonthUsers);
                setUserGrowth(((data.totalLastMonthUsers / (data.totalUsers - data.totalLastMonthUsers)) * 100).toFixed(2));
              }
            } catch (error) {
              console.log(error.message);
            }
        };
        const fetchPosts = async () => {
            try {
              const res = await fetch(`/api/get-daily-bible-message?limit=5`);
              const data = await res.json();
              if (res.ok) {
                setPosts(data.dailyBibleMessage);
                setTotalPosts(data.totalDailyMessage);
                setLastMonthPosts(data.lastMonthDailyMessage);
                setPostGrowth(((data.lastMonthDailyMessage / (data.totalDailyMessage - data.lastMonthDailyMessage)) * 100).toFixed(2));
              }
            } catch (error) {
              console.log(error.message);
            }
        };
        const fetchComments = async () => {
            try {
              const res = await fetch(`/api/comment/getcomments?limit=5`);
              const data = await res.json();
              if (res.ok) {
                setComments(data.comments);
                setTotalComments(data.totalComments);
                setLastMonthComments(data.lastMonthComments);
                setCommentGrowth(((data.lastMonthComments / (data.totalComments - data.lastMonthComments)) * 100).toFixed(2));
              }
            } catch (error) {
              console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser]);

    // Data for donut chart
    const donutData = {
        labels: ['Users', 'Posts', 'Comments'],
        datasets: [
            {
                data: [totalUsers, totalPosts, totalComments],
                backgroundColor: [
                    'rgba(13, 148, 136, 0.8)',  // teal
                    'rgba(101, 163, 13, 0.8)',   // lime
                    'rgba(79, 70, 229, 0.8)'     // indigo
                ],
                borderColor: [
                    'rgba(13, 148, 136, 1)',
                    'rgba(101, 163, 13, 1)',
                    'rgba(79, 70, 229, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Data for bar chart
    const barData = {
        labels: ['Users', 'Posts', 'Comments'],
        datasets: [
            {
                label: 'Last Month',
                data: [lastMonthUsers, lastMonthPosts, lastMonthComments],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
            },
            {
                label: 'Total',
                data: [totalUsers, totalPosts, totalComments],
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
            },
        ],
    };

    return (
        <div className='p-4 md:p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>Dashboard Overview</h1>
                <div className='flex items-center space-x-2 text-sm'>
                    <HiCalendar className='text-gray-500' />
                    <span className='text-gray-500'>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>Total Users</p>
                            <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>{totalUsers}</h3>
                            <div className={`flex items-center mt-2 ${userGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {userGrowth >= 0 ? <HiArrowNarrowUp className='mr-1' /> : <HiArrowNarrowDown className='mr-1' />}
                                <span className='text-sm font-medium'>{userGrowth}% vs last month</span>
                            </div>
                        </div>
                        <div className='p-3 rounded-lg bg-teal-100 dark:bg-teal-900'>
                            <HiOutlineUserGroup className='text-teal-600 dark:text-teal-300 text-2xl' />
                        </div>
                    </div>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>Total Posts</p>
                            <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>{totalPosts}</h3>
                            <div className={`flex items-center mt-2 ${postGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {postGrowth >= 0 ? <HiArrowNarrowUp className='mr-1' /> : <HiArrowNarrowDown className='mr-1' />}
                                <span className='text-sm font-medium'>{postGrowth}% vs last month</span>
                            </div>
                        </div>
                        <div className='p-3 rounded-lg bg-lime-100 dark:bg-lime-900'>
                            <HiDocumentText className='text-lime-600 dark:text-lime-300 text-2xl' />
                        </div>
                    </div>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>Total Comments</p>
                            <h3 className='text-2xl font-bold text-gray-800 dark:text-white mt-1'>{totalComments}</h3>
                            <div className={`flex items-center mt-2 ${commentGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {commentGrowth >= 0 ? <HiArrowNarrowUp className='mr-1' /> : <HiArrowNarrowDown className='mr-1' />}
                                <span className='text-sm font-medium'>{commentGrowth}% vs last month</span>
                            </div>
                        </div>
                        <div className='p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900'>
                            <HiAnnotation className='text-indigo-600 dark:text-indigo-300 text-2xl' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>Content Distribution</h3>
                        <HiChartPie className='text-gray-500' />
                    </div>
                    <div className='h-64'>
                        <Doughnut 
                            data={donutData} 
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'right',
                                        labels: {
                                            color: '#6B7280',
                                            font: {
                                                size: 12
                                            }
                                        }
                                    }
                                }
                            }} 
                        />
                    </div>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6'>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>Monthly Growth</h3>
                        <HiTrendingUp className='text-gray-500' />
                    </div>
                    <div className='h-64'>
                        <Bar 
                            data={barData} 
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false
                                        },
                                        ticks: {
                                            color: '#6B7280'
                                        }
                                    },
                                    y: {
                                        grid: {
                                            color: 'rgba(229, 231, 235, 0.5)'
                                        },
                                        ticks: {
                                            color: '#6B7280'
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#6B7280',
                                            font: {
                                                size: 12
                                            }
                                        }
                                    }
                                }
                            }} 
                        />
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Recent Users */}
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
                    <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>Recent Users</h3>
                        <Button size="xs" gradientDuoTone="purpleToBlue">
                            <Link to={'/dashboard?tab=users'}>View All</Link>
                        </Button>
                    </div>
                    <div className='p-4'>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell className='bg-gray-50 dark:bg-gray-700'>User</Table.HeadCell>
                                <Table.HeadCell className='bg-gray-50 dark:bg-gray-700'>Joined</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className='divide-y divide-gray-200 dark:divide-gray-700'>
                                {users.map((user) => (
                                    <Table.Row key={user._id} className='bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'>
                                        <Table.Cell className='flex items-center space-x-3'>
                                            <img
                                                src={user.profilePicture}
                                                alt={user.username}
                                                className='w-8 h-8 rounded-full'
                                            />
                                            <span className='font-medium text-gray-900 dark:text-white'>{user.username}</span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>

                {/* Recent Posts */}
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
                    <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>Recent Posts</h3>
                        <Button size="xs" gradientDuoTone="purpleToBlue">
                            <Link to={'/dashboard?tab=daily-bible-message'}>View All</Link>
                        </Button>
                    </div>
                    <div className='p-4'>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell className='bg-gray-50 dark:bg-gray-700'>Title</Table.HeadCell>
                                <Table.HeadCell className='bg-gray-50 dark:bg-gray-700'>Category</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className='divide-y divide-gray-200 dark:divide-gray-700'>
                                {posts.map((post) => (
                                    <Table.Row key={post._id} className='bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'>
                                        <Table.Cell className='max-w-xs truncate'>
                                            {post.title}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className='px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'>
                                                {post.category}
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>

                {/* Recent Comments */}
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden'>
                    <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700'>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>Recent Comments</h3>
                        <Button size="xs" gradientDuoTone="purpleToBlue">
                            <Link to={'/dashboard?tab=comments'}>View All</Link>
                        </Button>
                    </div>
                    <div className='p-4'>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell className='bg-gray-50 dark:bg-gray-700'>Comment</Table.HeadCell>
                                <Table.HeadCell className='bg-gray-50 dark:bg-gray-700'>Likes</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className='divide-y divide-gray-200 dark:divide-gray-700'>
                                {comments.map((comment) => (
                                    <Table.Row key={comment._id} className='bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'>
                                        <Table.Cell className='max-w-xs'>
                                            <p className='line-clamp-2 text-sm'>{comment.content}</p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className='flex items-center'>
                                                <HiArrowNarrowUp className='text-green-500 mr-1' />
                                                {comment.numberOfLikes}
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}