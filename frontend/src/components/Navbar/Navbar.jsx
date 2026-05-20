import { Link } from 'react-router-dom';

export default function Navbar({ onLogout }) {
    return (
        <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-[32px] bg-white px-6 py-5 shadow-2xl shadow-slate-200/80">
            <div className="text-lg font-semibold text-slate-900">Document Chatbot</div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-indigo-600">
                <Link className="transition hover:text-indigo-900" to="/dashboard">
                    Dashboard
                </Link>
                <Link className="transition hover:text-indigo-900" to="/chat">
                    Chat
                </Link>
                {onLogout ? (
                    <button
                        className="rounded-full bg-slate-100 px-4 py-2 text-slate-800 transition hover:bg-slate-200"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                ) : null}
            </div>
        </nav>
    );
}
