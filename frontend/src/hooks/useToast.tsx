import { useCallback, useState } from "react";

interface Toast {
    id: number,
    message: string,
    type: 'success' | 'error'
}

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message:string , type: 'success' | 'error' = 'success' ) => {
        const id = Date.now() + Math.random()
        setToasts((prev) => [...prev, {id, message, type}])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 4000)
    }, [])

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const toastContainer = () => (
        <div className="toast-container">
        {toasts.map((toast) => (
            <div
                key={toast.id}
                className={`toast toast-${toast.type} toast-visible`}
            >
                {toast.type === 'success' ? (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0f766e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                ) : (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b42318"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                )}
                <span className="text-sm font-body">{toast.message}</span>
                <button
                    onClick={() => removeToast(toast.id)}
                    className="ml-auto text-muted hover:text-charcoal"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        ))}
        </div>
    )

    return { showToast, toastContainer}
}
