// 設定角色一停止動作精靈圖的影格數。  
const CHARACTER1_STOP_FRAMES = 9; // 依照角色一 STOP 圖片實際的九個影格設定。
// 設定角色一跑步動作精靈圖的影格數。  
const CHARACTER1_RUN_FRAMES = 11; // 依照角色一 RUN 圖片實際的十一個影格設定。
// 設定角色二停止動作精靈圖的影格數。  
const CHARACTER2_STOP_FRAMES = 8; // 依照角色二 stop 圖片實際的八個影格設定。
// 設定角色二跳躍動作精靈圖的影格數。  
const CHARACTER2_JUMP_FRAMES = 14; // 依照角色二 jump 圖片實際的十四個影格設定。
// 設定角色二答錯動作精靈圖的影格數。  
const CHARACTER2_WRONG_FRAMES = 8; // 依照角色二 wrong 圖片實際的八個影格設定。
// 設定動畫每張影格播放的時間。  
const FRAME_DURATION = 90; // 每張影格顯示九十毫秒以形成連續動作。
// 設定角色一每秒移動的像素數。  
const MOVE_SPEED = 260; // 使用每秒像素數設定角色一的移動速度。
// 設定角色一在畫布上的顯示高度。  
const CHARACTER1_HEIGHT = 216 * 1.3; // 將角色一目前高度再放大一點三倍。
// 設定角色二的等比例放大倍率。  
const CHARACTER2_SCALE = 1.15 * 1.3; // 將角色二目前的所有動作尺寸再放大一點三倍。
// 設定角色靠近時額外保留的觸發距離。  
// 設定選擇題題目文字。  
const QUIZ_QUESTION = "1 + 1 = ？"; // 設定本次練習的數學題目。
// 設定選擇題各選項文字。  
const QUIZ_OPTIONS = ["A. 1", "B. 2", "C. 3", "D. 4"]; // 設定四個可供點選的答案。
// 設定選擇題正確答案的選項索引。  
const QUIZ_CORRECT_INDEX = 1; // 索引一代表第二個選項 B。

// 宣告角色一停止動作精靈圖。  
let character1StopSprite; // 儲存角色一停止動作圖片。
// 宣告角色一跑步動作精靈圖。  
let character1RunSprite; // 儲存角色一跑步動作圖片。
// 宣告角色二停止動作精靈圖。  
let character2StopSprite; // 儲存角色二停止動作圖片。
// 宣告角色二跳躍動作精靈圖。  
let character2JumpSprite; // 儲存角色二答對時的跳躍圖片。
// 宣告角色二答錯動作精靈圖。  
let character2WrongSprite; // 儲存角色二答錯時的動作圖片。
// 宣告畫布背景圖片。  
let sceneBackground; // 儲存要鋪滿畫布的背景圖片。
// 宣告角色一目前的位置與面向。  
let character1X; // 儲存角色一中心點的水平座標。
let character1Y; // 儲存角色一中心點的垂直座標。
let character1Direction = 1; // 1 代表角色一面向右方，-1 代表面向左方。
// 宣告角色一目前的動畫影格與計時狀態。  
let character1Frame = 0; // 儲存角色一目前播放的影格索引。
let character1LastFrameTime = 0; // 記錄角色一上次切換影格的時間。
let character1WasRunning = false; // 記錄角色一上一個畫面的移動狀態。
// 宣告角色二的位置與動作狀態。  
let character2X; // 儲存角色二中心點的水平座標。
let character2Y; // 儲存角色二中心點的垂直座標。
let character2Action = "stop"; // 儲存角色二目前的 stop、jump 或 wrong 動作。
let character2Frame = 0; // 儲存角色二目前播放的影格索引。
let character2LastFrameTime = 0; // 記錄角色二上次切換影格的時間。
// 宣告題目視窗與作答狀態。  
let quizVisible = false; // 記錄選擇題目前是否顯示。
let quizAnswered = false; // 記錄角色一是否已回答目前這次題目。
let quizOptionBounds = []; // 儲存畫面上各答案按鈕的位置與大小。

