"use strict";
require('dotenv').config()
const Generator = require('./Generator')
const changeCase = require('change-case')

class Main extends Generator {

    constructor(modulename, modulepath){
        super(modulename, modulepath)

        this.finalDirectory = `containers/${changeCase.paramCase(modulename)}`
        this.templateDirectory = 'container'
        this.templateFile = 'main'
    }
}

module.exports = Main