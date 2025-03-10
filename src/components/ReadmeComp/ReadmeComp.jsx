import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ReadmeComp = () => {
    const [readmeContent, setReadmeContent] = useState("");

    useEffect(() => {
        const fetchReadme = async () => {
            const fetched = await fetch("/README.md");
            const text = await fetched.text();
            setReadmeContent(text);
        };
        fetchReadme();
    }, []);

    return (
        <div>
            <h1>README.md</h1>
            <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </div>
    )
}

export default ReadmeComp;