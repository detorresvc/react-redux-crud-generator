"use strict";
require('dotenv').config()
const Generator = require('./Generator')

class Form extends Generator {

    constructor(modulename, modulepath){
        super()
        this.modulename = 'Form'
        this.modulepath = modulepath

        this.finalDirectory = 'component'
        this.templateDirectory = 'component'
        this.templateFile = 'form'
    }
}

module.exports = Form