import React from 'react'
import { useLocation } from 'react-router-dom'
import PageBanner from '../component/tools/PageBanner';

function BlogSingle() {
  const location = useLocation();
  return (
    <div>
      <PageBanner bg="bg-banner-blog"  title="Recant Blog"/>
      <div className="container flex">
        <div className='w-3/4 py-20'>
          
          <img className="rounded-xl mb-5" src={location.state.src} alt="" />
          <h2 className='title-md mb-2'>{location.state.title}</h2>
          {/* <p>{ location.state.des}</p> */}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, animi? Dolor, earum reiciendis recusandae, ducimus facilis quas porro autem fugit laboriosam tenetur similique molestiae quos, suscipit ipsam esse vitae harum sequi! Eum laborum quod officiis numquam sapiente ab, facere consequuntur, illum dignissimos id vitae consectetur, sed aperiam nesciunt quos. Vitae.</p>
         
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default BlogSingle