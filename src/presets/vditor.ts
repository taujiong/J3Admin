import 'vditor';

export const defaultMarkdownOption: IMarkdownConfig = {
  autoSpace: true,
  fixTermTypo: true
};

export const defaultHljsOption: IHljs = {
  lineNumber: true
};

export const defaultToolbar = [
  'headings', 'bold', 'italic', 'strike',
  '|', 'list', 'ordered-list', 'emoji', 'link',
  '|', 'quote', 'line', 'code', 'inline-code',
  '|', 'table', 'upload', 'br',
  '|', 'undo', 'redo',
  '|', 'edit-mode', 'code-theme', 'content-theme',
  '|', 'fullscreen', 'preview', 'export',
  {
    name: 'more',
    toolbar: ['devtools', 'info', 'help']
  }
];

export const defaultPreviewOptions: IPreviewOptions = {
  mode: 'light',
  icon: 'material',
  hljs: defaultHljsOption,
  markdown: defaultMarkdownOption
};

export const defaultVditorOptions: IOptions = {
  mode: 'sv',
  outline: {
    enable: true,
    position: 'left'
  },
  preview: {
    hljs: defaultHljsOption,
    markdown: defaultMarkdownOption,
    actions: ['mp-wechat', 'zhihu']
  },
  toolbar: defaultToolbar,
  icon: 'material'
};
