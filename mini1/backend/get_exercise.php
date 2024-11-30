<?php
header('Content-Type: application/json');

// JSON 데이터 받기
$data = json_decode(file_get_contents('php://input'), true);

$bmiCategory = str_replace(' ', '', $data['bmiCategory']); // 공백 제거로 비교 정규화

// MySQL 연결 정보
$servername = "mini.cfu0mkm84glu.ap-northeast-2.rds.amazonaws.com";
$username = "root";
$password = "asd6117625";
$database = "data";

try {
    // PDO 객체 생성
    $pdo = new PDO("mysql:host=$servername;dbname=$database;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL 쿼리
    $sql = "
        SELECT DISTINCT exercise, recommend, `rank`
        FROM (
            SELECT exercise, recommend, bmi, `rank` FROM age10
            UNION ALL
            SELECT exercise, recommend, bmi, `rank` FROM age20
            UNION ALL
            SELECT exercise, recommend, bmi, `rank` FROM age30
            UNION ALL
            SELECT exercise, recommend, bmi, `rank` FROM age40
            UNION ALL
            SELECT exercise, recommend, bmi, `rank` FROM age50
            UNION ALL
            SELECT exercise, recommend, bmi, `rank` FROM age60
            UNION ALL
            SELECT exercise, recommend, bmi, `rank` FROM age70
        ) AS combined
        WHERE bmi = :bmiCategory AND `rank` IN (1, 2)
        ORDER BY `rank` ASC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['bmiCategory' => $bmiCategory]);
    $recommendations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 각 단계로 데이터 매핑
    $response = [
        'warmup' => [],
        'main' => [],
        'finish' => []
    ];

    foreach ($recommendations as $rec) {
        if ($rec['exercise'] === '준비운동') {
            $response['warmup'][] = $rec['recommend'];
        } elseif ($rec['exercise'] === '본운동') {
            $response['main'][] = $rec['recommend'];
        } elseif ($rec['exercise'] === '마무리운동') {
            $response['finish'][] = $rec['recommend'];
        }
    }

    // JSON 형식으로 테이블 형태 구성
    $tableData = [
        ['운동 단계' => '준비운동', '운동 목록' => implode(', ', $response['warmup'])],
        ['운동 단계' => '본운동', '운동 목록' => implode(', ', $response['main'])],
        ['운동 단계' => '마무리운동', '운동 목록' => implode(', ', $response['finish'])]
    ];

    // 데이터가 없을 경우 오류 반환
    if (empty($response['warmup']) && empty($response['main']) && empty($response['finish'])) {
        echo json_encode(['error' => '추천 데이터가 충분하지 않습니다.']);
        exit;
    }

    // JSON 응답 출력
    echo json_encode(['table' => $tableData]);

} catch (PDOException $e) {
    // 에러 처리
    echo json_encode(['error' => '데이터베이스 연결 오류: ' . $e->getMessage()]);
}
?>
