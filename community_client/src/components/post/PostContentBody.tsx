import React from 'react';
// import MarkdownPreview from '@uiw/react-markdown-preview';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';

interface PostContentBodyProp {
  source: string;
}

const EditerMarkdown = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false },
);

export default function PostContentBody({ source }: PostContentBodyProp) {
  return (
    <div data-color-mode="light">
      <EditerMarkdown source={source} />
    </div>
  );
}
