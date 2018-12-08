"use strict";
require('dotenv').config()
const Generator = require('./Generator')
const changeCase = require('change-case')

class Tbody extends Generator {

    constructor(modulename, modulepath){
        super()
        this.modulename = modulename
        this.modulepath = modulepath

        this.finalDirectory = `components`
        this.templateDirectory = 'component'
        this.templateFile = 'tbody'
    }
}

module.exports = Tbody