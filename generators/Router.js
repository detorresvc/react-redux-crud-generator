"use strict";
require('dotenv').config()
const Generator = require('./Generator')
const changeCase = require('change-case')

class Router extends Generator {

    constructor(modulename, modulepath){
        super(modulename, modulepath)

        this.finalDirectory = `containers/${changeCase.lowerCase(modulename)}`
        this.templateDirectory = 'container'
        this.templateFile = 'router'
    }
}

module.exports = Router