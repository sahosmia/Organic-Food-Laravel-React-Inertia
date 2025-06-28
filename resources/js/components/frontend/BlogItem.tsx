import React from "react";
import { Link } from "@inertiajs/react";

function BlogItem({ blog }) {

  return (

        <div  className="relative mb-60 ">
          <img className="rounded-xl w-full" src={blog.thumbnail_url} alt={`blog-${blog.title}`} />

          <ul className="bg-light text-main text-xl font-bold rounded-full w-20 h-20  absolute top-4 md:top-8 left-4 md:left-8 flex flex-col justify-center items-center">
            <li>25</li>
            <li>Nov</li>
          </ul>

          <div className="bg-light absolute -bottom-40 left-5 right-5 rounded-xl px-4 md:px-12 py-3 md:py-10 shadow">
            <div className="flex gap-2 pb-2">
              <span className="text-yellowca">
                <i className="fa-solid fa-user"></i>
              </span>
              <span className="text-main text-opensans">
                By {blog.author}
              </span>
            </div>
            <h2 className="title-sm pb-2">{blog.title}</h2>
            <p className="pb-5">{blog.description}</p>
            <Link
               href={`/blogs/${blog.id}`}
                state={blog}
              className="text-main font-bold rounded-xl flex items-center gap-2"
            >
              Read More
              <span className="text-light bg-main w-7 h-7 rounded-full text-center flex justify-center items-center">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>

  );
}


export default BlogItem;
