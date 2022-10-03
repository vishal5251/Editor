import React, { useEffect, useState } from 'react'
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {

    const [html, setHtml] = useLocalStorage("html", "")
    const [css, setCss] = useLocalStorage("css", "")
    const [javascript, setJavascript] = useLocalStorage("javascript", "")
    const [srcDoc, setSrcDoc] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
            <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${javascript}</script>
            </html>
        `)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [html, css, javascript])

    return (
        <div className='flex flex-col h-screen w-screen bg-gray-600'>
            <div className='flex h-full w-full'>
                <Editor
                    displayName={"HTML"}
                    language="xml"
                    value={html}
                    onChange={setHtml}
                />
                <Editor
                    displayName={"CSS"}
                    language="css"
                    value={css}
                    onChange={setCss}
                />
                <Editor
                    displayName={"JavaScript"}
                    language="javascript"
                    value={javascript}
                    onChange={setJavascript}
                />
            </div>

            <div className='h-full'>
                <iframe
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    srcDoc={srcDoc}
                />
            </div>
        </div>
    )
}

export default App