"use client";

import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";
import { navigationLinks } from "../../app/lib/navigation-links";

import HomeIcon from "@mui/icons-material/Home";
import AbcIcon from "@mui/icons-material/Abc";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import router from "next/router";

type iconLookupType = {
    display: string
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">>
}

const mobileLinkIcons: iconLookupType[] = [
    {
        display: "Home",
        icon: HomeIcon,
    },
    {
        display: "Letter Ranking",
        icon: AbcIcon,
    },
    {
        display: "Possible Words",
        icon: ArticleIcon,
    },
    {
        display: "Previous Words",
        icon: CalendarMonthIcon,
    }
];

function lookupMobileIcon(pageName: string) {
    return mobileLinkIcons.find(mobileLinkIcons => mobileLinkIcons.display === pageName)?.icon ?? HomeIcon;
}

export default function Navigation() {

    let mobileMenuButtonColor = "#FFFFFF";

    const [isOpen, setIsOpen] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOpen ? mobileMenuButtonColor = "#22c55e" : mobileMenuButtonColor = "#FFFFFF";

    if (typeof document !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isOpen ? document.documentElement.style.overflow = "hidden" : document.documentElement.style.overflow = "scroll";
    }

    const desktopMenuList = navigationLinks.map((menuItem) =>
        <Link key={menuItem.display} href={menuItem.link} className="py-4 px-2 text-white no-underline hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
            {menuItem.display}
        </Link>
    );

    const mobileMenuList = navigationLinks.map((menuItem) =>
        <div key={menuItem.display} className="mobile-menu group flex items-center w-full">
            <li className="flex items-center w-full group-hover:text-green-500">
                <Link key={menuItem.display} href={menuItem.link} onClick={() => { router.push(menuItem.link); setIsOpen(false); }} className="flex items-center w-full">
                    <SvgIcon component={lookupMobileIcon(menuItem.display)} className="inline-block align-middle text-4xl" />
                    <span className="inline-block align-top rounded-md px-3 py-3 group-hover:font-semibold">{menuItem.display}</span>
                </Link>
            </li>
        </div>
    );

    return (
        <>
            <nav className="fixed md:absolute w-full right-0 top-0 z-30 bg-gray-900 text-white">
                <div className="container mx-auto p-3">
                    <div className="flex justify-between">

                        {/* Logo */}
                        <div className="flex space-x-7">
                            <div className="m-auto">
                                <Link className="flex items-center text-white no-underline hover:no-underline font-black hover:text-yellow-500 text-2xl lg:text-3xl" href="/">
                                    <span className="logo-full py-1">Wordle Analyzer</span>
                                </Link>
                            </div>
                        </div>

                        {/* Navbar items */}
                        <div className="hidden md:flex items-center space-x-3">
                            {desktopMenuList}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center z-50">
                            <button className="outline-none">
                                <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} rounded label="Show menu" color={mobileMenuButtonColor} hideOutline={false} />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen ? <>
                    <div className="w-full h-full fixed flex items-center top-0 left-0 bg-gray-900 md:hidden shadow p-3 z-40">
                        <div className="mobile-menu fixed block w-full p-8 text-2xl leading-none">
                            <ul className="space-y-10 w-full">
                                {mobileMenuList}
                            </ul>
                        </div>
                    </div>
                </> : null}
            </nav>

        </>
    );
}