// 在建立畫布前載入背景與兩個角色的精靈圖。  
function preload() { // p5.js 會在 setup 執行前完成圖片載入。
  sceneBackground = loadImage("bg/bg1.png"); // 載入填滿畫布的背景圖片。
  character1StopSprite = loadImage("1/STOP/STOP.png"); // 載入角色一停止動作圖片。
  character1RunSprite = loadImage("1/RUN/RUN.png"); // 載入角色一跑步動作圖片。
  character2StopSprite = loadImage("2/stop/stop.png"); // 載入角色二停止動作圖片。
  character2JumpSprite = loadImage("2/jump/jump.png"); // 載入角色二答對時的跳躍圖片。
  character2WrongSprite = loadImage("2/wrong/wrong.png"); // 載入角色二答錯時的動作圖片。
} // 結束 preload 函式。

// 建立全螢幕畫布並初始化兩個角色的位置。  
function setup() { // p5.js 啟動時執行一次。
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
  imageMode(CORNER); // 讓圖片繪製座標從圖片左上角開始計算。
  character1X = width * 2 / 3; // 將角色一初始位置放在畫布寬度的三分之二處。
  character1Y = height * 2 / 3; // 將角色一中心放在距離畫布底部約三分之一處。
  character2X = width / 3; // 將角色二放在畫布寬度的三分之一處。
  character2Y = height * 2 / 3; // 讓角色二與角色一站在同一水平高度。
  character1LastFrameTime = millis(); // 初始化角色一動畫計時器。
  character2LastFrameTime = millis(); // 初始化角色二動畫計時器。
} // 結束 setup 函式。

