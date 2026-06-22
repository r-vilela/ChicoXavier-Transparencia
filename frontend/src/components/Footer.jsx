import {Link} from 'react-router-dom'

export default function Footer() {
    const linkGroups = [
        {
            title: 'Instituicao',
            links: [
                { label: 'Sobre Nos', to: '/#hero' },
                { label: 'Projetos', to: '/#projetos' }
            ],
        },
        {
            title: 'Informacao',
            links: [
                { label: 'Transparencia', to: '/transparencia' },
                { label: 'Contato', to: '/#cta' }
            ],
        },
        {
            title: 'Gestao',
            links: [
                { label: 'Admin', to: '/admin' }
            ],
        },
    ]

    return (
        <footer className="bg-charcoal text-muted">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-12 pb-8">

                <div className="flex flex-col md:flex-row justify-between gap-10">

                    <div>
                        <Link
                            to="/"
                            className="font-display font-semibold text-sm tracking text-white uppercase"
                        >
                            Associacao Espirita Chico Xavier
                        </Link>
                        <p className="text-xs mt-2" style={{ color: '#a39e94' }}>
                            Porto Velho, Rondonia
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-1 md:gap-16">
                        {linkGroups.map((group) =>(
                            <div key={group.title}>
                                <h4 className="text-xs uppercase tracking-[1px] text-white mb-3">
                                    {group.title}
                                </h4>
                                <ul className="space-y-2">
                                    {group.links.map((link)=>(
                                        <li key={link.label}>
                                            <Link
                                                to={link.to}
                                                className="text-xs transition-colors duration-200 hover:text-white"
                                                style={{ color: '#a39e94' }}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="mt-9 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs"
                    style={{
                        borderTop: '1px solid #333',
                        color: '#a39e94'
                    }}
                >
                    <span>&copy; 2026 Associacao Espirita Chico Xavier. Todos os direitos reservados.</span>
                    <span>CNPJ: 12.345.678/0001-90</span>
                </div>
            </div>
        </footer>
    )
}
