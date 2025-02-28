import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../redux/store';
import Button from '../componen/ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = true;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Provide default empty arrays for posts and bookmarks to prevent undefined access
  const displayedPost = activeTab === 'posts' ? userProfile?.posts || [] : userProfile?.bookmarks || [];

  return (
    <div className='flex max-w-4xl justify mx-auto pl-10'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar className='h-32 w-32'>
              <AvatarImage src={userProfile?.profilePicture} alt='profilephoto' />
              <AvatarFallback>
                {userProfile?.username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span>{userProfile?.username || 'Username'}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to='/account/edit'>
                      <Button variant='secondary' className='bg-[#CBDCEB] text-gray-700 hover:bg-[#DBE2EF] h-8 px-3 rounded-xl shadow-sm transition-all duration-150 mr-1'>
                        Edit profile
                      </Button>
                    </Link>
                    <Button variant='secondary' className='bg-[#CBDCEB] text-gray-700 hover:bg-[#DBE2EF] h-8 px-3 rounded-xl shadow-sm transition-all duration-150 mr-1'>
                      View archive
                    </Button>
                    <Button variant='secondary' className='bg-[#CBDCEB] text-gray-700 hover:bg-[#DBE2EF] h-8 px-3 rounded-xl shadow-sm transition-all duration-150 mr-1'>
                      Ad tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button className='bg-[#BCCCDC] hover:bg-[#ED2B2A] text-white font-medium px-4 py-1 rounded-xl shadow-md transition duration-150'>
                      Unfollow
                    </Button>
                    <Button className='bg-[#BCCCDC] hover:bg-blue-600 text-white font-medium px-4 py-1 rounded-xl shadow-md transition duration-150'>
                      Message
                    </Button>
                  </>
                ) : (
                  <Button className='bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1 rounded-xl shadow-md transition duration-150'>
                    Follow
                  </Button>
                )}
              </div>
              <div className='flex items-center gap-4'>
                <p>
                  <span className='font-semibold'>{userProfile?.posts?.length || 0}</span> posts
                </p>
                <p>
                  <span className='font-semibold'>{userProfile?.followers?.length || 0}</span> followers
                </p>
                <p>
                  <span className='font-semibold'>{userProfile?.following?.length || 0}</span> following
                </p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>{userProfile?.bio || 'No bio available'}</span>
                <Badge className='w-fit hover:bg-[#D4EBF8]' variant='secondary'>
                  <AtSign />
                  <span className='pl-1'>{userProfile?.username || 'username'}</span>
                </Badge>
                <span className='text-sm'>A community of innovators pushing the boundaries of tech</span>
                <span className='text-sm'>Shaping tomorrow with technology, creativity, and passion</span>
                <span className='text-sm'>Where ideas turn into tech solutions..!</span>
              </div>
            </div>
          </section>
        </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span
              className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`}
              onClick={() => handleTabChange('posts')}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`}
              onClick={() => handleTabChange('saved')}
            >
              SAVED
            </span>
            <span className='py-3 cursor-pointer'>REELS</span>
            <span className='py-3 cursor-pointer'>TAGS</span>
          </div>
          <div className='grid grid-cols-3 gap-1'>
            {displayedPost?.map((post) => (
              <div key={post?._id} className='relative group cursor-pointer'>
                <img
                  src={post?.image || 'https://via.placeholder.com/150'}
                  alt='postimage'
                  className='rounded-sm my-2 aspect-square object-cover'
                />
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='flex items-center text-white space-x-4'>
                    <Button
                      variant='transparent'
                      className='flex items-center gap-2 hover:text-gray-300 focus:outline-none'
                    >
                      <Heart />
                      <span>{post?.likes?.length || 0}</span>
                    </Button>
                    <Button
                      variant='transparent'
                      className='flex items-center gap-2 hover:text-gray-300 focus:outline-none'
                    >
                      <MessageCircle />
                      <span>{post?.comments?.length || 0}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
