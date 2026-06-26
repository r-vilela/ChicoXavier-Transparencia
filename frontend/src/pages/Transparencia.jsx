
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
                        <p className="font-body text-sm mt-4" style={{ color: 'var(--slate)' }}>
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
                            <p className="font-body text-xs mt-2" style={{ color: 'var(--slate)' }}>
                                {card.subtext}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>

    )
}

export default function Transparencia() {
    return (
        <>
            Transparencia
        </>
    )

}
