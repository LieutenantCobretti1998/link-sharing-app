function MobileOverview({links, getPlatformColor, getPlatformIcon}) {
    return (
        <section className="w-[45%] h-min flex justify-center items-center bg-white pt-10 pb-10 rounded-md border-light-grey">
            <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632">
                <path stroke="#737373"
                      d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"/>
                <path fill="#fff" stroke="#737373"
                      d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"/>
                <defs>
                    <clipPath id="screenClip">
                        <rect
                            x="12"
                            y="40"
                            width="284"
                            height="565"
                            rx="28"
                            ry="28"/>
                    </clipPath>
                </defs>
                <image
                    href="../../images/background-images/pexels-chinar-minar-1265133847-25724597.jpg"
                    x="12"
                    y="40"
                    width="284"
                    height="565"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#screenClip)"
                >

                </image>
                <circle cx="153.5" cy="112" r="48" fill="#EEE"/>
                <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8"/>
                <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4"/>
                <rect width="80" height="8" x="113" y="235" fill="#EEE" rx="4"/>
                {links.map((link, index) => (
                    <g key={link.id}>
                        <rect
                            width="237"
                            height="44"
                            x="35"
                            y={278 + index * 64}
                            fill={getPlatformColor(link.label)}
                            rx="8"
                        />
                        <g transform={`translate(45, ${292 + index * 64})`}>
                            {getPlatformIcon(link.label)}
                        </g>
                        <text
                            x="70"
                            y={305 + index * 64}  /* Text positioning inside the rect */
                            fontSize="14"
                            fill="white"
                        >
                            {link.label || `Link #${index + 1}`}
                        </text>
                        <g transform={`translate(250, ${292 + index * 64})`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                                 viewBox="0 0 16 16">
                                <path fill="#fff"
                                      d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"/>
                            </svg>
                        </g>
                    </g>
                ))}
            </svg>
        </section>
    );
}

export default MobileOverview;