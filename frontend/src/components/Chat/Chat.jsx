import { useState } from 'react';
import Loader from '../Loader/Loader.jsx';

export default function Chat({ messages, onSend }) {
    const [draft, setDraft] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!draft.trim()) return;
        onSend(draft.trim());
        setSending(true);
        setTimeout(() => {
            setSending(false);
        }, 600);
        setDraft('');
    };

    return (
        <div className="flex min-h-[600px] flex-col rounded-[32px] bg-white shadow-2xl shadow-slate-200/70">
            <div className="border-b border-slate-200 px-8 py-6">
                <h2 className="text-2xl font-semibold text-slate-900">Chat</h2>
                <p className="mt-2 text-sm text-slate-500">Ask questions about your uploaded documents in real time.</p>
            </div>
            <div className="flex-1 overflow-hidden bg-slate-50 p-6">
                <div className="flex h-full flex-col gap-4 overflow-y-auto pr-2">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`max-w-[90%] rounded-3xl px-5 py-4 leading-relaxed ${message.sender === 'user'
                                    ? 'ml-auto bg-indigo-600 text-white'
                                    : 'mr-auto bg-slate-100 text-slate-900'
                                }`}
                        >
                            {message.text}
                        </div>
                    ))}
                    {sending && <Loader small />}
                </div>
            </div>
            <form className="flex flex-col gap-3 border-t border-slate-200 bg-white p-6 md:flex-row" onSubmit={handleSubmit}>
                <input
                    className="flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type a question or prompt..."
                />
                <button className="rounded-3xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
}
