import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()

    const navLinks = [
        { to: '/', label: 'Inicio' },
        { to: '/transparencia', label: 'Transparencia' },
        { to: '/admin', label: 'Admin' },
    ]

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path);
    }

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-[100] h-[72px] md:h-[72px]"
            style={{
                background: 'rgba(246, 241, 232, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(163, 158, 148, 0.12)'
            }}
        >
            <div className="max-w=[1200px] mx-auto h-full flex items-center justify-between px-6 lg:px-10">
                <Link
                    to="/"
                    className="font-display font-semibold text-sm tracking-[2px] text-charcoal uppercase"
                >
                    Associacao Espirita Chico Xavier
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`font-display font-medium text-sm tracking-[0.5px] relative pb-1 transtion-colors duration-200 ${
                                isActive(link.to)
                                    ? 'text-deep-teal'
                                    : 'text-slate hover:text-deep-teal'
                            }`}
                        >
                            {link.label}
                            <span
                                className={`absolute bottom-0 left-0 h-[2px] bg-deep-teal transition-all duration-200 ${
                                    isActive(link.to) ? 'w-full' : 'w-0'
                                }`}
                            />
                            <span className="absolute bottom-0 left-0 h-[2px] bg-deep-teal w=0 group-hover:w-full transition-all duration-200" />
                            {!isActive(link.to) && (
                                <span className="absolute bottom-0 left-0 h-[2px] bg-deep-teal w-0 hover:w-full transition-all duration-200"/>
                            )}
                        </Link>
                    ))}
                </div>

                <button
                    className="md:hidden flex flex-col gap-[6px] p-2"
                    onClick={() => setIsOpen(true)}
                    aria-label="Abrir menu"
                >
                    <span className="block w-6 h-[2px] bg-charcoal" />
                    <span className="block w-6 h-[2px] bg-charcoal" />
                </button>
            </div>

        {isOpen && (
            <div
                className="fixed inset-0 z-[200] md:hidden"
                style={{
                    background: '#f6f1e8',
                    animation: 'fadeInUp 0.3s ease',
                }}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8 relative">
                    <button
                        className="absolute top-6 right-6 p-2"
                        onClick={() => setIsOpen(false)}
                        aria-label="Fechar menu"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1c1971"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLineJoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="18" y1="6" x2="6" y2="18"/>
                        </svg>
                    </button>
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={`font-display font-medium text-2xl ${
                                isActive(link.to) ? 'text-deep-seal' : 'text-charcoal'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        )}
        </nav>
    )
}
