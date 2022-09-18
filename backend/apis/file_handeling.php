<?php

function convertToBase64($file, $save_path, $db_path)
{
    list($type, $file) = explode(';', $file); //split the type of image from its url
    list(, $extension)          = explode('/', $type); //get the extension of the file by splitting the type (data:image/jpeg)
    list(, $file)       = explode(',', $file); //remove (base64) prefix
    $file_name                  = uniqid('te37am', true) . date('Y-m-d') . '.' . $extension; //define unique name for the image
    $base64string              = base64_decode($file); //decode base64 string

    $data = [
        'db_save' => $db_path . $file_name,
        'folder_save' => $save_path . $file_name,
        'base64string' =>  $base64string,
    ];
    return $data;
}