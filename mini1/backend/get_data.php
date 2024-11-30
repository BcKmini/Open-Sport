<?php
// MySQL 연결 설정
$servername = "mini.cfu0mkm84glu.ap-northeast-2.rds.amazonaws.com";
$username = "root";
$password = "asd6117625";
$database = "data";

// MySQL 연결 생성
$conn = new mysqli($servername, $username, $password, $database);

// 연결 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
}

// 데이터 가져오기
$sql = "SELECT start, end, region, region1, region2, sport FROM data";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// JSON 형식으로 데이터 반환
header('Content-Type: application/json');
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$conn->close();
?>
