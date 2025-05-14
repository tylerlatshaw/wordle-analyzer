"use client";

import Link from "next/link";
import SvgIcon from "@mui/icons-material/Home";
import { footerSocialLinks, navigationLinks, supplementalLinks } from "../../app/lib/navigation-links";

export default function Footer() {

    const linkClasses = "w-full text-blue-300 no-underline hover:text-green-500 text-center";

    const socialLinks = footerSocialLinks.map((link) =>
        <div key={link.display} className="flex justify-items-center px-6">
            <a href={link.link} className="group block" target="_blank">
                <div className="flex items-center">
                    <SvgIcon component={link.icon} className="group-hover:text-green-500 text-3xl md:text-2xl" />&nbsp;
                    <span className="desktop-only group-hover:text-green-500">{link.display}</span>
                </div>
            </a>
        </div>
    );

    const primaryLinks = navigationLinks.map((menuItem) =>
        <div key={menuItem.display} className="flex justify-items-center px-6">
            <Link href={menuItem.link} className={linkClasses}>{menuItem.display}</Link>
        </div>
    );

    const secondaryLinks = supplementalLinks.map((menuItem) =>
        <div key={menuItem.display} className="flex justify-items-center px-6">
            <Link href={menuItem.link} className={linkClasses}>{menuItem.display}</Link>
        </div>
    );

    const copyright = <>
        <div className="w-full pt-6 text-md fade-in text-gray-400">
            <div className="text-center" id="copyright">
                Website &copy; {new Date().getFullYear()} <a href="http://tylerlatshaw.com" target="_blank" className="hover:text-green-500">Tyler J. Latshaw</a>. |  Wordle&trade; 2023 The New York Times.<br />All rights reserved.
            </div>
        </div>
    </>;

    return (
        <>
            <div className="h-2 bg-gradient-to-r from-green-500 via-stone-500 to-yellow-400"></div>
            <div className="w-full pb-8 md:py-8 px-3 bg-gray-900 text-white">
                <div className="container mx-auto">
                    <div className="flex flex-col">

                        <div className="flex flex-col content-start w-fit mx-auto py-6 space-y-8">
                            <div className="flex w-full justify-center mb-12">
                                <Link className="text-white hover:text-green-500 no-underline hover:no-underline font-bold text-3xl" href="/">
                                    <span className="logo-full">Wordle Analyzer</span>
                                </Link>
                            </div>

                            <div className="flex w-full justify-center divide-x-2">
                                {socialLinks}
                            </div>

                            <div className="flex flex-col md:flex-row w-full justify-center md:divide-x-[1px] md:divide-gray-500">
                                {primaryLinks}
                                {secondaryLinks}
                            </div>
                        </div>

                    </div>
                    {copyright}
                </div>
            </div>
        </>
    );
}