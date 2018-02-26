import $ from 'jquery';
import tuiEditor from 'tui-editor';
import 'codemirror/lib/codemirror.css';
import 'highlightjs/styles/github.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import './tui-date-picker-custom.css';

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
        language: 'ko',
        selectableRanges: [
            [tomorrow, new Date(2099, 12, 31)]
        ],
        input: {
            element: '#datepicker',
            format: 'yyyy-MM-dd'
        }
    });

    // 메일 작성시
    $('#mailForm').on('submit', function(){
        let mailBody = $("#editSection").tuiEditor("getValue");
        if(mailBody.length > 10000){
          alert("메일 내용은 10000자를 초과할 수 없습니다.");
          return false;
        }

        let findTag = ["<script>", "</script>", "<Script>","</Script>"];
        for(let i=0; i<findTag.length; i++){
            let regex = new RegExp(findTag[i], "g");
            mailBody = mailBody.replace(regex, "");
        }
        let regexSingleQuote = new RegExp("'", "g");
        mailBody = mailBody.replace(regexSingleQuote, "&apos;");
        let regexDoubleQuote = new RegExp('"', "g");
        mailBody = mailBody.replace(regexDoubleQuote, "&quot;");
        let selectDate = selectDate = datepicker.getDate().toISOString().substring(0, 10)+" 00:00:00.0";

        $('#mailForm').append('<input type="hidden" name="mailBody" value=\''+mailBody+'\'/>');
        if($("#expYn").is(":checked")){
           $('#mailForm').append('<input type="hidden" id="datepicker" name="expYmdt" value=\''+selectDate+'\'/>');
        }
    });
}
