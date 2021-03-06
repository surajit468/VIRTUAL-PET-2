

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");

}

function setup() {
  database=firebase.database();
  createCanvas(800, 700);
   dog=createSprite(400,450,10,10);
dog.addImage(dogImg);
dog.scale=0.2;
foodStock=database.ref('Food');
foodStock.on("value",readStock);

feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

foodObj= new Food(200,200,20,20);
}


function draw() {  
background(46, 139, 87);

foodObj.display();
drawSprites();
} 



function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {

  if(x<=0) {
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
 
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}