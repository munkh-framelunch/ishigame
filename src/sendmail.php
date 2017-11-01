<?php
$name=$_POST['name'];
$mail=$_POST['mail'];
$msg=$_POST['msg'];
$mailresult = -1;
if($msg!=""){
    $org = mb_internal_encoding();
    mb_internal_encoding("ISO-2022-JP");
    $message = "\r\n".stripslashes($_POST['name'])."様\r\n\r\n"
        ."石亀工業へお問い合わせ頂きありがとうございます。\r\n"
        ."以下の内容で承りました。\r\n\r\n"
        ."--------------------------------------------\r\n\r\n"
        ."会社前: ".stripslashes($_POST['company'])."\r\n"
        ."お名前: ".stripslashes($_POST['name'])."\r\n"
        ."メールアドレス: ".stripslashes($_POST['mail'])."\r\n"
        ."お問い合わせ種別: ".stripslashes($_POST['select'])."\r\n"
        ."お問い合わせ内容:\r\n".stripslashes($_POST['msg'])."\r\n\r\n"
        ."--------------------------------------------\r\n\r\n"
        ."頂戴致しましたお問い合わせにつきましては、\r\n"
        ."内容を確認の上、後ほど担当者より回答させて頂きます。\r\n"
        ."なお、お問い合わせの内容によっては、\r\n"
        ."回答までに数日かかる場合や、回答致しかねる場合もございます。\r\n"
        ."恐れ入りますが、予めご了承下さいますようお願い致します。\r\n\r\n"
        ."==================================================\r\n\r\n"
        ."このメールにお心当たりのない方は、お手数ですが、\r\n"
        ."下記お問い合わせ先までご連絡下さいますようお願い致します。\r\n\r\n"
        ."【お問い合わせ先】\r\n"
        ."株式会社 石亀工業 http://www.igm.co.jp/\r\n"
        ."TEL : 0566-75-7301（※TEL受付 : 平日10:00～17:00）\r\n\r\n"
        ."==================================================\r\n"
        ;//
    $to = 'info@igm.co.jp,k-hosokawa@igm.co.jp';
    $subject = '【株式会社 石亀工業】お問い合わせ完了';
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
