interface Props {
    message: string;
    className?: string;
}

export function ErrorCard({ message, className = "" }: Props) {
    if (!message) return null;

    return (
        <div
            className={`text-sm px-4 py-3 rounded-lg ${className}`}
            style={{
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.35)",
                color: "#fca5a5",
            }}
        >
            {message}
        </div>
    );
}
