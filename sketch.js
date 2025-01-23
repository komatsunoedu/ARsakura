/*バラ曲線:極座標の大きさに三角関数を使うことで模様を描ける
r=sin(θ*n/d)
*/
let sakura=[];
let Num=100;

function setup(){
  createARCanvas(600,400);
  colorMode(HSB);
  noStroke();
  for(let i=0;i<Num;i++){
    sakura.push(new Sakura());
  }
  console.log(sakura);
}

function draw(){
  //background(255);
  clear()
  for(let i=0;i<Num;i++){
    sakura[i].update();
    sakura[i].render();
  }
  /*
  translate(width/2,height/2);
  beginShape();
  for(let angle=0;angle<TWO_PI*5;angle+=0.01){ //分母をTWO_PIに×
    //バラ曲線
    let range=100*sin(angle*(2/5));
    //極座標->直交座標
    let x=range*cos(angle);
    let y=range*sin(angle);
    vertex(x,y);   
  }
  endShape();
  */  
}

class Sakura{
  constructor(){
    this.n=4;    
    
    this.size=random(20,50);
    //x軸でゆらゆら動かす
    this.xBase=random(width);
    this.xRadius=random(50,100);
    this.xTheta=random(360);
    this.xaVelocity=random(1,2);
    
    this.vecLocation=createVector(this.xBase,random(height));
    
    this.yVelocity=this.size/20;
    
    //色設定
    this.hue=random(347,353);
    this.saturation=random(25,31);
    this.brightness=100;
    this.alpha=random(0.6,1);
    
    //花びらの形を変える
    this.ySizeTheta=random(360)
    this.ySizeAVelocity=this.size/20;
    this.yScale=1;
  }
  
  //計算
  update(){
    //sin(radian)-1~1
    //半径
    //ｘの基準の値
    //基準値＋半径＊sin(radian(角度))
    this.vecLocation.x=this.xBase+this.xRadius*sin(radians(this.xTheta));
    
    //角速度→角度
    this.xTheta+=this.xaVelocity;
    
    this.vecLocation.y+=this.yVelocity;
    
    //花びらの形を変える
    //sin(radians(角度))-1~1
    //絶対値 abs 0~1
    //角速度→角度
    //this.ySizeTheta,this.ySizeAVelocity,this.yScale
    this.yScale=abs(sin(radians(this.ySizeTheta)));
    this.ySizeTheta+=this.ySizeAVelocity;
    
    if(this.vecLocation.y>height){
      this.vecLocation.y=-this.size;
    }
  }
  
  //描画
  render(){
    fill(this.hue,this.saturation,this.brightness,this.alpha);
    push();
    //桜
    translate(this.vecLocation.x,this.vecLocation.y);
    rotate(radians(this.xTheta));
    beginShape();
    for(let theta=0;theta<360/4;theta++){
      let A=this.n/PI*radians(theta);
      let mod=floor(A)%2;//mod(n,#)は、割り算のあまり
      let r0=pow(-1,mod)*(A-floor(A))+mod;
      let r=r0+2*this.calculateH(r0);

      //極座標->直交座標
      let x=this.size*r*cos(radians(theta));
      let y=this.size*this.yScale*r*sin(radians(theta));
      vertex(x,y);   
    }
    endShape(CLOSE);  
    pop();
  }
  
  calculateH(x){
    if(x<0.8){
      return 0;
    }else{
      return 0.8-x;
    }
  } 
}
