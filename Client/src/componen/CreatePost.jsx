import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from './ui/avatar';
import Button from './ui/button';
import { readFileAsDataURL } from '../lib/util';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios'; // Ensure axios is imported
import { setPosts } from '../redux/postSlice';
import Posts from './Posts';
import { useDispatch, useSelector } from 'react-redux';

const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const {posts} = useSelector(store=>store.post);
    const dispatch = useDispatch();

    // Handle file input change
    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl);
        }
    };

    // Handle creating a new post
    const CreatePostHandler = async () => {
        if (!caption || !imagePreview) {
            toast.error('Please provide a caption and an image!');
            return;
        }

        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('image', file);

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setPosts([res.data.post, ...posts]))
                toast.success(res.data.message);
                setCaption('');
                setImagePreview('');
                setFile(null);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                className="bg-white"
            >
                {/* Add DialogTitle and DialogDescription */}
                <DialogTitle className="text-center font-semibold">
                    Create New Post
                </DialogTitle>
                <DialogDescription className="text-center text-gray-500 text-sm">
                    Share your thoughts and images with the community.
                </DialogDescription>

                <div className="flex gap-3 items-center">
                    <Avatar>
                        <AvatarImage src={user?.profilePicture}alt="img" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="font-semibold text-xs">{user?.username}</h1>
                        <span className="text-gray-600 font-semibold text-xs">
                            Bio here...
                        </span>
                    </div>
                </div>
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="focus-visible:ring-transparent border-none bg-white"
                    placeholder="Write a caption..."
                />
                {imagePreview && (
                    <div className="w-full h-64 flex items-center justify-center">
                        <img
                            src={imagePreview}
                            alt="preview_img"
                            className="object-cover h-full w-full rounded-md"
                        />
                    </div>
                )}
                <input
                    ref={imageRef}
                    type="file"
                    className="hidden"
                    onChange={fileChangeHandler}
                />
                <Button
                    onClick={() => imageRef.current.click()}
                    className="w-fit mx-auto bg-[#144BB8] hover:bg-[#DBE2EF]"
                >
                    Select from Device
                </Button>
                {imagePreview && (
                    <div className="mt-4">
                        {loading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                onClick={CreatePostHandler}
                                type="submit"
                                className="w-full"
                            >
                                Post
                            </Button>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreatePost;
