//speed change 
var BootState={
    
    preload:function(){
    },
    create:function(){
        
           this.game.state.start('MainState');  
    },    
}

var MainState ={
    init:function(){
         this.cursors = this.input.keyboard.createCursorKeys();
        this.start = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    
    preload:function(){  
        this.load.image('star','Images/star3.png');
        this.load.audio('1','Audio/1.wav');
        this.load.audio('2','Audio/2.wav');
        this.load.audio('3','Audio/3.wav');
        this.load.audio('beep','Audio/beep.wav');
    },
    
    create:function(){ 
        this.stage.backgroundColor = "#000000";
        
        this.v1 = this.game.add.audio('1');
        this.v2 = this.game.add.audio('2');
        this.v3 = this.game.add.audio('3');
        this.beep = this.game.add.audio('beep');
        this.canvas;
        this.xx = [];    
        this.yy = [];
        this.zz = [];
        //setText("distance :"+this.distance);
        this.canvas = this.game.add.bitmapData(2000, 1000);
        this.canvas.addToWorld();

        for (var i = 0; i < 500; i++)
        {
            this.xx[i] = Math.floor(Math.random() * 800) - 400;
            this.yy[i] = Math.floor(Math.random() * 600) - 300;
            this.zz[i] = Math.floor(Math.random() * 1700) - 100;
        }
        
        this.v1.play();
        this.v1.onStop.add(this.playNext1,this);
        this.v2.onStop.add(this.playBeep,this);
        this.beep.onStop.add(this.playNext2,this);
        this.title = this.add.text(250,80,"BEEPS !!",{font: "200px Arial",fill: "#ffffff"});
    },
    
    playNext1:function(){
      this.v2.play();  
    },
    
    playNext2:function(){
      this.v3.play();  
    },
    
    playBeep:function(){
      this.beep.play();  
    },
    
    update:function(){
        
        this.canvas.clear();

        for (var i = 0; i < 500; i++)
        {
            perspective = 300 / (300 - this.zz[i]);
            var x = this.game.world.centerX + this.xx[i] * perspective;
            var y = this.game.world.centerY + this.yy[i] * perspective;

            this.zz[i] += 6;

            if (this.zz[i] > 300)
            {
                this.zz[i] -= 600;
            }

            //  Swap this for a standard drawImage call
            this.canvas.draw('star', x, y);
        }  
         
        if(this.start.isDown== true){
            this.v1.stop();
            this.v2.stop();
            this.beep.stop();
            this.v3.stop();
            this.game.state.start('Level1');
        }
        
    },

    render:function(){
        //game.debug.pointer( game.input.activePointer );
    },
}


var GameState= {
    init:function(){
        console.log('init');
        this.world.setBounds(0,0,1250,500);
        this.cursors = this.input.keyboard.createCursorKeys();
    },
    
    preload:function(){
        console.log('preload');
        this.load.audio('up','Audio/up.wav');
        this.load.audio('down','Audio/down.wav');
        this.load.audio('left','Audio/left.wav');
        this.load.audio('right','Audio/right.wav');
        this.load.audio('beep','Audio/beep.wav');
    },
    
    create:function(){
        console.log('create');
        this.stage.backgroundColor = "#000000";
    
        this.canvas;
        this.xx = [];    
        this.yy = [];
        this.zz = [];
        //setText("distance :"+this.distance);
        this.canvas = this.game.add.bitmapData(2000, 1000);
        this.canvas.addToWorld();

        for (var i = 0; i < 500; i++)
        {
            this.xx[i] = Math.floor(Math.random() * 800) - 400;
            this.yy[i] = Math.floor(Math.random() * 600) - 300;
            this.zz[i] = Math.floor(Math.random() * 1700) - 100;
        }
        
        this.buttons = [];
        for(var i=0;i<4;i++){
            this.buttons.push(0);
        }
        
        this.up = this.game.add.audio('up');
        this.down = this.game.add.audio('down');
        this.left = this.game.add.audio('left');
        this.right = this.game.add.audio('right');
        this.beep = this.game.add.audio('beep');
        this.lives=3;
        this.oldpts=-1;
        this.points =0;
        
        this.generate = this.game.time.events.loop(2000,this.gen,this);
        
        this.pointbox = this.add.text(275,50,"Points : "+this.points,{font: "150px Arial",fill: "#ffffff"});
        this.livebox = this.add.text(275,250,"Lives : "+this.lives,{font: "150px Arial",fill: "#ffffff"});
    },
    
    gen:function(){
        
        for(var i=0;i<4;i++){
            if(this.buttons[i]==1){
                this.beep.play();
                this.lives-=1;
            }
        }
        
        if(this.lives==0){
            this.gameOver();
        }
        
        this.random1 = Math.random();
        this.random1 = 4*this.random1;
        this.random1 = Math.floor(this.random1);
        console.log(this.random1);
        //this.ttime = this.game.time.totalElapsedSeconds();
        
        if(this.random1==0){
            this.up.play();
            this.buttons[0]=1;
            this.buttons[1]=0;
            this.buttons[2]=0;
            this.buttons[3]=0;
        }
        else if(this.random1==1){
            this.down.play();
            this.buttons[0]=0;
            this.buttons[1]=1;
            this.buttons[2]=0;
            this.buttons[3]=0;
        }
        else if(this.random1==2){
            this.left.play();
            this.buttons[0]=0;
            this.buttons[1]=0;
            this.buttons[2]=1;
            this.buttons[3]=0;
        }
        else if(this.random1==3){
            this.right.play();
            this.buttons[0]=0;
            this.buttons[1]=0;
            this.buttons[2]=0;
            this.buttons[3]=1;
        }
    },
    
    update:function(){
        
        console.log('update'); 
        this.canvas.clear();

        for (var i = 0; i < 500; i++)
        {
            perspective = 300 / (300 - this.zz[i]);
            var x = this.game.world.centerX + this.xx[i] * perspective;
            var y = this.game.world.centerY + this.yy[i] * perspective;

            this.zz[i] += 6;

            if (this.zz[i] > 300)
            {
                this.zz[i] -= 600;
            }

            //  Swap this for a standard drawImage call
            this.canvas.draw('star', x, y);
        }  
        
        
        this.pointbox.setText("Points : "+this.points,{font: "250px Arial",fill: "#ffffff"});
        this.livebox.setText("Lives : "+this.lives,{font: "250px Arial",fill: "#ffffff"});
        
       if(this.buttons[0]==1 && this.cursors.down.isDown==true){
            this.lives--;
            this.buttons[0]=0;
            this.beep.play();
        }
        if(this.buttons[0]==1 && this.cursors.left.isDown==true){
            this.lives--;
            this.buttons[0]=0;
            this.beep.play();
        }
        if(this.buttons[0]==1 && this.cursors.right.isDown==true){
            this.lives--;
            this.buttons[0]=0;
            this.beep.play();
        }
        if(this.buttons[0]==1 && this.cursors.up.isDown==true){
            console.log('done');
            this.oldpts=this.points;
            this.points++;    
            this.buttons[0]=0;
        }
        
        
        if(this.buttons[1]==1 && this.cursors.up.isDown==true){
            this.lives--;
            this.buttons[1]=0;
            this.beep.play();
        }
        if(this.buttons[1]==1 && this.cursors.left.isDown==true){
            this.lives--;
            this.buttons[1]=0;
            this.beep.play();
        }
        if(this.buttons[1]==1 && this.cursors.right.isDown==true){
            this.lives--;
            this.buttons[1]=0;
            this.beep.play();
        }
        if(this.buttons[1]==1 && this.cursors.down.isDown==true){
            console.log('done');
            this.oldpts=this.points;
            this.points++;
            this.buttons[1]=0;
        }
        
        if(this.buttons[2]==1 && this.cursors.down.isDown==true){
            this.lives--;
            this.buttons[2]=0;
            this.beep.play();
        }
        if(this.buttons[2]==1 && this.cursors.up.isDown==true){
            this.lives--;
            this.buttons[2]=0;
            this.beep.play();
        }
        if(this.buttons[2]==1 && this.cursors.right.isDown==true){
            this.lives--;
            this.buttons[2]=0;
            this.beep.play();
        }
        if(this.buttons[2]==1 && this.cursors.left.isDown==true){
            console.log('done');
            this.oldpts=this.points;
            this.points++;
            this.buttons[2]=0;
        }
        
        if(this.buttons[3]==1 && this.cursors.down.isDown==true){
            this.lives--;
            this.buttons[3]=0;
            this.beep.play();
        }
        if(this.buttons[3]==1 && this.cursors.left.isDown==true){
            this.lives--;
            this.buttons[3]=0;
            this.beep.play();
        }
        if(this.buttons[3]==1 && this.cursors.up.isDown==true){
            this.lives--;
            this.buttons[3]=0;
            this.beep.play();
        }
        if(this.buttons[3]==1 && this.cursors.right.isDown==true){
            console.log('done');
            this.oldpts=this.points;
            this.points++;
            this.buttons[3]=0;
        }
    
    },

    gameOver:function(){ 
        alert("GAME OVER!! YOU HAVE "+ this.points + " POINTS!!!");
        this.game.state.start('MainState');
    },
    
    render:function(){
        //game.debug.pointer( game.input.activePointer );
    },
    
};

var game = new Phaser.Game(1250,500,Phaser.AUTO,'gamediv');
game.state.add('BootState',BootState);
game.state.add('MainState',MainState);
game.state.add('Level1',GameState);
game.state.start('MainState');