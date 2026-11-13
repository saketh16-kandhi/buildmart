<?php
session_start();
require_once __DIR__ . '/../config/database.php';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admins WHERE username = ?');
  $stmt->execute([trim($_POST['username'] ?? '')]);
  $admin = $stmt->fetch();
  if ($admin && password_verify($_POST['password'] ?? '', $admin['password_hash'])) { session_regenerate_id(true); $_SESSION['admin_id'] = $admin['id']; header('Location: dashboard.php'); exit; }
  $error = 'Invalid username or password.';
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BuildMart Admin</title><link rel="stylesheet" href="../assets/css/style.css"></head><body><main style="max-width:420px;margin:10vh auto;background:white;padding:32px"><div class="eyebrow">BUILDMART ADMIN</div><h2>Sign in</h2><p style="font-size:12px;color:#777">Use the admin account you created in setup.</p><?php if($error) echo '<p style="color:#a33">'.htmlspecialchars($error).'</p>'; ?><form method="post"><label style="display:block;margin:15px 0;font-size:12px">Username<input name="username" required style="display:block;width:100%;padding:12px;margin-top:6px"></label><label style="display:block;margin:15px 0;font-size:12px">Password<input type="password" name="password" required style="display:block;width:100%;padding:12px;margin-top:6px"></label><button class="btn btn-primary" style="width:100%;justify-content:space-between">Sign in →</button></form><p><a href="../index.html" style="font-size:12px">← Back to website</a></p></main></body></html>
