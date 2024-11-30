<?php
// MySQL 연결 정보 설정
$servername = "mini.cfu0mkm84glu.ap-northeast-2.rds.amazonaws.com";
$username = "root";
$password = "asd6117625";
$database = "data";


// 연결 생성
$conn = new mysqli($servername, $username, $password, $database);

// 연결 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
}
echo "MySQL 연결 성공";

// 연결 종료 (필요 시)
$conn->close();
?>
