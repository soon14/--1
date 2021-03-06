<?php
 defined('IN_IA') or exit('Access Denied');
include 'define.php';
require_once(IA_ROOT . '/addons/quickcenter/loader.php');
class QuickCreditModule extends WeModule{
    public function settingsDisplay($settings){
        global $_GPC, $_W;
        if (checksubmit('submit')){
            $cfg = array('description' => $_GPC['description']);
            if ($this -> saveSettings($cfg)){
                message('保存成功', 'refresh');
            }
        }
        $redirect_to = wurl('site/entry/center', array('m' => 'quickcenter', 'op' => 'display', 'weid' => $_W['weid']));
        if (checksubmit('installmenu')){
            $installed_menu = pdo_fetch('SELECT * FROM ' . tablename('quickcenter_module_bindings') . ' WHERE module=:module AND weid=:weid LIMIT 1', array(':module' => 'quickcredit', ':weid' => $_W['weid']));
            if (empty($installed_menu)){
                $open_url = $_W['siteroot'] . 'app/' . $this -> createMobileUrl('Goods');
                $ret = pdo_query("INSERT INTO " . tablename('quickcenter_module_bindings') . " (`weid`, `groupid`, `identifier`, `pidentifier`, `displayorder`, `title`, `url`, `thumb`, `module`, `do`, `callback`, `rich_callback_enable`, `enable`) VALUES
            ({$_W['weid']}, 'group01', 'quickcredit', '', 1, '好运积分', '{$open_url}', '{$_W['siteroot']}/addons/quickcredit/images/icon.png', 'quickcredit', 'Center', 'getCredit', 0, 1),
            ({$_W['weid']}, 'group09', 'commission-credit-settled', 'commission', 1, '已兑换积分', '', '{$_W['siteroot']}/addons/quickcredit/images/icon2.jpg', 'quickcredit', 'Center', 'getExchangedCredit', 0, 1)");
                if (!empty($ret)){
                    message('安装菜单成功', $redirect_to, 'success');
                }else{
                    message('安装菜单失败, 请重试，或联系管理员', referer(), 'error');
                }
            }else{
                message('菜单已经存在, 无需再次安装。如果需要重新安装，请先点击按钮卸载菜单。', referer(), 'error');
            }
        }
        if (checksubmit('uninstallmenu')){
            $ret = pdo_query("DELETE FROM " . tablename('quickcenter_module_bindings') . " WHERE weid=:weid AND module=:module", array(':weid' => $_W['weid'], ':module' => 'quickcredit'));
            message('卸载成功', $redirect_to, 'success');
        }
        yload() -> classs('quickcenter', 'FormTpl');
        include $this -> template('setting');
    }
}
