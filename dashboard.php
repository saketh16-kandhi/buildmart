<?php
session_start();
if (empty($_SESSION['admin_id'])) { header('Location: login.php'); exit; }
require_once __DIR__ . '/../config/database.php';
if ($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['request_id'],$_POST['status'])) {
  $allowed=['Pending','Processing','Dispatched','Delivered','Cancelled'];
  if(in_array($_POST['status'],$allowed,true)){ $s=$pdo->prepare('UPDATE requests SET status=? WHERE id=?');$s->execute([$_POST['status'],(int)$_POST['request_id']]); }
  header('Location: dashboard.php');exit;
}
$rows=$pdo->query('SELECT * FROM requests ORDER BY created_at DESC')->fetchAll();
function h($v){return htmlspecialchars((string)$v,ENT_QUOTES,'UTF-8');}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BuildMart Admin Dashboard</title><link rel="stylesheet" href="../assets/css/style.css"></head><body><header class="site-header"><a class="brand" href="../index.html"><span class="brand-mark">B</span><span>Build<span class="brand-accent">Mart</span><small>ADMIN DASHBOARD</small></span></a><a class="admin-link" href="logout.php">Log out ↗</a></header><main class="section"><div class="eyebrow">ADMINISTRATION</div><h2>Customer requests</h2><p>Review demo orders and update request status.</p><div style="overflow:auto;background:white;padding:15px"><table style="width:100%;border-collapse:collapse;font-size:12px;text-align:left"><thead><tr><?php foreach(['ID','Type','Item / cart','Customer','Phone','Date','Status','Update'] as $th) echo '<th style="padding:12px;border-bottom:1px solid #ddd">'.h($th).'</th>'; ?></tr></thead><tbody><?php foreach($rows as $r): ?><tr><td style="padding:12px;border-bottom:1px solid #eee">BM-<?=h($r['id'])?></td><td><?=h($r['request_type'])?></td><td><?=h($r['item_name'])?></td><td><?=h($r['customer_name'])?></td><td><?=h($r['phone'])?></td><td><?=h($r['preferred_date'])?></td><td><?=h($r['status'])?></td><td><form method="post" style="display:flex;gap:5px"><input type="hidden" name="request_id" value="<?=h($r['id'])?>"><select name="status"><?php foreach(['Pending','Processing','Dispatched','Delivered','Cancelled'] as $st): ?><option <?= $r['status']===$st?'selected':'' ?>><?=h($st)?></option><?php endforeach; ?></select><button>Save</button></form></td></tr><?php endforeach; ?><?php if(!$rows): ?><tr><td colspan="8" style="padding:20px">No requests yet.</td></tr><?php endif; ?></tbody></table></div></main></body></html>