// 每一個畫面更新背景、角色動作、位置與題目視窗。  
function draw() { // p5.js 會持續執行此函式以播放動畫。
  image(sceneBackground, 0, 0, width, height); // 將背景圖片縮放至填滿整個畫布。
  character2X = width / 3; // 讓角色二隨畫布尺寸保持在寬度三分之一處。
  character2Y = height * 2 / 3; // 讓角色二隨畫布尺寸保持在高度三分之二處。
  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查目前是否按住鍵盤右方向鍵。
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查目前是否按住鍵盤左方向鍵。
  const isRunning = movingRight || movingLeft; // 有按住任一方向鍵時切換角色一跑步動作。
  const now = millis(); // 取得目前程式執行的毫秒時間。
  const character1Sprite = isRunning ? character1RunSprite : character1StopSprite; // 依移動狀態選擇角色一圖片。
  const character1FrameCount = isRunning ? CHARACTER1_RUN_FRAMES : CHARACTER1_STOP_FRAMES; // 依動作取得角色一影格總數。
  const character1FrameWidth = character1Sprite.width / character1FrameCount; // 計算角色一精靈圖中每格的寬度。
  const character1FrameHeight = character1Sprite.height; // 取得角色一精靈圖的影格高度。
  const character1DisplayWidth = character1FrameWidth / character1FrameHeight * CHARACTER1_HEIGHT; // 按比例計算角色一顯示寬度。
  const character1InteractionWidth = character1StopSprite.width / CHARACTER1_STOP_FRAMES / character1StopSprite.height * CHARACTER1_HEIGHT; // 使用角色一待機尺寸作為固定互動寬度。

  if (isRunning !== character1WasRunning) { // 偵測角色一是否剛切換停止或跑步動作。
    character1Frame = 0; // 切換動作時從該動作的第一格開始播放。
    character1LastFrameTime = now; // 重新開始計算角色一的影格時間。
    character1WasRunning = isRunning; // 記錄目前角色一的移動狀態。
  } // 結束角色一動作切換判斷。

  const character1ElapsedFrames = floor((now - character1LastFrameTime) / FRAME_DURATION); // 計算角色一應前進的影格數。

  if (character1ElapsedFrames > 0) { // 經過足夠時間時才切換角色一影格。
    character1Frame = (character1Frame + character1ElapsedFrames) % character1FrameCount; // 循環播放角色一的動作影格。
    character1LastFrameTime += character1ElapsedFrames * FRAME_DURATION; // 保留計時餘數以維持穩定動畫速度。
  } // 結束角色一影格更新判斷。

  if (movingRight && !quizVisible) { // 沒有答題視窗時按右鍵可讓角色一向右移動。
    character1Direction = 1; // 設定角色一面向右方。
    character1X += MOVE_SPEED * deltaTime / 1000; // 依經過時間更新角色一水平位置。
  } else if (movingLeft && !quizVisible) { // 沒有答題視窗時按左鍵可讓角色一向左移動。
    character1Direction = -1; // 設定角色一面向左方。
    character1X -= MOVE_SPEED * deltaTime / 1000; // 依經過時間更新角色一水平位置。
  } // 結束角色一移動判斷。

  character1X = constrain(character1X, character1DisplayWidth / 2, width - character1DisplayWidth / 2); // 限制角色一不會移出畫布左右邊界。
  const character2Sprite = getCharacter2Sprite(); // 取得角色二目前動作的精靈圖。
  const character2FrameCount = getCharacter2FrameCount(); // 取得角色二目前動作的影格總數。
  const character2InteractionWidth = character2StopSprite.width / CHARACTER2_STOP_FRAMES * CHARACTER2_SCALE; // 使用放大後的角色二待機尺寸作為固定互動寬度。
  const characterEdgeGap = abs(character1X - character2X) - (character1InteractionWidth / 2 + character2InteractionWidth / 2); // 計算兩角色外緣之間的實際水平空隙。
  const interactionDistance = width / 6; // 將觸發距離設定為畫布寬度的六分之一。
  const characterIsNear = characterEdgeGap <= interactionDistance; // 外緣空隙小於畫布寬度六分之一時顯示題目。

  if (characterIsNear) { // 角色一靠近角色二時開始目前這次互動。
    if (!quizAnswered) { // 尚未回答目前這次題目時才顯示選擇題。
      quizVisible = true; // 顯示選擇題視窗並等待作答。
    } // 結束尚未作答判斷。
  } else { // 角色一離開角色二附近時結束目前互動。
    quizVisible = false; // 隱藏選擇題視窗。
    quizAnswered = false; // 允許下一次靠近時重新作答。
    setCharacter2Action("stop"); // 讓角色二恢復停止動作。
  } // 結束角色靠近判斷。

  const character2ElapsedFrames = floor((now - character2LastFrameTime) / FRAME_DURATION); // 計算角色二應前進的影格數。

  if (character2ElapsedFrames > 0) { // 經過足夠時間時才切換角色二影格。
    character2Frame = (character2Frame + character2ElapsedFrames) % character2FrameCount; // 循環播放角色二目前的動作。
    character2LastFrameTime += character2ElapsedFrames * FRAME_DURATION; // 保留計時餘數以維持穩定動畫速度。
  } // 結束角色二影格更新判斷。

  drawCharacter2Frame(character2Sprite, character2FrameCount, character2Frame, character2X, character2Y); // 以原始一倍尺寸繪製角色二目前影格。
  drawCharacter1Frame(character1Sprite, character1FrameWidth, character1FrameHeight, character1Frame, character1DisplayWidth); // 繪製角色一目前影格。

  if (quizVisible) { // 顯示題目視窗時才繪製選擇題內容。
    drawQuiz(); // 繪製半透明題目框與四個答案按鈕。
  } // 結束題目視窗繪製判斷。
} // 結束 draw 函式。

// 取得角色二目前動作所使用的精靈圖。  
function getCharacter2Sprite() { // 依角色二目前動作回傳對應圖片。
  if (character2Action === "jump") { // 判斷角色二目前是否正在跳躍。
    return character2JumpSprite; // 回傳答對時使用的跳躍圖片。
  } // 結束跳躍動作判斷。
  if (character2Action === "wrong") { // 判斷角色二目前是否正在答錯動作。
    return character2WrongSprite; // 回傳答錯時使用的動作圖片。
  } // 結束答錯動作判斷。
  return character2StopSprite; // 預設回傳角色二停止動作圖片。
} // 結束 getCharacter2Sprite 函式。

