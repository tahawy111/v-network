import { AuthState } from '@/redux/features/auth';
import { IComment, IPost } from '@/types/typescript';
import { } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface CommentMenuProps {
    comment: IComment;
    post: IPost;
    auth: AuthState;
}

export default function CommentMenu({ post, comment, auth }: CommentMenuProps) {
    return <div>
        {
            (post.user._id === auth.user?._id || comment.user._id === auth.user?._id) && (
                <div>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger className="group" asChild>
                            <div className="flex items-center md:ml-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6 rotate-90">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="dark:bg-neutral-800 dark:border-gray-300/30 border border-gray-300 dark:text-black bg-white rounded-sm p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                sideOffset={ -5 }
                            >
                                {
                                    auth.user?._id === comment.user._id &&
                                    (
                                        <>
                                            <DropdownMenu.Item className="my-1 group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-neutral-600 hover:text-white">
                                                <div className="flex gap-x-2 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                    <span>Edit Comment</span>
                                                </div>
                                            </DropdownMenu.Item>
                                            <DropdownMenu.Item className="my-1 group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center px-[5px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 hover:bg-neutral-600 hover:text-white">
                                                <div className="flex gap-x-2 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>

                                                    <span>Remove Comment</span>
                                                </div>
                                            </DropdownMenu.Item>
                                        </>
                                    )
                                }
                                <DropdownMenu.Arrow className="fill-white" />
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </div>
            )
        }
    </div>;
}
