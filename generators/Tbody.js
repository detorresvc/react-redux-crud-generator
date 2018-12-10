"use strict";
require('dotenv').config()
const Generator = require('./Generator')
const changeCase = require('change-case')

class Tbody extends Generator {

    constructor(modulename, modulepath){
        super(modulename, modulepath)

        this.finalDirectory = `components`
        this.templateDirectory = 'component'
        this.templateFile = 'tbody'
    }
}

module.exports = Tbody