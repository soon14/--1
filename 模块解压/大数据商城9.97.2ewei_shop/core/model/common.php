<?php
if (!defined('IN_IA')) {
    exit('Access Denied');
}
class Ewei_DShop_Common
{
    public function getSetData($uniacid = 0)
    {
        global $_W;
        if (empty($uniacid)) {
            $uniacid = $_W['uniacid'];
        }
        $set = m('cache')->getArray('sysset', $uniacid);
        if (empty($set)) {
            $set = pdo_fetch("select * from " . tablename('ewei_shop_sysset') . ' where uniacid=:uniacid limit 1', array(
                ':uniacid' => $uniacid
            ));
            if (empty($set)) {
                $set = array();
            }
            m('cache')->set('sysset', $set, $uniacid);
        }
        return $set;
    }
    public function getSysset($key = '', $uniacid = 0)
    {
        global $_W, $_GPC;
        $set     = $this->getSetData($uniacid);
        $allset  = unserialize($set['sets']);
        $retsets = array();
        if (!empty($key)) {
            if (is_array($key)) {
                foreach ($key as $k) {
                    $retsets[$k] = isset($allset[$k]) ? $allset[$k] : array();
                }
            } else {
                $retsets = isset($allset[$key]) ? $allset[$key] : array();
            }
            return $retsets;
        } else {
            return $allset;
        }
    }
    public function alipay_build($params, $alipay = array(), $type = 0, $openid = '')
    {
        global $_W;
        $tid                   = $params['tid'];
        $set                   = array();
        $set['service']        = 'alipay.wap.create.direct.pay.by.user';
        $set['partner']        = $alipay['partner'];
        $set['_input_charset'] = 'utf-8';
        $set['sign_type']      = 'MD5';
        if (empty($type)) {
            $set['notify_url'] = $_W['siteroot'] . "addons/ewei_shop/payment/alipay/notify.php";
            $set['return_url'] = $_W['siteroot'] . "app/index.php?i={$_W['uniacid']}&c=entry&m=ewei_shop&do=order&p=pay&op=return&openid=" . $openid;
        } else {
            $set['notify_url'] = $_W['siteroot'] . "addons/ewei_shop/payment/alipay/notify.php";
            $set['return_url'] = $_W['siteroot'] . "app/index.php?i={$_W['uniacid']}&c=entry&m=ewei_shop&do=member&p=recharge&op=return&openid=" . $openid;
        }
        $set['out_trade_no'] = $tid;
        $set['subject']      = $params['title'];
        $set['total_fee']    = $params['fee'];
        $set['seller_id']    = $alipay['account'];
        $set['payment_type'] = 1;
        $set['body']         = $_W['uniacid'] . ':' . $type;
        $prepares            = array();
        foreach ($set as $key => $value) {
            if ($key != 'sign' && $key != 'sign_type') {
                $prepares[] = "{$key}={$value}";
            }
        }
        sort($prepares);
        $string = implode($prepares, '&');
        $string .= $alipay['secret'];
        $set['sign'] = md5($string);
        return array(
            'url' => ALIPAY_GATEWAY . '?' . http_build_query($set, '', '&')
        );
    }
    function wechat_build($params, $wechat, $type = 0)
    {
        global $_W;
        load()->func('communication');
        if (empty($wechat['version']) && !empty($wechat['signkey'])) {
            $wechat['version'] = 1;
        }
        $wOpt = array();
        if ($wechat['version'] == 1) {
            $wOpt['appId']               = $wechat['appid'];
            $wOpt['timeStamp']           = TIMESTAMP . "";
            $wOpt['nonceStr']            = random(8) . "";
            $package                     = array();
            $package['bank_type']        = 'WX';
            $package['body']             = urlencode($params['title']);
            $package['attach']           = $_W['uniacid'] . ':' . $type;
            $package['partner']          = $wechat['partner'];
            $package['device_info']      = "ewei_shop";
            $package['out_trade_no']     = $params['tid'];
            $package['total_fee']        = $params['fee'] * 100;
            $package['fee_type']         = '1';
            $package['notify_url']       = $_W['siteroot'] . "addons/ewei_shop/payment/wechat/notify.php";
            $package['spbill_create_ip'] = CLIENT_IP;
            $package['input_charset']    = 'UTF-8';
            ksort($package);
            $string1 = '';
            foreach ($package as $key => $v) {
                if (empty($v)) {
                    continue;
                }
                $string1 .= "{$key}={$v}&";
            }
            $string1 .= "key={$wechat['key']}";
            $sign    = strtoupper(md5($string1));
            $string2 = '';
            foreach ($package as $key => $v) {
                $v = urlencode($v);
                $string2 .= "{$key}={$v}&";
            }
            $string2 .= "sign={$sign}";
            $wOpt['package'] = $string2;
            $string          = '';
            $keys            = array(
                'appId',
                'timeStamp',
                'nonceStr',
                'package',
                'appKey'
            );
            sort($keys);
            foreach ($keys as $key) {
                $v = $wOpt[$key];
                if ($key == 'appKey') {
                    $v = $wechat['signkey'];
                }
                $key = strtolower($key);
                $string .= "{$key}={$v}&";
            }
            $string           = rtrim($string, '&');
            $wOpt['signType'] = 'SHA1';
            $wOpt['paySign']  = sha1($string);
            return $wOpt;
        } else {
            $package              = array();
            $package['appid']     = $wechat['appid'];
            $package['mch_id']    = $wechat['mchid'];
            $package['nonce_str'] = random(8) . "";
            $package['body']             = $params['title'];
            $package['device_info']      = "ewei_shop";
            $package['attach']           = $_W['uniacid'] . ':' . $type;
            $package['out_trade_no']     = $params['tid'];
            $package['total_fee']        = $params['fee'] * 100;
            $package['spbill_create_ip'] = CLIENT_IP;
            $package['notify_url']       = $_W['siteroot'] . "addons/ewei_shop/payment/wechat/notify.php";
            $package['trade_type']       = 'JSAPI';
            $package['openid']           = $_W['fans']['from_user'];
            ksort($package, SORT_STRING);
            $string1 = '';
            foreach ($package as $key => $v) {
                if (empty($v)) {
                    continue;
                }
                $string1 .= "{$key}={$v}&";
            }
            $string1 .= "key={$wechat['signkey']}";
            $package['sign'] = strtoupper(md5($string1));
            $dat             = array2xml($package);
            $response        = ihttp_request('https://api.mch.weixin.qq.com/pay/unifiedorder', $dat);
            if (is_error($response)) {
                return $response;
            }
            $xml = @simplexml_load_string($response['content'], 'SimpleXMLElement', LIBXML_NOCDATA);
            if (strval($xml->return_code) == 'FAIL') {
                return error(-1, strval($xml->return_msg));
            }
            if (strval($xml->result_code) == 'FAIL') {
                return error(-1, strval($xml->err_code) . ': ' . strval($xml->err_code_des));
            }
            $prepayid          = $xml->prepay_id;
            $wOpt['appId']     = $wechat['appid'];
            $wOpt['timeStamp'] = TIMESTAMP . "";
            $wOpt['nonceStr']  = random(8) . "";
            $wOpt['package']   = 'prepay_id=' . $prepayid;
            $wOpt['signType']  = 'MD5';
            ksort($wOpt, SORT_STRING);
            foreach ($wOpt as $key => $v) {
                $string .= "{$key}={$v}&";
            }
            $string .= "key={$wechat['signkey']}";
            $wOpt['paySign'] = strtoupper(md5($string));
            return $wOpt;
        }
    }
    public function getAccount()
    {
        global $_W;
        load()->model('account');
        if (!empty($_W['acid'])) {
            return WeAccount::create($_W['acid']);
        } else {
            $acid = pdo_fetchcolumn("SELECT acid FROM " . tablename('account_wechats') . " WHERE `uniacid`=:uniacid LIMIT 1", array(
                ':uniacid' => $_W['uniacid']
            ));
            return WeAccount::create($acid);
        }
        return false;
    }
    public function shareAddress()
    {
        global $_W, $_GPC;
        $appid  = $_W['account']['key'];
        $secret = $_W['account']['secret'];
        load()->func('communication');
        $url = $_W['siteroot'] . "app/index.php?" . $_SERVER['QUERY_STRING'];
        if (empty($_GPC['code'])) {
            $oauth2_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" . $appid . "&redirect_uri=" . urlencode($url) . "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
            header("location: $oauth2_url");
            exit();
        }
        $code      = $_GPC['code'];
        $token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" . $appid . "&secret=" . $secret . "&code=" . $code . "&grant_type=authorization_code";
        $resp      = ihttp_get($token_url);
        $token     = @json_decode($resp['content'], true);
        if (empty($token) || !is_array($token) || empty($token['access_token']) || empty($token['openid'])) {
            return false;
        }
        $package = array(
            "appid" => $appid,
            "url" => $url,
            'timestamp' => time() . "",
            'noncestr' => random(8, true) . "",
            'accesstoken' => $token['access_token']
        );
        ksort($package, SORT_STRING);
        $addrSigns = array();
        foreach ($package as $k => $v) {
            $addrSigns[] = "{$k}={$v}";
        }
        $string   = implode('&', $addrSigns);
        $addrSign = strtolower(sha1(trim($string)));
        $data     = array(
            "appId" => $appid,
            "scope" => "jsapi_address",
            "signType" => "sha1",
            "addrSign" => $addrSign,
            "timeStamp" => $package['timestamp'],
            "nonceStr" => $package['noncestr']
        );
        return $data;
    }
    public function createNO($table, $field, $prefix)
    {
        $billno = date('YmdHis') . random(6, true);
        while (1) {
            $count = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_' . $table) . " where {$field}=:billno limit 1", array(
                ':billno' => $billno
            ));
            if ($count <= 0) {
                break;
            }
            $billno = date('YmdHis') . random(6, true);
        }
        return $prefix . $billno;
    }
    public function html_images($detail = '')
    {
        $detail = htmlspecialchars_decode($detail);
        preg_match_all("/<img.*?src=[\'| \"](.*?(?:[\.gif|\.jpg|\.png|\.jpeg]?))[\'|\"].*?[\/]?>/", $detail, $imgs);
        $images = array();
        if (isset($imgs[1])) {
            foreach ($imgs[1] as $img) {
                $im       = array(
                    "old" => $img,
                    "new" => save_media($img)
                );
                $images[] = $im;
            }
        }
        foreach ($images as $img) {
            $detail = str_replace($img['old'], $img['new'], $detail);
        }
        return $detail;
    }
    public function getSec($uniacid = 0)
    {
        global $_W;
        if (empty($uniacid)) {
            $uniacid = $_W['uniacid'];
        }
        $set = pdo_fetch("select sec from " . tablename('ewei_shop_sysset') . ' where uniacid=:uniacid limit 1', array(
            ':uniacid' => $uniacid
        ));
        if (empty($set)) {
            $set = array();
        }
        return $set;
    }
    public function paylog($log = '')
    {
        global $_W;
        $openpaylog = m('cache')->getString('paylog', 'global');
        if (!empty($openpaylog)) {
            $path = IA_ROOT . "/addons/ewei_shop/data/paylog/" . $_W['uniacid'] . "/" . date('Ymd');
            if (!is_dir($path)) {
                load()->func('file');
                @mkdirs($path, '0777');
            }
            $file = $path . "/" . date('H') . '.log';
            file_put_contents($file, $log, FILE_APPEND);
        }
    }
    public function checkClose()
    {
        if (strexists($_SERVER['REQUEST_URI'], '/web/')) {
            return;
        }
        $shop = $this->getSysset('shop');
        if (!empty($shop['close'])) {
            if (!empty($shop['closeurl'])) {
                header('location: ' . $shop['closeurl']);
                exit;
            }
            die("<!DOCTYPE html>
					<html>
						<head>
							<meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0'>
							<title>抱歉，商城暂时关闭</title><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=0'><link rel='stylesheet' type='text/css' href='https://res.wx.qq.com/connect/zh_CN/htmledition/style/wap_err1a9853.css'>
						</head>
						<body>
						<style type='text/css'>
						body { background:#fbfbf2; color:#333;}
						img { display:block; width:100%;}
						.header {
						width:100%; padding:10px 0;text-align:center;font-weight:bold;}
						</style>
						<div class='page_msg'>
						
						<div class='inner'><span class='msg_icon_wrp'><i class='icon80_smile'></i></span>{$shop['closedetail']}</div></div>
						</body>
					</html>");
        }
    }
}