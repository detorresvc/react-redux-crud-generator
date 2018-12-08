"use strict";
require('dotenv').config()
const mustache = require('Mustache')
const fs = require('fs')
const mkdirp = require('mkdirp');
const changeCase = require('change-case')

class Generator {

    constructor(modulename, modulepath){
        this.modulename = modulename
        this.modulepath = modulepath

        this.finalDirectory = `containers`
        this.templateDirectory = 'container'
        this.templateFile = 'container'

        this.formFields = null

        this.finalFile = undefined
    }

    set fields(fields){
        this.formFields = fields
    }

    checkComponentTemplateExist(){
        return fs.existsSync(`${process.env.PWD}/${process.env.TEMPLATE_PATH}/${this.templateDirectory}/${this.templateFile}.template`)
    }

    checkWriteIfSuccess(){
        return fs.existsSync(`${modulepath}/${this.finalDirectory}/${this.finalFile ? this.finalFile : modulename}.js`)
    }

    checkIfComponentFolderexist(){
        return fs.existsSync(`${modulepath}/${this.finalDirectory}`)
    }

    mapFieldType(type){
        if(type === 'text'){
            return `InputTextArea`
        }

        return `InputText`
    }

    formatFields(fields){
        const arr = fields.split(',')
        
        return arr.map(item => {
            
            const a = item.split(':')
            return {
                name: a[0],
                placeholder: changeCase.sentenceCase(a[0]),
                type: this.mapFieldType(a[1] || 'string')
            }
        });
    }

    componentToImport(fields){
        const arr = fields.split(',')
        let newArr = []
        arr.forEach(item => {
            const a = item.split(':')
            newArr = [
                ...newArr,
                this.mapFieldType(a[1] || 'string')
            ]
        });

        return [...new Set( [...newArr] )]
    }

    process(){
        const template = fs.readFileSync(`${process.env.PWD}/${process.env.TEMPLATE_PATH}/${this.templateDirectory}/${this.templateFile}.template`).toString()
        
        return  mustache.render(template, {
            moduleName: modulename,
            reducer: changeCase.camelCase(modulename),
            componentToImport: this.componentToImport(this.formFields),
            fields: this.formatFields(this.formFields)
        })
    }

    writeFinalFile(){
        
        fs.writeFileSync(`${modulepath}/${this.finalDirectory}/${this.finalFile ? this.finalFile : modulename}.js`, this.process())
        return this.checkWriteIfSuccess()
    }

    make(filename = undefined){
        this.finalFile = filename
        if(this.checkIfComponentFolderexist()){
            return this.writeFinalFile()
        }
        
        mkdirp.sync(`${modulepath}/${this.finalDirectory}`)
        return this.writeFinalFile()
   
    }

}

module.exports = Generator