// 取得角色二目前動作所使用的影格數。  
function getCharacter2FrameCount() { // 依角色二目前動作回傳影格總數。
  if (character2Action === "jump") { // 判斷角色二目前是否正在跳躍。
    return CHARACTER2_JUMP_FRAMES; // 回傳跳躍動畫的影格數。
  } // 結束跳躍影格數判斷。
  if (character2Action === "wrong") { // 判斷角色二目前是否正在答錯動作。
    return CHARACTER2_WRONG_FRAMES; // 回傳答錯動畫的影格數。
  } // 結束答錯影格數判斷。
  return CHARACTER2_STOP_FRAMES; // 預設回傳停止動畫的影格數。
} // 結束 getCharacter2FrameCount 函式。

// 切換角色二動作並從第一格開始播放。  
function setCharacter2Action(action) { // 設定角色二的新動作並重設該動作動畫。
  if (character2Action !== action) { // 只有動作不同時才重新開始播放。
    character2Action = action; // 儲存角色二的新動作名稱。
    character2Frame = 0; // 將角色二影格重設為第一格。
    character2LastFrameTime = millis(); // 重設角色二動畫計時器。
  } // 結束動作切換判斷。
} // 結束 setCharacter2Action 函式。

// 等比例放大並繪製角色二的一格精靈圖。  
function drawCharacter2Frame(sprite, frameCount, frameIndex, centerX, centerY) { // 繪製角色二指定的放大影格。
  const frameWidth = sprite.width / frameCount; // 計算精靈圖每格的原始寬度。
  const frameHeight = sprite.height; // 取得精靈圖每格的原始高度。
  const displayWidth = frameWidth * CHARACTER2_SCALE; // 計算角色二放大後的影格寬度。
  const displayHeight = frameHeight * CHARACTER2_SCALE; // 計算角色二放大後的影格高度。
  image(sprite, centerX - displayWidth / 2, centerY - displayHeight / 2, displayWidth, displayHeight, frameIndex * frameWidth, 0, frameWidth, frameHeight); // 從精靈圖裁切一格並等比例放大繪製。
} // 結束 drawCharacter2Frame 函式。

// 繪製角色一目前的精靈影格。  
function drawCharacter1Frame(sprite, frameWidth, frameHeight, frameIndex, displayWidth) { // 繪製角色一指定的動作影格。
  push(); // 暫存畫布狀態以設定角色一的面向。
  translate(character1X, character1Y); // 將繪圖原點移至角色一中心。
  scale(character1Direction, 1); // 面向左方時水平翻轉角色一圖片。
  image(sprite, -displayWidth / 2 * character1Direction, -CHARACTER1_HEIGHT / 2, displayWidth, CHARACTER1_HEIGHT, frameIndex * frameWidth, 0, frameWidth, frameHeight); // 繪製角色一目前的單一影格。
  pop(); // 還原畫布狀態避免翻轉影響其他繪圖。
} // 結束 drawCharacter1Frame 函式。

