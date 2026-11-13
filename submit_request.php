<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/database.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['message'=>'Method not allowed']); exit; }
$data = json_decode(file_get_contents('php://input'), true) ?? [];
$type = $data['request_type'] ?? '';
$name = trim($data['customer_name'] ?? '');
$phone = trim($data['phone'] ?? '');
$address = trim($data['address'] ?? '');
$item = trim($data['item_name'] ?? '');
$date = $data['preferred_date'] ?? null;
$allowed = ['material','vehicle','equipment'];
if (!in_array($type, $allowed, true) || !$name || !$phone || !$address || !$item) { http_response_code(422); echo json_encode(['message'=>'Please complete all required fields.']); exit; }
if (!preg_match('/^[0-9+ ()-]{8,20}$/', $phone)) { http_response_code(422); echo json_encode(['message'=>'Enter a valid phone number.']); exit; }
$quantity = max(1, (int)($data['quantity'] ?? 1));
$period = trim($data['rental_period'] ?? '');
$cart = json_encode($data['cart'] ?? [], JSON_UNESCAPED_UNICODE);
$stmt = $pdo->prepare('INSERT INTO requests (request_type, item_name, customer_name, phone, address, preferred_date, quantity, rental_period, cart_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
$stmt->execute([$type, $item, $name, $phone, $address, $date ?: null, $quantity, $period ?: null, $cart]);
echo json_encode(['success'=>true,'id'=>(int)$pdo->lastInsertId()]);
