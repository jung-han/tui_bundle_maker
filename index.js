import $ from 'jquery';
import tuiEditor from 'tui-editor';
import 'codemirror/lib/codemirror.css';
import 'highlightjs/styles/github.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';

let hereUri = $(location).attr('href');

if(hereUri.search("/mail/read") >= 0){

    let content = $("#tuiContentVal").val().split("\n");
    content = content.join("\n");

    $('#viewerSection').tuiEditor({
        previewStyle: 'vertical',
        height: '300px',
        initialValue: content,
        viewer: true
    });
} else if(hereUri.search("/mail/write") >= 0){
    let replyContent = $("#replyContent").val();
    if(replyContent !== ""){
        replyContent = replyContent.split("\n");
        replyContent = replyContent.join("\n");
        let sender = $("#originSenderAcnt").val();
        let mailTitle = $("#mailTitle").val();
        let replyString = `\n\n\n-----Original Message-----\n **sender**: ${sender}\n **title**: ${mailTitle}\n\n\n`;
        replyContent = replyString + replyContent;
    }

    $('#editSection').tuiEditor({
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '500px',
        initialValue: replyContent,
    });


    $('#mailForm').on('submit', function(){
        let mailBody = $("#editSection").tuiEditor("getValue");
        let findTag = ["<script>", "</script>"];
        for(let i=0; i<findTag.length; i++){
            let regex = new RegExp(findTag[i], "g");
            mailBody = mailBody.replace(regex, "");
        }
        let regexSingleQuote = new RegExp("'", "g");
        mailBody = mailBody.replace(regexSingleQuote, "&apos;");
        let regexDoubleQuote = new RegExp('"', "g");
        mailBody = mailBody.replace(regexDoubleQuote, "&quot;");

        $('#mailForm').append('<input type="hidden" name="mailBody" value=\''+mailBody+'\'/>');
    });
}
