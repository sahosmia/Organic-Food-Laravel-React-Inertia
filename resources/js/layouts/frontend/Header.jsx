import { Link } from "@inertiajs/react";
import logo from "../../assets/logo.png";

function Header() {
  const menus = [
    // {
    //   text: " Pages",
    //   link: "#",
    //   dropdown: [
    //     { text: "Shop", link: "/" },
    //     { text: "Projects", link: "/" },
    //     { text: "News", link: "news" },
    //   ],
    // },
    // { text: "Projects", link: "/" },
    // { text: "News", link: "/" },
  ];
  return (
    <header className="bg-light">
      <nav className="container h-24 flex justify-between items-center gap-1 lg:gap-10">
        {/* logo  */}
        <div className="">
          <Link href="/">
            <img className="w-full" src={logo} alt="organick logo" />
          </Link>
        </div>

        <ul className="hidden lg:flex gap-3 lg:gap-8 items-center font-roboto">
          <li className="group relative transition-all">
            <Link
              className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
              href="/"
            >
              Home
            </Link>
          </li>

          {/* <li className="group relative transition-all">
            <NavLink
              className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
              to="about"
            >
              About
            </NavLink>
          </li> */}

          <li className="group relative transition-all">
            <Link
              className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
              href="shops"
            >
              Shop
            </Link>
          </li>

          <li className="group relative transition-all">
            <Link
              className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
              href="#"
            >
              Page
              <div className="flex items-center transition-all">
                <span className="group-hover:hidden text-sm">
                  <i className="fa-solid fa-angle-down"></i>
                </span>
                <span className="hidden group-hover:block text-sm">
                  <i className="fa-solid fa-angle-up"></i>
                </span>
              </div>
            </Link>

            <ul className="absolute top-6 left-0 w-56 border bg-main text-light rounded p-2 hidden transition-all duration-1000 group-hover:block">
              <li className="p-2 border-b last:border-none">
                <Link href="/protfolio">Protfolio</Link>
              </li>
              <li className="p-2 border-b last:border-none">
                <Link href="/team">Team</Link>
              </li>
            </ul>
          </li>

          <li className="group relative transition-all">
            <Link
              className="text-main flex gap-1 font-semibold hover:text-secondary transition-all"
              href="news"
            >
              News
            </Link>
          </li>

          <li className="flex ">
            <div className="w-10 h-10 bg-secondary rounded-full flex justify-center items-center">
              <img
                src="https://img.icons8.com/ios-glyphs/fafafa/search--v1.png"
                alt="search--v1"
                className="w-5 inline-block"
              />
            </div>
          </li>
          <li className="flex items-center gap-2 rounded-full p-1 border-2 border-slate-200">
            <div className="w-10 h-10 bg-main rounded-full flex justify-center items-center">
              <img
                src="https://img.icons8.com/material-outlined/fafafa/shopping-cart--v1.png"
                alt="shopping-cart--v1"
                className="w-5 inline-block"
              />
            </div>
            <span className="pr-5 text-main font-semibold">Cart (0)</span>
          </li>
        </ul>
        <div className="flex lg:hidden">
          <span>
            <i className="fa-solid fa-bars"></i>
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
