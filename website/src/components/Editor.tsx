import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

const editorOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  highlightActiveLine: false,
  showPrintMargin: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editorOnLoad = (editor: any) => {
  editor.renderer.setScrollMargin(10, 10, 0, 0);
  editor.moveCursorTo(0, 0);
};

export default function Editor({
  theme,
  input,
  onChange,
}: {
  theme: string;
  input: string;
  onChange: (value: string) => void;
}) {
  return (
    <AceEditor
      value={input}
      mode="python"
      name="CodeBlock"
      fontSize="0.9rem"
      className="flex-1 overflow-clip"
      theme={theme === "dark" ? "twilight" : "textmate"}
      onChange={onChange}
      width="100%"
      height="100%"
      onLoad={editorOnLoad}
      editorProps={{ $blockScrolling: true }}
      setOptions={editorOptions}
      wrapEnabled={true}
    />
  );
}
