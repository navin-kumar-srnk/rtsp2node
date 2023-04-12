const fs=require('fs')
const path = require('path')


const readFile=()=>{

    return JSON.parse(fs.readFileSync(path.join(__dirname,'./streamsMeta.json')))
}

const writeToFile=(data)=>{

    fs.writeFileSync(path.join(__dirname,'./streamsMeta.json'),JSON.stringify(data))
}

const getAllfeeds=()=>{
return readFile().map((stream)=>{return {...stream,...{["httpUrl"]:`http://127.0.0.1:5000/live/${stream['streamName']}.m3u8`}}})
}


function removeFeed(name){

    writeToFile(readFile().filter(item=>item.streamName!=name))
}


const addFeed=(streamName,rtspUrl,process)=>{
    console.log('!!!!!!!!!!!!!!!!!!!!!');
    let streams=readFile()
    streams.push({['streamName']:streamName,"rtspUrl":rtspUrl,"processName":process})
    writeToFile(streams)

}

module.exports={getAllfeeds,removeFeed,addFeed}

