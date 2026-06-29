import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"
import useReveal from "../hooks/useReveal";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section
            id="hero"
            className="w-full py-20 md:py-[80px]"
            style={{
                background: 'linear-gradient(180deg, #f6f1e8 0%, #ebe3d3 50%, #f6f1e8 100%)'
            }}
        >
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    <div className="lg:w-[60%]">
                        <span
                            className="section-label inline-block animate-fade-in-up"
                            style={{animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards'}}
                        >
                            INSTITUICAO
                        </span>
                        <h1
                            className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] mt-2 animate-fade-in-up"
                            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
                        >
                            Investindo no Futuro da Comunidade
                        </h1>
                        <p
                            className="font-body text-base mt-2 max-w-[520px] animate-fade-in-up"
                            style={{
                                color: 'var(--slate)',
                                animationDelay: '0.4s',
                                opacity: 0,
                                animationFillMode: 'forwards'
                            }}
                        >
                            A Associacao Espirita Chico Xavier eh uma instituicao sem fins lucrativos
                            dedicada a gerir donativos e financiar projetos sociais que transformam
                            vidas em Porto Velho/RO.
                        </p>
                        <div
                            className="flex flex-wrap gap-4 mt-8 animate-fade-in-up"
                            style={{animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards'}}
                        >
                            <a href="#projetos" className="btn-primary">
                                Conhecer Projetos
                            </a>
                            <Link to="/transparencia" className="btn-secondary">
                                Transparencia
                            </Link>
                        </div>
                    </div>

                    <div
                        className="lg:w-[40%] flex justify-center items-center animate-fade-in-up"
                        style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
                    >
                        <div className="relative w-[280px] h-[280px]">
                            <div
                                className="absolute inset-0 rounded-full animate-rotate-slow"
                                style={{
                                    border: '3px solid #0f766e',
                                    opacity: 1.5,
                                }}
                            />
                            <div
                                className="absolute w-[120px] h-[120px] rounded-full animate-pulse-scale"
                                style={{
                                    background:'#0f766e',
                                    opacity: 0.08,
                                    top: '-20px',
                                    left: '-20px'
                                }}
                            />
                            <div
                                className="absolute"
                                style={{
                                    width: '120px',
                                    height: '2px',
                                    background: '#b42318',
                                    opacity: 0.3,
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%) rotate(-15def)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function AnimatedCounter({target, suffix='', prefix=''}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current){
                    hasAnimated.current = true;
                    const duration = 1500
                    const startTime = performance.now()

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime
                        const progress = Math.min(elapsed / duration, 1)

                        const eased = 1 - Math.pow(1 - progress, 4)
                        setCount(Math.floor(eased * target))
                        if (progress < 1) {
                            requestAnimationFrame(animate)
                        }
                    }

                    requestAnimationFrame(animate)
                }
            },
            {threshold: 0.5}
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [target])

    return (
        <span ref={ref}>
            {prefix}
            {count.toLocaleString('pt-PT')}
            {suffix}
        </span>
    )
}

