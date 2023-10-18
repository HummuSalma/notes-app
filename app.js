const chalk = require ('chalk')
const yargs = require('yargs')
const notes = require ('./notes.js')
yargs.version('1.1.0')

//command to add
yargs.command({
    command : 'add',
    describe : 'Add a new note',
    builder :{
        title:{
            describe :'Note title',
            demandOption : true,
            type : 'string'
        },
        body:{
            describe :'Note body',
            demandOption : true,
            type :'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title,argv.body)
    }
})

//command to remove
yargs.command({
    command:'remove',
    describe :"remove a note",
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

//command to list
yargs.command({
    command : 'List',
    describe :"Listing the notes available",
    handler(){
        notes.listNotes()
    }
})

//command to read
yargs.command({
    command : "read",
    describe : "Read a note",
    builder :{
        title : {
            describe :"Note title ",
            demandOption : true,
            type : "string"
        }
    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})
yargs.parse()//To parse the values in the form of yargs