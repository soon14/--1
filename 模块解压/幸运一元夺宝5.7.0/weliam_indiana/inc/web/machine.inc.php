<?php
		global $_W,$_GPC;
	/*	$array = array();
		$array[0]='58.14.0.0-58.25.255.255';$array[1]='58.30.0.0-58.63.255.255';$array[2]='58.66.0.0-58.67.255.255';$array[3]='58.82.0.0-58.83.255.255';$array[4]='58.87.64.0-58.87.127.255';
		$array[5]='58.100.0.0-58.101.255.255';$array[6]='58.116.0.0-58.119.255.255';$array[7]='58.128.0.0-58.135.255.255';$array[8]='58.144.0.0-58.144.255.255';$array[9]='58.192.0.0-58.197.255.255';
		$array[10]='58.200.0.0-58.223.255.255';$array[11]='58.240.0.0-58.255.255.255';$array[12]='59.32.0.0-59.83.255.255';$array[13]='59.107.0.0-59.109.255.255';$array[14]='59.151.0.0-59.151.127.255';
		$array[15]='59.191.0.0-59.191.127.255';$array[16]='59.192.0.0-60.13.63.255';$array[17]='60.13.128.0-60.31.255.255';$array[18]='60.55.0.0-60.55.255.255';$array[19]='60.63.0.0-60.63.255.255';
		$array[20]='60.160.0.0-60.191.255.255';$array[21]='60.194.0.0-60.195.255.255';$array[22]='60.200.0.0-60.204.255.255';$array[23]='60.208.0.0-60.223.255.255';$array[24]='60.232.0.0-60.233.255.255';
		$array[25]='60.255.0.0-60.255.255.255';$array[26]='61.14.29.8-61.14.29.15';$array[27]='61.14.29.80-61.14.29.95';$array[28]='61.28.0.0-61.28.127.255';$array[29]='61.29.128.0-61.29.255.255';
		$array[30]='61.45.128.0-61.45.191.255';$array[31]='61.47.128.0-61.47.191.255';$array[32]='61.48.0.0-61.55.255.255';$array[33]='61.128.0.0-61.161.83.67';$array[34]='61.161.83.69-61.161.155.55';
		$array[35]='61.161.155.64-61.191.255.255';$array[36]='61.216.99.204-61.216.99.207';$array[37]='61.232.0.0-61.237.255.255';$array[38]='61.240.0.0-61.243.255.255';$array[39]='62.159.35.80-62.159.35.95';
		$array[40]='62.159.104.192-62.159.104.199';$array[41]='63.162.142.0-63.162.142.255';$array[42]='64.34.234.0-64.34.234.255';$array[43]='80.146.214.32-80.146.214.39';$array[44]='80.255.45.192-80.255.45.255';
		$array[45]='121.4.0.0-121.5.255.255';$array[46]='121.8.0.0-121.29.255.255';$array[47]='121.32.0.0-121.36.255.255';$array[48]='121.40.0.0-121.43.255.255';$array[49]='124.6.64.0-124.6.127.255';
		$array[50]='124.16.0.0-124.17.255.255';$array[51]='124.20.0.0-124.21.255.255';$array[52]='124.29.0.0-124.29.127.255';$array[53]='124.40.128.0-124.40.191.255';$array[54]='124.42.0.0-124.42.127.255';
		$array[55]='124.47.0.0-124.47.63.255';$array[56]='124.64.0.0-124.65.255.255';$array[57]='124.72.0.0-124.79.255.255';$array[58]='124.88.0.0-124.95.255.255';$array[59]='124.108.8.0-124.108.15.255';
		$array[60]='124.112.0.0-124.119.255.255';$array[61]='124.128.0.0-124.135.255.255';$array[62]='124.147.128.0-124.147.255.255';$array[63]='124.156.0.0-124.156.255.255';$array[64]='124.160.0.0-124.162.255.255';
		$array[65]='124.172.0.0-124.173.255.255';$array[66]='124.192.0.0-124.193.255.255';$array[67]='124.196.0.0-124.196.255.255';$array[68]='124.200.0.0-124.207.255.255';$array[69]='124.220.0.0-124.224.255.255';
		$array[70]='124.226.0.0-124.233.255.255';$array[71]='124.240.0.0-124.240.127.255';$array[72]='124.242.0.0-124.242.255.255';$array[73]='124.243.192.0-124.243.255.255';$array[74]='124.248.0.0-124.248.127.255';
		$array[75]='124.249.0.0-124.251.255.255';$array[76]='124.254.0.0-124.254.63.255';$array[77]='125.31.192.0-125.47.255.255';$array[78]='125.58.128.0-125.58.255.255';$array[79]='125.62.0.0-125.62.63.255';
		$array[80]='125.64.0.0-125.98.255.255';$array[81]='125.104.0.0-125.127.255.255';$array[82]='125.171.0.0-125.171.255.255';$array[83]='125.208.0.0-125.208.63.255';$array[84]='125.210.0.0-125.210.255.255';
		$array[85]='125.213.0.0-125.213.127.255';$array[86]='125.215.0.0-125.215.63.255';$array[87]='125.216.0.0-125.223.255.255';$array[88]='127.0.0.0.0-127.255.255.255';$array[89]='125.254.128.0-125.254.191.255';
		$array[90]='134.196.0.0-134.196.255.255';$array[91]='147.243.224.0-147.243.255.255';$array[92]='159.226.0.0-159.226.255.255';$array[93]='161.207.0.0-161.207.255.255';$array[94]='162.105.0.0-162.105.255.255';
		$array[95]='166.111.0.0-166.111.255.255';$array[96]='167.139.0.0-167.139.255.255';$array[97]='168.160.0.0-168.160.255.255';$array[98]='192.83.122.0-192.83.122.255';$array[99]='192.124.154.0-192.124.154.255';
		$array[100]='192.188.170.0-192.188.170.255';$array[101]='194.117.101.45-194.117.101.45';$array[102]='194.117.101.55-194.117.101.55';$array[103]='194.117.103.43-194.117.103.43';$array[104]='194.117.103.58-194.117.103.58';
		$array[105]='194.117.103.78-194.117.103.79';$array[106]='194.117.103.120-194.117.103.120';$array[107]='194.117.103.123-194.117.103.123';$array[108]='194.117.103.150-194.117.103.150';$array[109]='194.117.103.154-194.117.103.155';
		$array[110]='194.117.103.181-194.117.103.181';$array[111]='194.117.103.189-194.117.103.189';$array[112]='194.117.103.195-194.117.103.195';$array[113]='194.117.103.206-194.117.103.206';$array[114]='194.117.103.215-194.117.103.215';
		$array[115]='194.117.103.218-194.117.103.219';$array[116]='194.117.103.230-194.117.103.230';$array[117]='194.117.119.101-194.117.119.101';$array[118]='195.112.167.20-195.112.167.23';$array[119]='195.112.167.56-195.112.167.59';
		$array[120]='195.112.167.84-195.112.167.87';$array[121]='195.112.167.156-195.112.167.163';$array[122]='195.112.177.20-195.112.177.23';$array[123]='195.112.177.32-195.112.177.35';$array[124]='195.112.177.124-195.112.177.127';
		$array[125]='195.112.191.12-195.112.191.12';$array[126]='198.17.7.0-198.17.7.255';$array[127]='202.0.110.0-202.0.110.255';$array[128]='202.2.144.64-202.2.144.127';$array[129]='202.4.128.0-202.4.159.255';
		$array[130]='202.4.252.0-202.4.255.255';$array[131]='202.8.128.0-202.8.159.255';$array[132]='202.10.64.0-202.10.79.255';$array[133]='202.14.88.0-202.14.88.255';$array[134]='202.14.235.0-202.14.238.255';
		$array[135]='202.20.120.0-202.20.120.255';$array[136]='202.22.248.0-202.22.255.255';$array[137]='202.38.0.0-202.38.15.255';$array[138]='202.38.64.0-202.38.138.255';$array[139]='202.38.140.0-202.38.143.255';
		$array[140]='202.38.146.0-202.38.147.255';$array[141]='202.38.149.0-202.38.150.255';$array[142]='202.38.152.0-202.38.156.255';$array[143]='202.38.160.0-202.38.161.255';$array[144]='202.38.164.0-202.38.177.255';
		$array[145]='202.38.184.0-202.38.255.255';$array[146]='202.41.142.0-202.41.142.255';$array[147]='202.41.152.0-202.41.159.255';$array[148]='202.41.240.0-202.41.255.255';$array[149]='202.43.144.0-202.43.159.255';
		$array[150]='202.46.32.0-202.46.63.255';$array[151]='202.46.224.0-202.46.239.255';$array[152]='202.60.112.0-202.60.127.255';$array[153]='202.63.248.0-202.63.251.255';$array[154]='202.69.4.0-202.69.7.255';
		$array[155]='202.69.16.0-202.69.31.255';$array[156]='202.70.0.0-202.70.31.255';$array[157]='202.70.160.0-202.70.175.255';$array[158]='202.74.8.0-202.74.15.255';$array[159]='202.75.208.0-202.75.223.255';
		$array[160]='202.77.170.48-202.77.170.63';$array[161]='202.85.208.0-202.85.223.255';$array[162]='202.89.21.0-202.89.21.255';$array[163]='202.90.0.0-202.90.3.255';$array[164]='202.90.224.0-202.90.239.255';
		$array[165]='202.90.252.0-202.91.3.255';$array[166]='202.91.128.0-202.91.131.255';$array[167]='202.91.176.0-202.91.191.255';$array[168]='202.92.0.0-202.92.3.255';$array[169]='202.92.252.0-202.93.3.255';
		$array[170]='202.93.252.0-202.94.31.255';$array[171]='202.95.0.0-202.95.31.255';$array[172]='202.95.252.0-202.120.24.223';$array[173]='202.120.25.0-202.122.7.255';$array[174]='202.122.32.0-202.122.39.255';
		$array[175]='202.122.64.0-202.122.95.255';$array[176]='202.122.112.0-202.122.119.255';$array[177]='202.122.128.0-202.122.128.255';$array[178]='202.123.96.0-202.123.111.255';$array[179]='202.125.176.0-202.125.191.255';
		$array[180]='202.127.0.0-202.127.7.255';$array[181]='202.127.12.0-202.127.31.255';$array[182]='202.127.12.0-202.127.31.255';$array[183]='202.127.40.0-202.127.63.255';$array[184]='202.127.112.0-202.127.167.255';
		$array[185]='202.127.192.0-202.127.209.255';$array[186]='202.127.212.0-202.127.255.255';$array[187]='202.130.0.0-202.130.31.255';$array[188]='202.130.224.0-202.130.255.255';$array[189]='202.131.16.0-202.131.23.255';
		$array[190]='202.131.48.0-202.131.63.255';$array[191]='202.131.208.0-202.131.223.255';$array[192]='202.136.48.0-202.136.63.255';$array[193]='202.136.208.0-202.136.239.255';$array[194]='202.136.252.0-202.136.255.255';
		$array[195]='202.141.160.0-202.141.191.255';$array[196]='202.142.16.0-202.142.31.255';$array[197]='202.143.16.0-202.143.31.255';$array[198]='202.148.96.0-202.148.127.255';$array[199]='202.149.160.0-202.149.191.255';
		$array[200]='202.149.224.0-202.149.255.255';$array[201]='202.150.16.0-202.150.31.255';$array[202]='202.152.176.0-202.152.191.255';$array[203]='202.153.48.0-202.153.63.255';$array[204]='202.158.160.0-202.158.191.255';
		$array[205]='202.160.176.0-202.160.191.255';$array[206]='202.164.0.0-202.164.15.255';$array[207]='202.165.208.0-202.165.223.255';$array[208]='202.168.160.0-202.168.191.255';$array[209]='202.170.128.0-202.170.159.255';
		$array[210]='202.170.216.0-202.170.223.255';$array[211]='202.173.8.0-202.173.15.255';$array[212]='202.173.224.0-202.173.255.255';$array[213]='202.176.224.0-202.176.255.255';$array[214]='202.179.240.0-202.179.255.255';
		$array[215]='202.180.128.0-202.180.159.255';$array[216]='202.181.112.0-202.181.127.255';$array[217]='202.189.80.0-202.189.95.255';$array[218]='202.192.0.0-202.192.241.255';$array[219]='202.192.243.0-202.207.255.255';
		$array[220]='203.79.0.0-203.79.15.255';$array[221]='203.80.144.0-203.80.159.255';$array[222]='203.81.16.0-203.81.31.255';$array[223]='203.83.56.0-203.83.63.255';$array[224]='203.86.0.0-203.86.95.255';
		$array[225]='203.88.32.0-203.88.63.255';$array[226]='203.88.192.0-203.88.223.255';$array[227]='203.89.0.0-203.89.3.255';$array[228]='203.90.0.0-203.90.3.255';$array[229]='203.90.128.0-203.90.223.255';
		$array[220]='203.91.32.0-203.91.63.255';$array[221]='203.91.96.0-203.91.111.255';$array[222]='203.91.120.0-203.91.127.255';$array[223]='203.92.0.0-203.92.3.255';$array[224]='203.92.160.0-203.92.191.255';
		$array[225]='203.93.0.0-203.94.31.255';$array[226]='203.95.0.0-203.95.7.255';$array[227]='203.95.96.0-203.95.111.255';$array[228]='203.98.205.32-203.98.205.47';$array[229]='203.98.205.168-203.98.205.175';
		$array[230]='203.98.207.0-203.98.207.7';$array[231]='203.98.207.80-203.98.207.111';$array[232]='203.99.16.0-203.99.31.255';$array[233]='203.99.80.0-203.99.95.255';$array[234]='203.100.32.0-203.100.47.255';
		$array[235]='203.132.32.0-203.132.63.255';$array[236]='203.134.240.0-203.134.247.255';$array[237]='203.135.160.0-203.135.175.255';$array[238]='203.142.12.0-203.142.13.255';$array[239]='203.148.0.0-203.148.63.255';
		$array[240]='203.152.64.0-203.152.95.255';$array[241]='203.156.192.0-203.156.255.255';$array[242]='203.158.16.0-203.158.23.255';$array[243]='203.161.192.0-203.161.223.255';$array[244]='203.166.160.0-203.166.191.255';
		$array[245]='203.171.224.0-203.171.239.255';$array[246]='203.174.96.0-203.174.127.255';$array[247]='203.175.128.0-203.175.159.255';$array[248]='203.184.80.0-203.184.95.255';$array[249]='203.187.160.0-203.187.191.255';
		$array[250]='203.191.16.0-203.191.31.255';$array[251]='203.191.144.0-203.191.151.255';$array[252]='203.194.139.159-203.194.139.190';$array[253]='203.207.64.0-203.208.19.255';$array[254]='203.209.224.0-203.209.255.255';
		$array[255]='219.128.0.0-219.159.255.255';$array[256]='219.72.0.0-219.72.255.255';$array[257]='217.243.166.64-217.243.166.71';$array[258]='211.136.0.0-211.167.255.255';$array[259]='203.222.42.64-203.222.42.127';
		$array[260]='219.216.0.0-219.239.255.255';$array[261]='219.82.0.0-219.82.255.255';$array[262]='217.244.15.128-217.244.15.191';$array[263]='212.63.181.28-212.63.181.31';$array[264]='203.222.166.192-203.222.166.255';
		$array[265]='219.242.0.0-219.247.255.255';$array[266]='220.101.192.0-220.101.255.255';$array[267]='218.0.0.0-218.31.255.255';$array[268]='212.63.181.76-212.63.181.79';$array[269]='203.222.176.244-203.222.177.71';
		$array[270]='220.112.0.0-220.115.255.255';$array[271]='220.231.0.0-220.231.63.255';$array[272]='218.56.0.0-218.99.255.255';$array[273]='212.63.181.140-212.63.181.143';$array[274]='203.222.177.192-203.222.177.255';
		$array[275]='220.160.0.0-220.207.255.255';$array[276]='220.231.128.0-220.231.255.255';$array[277]='218.192.0.0-218.207.255.255';$array[278]='212.63.181.200-212.63.181.203';$array[279]='203.222.182.144-203.222.182.159';
		$array[280]='220.232.64.0-220.232.127.255';$array[281]='220.248.0.0-220.252.255.255';$array[282]='218.240.0.0-218.247.255.255';$array[283]='212.63.183.4-212.63.183.4';$array[284]='203.222.187.176-203.222.187.183';
		$array[285]='220.234.0.0-220.234.255.255';$array[286]='221.0.0.0-221.12.191.255';$array[287]='218.249.0.0-218.249.255.255';$array[288]='212.63.183.15-212.63.183.15';$array[289]='210.5.0.0-210.5.31.255';
		$array[290]='221.13.0.0-221.15.255.255';$array[291]='221.122.0.0-221.123.255.255';$array[292]='221.129.0.0-221.131.255.255';$array[293]='212.63.183.23-212.63.183.23';$array[294]='210.5.128.0-210.5.143.255';
		$array[295]='221.136.0.0-221.137.255.255';$array[296]='221.136.0.0-221.137.255.255';$array[297]='';$array[298]='212.63.183.23-212.63.183.23';$array[299]='210.14.64.0-210.14.95.255';
		
		$arr = serialize($array);
		file_put_contents(WELIAM_INDIANA."/static/ip.text", var_export($arr, true).PHP_EOL, FILE_APPEND);*/
		$id = intval($_GPC['goodsid']);
		$periods = intval($_GPC['periods']);
		$title = $_GPC['title'];
		$url='../addons/weliam_indiana/static/head_imgs'; //放图片的文件夹路径名称
		$filename = "../addons/weliam_indiana/static/nickname.text";$filename2 = "../addons/weliam_indiana/static/ip.text";
		$goods = pdo_fetch("select id,goodsid,period_number,periods,shengyu_codes,createtime from".tablename('weliam_indiana_period')."where uniacid={$_W['uniacid']}  and goodsid={$id} and periods={$periods}");
		$goodslist = m('goods')->getGoods($goods['goodsid']);
		$period = pdo_fetchall("select createtime from".tablename('weliam_indiana_consumerecord')."where uniacid={$_W['uniacid']} and period_number='{$goods['period_number']}' order by id desc");
		$machinesnum = pdo_fetchcolumn("select count(mid) from".tablename('weliam_indiana_member')."where uniacid = '{$_W['uniacid']}' and type = '-1' and ip != ''");
		$machines = pdo_fetch("select * from".tablename('weliam_indiana_machineset')."where period_number = '{$goods['period_number']}'");
		if (checksubmit('sure')) {
			//添加机器人
			$limit_num = $_GPC['limit_num'];
			$init = $period[0]['createtime'];
			$now = time();
			$head_imgs_array = m('order')->get_head_img($url, $limit_num);
			$nickname_arr = m('order')->get_nickname($filename,$limit_num);
			$randtime_arr = m('order')->get_randtime($init,$now,$limit_num);
			$ip_arr = m('order')->get_ip($filename2,$limit_num);
			for($i=0;$i<$limit_num;$i++){
				$api = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip={$ip_arr[$i]}"; 
				$json = @file_get_contents($api);//调用新浪IP地址库 
				$arr = json_decode($json,true);
				pdo_insert('weliam_indiana_member',array('nickname'=>$nickname_arr[$i]['nickname'],'avatar'=>$head_imgs_array[$i],'type'=>-1,'uniacid'=>$_W['uniacid'],'ip'=>$ip_arr[$i]));
				$openid = pdo_insertid();
				pdo_update('weliam_indiana_member',array('openid'=>'machine'.$openid),array('mid'=>$openid));
			}
					
			message('机器人添加成功！', referer(), 'success');
		}

		$op = $_GPC['op'];
		if($op == 'used'){
			//使用现有机器人
			$limit_num = $_GPC['limit_num'];
			$code_num = $_GPC['code_num'];
			if($limit_num > $machinesnum || $code_num > $goods['shengyu_codes'] || $limit_num > $code_num){
				message('机器人数量或者分码数量大于现有数量', referer(), 'error');
			}else{
				$machines = m('order')->get_Machines($limit_num);
				$num_arr = m('order')->randnum($code_num,$limit_num);
				$max_time = pdo_fetchcolumn("select max(createtime) from".tablename('weliam_indiana_consumerecord')."where uniacid = '{$_W['uniacid']}' and period_number = '{$goods['period_number']}'");
				if(empty($max_time)){
					$max_time = $goods['createtime'];
				}
				$machines_time = m('order')->get_randtime($max_time,time(),$limit_num);
				$i = 0;
				foreach($machines as $key=>$value){
					$api = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip={$value['ip']}";
					$json = @file_get_contents($api);//调用新浪IP地址库 
					$arr = json_decode($json,true);
					pdo_insert('weliam_indiana_cart',array('num'=>$num_arr[$i],'uniacid'=>$_W['uniacid'],'period_number'=>$goods['period_number'],'openid'=>$value['openid'],'title'=>$title,'ip'=>$value['ip'],'ipaddress'=>$arr['province'].$arr['city']));
					m('codes')->code($value['openid'],'machine',$_W['uniacid'],$machines_time[$i]);
					$i++;
				}
				message('使用机器人成功！', referer(), 'success');
			}
			
		}
		
		if($op == 'timeused'){
			//限定时间使用机器人
			$data['uniacid'] = $_W['uniacid'];
			$data['period_number'] = $goods['period_number'];
			$data['max_num'] = !empty($_GPC['max_num'])?$_GPC['max_num']:-1; // -1表示默认不限制购买数
			$data['createtime'] = time();
			$data['start_time'] = strtotime($_GPC['time']['start']);
			$data['end_time'] = strtotime($_GPC['time']['end']);
			$data['status'] = 1;        										//	1表示正常执行
			$data['timebucket'] = $_GPC['timebucket'];
			$data['machine_num'] = $_GPC['machine_num'];						//单次购买夺宝码个数
			$data['is_followed'] = $_GPC['is_followed'];
			if((strtotime($_GPC['time']['end'])+28800)%86400 < (strtotime($_GPC['time']['start'])+28800)%86400 || $_GPC['machine_num'] < 1 || $_GPC['timebucket'] < 1){
				message('机器人参数设置不正确！', referer(), 'error');
				exit;
			}else{
				$machine = pdo_fetch("select id from".tablename('weliam_indiana_machineset')."where uniacid = '{$_W['uniacid']}' and period_number = '{$goods['period_number']}'");
				if(empty($machine)){
					pdo_insert("weliam_indiana_machineset",$data);
					m('machine')->marchine_cir($goods['period_number'] , $_GPC['timebucket'] , $_GPC['machine_num']);
				}else{
					pdo_update("weliam_indiana_machineset",$data,array('period_number'=>$goods['period_number']));
					m('machine')->marchine_cir($goods['period_number'] , $_GPC['timebucket'] , $_GPC['machine_num']);
				}
			}
		}
		
		if($op == 'dele_machine'){
			//删除定时机器人
			$period_number = $_GPC['period_number'];
			pdo_update("weliam_indiana_machineset",array('status'=>'0','is_followed'=>0),array('period_number'=>$period_number));
			message('机器人暂停成功！', referer(), 'success');
		}
		include $this->template('goods_machine');
	?>