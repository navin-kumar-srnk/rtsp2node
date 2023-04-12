const { spawn } = require('child_process');
const fs=require('fs')
const homeDir=require('os').homedir()

let {getAllfeeds,removeFeed,addFeed}=require('./main')

function startFfmpeg(name, inputSource) {

  return new Promise((resolve,reject)=>{

    const folderName = `${homeDir}/static`;

    // Check if folder exists
    if (!fs.existsSync(folderName)) {
      // If folder doesn't exist, create it
      fs.mkdirSync(folderName);
      console.log(`Folder ${folderName} created.`);
    } else {
      console.log(`Folder ${folderName} already exists.`);
    }


// check id the stream alredy present

  if(getAllfeeds().map(item=>item.streamName).includes(name)){
return resolve({status:false,message:'feedname alredy present'})
  }


  console.log(getAllfeeds().map(item=>item.streamName).includes(name));
  const args = [
    '-i', `${inputSource}`,
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ac', '2',
    '-c:v', 'libx264',
    '-crf', '21',
    '-preset', 'veryfast',
    '-b:v', '1500k',
    '-flags', '-global_header',
    '-f', 'hls',
    '-hls_time', '10',
    '-hls_list_size', '10',
    '-hls_flags', 'delete_segments',
    '-hls_segment_filename', `${homeDir}/static/${name}%03d.ts`,
    `${homeDir}/static/${name}.m3u8`
  ];
  

  const process= spawn('ffmpeg', args);
  
  process.stdout.on('data', (data) => {
  return  console.log(`[${name}] ffmpeg stdout: ${data}`);
  });

  process.stderr.on('data', (data) => {
   return console.error(`[${name}] ffmpeg stderr: ${data}`);
  });

 
  process.on('close', (code) => {
    removeFeed(name)
   return  console.log(`[${name}] ffmpeg process exited with code ${code}`);
    
  });



   addFeed(name,inputSource,process)

  return resolve ({status:true,message:'Feed Added'})

  })


}

function stopFfmpeg(name) {

  return new Promise((resolve,reject)=>{
    let streamDetails=getAllfeeds().filter(item=>item.streamName===name)

    const spawnprocess = streamDetails[0]?.['processName'];
    if (spawnprocess) {
      process.kill(spawnprocess.pid);
      removeFeed(name)
      return resolve ({status:true,message:'Feed Deleted'})
    }
    return resolve ({status:true,message:'Feed doesnt exist!'})
  })


}



module.exports={startFfmpeg,stopFfmpeg,getAllfeeds}
