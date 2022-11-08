let datav = {};

fetch('https://spreadsheets.google.com/feeds/list/1yCQNh1Ic7HxMv1xpQXjbLCzJ9F3b0706nJd1xA5jzAE/1/public/values?alt=json')
    .then(res => res.json())
    .then(data => datav = data.feed.entry );


let mat = [];
let avgPre = [];
let avgPro = [];
let conf = [];
let allPos = [];
let final = [];    

let nameList = {
    0: "Trinanjan",
    1: "Pourik",
    2: "Sudipto",
    3: "Soumodeep",
    4: "Reja",
    5: "Alapan",
    6: "Debaprito",
    7: "Venkatesh"
}

function myConvert (a) {
    a = a.replace(/[a-zA-Z: ]/g, "");
    a = a.replace(",","");
    a = a.split(",");
    a = a.map(x=>+x);
    return a; 
}

function calHalf(ara) {
    let arb = [];
    loop1:
        for(let x=0 ; x<8 ; x++){
    loop2:
            for( let z=0 ; z<4 ; z++){
                if( x == ara[z] ) continue loop1;
                else if( ara[z] > x ) {arb.push(x); continue loop1;}
            }
            if(arb.length == 4) break;
        }
        return arb;
}

function getName(arr){
    let names = "";
    for( x=0 ; x<arr.length ; x++){
        names += ( nameList[arr[x]] + " ");
    }
    return names;
}

setTimeout(main,2000);   



function main(){ 
    for( let i=0 ; i<8 ; i++){
        let arr = (datav[i].content.$t);
        arr = myConvert(arr);
        mat.push(arr);
    }
    console.log("Table of everyone's input");
    console.log(mat);

    for( i=0 ; i<8 ; i++ ){
        let tempa = 0, tempb = 0;
        for( let j=0 ; j<8 ; j++ ){
            if( i !== j ){
                tempa += mat[j][i];
                tempb += mat[j][i+8];
            }
        }
        avgPre.push(Math.round(tempa/7));
        avgPro.push(Math.round(tempb/7));
    }
    console.log("Everyone's average point on presentation skills");
    console.log(avgPre);
    console.log("Everyone's average point on problem solving skills");
    console.log(avgPro);

    for( i=0 ; i<8 ; i++ ){
        conf.push( (mat[i][i] - avgPre[i]) + (mat[i][i+8] - avgPro[i]) );
    }
    console.log("Confidence level point");
    console.log(conf);

    let tot = [];
    for( i=0 ; i<8 ; i++ ){
        tot.push( avgPre[i] + avgPro[i] + conf[i] );
    }
    console.log("Everyone's overall point")
    console.log(tot);



    for( i=6 ; i>=0 ; i-- ){
        for( j=i-1 ; j>=0 ; j-- ){
               for( let y=j-1 ; y>=0 ; y-- ){
                   tempa = [y,j,i,7];
                   tempb = calHalf(tempa);
                   allPos.push([tempa, tempb]);
               }
        }
    }
    console.log("List of all possible teams")
    console.log(allPos);
    let len = allPos.length;

    for( i=0 ; i<len ; i++ ){
        tempa = tempb = 0;
        for( j=0 ; j<4 ; j++ ){
            tempa += tot[allPos[i][0][j]];
            tempb += tot[allPos[i][1][j]];
        }
        final.push(Math.abs( tempa - tempb ));
    }
    console.log("Gap between overall team points")
    console.log(final);

    let low = 0;
    for( i=1 ; i<len ; i++ ){
        if( final[i] < final[low]) low = i;
    }
console.log("Final result");
    console.log("============================================");
    console.log("Possible teams: ");
    console.log("============================================");
    for( i=1 ; i<len ; i++ ){
        if( final[i] == final[low]){
            console.log("Team A: " + getName(allPos[i][0]) + "\nTeam B: " + getName(allPos[i][1]) );
            console.log("============================================");
        }
    }
    
}