// 繪製半透明選擇題視窗與可點選的答案。  
function drawQuiz() { // 在畫布中央繪製題目和選項按鈕。
  const boxWidth = width / 4; // 將題目視窗寬度設定為畫布寬度的四分之一。
  const boxHeight = height / 4; // 將題目視窗高度設定為畫布高度的四分之一。
  const boxX = (width - boxWidth) / 2; // 將題目視窗水平置中。
  const boxY = (height - boxHeight) / 2; // 將題目視窗垂直置中。
  quizOptionBounds = []; // 清除前一畫面保存的答案按鈕位置。
  push(); // 暫存繪圖樣式以便繪製題目視窗。
  rectMode(CORNER); // 設定矩形座標從左上角開始計算。
  stroke(120, 90, 0); // 設定題目視窗及按鈕外框顏色。
  strokeWeight(2); // 設定題目視窗及按鈕外框線寬。
  fill(255, 255, 0, 77); // 設定黃色背景並使用約百分之三十不透明度。
  rect(boxX, boxY, boxWidth, boxHeight, 12); // 繪製畫布寬高各四分之一的黃色題目框。
  fill(0); // 將題目文字顏色設為黑色。
  noStroke(); // 移除文字周圍的外框。
  textAlign(CENTER, CENTER); // 將題目文字置中對齊。
  textSize(max(16, min(30, boxHeight * 0.12))); // 依題目視窗大小調整題目文字尺寸。
  text(QUIZ_QUESTION, boxX + boxWidth / 2, boxY + boxHeight / 2); // 以題目框中心點作為文字中心位置。

  for (let index = 0; index < QUIZ_OPTIONS.length; index++) { // 依序繪製四個答案按鈕。
    const buttonWidth = boxWidth * 0.21; // 將每個答案按鈕設定為題目框寬度的百分之二十一。
    const buttonHeight = boxHeight * 0.2; // 將每個按鈕高度設定為視窗高度的百分之二十。
    const buttonX = boxX + boxWidth * (0.03 + index * 0.24); // 將四個答案按鈕平均排列在同一列。
    const buttonY = boxY + boxHeight * 0.72; // 將答案按鈕排列在題目框下方。
    quizOptionBounds.push({ x: buttonX, y: buttonY, width: buttonWidth, height: buttonHeight }); // 保存按鈕範圍以供滑鼠點選判斷。
    stroke(100, 80, 0); // 設定答案按鈕外框顏色。
    fill(255, 245, 180, 235); // 設定容易辨識的淺黃色答案按鈕底色。
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 8); // 繪製目前的答案按鈕。
    noStroke(); // 移除答案文字周圍的外框。
    fill(0); // 將答案文字顏色設為黑色。
    textSize(max(12, min(22, buttonHeight * 0.45))); // 依答案按鈕大小調整文字尺寸。
    text(QUIZ_OPTIONS[index], buttonX + buttonWidth / 2, buttonY + buttonHeight / 2); // 在答案按鈕中央顯示選項文字。
  } // 結束答案按鈕繪製迴圈。

  pop(); // 還原題目視窗繪製前的畫布樣式。
} // 結束 drawQuiz 函式。

// 處理學生點選答案按鈕的操作。  
function mousePressed() { // 使用者按下滑鼠時檢查是否點選答案。
  if (!quizVisible) { // 題目未顯示時不處理滑鼠點擊。
    return; // 結束滑鼠事件處理。
  } // 結束題目顯示判斷。

  for (let index = 0; index < quizOptionBounds.length; index++) { // 逐一檢查滑鼠是否落在答案按鈕範圍內。
    const option = quizOptionBounds[index]; // 取得目前答案按鈕的位置與尺寸。
    const clickedInside = mouseX >= option.x && mouseX <= option.x + option.width && mouseY >= option.y && mouseY <= option.y + option.height; // 判斷滑鼠是否點在目前答案內。

    if (clickedInside) { // 點選答案按鈕時提交作答結果。
      quizAnswered = true; // 設定本次靠近互動已完成作答。
      quizVisible = false; // 隱藏題目視窗。
      setCharacter2Action(index === QUIZ_CORRECT_INDEX ? "jump" : "wrong"); // 答對跳躍，答錯播放錯誤動作。
      return false; // 阻止瀏覽器執行滑鼠點擊預設行為。
    } // 結束答案按鈕點擊判斷。
  } // 結束答案按鈕檢查迴圈。
} // 結束 mousePressed 函式。

// 當瀏覽器視窗尺寸改變時同步調整畫布和角色位置。  
function windowResized() { // p5.js 在瀏覽器視窗調整大小時執行。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗大小。
  character1X = width * 2 / 3; // 將角色一重設至畫布寬度的三分之二處。
  character1Y = height * 2 / 3; // 將角色一維持在距離畫布底部約三分之一處。
  character2X = width / 3; // 將角色二維持在畫布寬度的三分之一處。
  character2Y = height * 2 / 3; // 將角色二維持在畫布高度的三分之二處。
} // 結束 windowResized 函式。

// 阻止方向鍵造成瀏覽器頁面捲動。  
function keyPressed() { // 按下任一鍵盤按鍵時執行。
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷按下的是否為左右方向鍵。
    return false; // 阻止瀏覽器預設的方向鍵捲動行為。
  } // 結束方向鍵判斷。
} // 結束 keyPressed 函式。
