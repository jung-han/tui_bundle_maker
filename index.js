import $ from 'jquery';
import tuiEditor from 'tui-editor';
import 'codemirror/lib/codemirror.css';
import 'highlightjs/styles/github.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';

$('#editSection').tuiEditor({
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    height: '300px'
});