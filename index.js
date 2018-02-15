import $ from 'jquery';
import tuiEditor from 'tui-editor';
import 'codemirror/lib/codemirror.css';
import 'highlightjs/styles/github.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'tui-date-picker/dist/tui-date-picker.css';

let hereUri = $(location).attr('href');

if(hereUri.search("/mail/read") >= 0){
    let content = $("#tuiContentVal").val().split("\n");
    for(let i = 0; i<content.length; i++){
        content[i] = content[i].trim();
        if(content[i].search("data:image")){
            content[i] = content[i].replace(/&lt/g,"<");
            content[i] = content[i].replace(/&gt/g, ">");
            content[i] = content[i].replace(/&amp/g,"&");
            content[i] = content[i].replace(/&quot/g,"/");
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
    let replyContent = $("#replyContent").val();
    if(replyContent !== ""){
        replyContent = replyContent.split("\n");;
        for(let i = 0; i<replyContent.length; i++){
            replyContent[i] = replyContent[i].trim();
            if(replyContent[i].search("data:image")){
                replyContent[i] = replyContent[i].replace(/&lt/g,"<");
                replyContent[i] = replyContent[i].replace(/&gt/g, ">");
                replyContent[i] = replyContent[i].replace(/&amp/g,"&");
                replyContent[i] = replyContent[i].replace(/&quot/g,"/");
            }
        }
        replyContent = replyContent.join("\n");

        let sender = $("#originSenderAcnt").val();
        let mailTitle = $("#mailTitle").val();
        let replyString = `\n\n\n-----Original Message-----\n **sender**: ${sender}\n **title**: ${mailTitle}\n\n\n`;
        replyContent = replyString + replyContent;
    }

    // 답장 시 채워주는 부분
    $('#editSection').tuiEditor({
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        height: '500px',
        initialValue: replyContent
    });

    let DatePicker = require('tui-date-picker');
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    let datepicker = new DatePicker('#wrapper', {
        date: tomorrow,
        selectableRanges: [
            [tomorrow, new Date(2099, 12, 31)]
        ],
        input: {
            element: '#datepicker-input',
            format: 'yyyy-MM-dd'
        }
    });

    // 메일 작성시
    $('#mailForm').on('submit', function(){
      let mailBody = $("#editSection").tuiEditor("getValue");
      let selectDate = datepicker.getDate().toISOString().substring(0, 10);
      $('#mailForm').append('<input type="hidden" name="mailBody" value=\''+mailBody+'\'/>');
      $('#mailForm').append('<input type="hidden" id="datepicker" name="expYmdt" value=\''+selectDate+'\'/>');
    });
}