<?php
$host = "mini.cfu0mkm84glu.ap-northeast-2.rds.amazonaws.com";      // MySQL 서버 주소
$username = "root";       // MySQL 사용자명
$password = "asd6117625"; // MySQL 비밀번호
$database = "data"; // 연결할 데이터베이스 이름

// MySQL 연결 시도
$conn = new mysqli($host, $username, $password, $database);

// 연결 상태 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
} else {
    echo "MySQL 데이터베이스에 성공적으로 연결되었습니다.<br>";
    echo "MySQL 서버 버전: " . $conn->server_info . "<br>";
}

// 연결 종료
$conn->close();
echo "MySQL 연결이 종료되었습니다.";
?>
