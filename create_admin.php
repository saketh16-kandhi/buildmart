<?php
// Run once from a local terminal/browser after importing database.sql, then DELETE this file.
require_once __DIR__ . '/../config/database.php';
$username = 'admin';
$password = 'ChangeMe123!';
$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)');
$stmt->execute([$username, $hash]);
echo 'Admin created. Username: admin | Password: ChangeMe123! Change this password and delete create_admin.php immediately.';
