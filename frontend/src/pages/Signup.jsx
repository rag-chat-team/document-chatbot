import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, Link } from 'react-router-dom';

import {
    setLoading,
    setUser,
    setError,
    clearError
} from '../features/auth/authSlice';

import { registerUser } from '../features/auth/authAPI';

export default function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

            const data = await registerUser({
                first_name: firstName,
                last_name: lastName,
                email,
                password
            });

            dispatch(setUser(data.user));

        } catch (error) {

            dispatch(
                setError(
                    error.response?.data?.message ||
                    'Unable to sign up'
                )
            );

        } finally {

            dispatch(setLoading(false));

        }
    };

    return (

        <main className="min-h-screen bg-slate-50 px-4 py-10">

            <section className="mx-auto w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl shadow-slate-200/80">

                <h1 className="mb-8 text-3xl font-semibold text-slate-900">

                    Create an account

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-6"
                >

                    <label className="grid gap-3 text-sm font-semibold text-slate-700">

                        First Name

                        <input
                            className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500"
                            type="text"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                            required
                        />

                    </label>

                    <label className="grid gap-3 text-sm font-semibold text-slate-700">

                        Last Name

                        <input
                            className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500"
                            type="text"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                            required
                        />

                    </label>

                    <label className="grid gap-3 text-sm font-semibold text-slate-700">

                        Email

                        <input
                            className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </label>

                    <label className="grid gap-3 text-sm font-semibold text-slate-700">

                        Password

                        <input
                            className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </label>

                    {error && (
                        <p className="text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        className="rounded-3xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? 'Registering...'
                            : 'Create account'}

                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-600">

                    Already have an account?{' '}

                    <Link
                        className="font-semibold text-indigo-600 hover:text-indigo-800"
                        to="/login"
                    >

                        Log in

                    </Link>

                </p>

            </section>

        </main>
    );
}