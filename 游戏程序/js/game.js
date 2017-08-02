var Size = 4;  // 游戏等级
var Moves;  // 步数
var IsOver,IsRepeat;

// 等级设置
window.onload = function() {
	var btn1 = document.getElementById("level1");
	btn1.onclick = function() {
		Size = 3;
		draw();
		Init(true);
	}
	var btn2 = document.getElementById("level2");
	btn2.onclick = function() {
		Size = 4;
		draw();
		Init(true);
	}
	var btn3 = document.getElementById("level3");
	btn3.onclick = function() {
		Size = 5;
		draw();
		Init(true);
	}
}

// 图片数组
var Pic = new Array(2);
Pic[0] = new Image();
Pic[0].src = "img/off.png";  // Pic[0]灯灭
Pic[1] = new Image();
Pic[1].src = "img/on.png";  // Pic[1]灯亮

// 状态数组：Size × Size
var Fld = new Array(Size);
for (var i = 0; i < Size; i++) {
	Fld[i] = new Array(Size);
}
var PreFld = new Array(Size);
for (var i = 0; i < Size; i++) {
	PreFld[i] = new Array(Size);
}
// 绘制游戏表格界面
function draw() {
    var list = [];
    for (var r = 0; r < Size; r++) { 
    	list.push("<tr>");
        for (var c = 0; c < Size; c++) {
			list.push("<td><img src='img/on.png' onclick='Clicked("+c+","+r+")'></td>"); 
        }
        list.push('</tr>');
    }
    $('#table').html(list.join(''));
}

// 初始化游戏
function Init(isRestart) {  
	if(isRestart){
		// 状态数组置0
		Fld = new Array(Size);
		for (var i = 0; i < Size; i++) {
			Fld[i] = new Array(Size);
		}
		PreFld = new Array(Size);
		for (var i = 0; i < Size; i++) {
			PreFld[i] = new Array(Size);
		}
		for (var r = 0; r < Size; r++) {
			for (var c = 0; c < Size; c++) {
				Fld[r][c] = 0;
			}
		}
		// 随机点亮
		for (var map = 0; map < Size*Size; map++) {
			var r = Math.floor(Math.random() * Size);
			var c = Math.floor(Math.random() * Size);
			SwitchFld(r,c);
			SwitchFld(r-1,c);
			SwitchFld(r+1,c);
			SwitchFld(r,c-1);
			SwitchFld(r,c+1);

		}
		for (var i = 0; i < Size; i++) {
			for (var j = 0; j < Size; j++) {
				PreFld[i][j] = Fld[i][j];
			}
		}
		IsRepeat = false;
	}
	else{
		for (var i = 0; i < Size; i++) {
			for (var j = 0; j < Size; j++) {
				Fld[i][j] = PreFld[i][j];
			}
		}
		IsRepeat = true;
	}
	IsOver = false;
	Moves = 0; // 步数清零
	RefreshScreen();  // 更新整个游戏界面
	$("#movecount").text(Moves);  // 更新步数
	$("#result_container").hide();  // 隐藏结束界面

}

// 点击图片改变状态(自己+上下左右)
function Clicked(r, c) {

	if(SwitchFld(r,c)) {
		RefreshPic(r,c);
	}
	if (SwitchFld(r-1,c)) {  // 上
		RefreshPic(r-1,c);
	}
	if (SwitchFld(r+1,c)) {  // 下
		RefreshPic(r+1,c);
	}
	if (SwitchFld(r,c-1)) {  // 左
		RefreshPic(r,c-1);
	}
	if (SwitchFld(r,c+1)) {  // 右
		RefreshPic(r,c+1);
	}
	if (IsOver) {
		return;
	}
	Moves++;
	$('#movecount').text(Moves);  // 步数累计并更新
	OverTest();  // 判断游戏是否结束
}

// 对应状态数组置反
function SwitchFld(r, c) {
	if(r<0 || r>=Size || c<0 || c>=Size) {
		return false;
	}
	Fld[r][c] = 1 - Fld[r][c];
	return true;
}

// 更新图片（状态数组Fld->图片数组Pic）
function RefreshPic(r, c) {
	//$("#table").find(img)[r][c].src = Pic(Fld[r][c]).src; 返回的数组是一维的！!!
	$("#table img")[Size * c + r].src = Pic[Fld[r][c]].src;  
}

// 更新整个游戏界面
function RefreshScreen() {
	for (var r = 0; r < Size; r++) {
		for (var c = 0; c < Size; c++) {
			$("#table img")[Size * c + r].src = Pic[Fld[r][c]].src;
		}
	}
}

// 判断游戏是否结束
function OverTest() {
	var sum = 0;
	for (var i = 0; i < Size; i++) {
		for (var j = 0; j < Size; j++) {
			sum += Fld[i][j];
		}
	}
	if (sum !== Size * Size) {
		return true;
	}
	IsOver = true;
	var eva = "只用了 "+Moves+" 步就点亮了所有的灯。";
	$("#result").html("你"+eva);
	$("#result_container").show();	
}

// 游戏说明弹窗

    //alert($(window).height());
    var ClickMe = document.getElementById("ClickMe");
    ClickMe.onclick = function() {
        $('#goodcover').show();
        $('#code').fadeIn();
    }

    var closebt = document.getElementById("closebt");
    closebt.onclick = function() {
        $('#code').hide();
        $('#goodcover').hide();
    }
    
    var goodcover = document.getElementById("goodcover");
    goodcover.onclick = function() {
	    $('#code').hide();
        $('#goodcover').hide();
    }