const fs = require ('fs')
const chalk = require('chalk')

const addNotes = (title,body)=>{
    const notes = loadNotes()

    //To avoid duplicacy of the title
    const duplicateNote = notes.find((note)=> note.title === title)
    //The readed data is then pushed to the array and then written into the file using saveNotes()
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added successfully!"))
    }else{
        console.log(chalk.red.inverse("Note already exists!!"))
    }
   
}

const removeNotes = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>note.title !== title)
    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse("Note removed successfully"))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse("No Note found!!"))
    }
}

const listNotes = ()=>{
    const notes = loadNotes()
    console.log(chalk.inverse("Your notes.."))
    notes.forEach((note)=>{
        console.log(note.title)
    })

}

const readNotes = (title)=>{
    const notes = loadNotes()
    const note = notes.find((note)=> note.title === title)
    if (note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse("No Note found!!"))
    }
}

const saveNotes =(notes)=>{
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}
//To avoid the overriding of data , we first load the data into the notes
const loadNotes =()=>{
    try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}
module.exports = {
    addNotes : addNotes,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNotes : readNotes
}