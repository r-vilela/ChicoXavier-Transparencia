import useReveal from '../hooks/useReveal'

const donationsData = [
    { date:'16/06/2026', donor:'Maria Santos', amount: '25.000', project:'Habitacao Social', status:'Recebido'},
    { date:'13/06/2026', donor:'Anponio Parques', amount: '15.000', project:'Anjos do Saber', status:'Recebido'},
    { date:'10/06/2026', donor:'Anna Julia Sousa', amount: '375', project:'Sopa Fraterna', status:'Recebido'},
]

const expensesData = [
    { date:'20/06/2026', description: 'Materiais para construcao', category: 'Infraestrutura', amount: '32.450', project: 'Habitacao Social'},
    { date:'18/06/2026', description: 'Material didatico escolar', category: 'Educacao', amount: '7.150', project: 'Anjos do Saber'},
    { date:'14/06/2026', description: 'Ingredientes', category: 'Infraestrutura', amount: '270', project: 'Sopa Fraterna'},
]

function SummaryCards() {
    const revealRef = useReveal(0.3);

    const cards = [
        {
            borderColor: '#0f766e',
            iconBg: '#f0fdfa',
            iconColor: '#0f766e',
            icon: (
                <svg width='18' viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                </svg>
            ),
            label: 'Total de Donativos (2026)',
            value: 'R$ 245.000',
            valueColor: '#0f766e',
            badge: '+12% vs 2025',
            badgeVariant: 'success',
        },
        {
            borderColor: '#b42318',
            iconBg: '#fef2f2',
            iconColor: '#b42318',
            icon: (
                <svg width='18' viewBox="0 0 24 24" fill="none" stroke="#b42318" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                </svg>
            ),
            label: 'Total de Despesas (2026)',
            value: 'R$ 187.000',
            valueColor: '#b42318',
            badge: '+8% vs 2025',
            badgeVariant: 'warning',
        },
        {
            borderColor: '#0f766e',
            iconBg: '#f0fdfa',
            iconColor: '#0f766e',
            icon: (
                <svg width='18' viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            label: 'Saldo Disponivel',
            value: 'R$ 12.530',
            valueColor: '#0f677e',
            subtext: '11.8% de reserva',
        },
    ]

    return (
        <div ref={revealRef} className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-8 reveal" >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) =>(
                    <div
                        key={card.label}
                        className="card-base"
                        style={{
                            borderTop: `4px solid ${card.borderColor}`,
                            animationDelay: `${index * 0.12}s`,
                        }}
                        data-stagger={(index * 0.12).toString()}
                    >
                        <div
                            className="w-9 h-9 rounded-full flex items item-center justify-center"
                            style={{background: card.iconBg }}
                        >
                            {card.icon}
                        </div>
                        <p className="font-body text-sm mt-4" style={{ color: 'var(--color-slate)' }}>
                            {card.label}
                        </p>
                        <p
                            className="font-display text-[clamp(1.5rem,3vw,2.5rem)] mt-1"
                            style={{ color: card.valueColor }}
                        >
                            {card.value}
                        </p>
                        {card.badge && (
                            <span className={`badge badge-${card.badgeVariant} mt-2 inline-flex`}>
                                {card.badge}
                            </span>
                        )}
                        {card.subtext && (
                            <p className="font-body text-xs mt-2" style={{ color: 'var(--color-slate)' }}>
                                {card.subtext}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>

    )
}

function DonationsTable() {
    const revealRef = useReveal(0.2);

    return (
        <section className="w=full py-12 mb:py-20" style={{ background: 'var(--color-cream)' }}>
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

                <div
                    ref={revealRef}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6 reveal"
                >
                    <h2 className="font-display text-[clamp(1.75rem,3vw,2rem)]">
                        Historico de Donativos
                    </h2>
                    <span className="font-body text-sm" style={{ color: 'var(--color-muted)'}}>
                        {donationsData.length} registros
                    </span>
                </div>

                <div
                    ref={useReveal(0.2)}
                    className='card-base p-0 overflow-hidden reveal'
                >
                    <div className='table-wrapper' style={{ maxHeight: '560px', overflowY: 'auto' }}>
                        <table className='data-table data-table--donations'>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Doador</th>
                                    <th className='text-right'>Valor</th>
                                    <th>Projeto</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donationsData.map((row, i) => (
                                    <tr key={i}>
                                        <td className='whitespace-nowrap' style={{ color: 'ver(--color-slate)' }}>
                                            {row.date}
                                        </td>
                                        <td>{row.donor}</td>
                                        <td className='text-right whitespace-nowrap'>
                                            <span style={{ color: 'var(--color-muted)' }}>R$</span>
                                            <span className='ml-0.5'>{row.amount}</span>
                                        </td>
                                        <td>{row.project}</td>
                                        <td>
                                            <span className='badge badge-success'>{row.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    )
}

function ExpensesTable() {
    const revealRef = useReveal(0.2);

    return (
        <section className="w=full py-12 mb:py-20" style={{ background: 'var(--color-cream)' }}>
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

                <div
                    ref={revealRef}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6 reveal"
                >
                    <h2 className="font-display text-[clamp(1.75rem,3vw,2rem)]">
                        Historico de Despesas
                    </h2>
                    <span className="font-body text-sm" style={{ color: 'var(--color-muted)'}}>
                        {expensesData.length} registros
                    </span>
                </div>

                <div
                    ref={useReveal(0.2)}
                    className='card-base p-0 overflow-hidden reveal'
                >
                    <div className='table-wrapper' style={{ maxHeight: '560px', overflowY: 'auto' }}>
                        <table className='data-table data-table--donations'>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Descricao</th>
                                    <th>Categoria</th>
                                    <th className='text-right'>Valor</th>
                                    <th>Projeto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expensesData.map((row, i) => (
                                    <tr key={i}>
                                        <td className='whitespace-nowrap' style={{ color: 'ver(--color-slate)' }}>
                                            {row.date}
                                        </td>
                                        <td>{row.description}</td>
                                        <td>
                                            <span className='badge badge-neutral'>{row.category}</span>
                                        </td>
                                        <td className='text-right whitespace-nowrap'>
                                            <span style={{ color: 'var(--color-muted)' }}>R$</span>
                                            <span className='ml-0.5'>{row.amount}</span>
                                        </td>
                                        <td>{row.project}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    )}

export default function Transparencia() {
    const headerRef = useReveal(0.3);

    return (
        <>
            <div
                className="w-full"
                style={{
                    background: 'linear-gradient(180deg, #ebe3d3 0%, #f6f1e8 100%',
                    minHeight: '320px'
                }}
            >
                <div
                    ref={headerRef}
                    className='max-w-[1200px] mx-auto px-6 lg:px-10 pt-12 md:pt-20 pb-8 reveal'
                >
                    <span className='section-label'>TRANSPARENCIA</span>
                    <h1 className='font-display text-[clamp(2rem,5vw,4rem)] mt-2'>
                        Transparencia Financeira
                    </h1>
                    <p className='font-body text-base mt-2 max-w-[640px]' style={{color: 'var(--color-slate)' }}>
                        A Associacao Espirita Chico Xavier compromete-se com a total transparencia na gestao dos fundos.
                        Aqui pode consultar todos os donativos recebidos e despesas realizadas.
                    </p>
                    <p className='font-body text-xs mt-2' style={{color: 'var(--muted)' }}>
                        Ultima atualizacao: 27 de junho de 2026
                    </p>
                </div>
            </div>

            <SummaryCards />
            <DonationsTable />
            <ExpensesTable />
        </>
    )

}
