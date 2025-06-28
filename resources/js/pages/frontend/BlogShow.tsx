import PageBanner from '@/components/frontend/tools/PageBanner';
import FrontLayout from '@/layouts/front-layout';
import { Head } from '@inertiajs/react';

import bannerImage from "@/assets/banner/banner-portfolio.png";
import { describe } from 'node:test';
import React from 'react'

function BlogShow({ blog }: { blog: any }) {
    //console.log("Blog in BlogShow:", blog);

  return (
      <FrontLayout>
          <Head title={blog.title} />
            <PageBanner bg={bannerImage} title="Blog Details" />
      <div className="container flex">
        <div className='w-3/4 py-20'>

          <img className="rounded-xl mb-5" src= "thumbnail_url"  alt="" />
          <h2 className='title-md mb-2'>{blog.title}</h2>

            <p>{ blog.description}</p>

        </div>
        <div></div>
      </div>
    </FrontLayout>
  );
}

export default BlogShow;
