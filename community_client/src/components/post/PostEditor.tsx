import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface PostEditorProp {
  editorValue: string;
  setEditorValue: Function;
}

function PostEditor({ editorValue, setEditorValue }: PostEditorProp) {
  return (
    <div>
      <MDEditor
        value={editorValue}
        onChange={(e) => setEditorValue(e || '')}
        textareaProps={{
          placeholder: 'Please enter Markdown text',
        }}
        height={500}
      />
    </div>
  );
}

export default PostEditor;
