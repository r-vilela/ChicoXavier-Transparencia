import { useEffect, useRef } from "react"

export default function useReveal(threshold = 0.3){
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if(!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const children = element.querySelectorAll('[data-stagger]')
                    children.forEach((child) => {
                        const delay = (child as HTMLElement).dataset.stagger || '0'
                        ;(child as HTMLElement).style.transitionDelay = `${delay}s`
                    })

                    element.classList.add('is-visible')
                    observer.unobserve(element)
                }
            },
            { threshold }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [threshold])

    return ref
}
