<?php
global $_W,$_GPC;
$table = 'meepo_bbs_set';
load()->model('mc');
$tempalte = $this->module['config']['name']?$this->module['config']['name']:'default';

$member = mc_fetch($_W['member']['uid']);
$forum = getSet();
if(empty($forum['share_guid'])){
	$forum['share_guid'] = $_W['siteroot'].'/addons/meepo_bbs/template/mobile/default/img/weixin-share-guide.png';
}
$title = $forum['title'];

$id = $_GPC['id'];
$id = intval($_GPC['id']);
if(empty($id)){
	$res = array();
	$res['error_msg'] = '主题不存在或已删除';
}


$u = $_GPC['u'];
if(!empty($_W['member']['uid'])){
	if($u != $_W['member']['uid']){
		$url = $this->createMobileUrl('forum_topic',array('id'=>$id,'u'=>$_W['member']['uid']));
	}
}

$sql = "SELECT * FROM ".tablename('meepo_bbs_topics')." WHERE id = :id";
$params = array(':id'=>$id);
$item = pdo_fetch($sql,$params);

$item['content'] = replace_em($item['content']);
$item['thumb'] = iunserializer($item['thumb']);

if(!empty($item['fid'])){
	$return = check_look($item['fid']);
	if(is_error($return)){
		message($return['message'],$this->createMobileUrl('forum'),error);
	}
}
$openid = $_W['openid'];

$sql = "SELECT * FROM ".tablename('meepo_bbs_topics')." WHERE id = :id";
$params = array(':id'=>$id);
$topic = pdo_fetch($sql,$params);


$sql = "SELECT openid FROM ".tablename('mc_mapping_fans')." WHERE uid = :uid";
$params = array(':uid'=>$item['uid']);
$openid = pdo_fetchcolumn($sql,$params);
$to_uid = $topic['uid'];
$fid = $topic['fid'];
if(!empty($_W['openid'])){
	$sql = "SELECT num FROM ".tablename('meepo_bbs_topic_read')." WHERE openid = :openid AND tid = :tid";
	$params = array(':openid'=>$_W['openid'],':tid'=>$id);
	$num = pdo_fetchcolumn($sql,$params);
	if(empty($num)){
		//第一次阅读
		$data = array();
		$data['tid'] = $id;
		$data['openid'] = $_W['openid'];
		$data['time'] = time();
		$data['num'] = 1;
		pdo_insert('meepo_bbs_topic_read',$data);
	
		update_credit_read($id);
		//insert_home_message($_W['member']['uid'],$topic['uid'],$id,1,$_W['member']['nickname'].'阅读了您的帖子'.$topic['title']);
	
	}else{
		$data = array();
		$data['time'] = time();
		$data['num'] = $num + 1;
		pdo_update('meepo_bbs_topic_read',$data,array('openid'=>$openid,'tid'=>$tid));
	}
	pdo_update('meepo_bbs_topics',array('lnum'=>$item['lnum'] + 1),array('id'=>$id));
}


if($_W['openid'] != $openid){
	$is_mine = false;
}else{
	$is_mine = true;
}

$ismanager = check_manager();
if(is_error($ismanager)){
	$ismanager = 0;
}

$user = mc_fetch($item['uid'],array('nickname','avatar','mobile'));

$item['createtime'] = date('Y-m-d',$item['createtime']);

$sql = "SELECT * FROM ".tablename('meepo_bbs_topic_replie')." WHERE tid = :tid AND fid = :fid ";
$params = array(':tid'=>$id,':fid'=>0);
$replies = pdo_fetchall($sql,$params);
foreach ($replies as $re) {
	$user1 = mc_fetch($re['uid'],array('avatar','nickname','groupid','gender'));
	$re['author']['avatar'] = tomedia($user1['avatar']);
	$re['author']['nickname'] = $user1['nickname'];
	$re['author']['group'] = getGroupTitle($user1['groupid']);
	$re['author']['gender'] = $user1['gender'];
	$re['create_at'] = date('Y-m-d',$re['create_at']);
	$re['content'] = replace_em($re['content']);
	$re['thumb'] = iunserializer($re['thumb']);
	$sql = "SELECT * FROM ".tablename('meepo_bbs_topic_replie')." WHERE fid = :fid";
	$params = array(':fid'=>$re['id']);
	$mreply = pdo_fetchall($sql,$params);
	foreach ($mreply as $mre){
		$user2 = mc_fetch($mre['uid'],array('avatar','nickname','groupid','gender'));
		$re['mreply'][$mre['id']]['nickname'] = $user2['nickname'];
		$re['mreply'][$mre['id']]['content'] = $mre['content'];
	}
	
	$sql = "SELECT * FROM ".tablename('meepo_bbs_begging')." WHERE id = :id";
	$params = array(':id'=>$re['beggingid']);
	$begging = pdo_fetch($sql,$params);
	
	$re['begging'] = $begging['fee'];
	
	$re['reply_num'] = count($mreply);
	$sql = "SELECT COUNT(*) FROM ".tablename('meepo_bbs_topic_like')." WHERE fid = :fid ";
	$params = array(':fid'=>$re['id']);
	$re['like_num'] = pdo_fetchcolumn($sql,$params);
	
	$reply[] = $re;
}

$sql = "SELECT COUNT(*) FROM ".tablename('meepo_bbs_topic_share')." WHERE tid = :tid";
$params = array(':tid'=>$id);
$sharenum = pdo_fetchcolumn($sql,$params);

if($item['tab'] == 'begging'){
	$sql = "SELECT SUM(fee) FROM ".tablename('meepo_bbs_begging')." WHERE ttid = :tid AND status = 1";
	$params = array(':tid'=>$id);
	$replynum = pdo_fetchcolumn($sql,$params);
}else{
	$sql = "SELECT COUNT(*) FROM ".tablename('meepo_bbs_topic_replie')." WHERE tid = :tid";
	$params = array(':tid'=>$id);
	$replynum = pdo_fetchcolumn($sql,$params);
}


$sql = "SELECT COUNT(*) FROM ".tablename('meepo_bbs_topic_like')." WHERE tid = :tid";
$params = array(':tid'=>$id);
$likenum = pdo_fetchcolumn($sql,$params);

$sql = "SELECT COUNT(*) FROM ".tablename('meepo_bbs_topic_like')." WHERE openid = :openid AND tid = :tid";
$params = array(':openid'=>$_W['openid'],':tid'=>$id);
$liked = pdo_fetchcolumn($sql,$params);


$sql = "SELECT COUNT(*) FROM ".tablename('meepo_bbs_topic_replie')." WHERE uid = :uid AND tid = :tid";
$params = array(':uid'=>$_W['member']['uid'],':tid'=>$id);
$replied = pdo_fetchcolumn($sql,$params);


$_share = array();
$_share['title'] = $item['title'];
$_share['desc'] = strip_tags($item['content']);
$_share['imgUrl'] = tomedia($item['thumb'][0]);


if($topic['uid'] == $forum['sysuid']){
	if(is_array($item['thumb'])){
		//array_pop($item['thumb']);
	}
}

$advss = getAdv($item['fid']);

$_share['url'] = $this->createMobileUrl('forum_topic',array('id'=>$id,'uid'=>$_W['member']['uid']));

include $this->template($tempalte.'/templates/forum/topic');
