import { useState } from 'react';
import Loader from '../Loader/Loader.jsx';

export default function Upload({ onUpload }) {
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setFileName(file.name);
        setStatus('Uploading document...');
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setStatus('File uploaded successfully. You can now ask questions.');
            onUpload(`Uploaded file: ${file.name}`);
        }, 1200);
    };

    return (
        <div className="rounded-[32px] bg-white p-8 shadow-2xl shadow-slate-200/80">
            <h2 className="text-2xl font-semibold text-slate-900">Upload a document</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
                Send a file to the chatbot so it can answer questions based on its contents.
            </p>
            <label className="mt-6 flex cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/80 px-5 py-6 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50">
                <input className="sr-only" type="file" accept=".pdf,.txt,.doc,.docx" onChange={handleFileChange} />
                <span>Choose file</span>
            </label>
            {loading && <Loader />}
            {fileName && <p className="mt-4 text-sm text-slate-700">Selected file: {fileName}</p>}
            {status && <p className="mt-2 text-sm text-slate-500">{status}</p>}
        </div>
    );
}
