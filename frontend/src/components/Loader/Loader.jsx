export default function Loader({ small }) {
    return (
        <div className={`flex items-center justify-center ${small ? 'gap-2 py-2' : 'gap-3 py-4'}`}>
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse delay-150" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse delay-300" />
        </div>
    );
}
