const fs = require('fs');
let template = fs.readFileSync('./template/template.html', 'utf8').split('`');

let galleries = fs.readdirSync('.');

for(index = galleries.length - 1;index >=0;index--){ //have to loop goofy so I can kill elements
    if(!RegExp('^\.[^.]+$').test(galleries[index])||galleries[index]=="template") //filter out items that arent directories
        galleries.splice(index,1);

}

galleries.forEach(gallery=>{
    let files = fs.readdirSync('./'+gallery); //pull in the files in the folder

    for(index = files.length - 1;index >=0;index--){
        if(!RegExp('(?:jpg|png|JPG)').test(files[index])) //filter out files that dont end in jpg/png
            files.splice(index,1);
    }

    let html = template[0] + gallery + template[1]; //start to build up html. Inside the first two template blocks is the title

    files.forEach(function(file,i){
        html += template[2] + i + template[3] + file + template[4];
    })

    html += template[5];

    files.forEach(function(file,i){
        html += template[6];
        if(i==0)
            html += ' active';
        html += template[7] + file + template[8];
    })
    html += template[9];

    fs.writeFile('./'+gallery+'/index.html',html,(err) => {  
        if (err) throw err;
        console.log('file saved to ./'+gallery+'/index.html');
    });   
    fs.copyFile ('./template/style.css','./'+gallery+'/style.css',(err) => {  
        if (err) throw err;
        console.log('style.css copied');
    });   
});