function StatisticsSection() {
    const revealRef = useReveal(0.3)

    const stats = [
        {value: 2400000, prefix: 'R$',suffix: 'M+', label: 'Em Donativos Geridos', display: '2.5M+'},
        {value: 47, suffix: '', label: 'Projetos Financiados', display: '47'},
        {value: 12500, suffix: '+', label: 'Beneficiarios Diretos', display: '12.500+'}
    ]

    return (
        <section
            id="estatisticas"
            className="w-full py-12 md:py-20"
            style={{ background: 'var(--color-warm-sand)' }}
        >
            <div ref={revealRef} className="max-w-[1200px] mx-auto px-6 lg:px-10 reveal">
                <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-0">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="text-center flex flex-col items-center"
                            data-stagger={(index * 0.15).toString()}
                        >
                            <span className="font-display text-[clamp(2rem,4vw,3rem)] text-deep-teal">

                                {stat.prefix === 'R$' ? (
                                    <>
                                        {'R$'}
                                        <AnimatedCounter target={2} suffix=".4M+" />
                                    </>
                                ): stat.value === 47 ? (
                                    <AnimatedCounter target={47} />
                                ) : (
                                    <>
                                        <AnimatedCounter target={12500} />
                                        +
                                    </>
                                )}
                            </span>
                            <span className="font-body text-sm mt-2" style={{ color: 'var(--slate)'}}>
                                {stat.label}
                            </span>
                            {index < stats.length - 1 &&(
                                <div
                                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2"
                                    style={{
                                        width: '1px',
                                        height: '60px',
                                        background: 'rgba(163, 158, 148, 0.25)'
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectsSection() {
    const revealRef = useReveal(0.2)

    const projects = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
            ),
            title: 'Reforco Escolar Anjos do Saber',
            description:
                'Reforco Escolar para criancas e adolecenstes no nivel fundamental.',
            amount: 'R$ 185,000',
            progress: 95
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <palyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
            title: 'Habitacao Social para Familias',
            description:
                'Construcao e renovacao de habitacoes para familias em situacao de vunerabilidade.',
            amount: 'R$ 320,000',
            progress: 78
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
            title: 'Sopa fraterna',
            description:
                'Sopa para familias carentes do bairro Planato entregue aos sabados.',
            amount: 'R$ 70,000',
            progress: 78
        }
    ]

    return (
        <section id="projetos" className="w-full py-1 md:py-20" style={{ background: 'var(--cream)'}}>
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
                <div ref={revealRef} className="reveal">
                    <span className="section-label">PROJETOS</span>
                    <h2 className="font-display text-[clamp(1.75rem,3vw,2rem)] mt-2">
                        Projetos em Destaque
                    </h2>
                    <p className="font-body text-base mt-2 max-w-[600px]" style={{ color: 'var(--slate)' }}>
                        Conheca algumas das iniciativas que transformam a cominidade de Porto Velho.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            ref={useReveal(0.2)}
                            className="card-base reveal"
                            data-stagger={(index * 0.15).toString()}
                        >
                            <div
                                className="w-12 h-12 rounded flex items-center justify-center"
                                style={{ background: 'var(--teal-59)'}}
                            >
                                {project.icon}
                            </div>

                            <h3 className="font-display text-xl mt-4">{project.title}</h3>

                            <span className="font-body text-sm mt-2 line-clamp-3" style={{ color: 'var(--slate)' }}>
                                {project.description}
                            </span>

                            <div className="mt-4">
                                <span className="badge badge-neutral">{project.amount} financiados</span>
                            </div>

                            <div className="mt-3">
                                <div
                                    className="w-full h-1.5 rounded-full"
                                    style={{ background: 'var(--warn-sand)' }}
                                >
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${project.progress}`,
                                            background: 'var(--deep-teal)'
                                        }}
                                    />
                                </div>
                                <span className="text-sm mt-1 block" style={{ color: 'var(--muted)' }}>
                                    {project.progress}% do progresso
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CTASection() {
    const revealRef = useReveal(0.3)

    return (
        <section
            id="cta"
            className="w-full py-12 md:py-20 bg-deep-teal"
        >
            <div ref={revealRef} className="max-w-[700px] mx-auto px-6 lg:px-10 text-center reveal">
                <h2 className="font-display text-[clamp(1.75rem,3vw,2rem)] text-white ">
                    Quer fazer a Diferenca?
                </h2>
                <p className="font-body text-base mt-4 max-w-[560px] mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    Cada donativo conta. A sua contribuicao nos ajuda a continuar a financiar projetos
                    que transformam vidas.
                </p>
                <div className="mt-8">
                    <Link
                        to="/transparencia"
                        className="inline flex items-center justify-center px-7 py-3 rounded font-display font-medium text-sm transition-all duration-200"
                        style={{
                            background: 'white',
                            color: 'var(--deep-teal)'
                        }}
                        onMouseEnter={(e) => {
                            e.style.background = '#f0fdfa'
                        }}
                        onMouseLeave={(e) => {
                            e.style.background = 'white'
                        }}
                    >
                        Ver transparencia
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default function Home() {
    return (
        <>
            <HeroSection />
            <StatisticsSection />
            <ProjectsSection />
            <CTASection />
        </>
    )
}
