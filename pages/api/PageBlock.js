export default function PageBlock({ children }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm w-full h-full">
      {children}
    </div>
  );
}
