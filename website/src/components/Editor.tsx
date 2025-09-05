import React from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'

const editorOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  highlightActiveLine: false,
  showPrintMargin: false
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editorOnLoad = (editor: any) => {
  editor.renderer.setScrollMargin(10, 10, 0, 0)
  editor.moveCursorTo(0, 0)
}

export default function Editor({
  theme,
  input,
  onChange
}: {
  theme: string
  input: string
  onChange: (value: string) => void
}) {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const AceEditor = require('react-ace').default
        require('ace-builds/src-noconflict/mode-python')
        require('ace-builds/src-noconflict/theme-textmate')
        require('ace-builds/src-noconflict/theme-twilight')
        require('ace-builds/src-noconflict/ext-language_tools')
        return (
          <AceEditor
            value={input}
            mode="python"
            name="CodeBlock"
            fontSize="0.9rem"
            className="flex-1 overflow-clip"
            theme={theme === 'dark' ? 'twilight' : 'textmate'}
            onChange={onChange}
            width="100%"
            height="100%"
            onLoad={editorOnLoad}
            editorProps={{ $blockScrolling: true }}
            setOptions={editorOptions}
            wrapEnabled={true}
          />
        )
      }}
    </BrowserOnly>
  )
}
