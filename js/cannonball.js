class Cannonball{
    constructor(x,y){
        this.raio=25
        var options={isStatic:true}
        this.body=Bodies.circle(x,y,this.raio,options)
        this.image=loadImage("assets/cannonball.png")
        this.trajetoria=[]
        World.add(world,this.body)
    }
    exibir(){
        var lugar=this.body.position
        push()
        imageMode(CENTER)
        image(this.image,lugar.x,lugar.y,this.raio,this.raio)
        pop()
        if(this.body.velocity.x>0 && lugar.x>10){
        var position=[lugar.x,lugar.y]
        this.trajetoria.push(position)
        }
        for(var i=0;i<this.trajetoria.length;i=i+1){
        image(this.image,this.trajetoria[i][0],this.trajetoria[i][1],5,5)

        }
    }
    shoot() {
        Matter.Body.setStatic(this.body, false); 
      
        var newAngle = canhao.angle - 28;
        newAngle = newAngle * (3.14/180); 
      
        var velocidade = p5.Vector.fromAngle(newAngle);
        velocidade.mult(0.5); 
    
         Matter.Body.setVelocity(this.body, {
          x: velocidade.x * (180 / 3.14),
          y: velocidade.y * (180 / 3.14),
        });
    }
    remove(index){
        setTimeout(() => {
            Matter.World.remove(world,this.body)
            delete matrizball[index]
            }, 2000);
    }
}