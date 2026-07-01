import { useRef, useState } from 'react';
import useReveal from "../hooks/useReveal";
import useToast from "../hooks/useToast";

const recentActivity = [
    { initial: 'M', name: 'Maria Santos', project: 'Habitacao Social', amount: '25.000', date: '15/05/2026'},
    { initial: 'B', name: 'Banco Milenium', project: 'Educacao para Todos', amount: '50.000', date: '10/05/2026'},
    { initial: 'A', name: 'Antonio Ferreira', project: 'Saude Comunitaria', amount: '2.000', date: '06/05/2026'}
]

export default function Admin(){
    const { showToast, toastContainer } = useToast();
    const headerRef = useReveal(0.3);
    const formRef = useReveal(0.3);

    console.log(useToast());

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting ] = useState(false);
    const [obsText, setObsText] = useState('');

    const donorNameRef = useRef(null);
    const donorEmailRef = useRef(null);
    const dateRef = useRef(null);
    const amountRef = useRef(null);
    const projectRef = useRef(null);

    const today = new Date().toISOString().split('T')[0]

    const validateForm = () => {
        const newErrors = {}

        if(!donorNameRef.current.value.trim()) {
            newErrors.donorName = 'Este campo eh obrigatorio!'
        }

        const email = donorEmailRef.current.value.trim() || ''
        if(!email) {
            newErrors.donorEmail = 'Este campo eh obrigatorio'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.donorEmail = 'Introduza um email valido'
        }

        const amount = parseFloat(amountRef.current.value || '0')
        if(!amountRef.current.value || isNaN(amount) || amount <= 0) {
            newErrors.amount = 'Introduza um valor valido'
        }

        if(!dateRef.current.value) {
            newErrors.date = 'Este campo eh obrigatorio'
        } else if (dateRef.current.value > today) {
            newErrors.date = 'A data nao pode ser futura'
        }

        if(!projectRef.current.value){
            newErrors.project = 'Selecione um projeto'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            const firstError = Object.keys(errors)[0]
            const fieldMap = {
                donorName: donorNameRef,
                donorEmail: donorEmailRef,
                amount: amountRef,
                date: dateRef,
                project: projectRef
            }
            fieldMap[firstError].current.focus()
            return
        }

        setIsSubmitting(true)

        setTimeout(() => {
            setIsSubmitting(false)
            showToast('Donativo registrado com sucesso!', 'success')

            if (donorNameRef.current) donorNameRef.current.value =  ''
            if (donorEmailRef.current) donorEmailRef.current.value =  ''
            if (amountRef.current) amountRef.current.value =  ''
            if (dateRef.current) dateRef.current.value =  today
            if (projectRef.current) projectRef.current.value =  ''
            setObsText('')
            setErrors({})
        }, 1000)
    }

    const inputClass = (hasErrors) =>
        `w-full px-4 py-3 rounded border bg-white font-body text-base transition-all duration-200 outline-none ${
            hasErrors
                ? 'border-[#b42318] focus:ring-2 focus:ring-[#b42318]/20'
                : 'border-[#a39e9480] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10'
        }`

    const hasAnyError = Object.keys(errors).length > 0

    return (
        <>
            <toastContainer />

            <div
                className='w-full'
                style={{ background: '#ebe3d3', height: '120px', position: 'absolute', top: '72px', left: 0, right: 0, zIndex: 0 }}
            />
            <div
                ref={headerRef}
                className='relative z-10 max-w-[720px] mx-auto px-6 lg:px-10 pt-12 md:pt-20 pb-8 reveal'
            >
                <span className='section-label'>ADMINISTRACAO</span>
                <h1 className='font-display text-[clamp(2rem,4vw,3.5rem)] mt-2'>
                    Registrar Novo Doador
                </h1>
                <p className='font-body text-base mt-2 max-w-[560px]' style={{ color: 'var(--color-slate)' }}>
                    Preencha o formulario abaixo para registrar um novo donativo no sistema. Todos os
                    campos sao obrigatorios.
                </p>
            </div>

            <div
                ref={formRef}
                className='relative z-10 max-w-[720px] mx-auto px-6 lg:px-10 pt-12 md:pt-20 reveal mb-12 md:pb-20'
            >
                <div className='card-base' style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className='mb-6'>
                            <label className='section-label text-xs block mb-1.5' style={{ color: 'var(--color-slate)' }}>
                                Nome do Doador
                            </label>
                            <input
                                ref={donorNameRef}
                                type='text'
                                placeholder='Ex: Maria dos Santos'
                                maxLength={100}
                                className={inputClass(errors.donorName)}
                            />
                            {errors.donorName && (
                                <p className='text-xs mt-1.5' style={{ color: '#b42318' }}>
                                    {errors.donorName}
                                </p>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                            <div>
                                <label className='section-label text-xs block mb-1.5' style={{ color: 'var(--color-slate)' }}>
                                    Email do Doador
                                </label>
                                <input
                                    ref={donorEmailRef}
                                    type='email'
                                    placeholder='exemplo@gmail.com'
                                    className={inputClass(errors.donorEmail)}
                                />
                                {errors.donorEmail && (
                                    <p className='text-xs mt-1.5' style={{ color: '#b42318' }}>
                                        {errors.donorEmail}
                                    </p>
                                )}
                            </div>
                            <div className='relative'>
                                <label className='section-label text-xs block mb-1.5' style={{ color: 'var(--color-slate)' }}>
                                    Valor do Donativo R$
                                </label>
                                <span
                                    className='absolute left-4 text-base'
                                    style={{
                                        color: 'var(--color-muted)',
                                        bottom: errors.amount ? 'calc(0.75rem+18px)' : '0.75rem',
                                        transform: 'translateY(25%)'
                                    }}
                                >
                                    R$
                                </span>
                                <input
                                    ref={amountRef}
                                    type='number'
                                    step='0.01'
                                    min='0'
                                    placeholder='0.00'
                                    className={`${inputClass(errors.amount)} pl-9`}
                                />
                                {errors.amount && (
                                    <p className='text-xs mt-1.5' style={{ color: '#b42318' }}>
                                        {errors.amount}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                            <div>
                                <label className='section-label text-xs block mb-1.5' style={{ color: 'var(--color-slate)' }}>
                                    Data do Donativo
                                </label>
                                <input
                                    ref={dateRef}
                                    type='date'
                                    defaultValue={today}
                                    className={inputClass(errors.date)}
                                />
                                {errors.date && (
                                    <p className='text-xs mt-1.5' style={{ color: '#b42318' }}>
                                        {errors.date}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className='section-label text-xs block mb-1.5' style={{ color: 'var(--color-slate)' }}>
                                    Projeto Destinatario
                                </label>
                                <select
                                    ref={projectRef}
                                    className={`${inputClass(errors.project)} custom-select`}
                                    defaultValue=''
                                >
                                    <option value='' disabled>
                                        Selecione um projeto...
                                    </option>
                                    <option value='habitacao'>Habitacao Social para Familia</option>
                                    <option value='educacao'>Educacao para Todos</option>
                                    <option value='saude'>Saude Comunitaria Movel</option>
                                </select>
                                {errors.project && (
                                    <p className='text-xs mt-1.5' style={{ color: '#b42318' }}>
                                        {errors.project}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='mb-8'>
                            <label className='section-label text-xs block mb-1.5' style={{ color: 'var(--color-slate)' }}>
                                Observacoes (Opcional)
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Notas adicionais sobre o donativo..."
                                maxLength={500}
                                onChange={(e) => setObsText(e.target.value)}
                                className={inputClass()}
                            />
                            <p
                                className='text-xs mt-1.5 text-right'
                                style={{ color: obsText.length > 500 ? '#b42318' : 'var(--color-muted)' }}
                            >
                                {obsText.length}/500
                            </p>
                        </div>

                        {hasAnyError && (
                            <div
                                className='mb-6 p-3 rounded'
                                style={{
                                    backgroun: '#fef2f2',
                                    border: '1px solid rgba(180, 35, 24, 0.19)',
                                    borderLeft: '4px solid #b42318'
                                }}
                            >
                                <p className='text-sm' style={{ color: '#b42318' }}>
                                    Por favor, corrija os erros acima antes de submeter.
                                </p>
                            </div>
                        )}

                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className={`btn-primary w-full md:w-auto md:min-w-[240px] mx-auto block ${
                                isSubmitting ? 'id-loading' : ''
                            }`}
                        >
                            {isSubmitting ? 'A registrar...' : 'Registrar Donativo' }
                        </button>

                    </form>
                </div>
            </div>


        </>
    )
}
