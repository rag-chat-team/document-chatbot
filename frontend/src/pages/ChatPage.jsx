import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Chat from '../components/Chat/Chat.jsx';
import Upload from '../components/Upload/Upload.jsx';

export default function ChatPage() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'assistant', text: 'Hello! Upload a file or ask a question to get started.' }
    ]);

    const addMessage = (text, sender) => {
        setMessages((prev) => [...prev, { id: prev.length + 1, sender, text }]);
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <Navbar />
            <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
                <aside className="flex flex-col gap-6">
                    <Upload onUpload={(message) => addMessage(message, 'assistant')} />
                </aside>
                <main className="flex flex-col gap-6">
                    <Chat messages={messages} onSend={(text) => addMessage(text, 'user')} />
                </main>
            </section>
        </div>
    );
}
