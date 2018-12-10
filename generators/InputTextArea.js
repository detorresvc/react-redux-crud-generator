"use strict";
require('dotenv').config()
const Generator = require('./Generator')
const changeCase = require('change-case')

class InputText extends Generator {

    constructor(modulename, modulepath){
        super(modulename, modulepath)

        this.finalDirectory = `components`
        this.templateDirectory = 'component'
        this.templateFile = 'input-text-area'
    }
}

module.exports = InputText