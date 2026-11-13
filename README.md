# BuildMart — Construction Supply, Vehicle & Equipment Website

A responsive academic mini-project based on the supplied BuildMart proposal.

## Included features
- Responsive homepage with Materials, Delivery Vehicles, Equipment Rentals and How it Works sections
- Search and category filters for construction materials
- Cart with quantity controls and sample-price totals (stored in browser localStorage)
- Checkout, vehicle request and equipment rental forms
- PHP endpoint to validate and store requests in MySQL
- Admin login and dashboard to view requests and update status
- Sample request statuses: Pending, Processing, Dispatched, Delivered, Cancelled

## Technology
HTML5, CSS3, JavaScript, PHP, MySQL/MariaDB and XAMPP.

## Run with XAMPP
1. Install and open XAMPP. Start **Apache** and **MySQL**.
2. Copy the complete `buildmart_website` folder into `C:\xampp\htdocs\`.
3. Open `http://localhost/phpmyadmin`, create/import the database by importing `database.sql`.
4. Check `config/database.php`. Default XAMPP settings are host `localhost`, database `buildmart`, user `root`, blank password.
5. Visit `http://localhost/buildmart_website/`.
6. To create the demo admin, visit `http://localhost/buildmart_website/admin/create_admin.php` once.
7. Sign in at `http://localhost/buildmart_website/admin/login.php` using:
   - Username: `admin`
   - Password: `ChangeMe123!`
8. Change the demo password / replace the one-time admin creation flow for any real deployment, and **delete `admin/create_admin.php` immediately**.

## Important scope notes
- Prices, capacities and rental rates are sample values for an academic prototype.
- The site does not verify real supplier stock, confirm actual vehicle/equipment availability, or process payments.
- If PHP/MySQL is not configured, the frontend still runs as a preview. Submitted forms are saved only in that browser's localStorage as a fallback.
- This is a learning/demo project, not production-ready. Before deployment, add CSRF protection, stronger admin account setup, rate limiting, HTTPS, server-side date validation, and stricter authorization.

## Suggested viva explanation
- HTML creates the page structure, product cards and request forms.
- CSS provides the responsive layout and visual design.
- JavaScript handles product search, category filters, cart operations and form submission.
- PHP validates request data and stores it using PDO prepared statements.
- MySQL stores customer requests and their status; the admin dashboard updates status values.
