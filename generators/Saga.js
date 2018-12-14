"use strict";
require('dotenv').config()
const Generator = require('./Generator')
const changeCase = require('change-case')

class Saga extends Generator {

    constructor(modulename, modulepath){
        super(modulename, modulepath)
    
        this.finalDirectory = `containers/${changeCase.paramCase(modulename)}`
        this.templateDirectory = 'container'
        this.templateFile = 'saga'
    }
}

module.exports = Saga