import React, { useRef, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiStickyNoteAddLine } from "react-icons/ri";
import { RiCalendar2Line } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { RiHome4Line } from "react-icons/ri";

const NAV_ITEMS = [
    { to: "/", Icon: (props) => <i><RiHome4Line style={{ fontSize: "2rem", ...props.style }} className={props.className || ''} /> </i>, label: "Home" },
    { to: "/timer", Icon: (props) => <i><MdOutlineTimer style={{ fontSize: "2.2rem", ...props.style }} className={props.className || ''} /> </i>, label: "Timer" },
    { to: "/calendar", Icon: (props) => <i><RiCalendar2Line style={{ fontSize: "2rem", ...props.style }} className={props.className || ''} /> </i>, label: "Calendar" },
    { to: "/note", Icon: (props) => <i><RiStickyNoteAddLine style={{ fontSize: "1.9rem", ...props.style }} className={props.className || ''} /> </i>, label: "Note" },
];

function Navbar() {
    const location = useLocation();
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [circleStyle, setCircleStyle] = useState({ opacity: 0, top: 0, left: 0 });

    const activeIndex = NAV_ITEMS.findIndex(item => location.pathname === item.to);

    useLayoutEffect(() => {
        if (
            activeIndex !== -1 &&
            itemRefs.current[activeIndex] &&
            containerRef.current
        ) {
            const containerRect = containerRef.current.getBoundingClientRect();

            // Get the icon
            const iconElement = itemRefs.current[activeIndex].querySelector('i');
            if (!iconElement) return;
            const iconRect = iconElement.getBoundingClientRect();

            // Calculate position relative to container
            const top = iconRect.top - containerRect.top + (iconRect.height / 2) - 24 - 3;
            const left = iconRect.left - containerRect.left + (iconRect.width / 2) - 24 - 3;

            setCircleStyle({
                opacity: 1,
                top: top,
                left: left,
            });
        } else {
            setCircleStyle({ opacity: 0, top: 0, left: 0 });
        }
    }, [activeIndex, location.pathname]);

    return (
        // The Main Container
        <div
            ref={containerRef}
            className="bg-[#819267] h-[43%] w-1 shadow-[4px_4px_1px_0_#2F3E2F] fixed right-10 z-100  px-[30px] rounded-2xl flex flex-col justify-around items-center border-3 border-neutral-700"
        >
            {/* The Active Circle */}
            <span
                style={{
                    position: "absolute",
                    width: 48,
                    height: 48,
                    borderRadius: "8px",
                    background: "#ffffff5d",
                    border: "2px",
                    zIndex: 0,
                    top: circleStyle.top,
                    left: circleStyle.left,
                    opacity: circleStyle.opacity,
                    transition: "top 0.4s cubic-bezier(0.4,0,0.2,1), left 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
                    pointerEvents: "none",
                }}
            />

            {/* The Nav Items */}
            {NAV_ITEMS.map((item, idx) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className="flex justify-center items-center flex-[1_1_90px] relative group"
                    aria-label={item.label}
                    ref={el => (itemRefs.current[idx] = el)}
                    tabIndex={0}
                >
                    <span
                        className={`
                            flex justify-center items-center z-10 
                            text-[#cee2ce]
                            ${location.pathname === item.to
                                ? "text-white"
                                : "hover:opacity-50 transition-all duration-300"
                            }
                        `}
                    >
                        <item.Icon className="text-center flex justify-center items-center" />
                    </span>
                </Link>
            ))}
        </div>
    );
}

export default Navbar;