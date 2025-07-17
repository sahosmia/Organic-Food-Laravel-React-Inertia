import { Link } from "@inertiajs/react";
import React from "react";
import logo from '../../assets/logo.png';


function Footer() {
  return (
    <div>
      <div className="container flex flex-col gap-10 py-10 lg:flex-row lg:divide-x">
        <div className="order-1 pr-12 lg:w-1/4 lg:order-none">
          <h6 className="mb-5 text-xl lg:text-right">Contact Us</h6>
          <ul className="flex flex-col gap-5 lg:text-right">
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

        <div className="flex flex-col flex-1 lg:w-1/2 lg:justify-center lg:items-center lg:px-16 lg:text-center">
          <div className="pb-5">
            <Link href="/">
              <img className="inline-block w-40" src={logo} alt="" />
            </Link>
          </div>
          <p className="pb-5">
            Simply dummy text of the printing and typesetting industry. Lorem
            Ipsum simply dummy text of the printing
          </p>

          <ul className="flex gap-1">
            <li>
              <a href="#">
                <span className="flex items-center justify-center w-10 h-10 rounded bg-main/10 text-main">
                  <i className="fa-brands fa-facebook-f"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="flex items-center justify-center w-10 h-10 rounded bg-main/10 text-main">
                  <i className="fa-brands fa-linkedin-in"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="flex items-center justify-center w-10 h-10 rounded bg-main/10 text-main">
                  <i className="fa-brands fa-twitter"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="flex items-center justify-center w-10 h-10 rounded bg-main/10 text-main">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
            </li>
            <li>
              <a href="#">
                <span className="flex items-center justify-center w-10 h-10 rounded bg-main/10 text-main">
                  <i className="fa-brands fa-youtube"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="order-2 lg:w-1/4 lg:pl-12 lg:order-none">
          <h6 className="mb-5 text-xl">Utility Page</h6>
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
        <div className="container flex items-center justify-center h-auto py-5">
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
