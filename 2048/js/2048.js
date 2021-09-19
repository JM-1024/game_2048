window.onload=function(){

    var imgs=document.querySelectorAll('img')
    var cham=document.querySelectorAll('#jump')
    //var loadGame=document.getElementById('jump')
    var scoreNum=document.getElementById('scoreNum')
    
    var score=0
    document.onkeydown=function(e){
        switch(e.keyCode){
            case 37:  //左
                //console.log(imgs[0].getAttribute('value')) 
                run([0,1,2,3])  //索引
                run([4,5,6,7])
                run([8,9,10,11])
                run([12,13,14,15])

                break;
            case 38:  //上
                run([0,4,8,12])  //索引
                run([1,5,9,13])
                run([2,6,10,14])
                run([3,7,11,15])

                break;
            case 39:  //右
                run([3,2,1,0])  //索引
                run([7,6,5,4])
                run([11,10,9,8])
                run([15,14,13,12])

                break;
            case 40:  //下
                run([12,8,4,0])  //索引
                run([13,9,5,1])
                run([14,10,6,2])
                run([15,11,7,3])

                break;
        }
        //create()
        gameOver()
        
    }

    function run(seArr){

        let newValue=algo([
            Number(imgs[seArr[0]].getAttribute('value')),
            Number(imgs[seArr[1]].getAttribute('value')),
            Number(imgs[seArr[2]].getAttribute('value')),
            Number(imgs[seArr[3]].getAttribute('value')),
        ])
        //console.log(newValue)
        newValue.forEach((val,index)=>{
            imgs[seArr[index]].setAttribute('value',val)
            imgs[seArr[index]].setAttribute('src',"img/"+val+".png")
        })
    }

    function algo(arr){

        let newArr=[]
        for(let i=0;i<arr.length;i++){

            if(arr[i]!=0){
                let j=i+1
                while(arr[j]==0&&j<arr.length){
                    j++
                }
                if(arr[i]!=arr[j]){
                    newArr.push(arr[i])
                }else{
                    newArr.push(arr[i]+arr[j])
                    i=j
                }
            }
        }
        for(let i=0;i<arr.length;i++){
            if(newArr[i]==null) newArr[i]=0
        }

        return newArr
    }

    function create(){
        var randomImg=Math.floor(Math.random()*imgs.length)

        if(Number(imgs[randomImg].getAttribute('value'))==0){
            imgs[randomImg].setAttribute('value',2)
            imgs[randomImg].setAttribute('src',"img/"+2+".png")
        }else{
            create()
        }
        
    }

    function gameOver(){
        let flag=false

        for(let i=0;i<imgs.length;i++){
            if(Number(imgs[i].getAttribute('value'))==0){
                flag=true  
                score+=2              
                create()
                break
            }

        }
        if(!flag){
            for(let i=0;i<imgs.length;i++){            
                let vNum=Math.floor(i/4)
                let hNum=i%4
                if((vNum-1)>=0){
                    if(imgs[i-4].getAttribute('value')==imgs[i].getAttribute('value')){
                        flag=true
                        break
                    }
                }  
                
                if((vNum+1)<=3){
                    if(imgs[i+4].getAttribute('value')==imgs[i].getAttribute('value')){
                        flag=true
                        break
                    }
                } 
    
                if((hNum-1)>=0){
                    if(imgs[i-1].getAttribute('value')==imgs[i].getAttribute('value')){
                        flag=true
                        break
                    }
                } 
    
                if((hNum+1)<=3){
                    if(imgs[i+1].getAttribute('value')==imgs[i].getAttribute('value')){
                        flag=true
                        break
                    }
                } 
            }
        }
        
        scoreNum.setAttribute('value',score)
        //console.log(score)

        if(!flag){
            alert("挑战失败！")
            document.location.reload()
        }
        if(score==2048){
            //loadGame.style.display="block"
            alert("挑战成功")
            document.location.reload()
        }
        
    }

}