import $ from 'jquery';
import tuiEditor from 'tui-editor';
import 'codemirror/lib/codemirror.css';
import 'highlightjs/styles/github.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';


let hereUri = $(location).attr('href');

if(hereUri.search("/mail/read") >= 0){
    let content = $("#tuiContentVal").val().split("\n");
    for(let i = 0; i<content.length; i++){
        content[i] = content[i].trim();
        if(content[i].search("data:image")){
            content[i] = content[i].replace("&lt","<");
            content[i] = content[i].replace("&gt", ">");
            content[i] = content[i].replace("&amp","&");
            content[i] = content[i].replace("&quot","/");
        }
    }
    content = content.join("\n");
    
    $('#viewerSection').tuiEditor({
        previewStyle: 'vertical',
        height: '300px',
        initialValue: content,
        viewer: true
    });
} else if(hereUri.search("/mail/write") >= 0){
    let replyContent = $("#reply_content").val().split("\n");;
    for(let i = 0; i<replyContent.length; i++){
        replyContent[i] = replyContent[i].trim();
        if(replyContent[i].search("data:image")){
            replyContent[i] = replyContent[i].replace("&lt","<");
            replyContent[i] = replyContent[i].replace("&gt", ">");
            replyContent[i] = replyContent[i].replace("&amp","&");
            replyContent[i] = replyContent[i].replace("&quot","/");
        }
    }
    replyContent = replyContent.join("\n");


    if(replyContent !== ""){
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
      let contents = $("#editSection").tuiEditor("getValue");
      $('#mailForm').append('<input type="hidden" name="contents" value=\''+contents+'\'/>');
    });
}

