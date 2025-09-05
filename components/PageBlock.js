export default function PageBlock({ children }) {
    return (
        <div className="rounded-lg p-6 shadow-sm w-full h-full bg-transparent">
            {children}
        </div>
    );
}
