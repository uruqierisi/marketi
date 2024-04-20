<?php
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch product details based on the barcode received
$barcode = $_GET['barcode'];
$sql_select = "SELECT * FROM products WHERE barcode = '$barcode'";
$result_select = $conn->query($sql_select);

if ($result_select->num_rows > 0) {
    // Product found
    $row = $result_select->fetch_assoc();
    $quantity = $row['quantity'];

    // Check if quantity is greater than 0
    if ($quantity > 0) {
        // Update the quantity in the database
        $sql_update = "UPDATE products SET quantity = quantity - 1 WHERE barcode = '$barcode'";
        if ($conn->query($sql_update) === TRUE) {
            // Return the product details
            echo json_encode($row);
        } else {
            echo json_encode(array('error' => 'Error updating quantity: ' . $conn->error));
        }
    } else {
        // Product out of stock
        echo json_encode(array('error' => 'Nuk ka me ne stock'));
    }
} else {
    // Product not found
    echo json_encode(array('error' => 'Nuk gjindet ky Produkt'));
}

$conn->close();
?>