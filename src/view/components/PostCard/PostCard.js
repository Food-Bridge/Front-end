import React from 'react';
import './PostCard.scss';
import { IoIosHeartEmpty } from '@react-icons/all-files/io/IoIosHeartEmpty';
import { FaRegComment } from '@react-icons/all-files/fa/FaRegComment';

function PostCard({ post }) {
  const created = new Date(post.created_at);
  const formedCreated = created.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className='PostCard'>
      <div className='postCard-frame'>
        <header className='postCard-header'>
          <div className='postCard-userInfo'>
            <img rel="preload" className='postCard-userIcon' src={post.author_info.image} alt='userImg' />
            <div className='postCard-userName'>
              {post.author_info.nickname ? post.author_info.nickname : '닉네임'}
            </div>
          </div>

          <div className='postCard-icons'>
            <div className='postCard-likeCount'>
              <h1 className='postCard-fontSize'>
                <IoIosHeartEmpty className='postCard-likeIcon' />
                {post.likes_count}
              </h1>
            </div>
            <div className='postCard-commentCount'>
              <h1 className='postCard-fontSize'>
                <FaRegComment className='postCard-commentIcon' />
                {post.comment_count}
              </h1>
            </div>
          </div>
        </header>

        <div className='postCard-section'>
          {post._img.length > 0 && (
            <div className='postCard-img'>
              <img
                rel="preload"
                className='postCard-imgSize'
                src={post._img[0].image}
                alt='게시물 이미지'
              />
            </div>
          )}
          <div
            className={
              post._img.length > 0
                ? 'postCard-contents'
                : 'postCard-contents noImage'
            }
          >
            <h1 className='postCard-postTitle'>{post.title}</h1>
            <p className='postCard-postWriting'>{post.content}</p>
            <p className='postCard-created'>{formedCreated}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
