import { Link } from "@inertiajs/react";
import React from "react";

function Footer() {
  return (
    <div>
      <div className="container py-10 flex flex-col lg:flex-row lg:divide-x gap-10">
        <div className="lg:w-1/4 pr-12 order-1 lg:order-none">
          <h6 className="text-xl lg:text-right mb-5">Contact Us</h6>
          <ul className="lg:text-right flex flex-col gap-5">
            <li className="">
              <h6 className="text-md">Email</h6>
              <p>sahosmia.webdev@gmail.com</p>
            </li>
            <li className="">
              <h6 className="text-md">Phone</h6>
              <p>01952827301</p>
            </li>
            <li className="">
              <h6 className="text-md">Address</h6>
              <p>Chuadanga, Bangladesh</p>
            </li>
          </ul>
        </div>

        <div className="flex-1 lg:w-1/2 flex flex-col lg:justify-center lg:items-center lg:px-16 lg:text-center">
          <div className="pb-5">
            <Link href="/">
              <img className="inline-block w-40" src="/img/logo.png" alt="" />
            </Link>
          </div>
          <p className="pb-5">
            Simply dummy text of the printing and typesetting industry. Lorem
            Ipsum simply dummy text of the printing
          </p>

          <ul className="flex gap-1">
            <li>
              <a href="#">
                <span className="bg-main/10 w-10 h-10 flex items-center justify-center rounded text-main">
                  <i className="fa-brands fa-facebook-f"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="bg-main/10 w-10 h-10 flex items-center justify-center rounded text-main">
                  <i className="fa-brands fa-linkedin-in"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="bg-main/10 w-10 h-10 flex items-center justify-center rounded text-main">
                  <i className="fa-brands fa-twitter"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="bg-main/10 w-10 h-10 flex items-center justify-center rounded text-main">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="bg-main/10 w-10 h-10 flex items-center justify-center rounded text-main">
                  <i className="fa-brands fa-youtube"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:w-1/4 lg:pl-12 order-2 lg:order-none">
          <h6 className="text-xl  mb-5">Utility Page</h6>
          <ul className="flex flex-col gap-5">
            <li>
              <a className="font-opensans text-dark" href="#">
                Style Guide
              </a>
            </li>
            <li>
              <a className="font-opensans text-dark" href="#">
                404 Not Found
              </a>
            </li>
            <li>
              <a className="font-opensans text-dark" href="#">
                Password Protected
              </a>
            </li>
            <li>
              <a className="font-opensans text-dark" href="#">
                Licences
              </a>
            </li>
            <li>
              <a className="font-opensans text-dark" href="#">
                Changelog
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* bottom footer  */}
      <div className="border-t">
        <div className="container flex justify-center items-center h-auto py-5">
          <p className="">
            Copyright © <span className="font-bold">Organick</span> | Designed
            by
            <span className="font-bold">Sahos Mia</span> Templates - Powered by
            Webflow
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
