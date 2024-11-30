function calculateBMI() {
    const age = document.getElementById('age').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // cm -> m

    if (!weight || !height) {
        alert('체중과 키를 올바르게 입력해주세요.');
        return;
    }

    // BMI 계산
    const bmi = (weight / (height * height)).toFixed(1);
    let bmiCategory;

    if (bmi < 18.5) {
        bmiCategory = '저체중';
    } else if (bmi < 23) {
        bmiCategory = '정상';
    } else if (bmi < 25) {
        bmiCategory = '비만전단계비만';
    } else if (bmi < 30) {
        bmiCategory = '1단계비만';
    } else if (bmi < 35) {
        bmiCategory = '2단계비만';
    } else {
        bmiCategory = '3단계비만';
    }

    // 결과 먼저 출력
    const result = document.getElementById('result');
    result.innerHTML = `BMI: ${bmi} (${bmiCategory})`;

    // PHP로 데이터 전송
    fetch('../../backend/get_exercise.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bmiCategory }),
    })
        .then(response => response.json())
        .then(data => {
            const exercise = document.getElementById('exercise');
            if (data.error) {
                exercise.innerHTML = `<p>오류: ${data.error}</p>`;
            } else {
                let html = '<h3>추천 운동</h3>';
                html += `
                    <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
                        <thead>
                            <tr>
                                <th>운동 단계</th>
                                <th>운동 목록</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                data.table.forEach(row => {
                    html += `
                        <tr>
                            <td>${row['운동 단계']}</td>
                            <td>${row['운동 목록']}</td>
                        </tr>
                    `;
                });
                html += '</tbody></table>';
                exercise.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('exercise').innerHTML = `<p>데이터를 가져오는 중 오류가 발생했습니다.</p>`;
        });
}
