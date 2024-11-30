document.addEventListener("DOMContentLoaded", () => {
    // 데이터를 서버에서 가져오기
    fetch('../../backend/get_data.php') // PHP 경로 수정 필요시 여기에 반영
      .then((response) => {
        if (!response.ok) throw new Error("데이터 로드 실패");
        return response.json();
      })
      .then((data) => {
        // 데이터를 regionData에 매핑
        data.forEach((item) => {
          if (!regionData[item.region]) {
            regionData[item.region] = [];
          }
          regionData[item.region].push({
            region1: item.region1,
            start: item.start,
            end: item.end,
            sport: item.sport,
          });
        });
        console.log("데이터 로드 완료:", regionData);
  
        // 지역 클릭 이벤트 설정
        setupRegionClickEvents();
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  });
  
  // 지역 클릭 이벤트 설정 함수
  function setupRegionClickEvents() {
    const regions = document.querySelectorAll("land");
  
    regions.forEach((region) => {
      region.addEventListener("click", () => {
        const regionName = region.getAttribute("title");
  
        // 데이터 확인 후 패널 업데이트
        if (regionData[regionName]) {
          const dataList = regionData[regionName];
          updateInfoPanel(regionName, dataList);
          updateNewPanel(regionName, dataList);
        } else {
          updateInfoPanel(regionName, []); // 데이터 없음 처리
          updateNewPanel(regionName, []); // 데이터 없음 처리
        }
      });
    });
  }
  
  // 첫 번째 패널(info-panel) 업데이트
  function updateInfoPanel(regionName, dataList) {
    const infoPanel = document.getElementById("info-panel");
    const previousOutput = infoPanel.querySelector(".data-output");
  
    // 기존 출력 제거
    if (previousOutput) {
      previousOutput.remove();
    }
  
    // 새 데이터 출력
    const dataOutput = document.createElement("div");
    dataOutput.className = "data-output";
  
    if (dataList.length > 0) {
      const itemsPerPage = 5; // 페이지당 표시할 항목 수
      let currentPage = 1;
  
      // 데이터 페이징 함수
      const renderPage = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = dataList.slice(start, end);
  
        let htmlContent = `<h3>${regionName}의 스포츠 정보</h3><hr>`;
        paginatedData.forEach((data, index) => {
          htmlContent += `
            <div>
              <strong>항목 ${start + index + 1}</strong><br>
              지역: ${data.region1}<br>
              기간: ${data.start} ~ ${data.end}<br>
              스포츠: ${data.sport}<br>
            </div>
          `;
        });
  
        // 페이징 버튼 추가
        htmlContent += `
          <div class="pagination">
            <button class="prev-btn" ${page === 1 ? "disabled" : ""}>이전</button>
            <span>페이지 ${page} / ${Math.ceil(dataList.length / itemsPerPage)}</span>
            <button class="next-btn" ${
              page === Math.ceil(dataList.length / itemsPerPage) ? "disabled" : ""
            }>다음</button>
          </div>
        `;
  
        dataOutput.innerHTML = htmlContent;
  
        // 이전/다음 버튼 클릭 이벤트
        const prevBtn = dataOutput.querySelector(".prev-btn");
        const nextBtn = dataOutput.querySelector(".next-btn");
  
        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
              currentPage--;
              renderPage(currentPage);
            }
          });
        }
  
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            if (currentPage < Math.ceil(dataList.length / itemsPerPage)) {
              currentPage++;
              renderPage(currentPage);
            }
          });
        }
      };
  
      // 첫 번째 페이지 렌더링
      renderPage(currentPage);
    } else {
      dataOutput.innerHTML = `<h3>${regionName}</h3><p>데이터가 없습니다.</p>`;
    }
  
    infoPanel.appendChild(dataOutput);
  }
  
  // 두 번째 패널(new-panel) 업데이트
  function updateNewPanel(regionName, dataList) {
    const newPanel = document.getElementById("new-data");
    const previousOutput = newPanel.querySelector(".data-output");
  
    // 기존 출력 제거
    if (previousOutput) {
      previousOutput.remove();
    }
  
    // 새 데이터 출력
    const dataOutput = document.createElement("div");
    dataOutput.className = "data-output";
  
    if (dataList.length > 0) {
      const itemsPerPage = 10; // 페이지당 표시할 항목 수
      let currentPage = 1;
  
      // 데이터 페이징 함수
      const renderPage = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = dataList.slice(start, end);
  
        let htmlContent = `<h3>${regionName}의 추가 정보</h3><hr>`;
        paginatedData.forEach((data, index) => {
          htmlContent += `
            <div>
              <strong>항목 ${start + index + 1}</strong><br>
              지역: ${data.region1}<br>
              스포츠: ${data.sport}<br>
            </div>
          `;
        });
  
        // 페이징 버튼 추가
        htmlContent += `
          <div class="pagination">
            <button class="prev-btn" ${page === 1 ? "disabled" : ""}>이전</button>
            <span>페이지 ${page} / ${Math.ceil(dataList.length / itemsPerPage)}</span>
            <button class="next-btn" ${
              page === Math.ceil(dataList.length / itemsPerPage) ? "disabled" : ""
            }>다음</button>
          </div>
        `;
  
        dataOutput.innerHTML = htmlContent;
  
        // 이전/다음 버튼 클릭 이벤트
        const prevBtn = dataOutput.querySelector(".prev-btn");
        const nextBtn = dataOutput.querySelector(".next-btn");
  
        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
              currentPage--;
              renderPage(currentPage);
            }
          });
        }
  
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            if (currentPage < Math.ceil(dataList.length / itemsPerPage)) {
              currentPage++;
              renderPage(currentPage);
            }
          });
        }
      };
  
      // 첫 번째 페이지 렌더링
      renderPage(currentPage);
    } else {
      dataOutput.innerHTML = `<h3>${regionName}</h3><p>새로운 패널 데이터가 없습니다.</p>`;
    }
  
    newPanel.appendChild(dataOutput);
  }
  