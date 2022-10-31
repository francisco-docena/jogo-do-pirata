class Boat {
constructor(x,y,width,height,positionY){
    this.body=Bodies.rectangle(x,y,width,height)
    this.w=width
    this.h=height
    this.positionY=positionY
    this.image=loadImage("assets/boat.png")
    World.add(world,this.body)
}
exibir(){
var posicao=this.body.position
var angulo=this.body.angle
push()
translate(posicao.x,posicao.y)
rotate(angulo)
imageMode(CENTER)
image(this.image,0,this.positionY,this.w,this.h)
pop()
}
remove(index){
    setTimeout(() => {
        Matter.World.remove(world,matrizboat[index].body)
        delete matrizboat[index]
        }, 2000);
}
}