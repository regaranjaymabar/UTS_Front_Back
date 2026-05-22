import { NavLink } from "react-router-dom";
interface NavLinkProps{
    label: string;
    href: string;
    icon?: React.ReactNode;
    isActive?:boolean;
}

export const NavbarLink: React.FC<NavLinkProps> = ({
    label,
    href,
    icon,

}) => {
    const activeStyle = "text-red-900";
    const defaultStyle = "text-slate-600 hover:text-slate-800";
    return(
        <NavLink
        to={href}
        className={({isActive})=> 
        `flex items-ceter gap-2 px-4 py-2 font-medium transition-all duration-200 ${isActive ? activeStyle : defaultStyle}`}
        >
            {icon && <span className="w-5 h-5">{icon}</span>}
            <span>{label}</span>
        </NavLink>
    );
};