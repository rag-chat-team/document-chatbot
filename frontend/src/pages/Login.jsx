import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {
    setLoading,
    setUser,
    setError,
    clearError
} from '../features/auth/authSlice';

import { loginUser } from '../features/auth/authAPI';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading, error } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            dispatch(setLoading(true));

            const data = await loginUser({
                email,
                password
            });

            dispatch(setUser(data.user));

        } catch (error) {

            dispatch(
                setError(
                    error.response?.data?.message ||
                    'Unable to login'
                )
            );

        } finally {

            dispatch(setLoading(false));

        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10">

            <section className="mx-auto w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl">

                <h1 className="mb-8 text-3xl font-semibold">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-6"
                >

                    <label className="grid gap-2">

                        Email

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </label>

                    <label className="grid gap-2">

                        Password

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </label>

                    {error && (
                        <p className="text-red-600 text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? 'Signing in...'
                            : 'Sign In'}

                    </button>

                </form>

                <p className="mt-6 text-center text-sm">

                    Don't have an account?

                    <Link to="/signup">
                        Create one
                    </Link>

                </p>

            </section>

        </main>
    );
}