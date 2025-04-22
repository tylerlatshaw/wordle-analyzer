import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";

import type { FooterSocialType } from "./type-library";

export type navigationLinkType = {
    display: string,
    link: string,
    filepath: string
}

export const navigationLinks: navigationLinkType[] = [
    {
        display: "Home",
        link: "/",
        filepath: "src/app/page.tsx"
    },
    {
        display: "Previous Words",
        link: "/previous-words",
        filepath: "src/app/previous-words/page.tsx"
    },
    {
        display: "Possible Words",
        link: "/possible-words",
        filepath: "src/app/possible-words/page.tsx"
    },
    {
        display: "Letter Ranking",
        link: "/letter-ranking",
        filepath: "src/app/letter-ranking/page.tsx"
    }
];

export const supplementalLinks: navigationLinkType[] = [
    {
        display: "Privacy Policy",
        link: "/privacy-policy",
        filepath: "src/app/privacy-policy/page.tsx"
    },
    {
        display: "Sitemap",
        link: "/sitemap.xml",
        filepath: "src/app/sitemap.xml"
    }
];

export const footerSocialLinks: FooterSocialType[] = [
    {
        display: "tyler@tylerlatshaw.com",
        link: "mailto:tyler@tylerlatshaw.com",
        icon: MailOutlineIcon
    },
    {
        display: "Connect With Me On LinkedIn",
        link: "https://www.linkedin.com/in/tylerlatshaw/",
        icon: LinkedInIcon
    },
    {
        display: "Find My Code on GitHub",
        link: "https://github.com/tylerlatshaw",
        icon: GitHubIcon
    }
];