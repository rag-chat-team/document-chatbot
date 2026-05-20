import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice.js';
import Navbar from '../components/Navbar/Navbar.jsx';

export default function Dashboard() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <Navbar onLogout={handleLogout} />
            <section className="mx-auto flex max-w-4xl flex-col gap-6 rounded-[32px] bg-white p-10 shadow-2xl shadow-slate-200/80">
                <div>
                    <h1 className="text-4xl font-semibold text-slate-900">Welcome back{user ? `, ${user.name}` : ''}</h1>
                    <p className="mt-4 max-w-2xl text-slate-600">
                        This dashboard gives you access to chat with your document assistant and upload files for the bot to read.
                    </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                        className="rounded-3xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
                        onClick={() => navigate('/chat')}
                    >
                        Open chat
                    </button>
                    <button
                        className="rounded-3xl bg-slate-100 px-6 py-3 text-slate-900 transition hover:bg-slate-200"
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>
                </div>
            </section>
        </div>
    );
}
