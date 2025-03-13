const header_menu = document.querySelector(".header_menu");

let menu_chk = true; //버튼 클릭 확인용

//header - table 생성성
function createTable() {
  header_menu.innerHTML = `
            <div class="header_menu_container">
                <div class="header_menu_header"></div>
                <div class="header_menu_row">
                    <div class="header_menu_item"  onclick="categoryMove(0)">전체게시판</div>
                    <div class="header_menu_item" onclick="subcategory()">서울</div>
                    <div class="header_menu_item" onclick="subcategory()">정치</div>
                    <div class="header_menu_item" onclick="subcategory()">보드게임</div>
                    <div class="header_menu_item" onclick="subcategory()">헬스</div>
                </div>
                <div class="header_menu_row">
                    <div class="header_menu_item" onclick="categoryMove(1)">자유게시판</div>
                    <div class="header_menu_item" onclick="subcategory()">경기도</div>
                    <div class="header_menu_item" onclick="subcategory()">경제</div>
                    <div class="header_menu_item" onclick="subcategory()">스팀</div>
                    <div class="header_menu_item" onclick="subcategory()">수영</div>
                </div>
                <div class="header_menu_row">
                    <div class="header_menu_item"></div>
                    <div class="header_menu_item" onclick="subcategory()">경상도</div>
                    <div class="header_menu_item" onclick="subcategory()">사회</div>
                    <div class="header_menu_item" onclick="subcategory()">오리진</div>
                    <div class="header_menu_item" onclick="subcategory()">필라테스</div>
                </div>
                <div class="header_menu_row">
                    <div class="header_menu_item"></div>
                    <div class="header_menu_item" onclick="subcategory()">충청도</div>
                    <div class="header_menu_item" onclick="subcategory()">과학</div>
                    <div class="header_menu_item" onclick="subcategory()">닌텐도</div>
                    <div class="header_menu_item" onclick="subcategory()">골프</div>
                </div>
                <div class="header_menu_row">
                    <div class="header_menu_item"></div>
                    <div class="header_menu_item" onclick="subcategory()">전라도</div>
                    <div class="header_menu_item" onclick="subcategory()">국제</div>
                    <div class="header_menu_item" onclick="subcategory()">기타</div>
                    <div class="header_menu_item" onclick="subcategory()">사격</div>
                </div>
              
                <!-- 마이페이지 & 고객센터 -->
                <div class="header_menu_footer">
                    <div class="my_page" onclick="mypage()">마이페이지</div>
                    <div class="header_menu_footer_links">
                        <div class="header_menu_footer_right" onclick="subcategory()">고객센터</div>
                        <div class="header_menu_footer_right" onclick="subcategory()">Gather 이용안내</div>
                    </div>
                </div>
            </div>
            
            `;
}

//logo 클릭
function main_reload() {
  window.location.href = "/";
}
//카테고리 표시
axios({
  method: "post",
  url: "/category",
})
  .then((res) => {
    console.log("Res", res.data.category);
    let category = res.data.category;

    //header_menu
    window.menubar = function () {
      if (menu_chk === true) {
        header_menu.style.display = "block";
        // header_menu 내용 생성
        createTable();
        const header_menu_header = document.querySelector(
          ".header_menu_header"
        );
        // 카테고리 넣기
        category.map((item) => {
          header_menu_header.innerHTML += `
                <div class="header_menu_header_item" onclick="categoryMove(${item.category_id})">${item.name}</div>`;
        });

        menu_chk = false;
      } else {
        header_menu.style.display = "none";
        menu_chk = true;
      }
    };
  })
  .catch((e) => {
    console.log("error", e);
  });

// 로그아웃
const content01 = document.querySelector(".content01");
const logoutFunc = () => {
  // 쿠키 삭제
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // 페이지 새로고침
  window.location.reload();
};

// 250306 사용자 검증
(async function () {
  const info = document.querySelector(".welcome");

  try {
    // 쿠키에서 토큰 추출하기
    // 브라우저에는 쿠키가 하나의 문자열로 관리되고 ';'를 기준으로 여러개 저장되기 때문에 token만 뽑으려고 split(";")하는 것
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((item) =>
      item.trim().startsWith("token=")
    );

    let data = "";

    if (!tokenCookie) {
      // 토큰이 없으면 로그인 링크 표시
      data = `<a href="/login" class="login">로그인</a>
        <a href="/signup" class="signup" >회원가입</a>`;

      info.innerHTML = data;
      return;
    }

    // 토큰 값만 추출 (token= 부분 제거)
    const token = tokenCookie.trim().substring(6);

    // 토큰 검증 요청
    const res = await axios.post(
      "/verify",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.result) {
      data = `
        <div><strong>${res.data.name}</strong>님 환영합니다.</div>
        <button onClick='logoutFunc()'>로그아웃</button>`;
    }

    info.innerHTML = data;
  } catch (error) {
    console.error("Authentication error:", error);
    alert("로그인 인증 시간이 만료 되었습니다. 다시 로그인 해주세요.");
    info.innerHTML = `<a href="/login" class="login">로그인</a>
        <a href="/signup" class="signup" >회원가입</a>`;
    window.location.replace("/login");
  }
})();

function mypage() {
  window.location.href = "/mypage";
}
// 카테고리 상세 페이지 이동
function categoryMove(categoryid) {
  if (categoryid === "all") {
    window.location.href = `/detailmain?category_id=0`;
  } else {
    window.location.href = `/detailmain?category_id=${categoryid}`;
  }
}

//subcategory
function subcategory() {
  alert("준비중입니다");
}
