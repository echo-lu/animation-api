# 帧动画
**定义**<br>
帧动画就是在“连续的关键帧”中分解动画动作，也就是在时间轴的每帧上逐渐绘制不同的内容，使其连续播放而成动画。<br>

**常见的帧动画方式**：
1. GIF
2. CSS3 animation
3. JavaScript <br>

**GIF和CSS3 animation的不足**：<br>
1. GIF和CSS3 animation不能灵活的控制动画的暂停和播放
2. GIF不能捕捉到动画完成的事件
3. GIF和CSS3 animation不能对动画做更加灵活的扩展

### JS实现帧动画的原理
JS实现帧动画有两种方式：
1. 如果有多张真图片，用一个image标签去承载图片，定时改变image的src属性（会产生多个http请求）
2. 把所有动画关键帧绘制在一张图片里，把图片作为元素的background-image，定时改变元素的background-position属性（只产生一个http请求）

### 设计一个通用的帧动画库
#### Step1：需求分析
- 支持图片预加载
- 支持2种动画播放方式，及自定义每帧动画。
- 支持单组动画控制循环次数（可支持无限次）
- 支持一组动画完成，进行下一组动画
- 支持每个动画完成后有等待时间
- 支持动画暂停和继续播放
- 支持动画完成后执行回调函数
#### Step2：编程接口
- `loadImage(imglist)`      //预加载图片
- `changePosition(ele,positions,imageUrl)`  //通过改变元素的background-position实现动画
- `changeSrc(ele,imglist)`                  //通过改变image元素的src
- `enterFrame(callback)`//每一帧动画执行的函数，相当于用户可以自定义帧动画的callback
- `repeat(times)`//动画重复执行，times为空时表示无限次
- `repeatForever()`//无限次重复上一次动画，相当于repeat()，更友好的一个接口
- `wait(time)`//每个动画执行完后等待时间
- `then(callback)`//动画执行完成后的回调函数
- `start(interval)`//动画开始执行，interval表示动画执行的间隙
- `pause()`//动画暂停
- `restart()`//动画从上一次暂停处重新执行
- `dispose()`//释放资源
#### Step3：调用方式
支持链式调用，以动词的方式描述接口
#### Step4：代码设计
把“图片预加载->动画执行->动画结束”等一系列操作看成一条任务链（数组）
任务链有两种类型的任务：
a.同步执行完毕的
b.异步定时执行的（通过计时器或者raf）
记录当前任务链的索引
每个任务执行完毕后，通过调用next方法，执行下一个任务，同时更新任务链索引值
