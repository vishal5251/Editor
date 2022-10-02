import React, { useState } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import {Close, Add} from "@carbon/icons-react"
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import 'codemirror/mode/xml/xml'
// import 'codemirror/mode/css/css'
// import 'codemirror/mode/javascript/javascript'

function Editor({ displayName, language, value, onChange }: { displayName: string; language: string; value: string; onChange: (value: string) => void }) {

    const [open, setOpen] = useState(true)

    //Reference https://lightrun.com/answers/jedwatson-react-codemirror-referenceerror-navigator-is-not-defined
    let codeMirror = null;
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
        codeMirror = require('react-codemirror2');
        require('codemirror/mode/xml/xml');
        require('codemirror/mode/css/css');
        require('codemirror/mode/javascript/javascript');
        require('codemirror/lib/codemirror.css');
        require('codemirror/theme/material.css');
    }

    function handleChange(editor: any, data: any, value: string) {
        onChange(value)
    }

    return (
        <div className={`flex flex-col basis-0 flex-grow p-2 bg-gray-600 ${!open && "collapsed"}`}>
            <div className='flex justify-between bg-[rgba(0,0,0,0.3)] py-2 pl-4 pr-2 rounded-t-md'>
                {displayName}
                <button className='ml-2 bg-none border-none cursor-pointer' onClick={() => setOpen(prevOpen => !prevOpen)}>
                    {open ? <Close size={24} /> : <Add size={24}/>}
                </button>
            </div>
            {codeMirror &&
                <CodeMirror
                    onBeforeChange={handleChange}
                    value={value}
                    className="flex-grow rounded-b-md overflow-hidden"
                    options={{
                        lineWrapping: true,
                        lint: true,
                        mode: language,
                        theme: "material",
                        lineNumbers: true
                    }}
                />
            }
        </div>
    )
}

export default Editor