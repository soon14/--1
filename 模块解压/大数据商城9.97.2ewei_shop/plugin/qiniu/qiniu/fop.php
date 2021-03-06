<?php

//微赞科技 by QQ:800083075 http://www.012wz.com/
require_once('auth_digest.php');
class Qiniu_ImageView
{
    public $Mode;
    public $Width;
    public $Height;
    public $Quality;
    public $Format;
    public function MakeRequest($url)
    {
        $ops = array(
            $this->Mode
        );
        if (!empty($this->Width)) {
            $ops[] = 'w/' . $this->Width;
        }
        if (!empty($this->Height)) {
            $ops[] = 'h/' . $this->Height;
        }
        if (!empty($this->Quality)) {
            $ops[] = 'q/' . $this->Quality;
        }
        if (!empty($this->Format)) {
            $ops[] = 'format/' . $this->Format;
        }
        return $url . "?imageView/" . implode('/', $ops);
    }
}
class Qiniu_Exif
{
    public function MakeRequest($url)
    {
        return $url . "?exif";
    }
}
class Qiniu_ImageInfo
{
    public function MakeRequest($url)
    {
        return $url . "?imageInfo";
    }
}