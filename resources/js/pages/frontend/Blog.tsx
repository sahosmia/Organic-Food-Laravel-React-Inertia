import React from "react";

import PageBanner from "@/components/frontend/tools/PageBanner";
import { Head } from "@inertiajs/react";
import FrontLayout from "@/layouts/front-layout";

import bannerImage from "@/assets/banner/banner-portfolio.png";
import BlogItem from "@/components/frontend/BlogItem";

function Blog({ blogs }: { blogs: { data: any[] } }) {

    return (
        <>

            <FrontLayout >

                <Head title="Blogs"></Head>
                <PageBanner bg={bannerImage} title="Recent Blogs" />
                <div className="py-20">
                    <div className="container grid  lg:grid-cols-2 gap-4 mt-5">
                        {blogs.data.map((blog, i) => (
                            <BlogItem blog={blog} key={i} />
                        ))}
                    </div>
                </div>

            </FrontLayout>
        </>
    );
}

export default Blog;
