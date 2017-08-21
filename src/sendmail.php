<?php
$name=$_POST['name'];
$mail=$_POST['mail'];
$msg=$_POST['msg'];
$mailresult = -1;
if($msg!=""){
    $org = mb_internal_encoding();
    mb_internal_encoding("ISO-2022-JP");
    $message = "\r\nお問い合わせがありました。\r\n"
        ."--------------------------------------------\r\n\r\n"
        ."【お名前】\r\n".stripslashes($_POST['name'])."\r\n\r\n"
        ."【メールアドレス】\r\n".stripslashes($_POST['mail'])."\r\n\r\n"
        ."【弊社をどこでお知りになりましたか？】\r\n".stripslashes($_POST['whereKnown'])."\r\n\r\n"
        ."【お問い合わせ内容】\r\n".stripslashes($_POST['msg'])."\r\n\r\n"
        ."【お問い合わせ日時】\r\n".date("Y-m-d H:i:s")."\r\n\r\n"
        ."--------------------------------------------\r\n\r\n";//
    $to = 'munkh@framelunch.jp,ohguchi@framelunch.jp';
    $subject = 'Ishigame contact from web';
    $encoding = mb_detect_encoding($message, "SJIS,EUC-JP,JIS,UTF-8");
    if ($encoding != "JIS") {
        $message = mb_convert_encoding($message, "JIS", $encoding);
    }
    $subject = mb_encode_mimeheader(mb_convert_encoding($subject, "ISO-2022-JP", "UTF-8"),"ISO-2022-JP","B","\r\n");
    mb_internal_encoding($org);

    $message = br2nl($message);

    if (mail($to, $subject, $message, '')){
        $mailresult = 0;
    }
    echo $mailresult;
}
function br2nl($string)
{
    // 大文字・小文字を区別しない
    return preg_replace('/<br>/i', "\n", $string);
}

?>