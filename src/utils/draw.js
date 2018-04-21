//功能一：圆环
//lines表示画线个数
var lines=60;
//x,y为圆环中心，r1,r2为圆环内外半径
var x=165,y=165,r1=100,r2=85;
export function cir(ctx,complete,total) {
  //初始位置定位最上方的-pi/2
  var now = -Math.PI / 2;
  //设定已完成进度的颜色
  ctx.setStrokeStyle('#66ccff');
  //设定线条宽度
  ctx.setLineWidth(3);
  //获得完成颜色的条数
  var rate=complete/total*60;
  for (var count = 1; count <= lines; count++) {
    ctx.beginPath()
    //设定圆心
    ctx.moveTo(x, y)
    if (count > rate)
      //未完成进度的表示颜色
      ctx.setStrokeStyle('grey');
    //圆环区填充色，请选择为背景色
    ctx.setFillStyle('white')
    ctx.arc(x, y, r1, now, now)
    //线条位置移动至下一位置
    now = now + 2 * Math.PI / lines;
    //画线函数
    ctx.stroke();
  }
  //后面代码用于去掉圆的中心区域
  ctx.beginPath();
  ctx.moveTo(x, y)
  //内部圆心颜色，请修改为应用底色
  ctx.setFillStyle('#ffffff')
  ctx.arc(x, y, r2, 0, 2 * Math.PI)
  //内部填充
  ctx.fill()
  //最后绘画函数
  ctx.draw()
}

//功能二：画柱状图
//颜色表
var colors = ['#ee606f', '#fa9474', '#f9b778', '#efd387', '#e6f3a4', '#a4e49b', '#68d4b2', '#6dc8d4', '#688fd3']
export function rec(ctx,lists)
{
  for (var count=0;count<lists.length;count++)
  {
    //字体颜色
    ctx.setFillStyle('black')
    //字体生成函数
    ctx.fillText(lists[count].name, 10, 30+50* count)
    //获得矩阵填充颜色
    ctx.setFillStyle(colors[count % colors.length])
    //画矩形,属性分别为左上角坐标x,y,长宽
    ctx.fillRect(50, 15+count * 50, lists[count].timeSpan*10, 20)
  }
  ctx.draw()
}