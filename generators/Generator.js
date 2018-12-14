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
        this.templatePath = undefined
        this.templateDirectory = 'container'
        this.templateFile = 'container'

        this.formFields = null

        this.finalFile = undefined
    }

    set fields(fields){
        this.formFields = fields
    }

    set setTemplatePath(path){
        this.templatePath = path
    }

    checkComponentTemplateExist(){
        
        if(this.templatePath){
            return fs.existsSync(`${this.templatePath}/${this.templateDirectory}/${this.templateFile}.template`)
        }
        return fs.existsSync(`${process.env.PWD}/${process.env.TEMPLATE_PATH}/${this.templateDirectory}/${this.templateFile}.template`)
    }

    checkWriteIfSuccess(){
        const file = `${this.modulepath}/${this.finalDirectory}/${this.finalFile ? this.finalFile : this.modulename}.js`
        return fs.existsSync(file) 
        ? { success: true, message: `${file} successfully created`  } 
        : { success: false, message: `${file} creation failed`  } 
    }

    checkIfComponentFolderexist(){
        return fs.existsSync(`${this.modulepath}/${this.finalDirectory}`)
    }

    mapFieldType(type){
        if(type === 'text'){
            return `InputTextArea`
        }

        if(type === 'option'){
            return `Select`
        }

        if(type === 'password'){
            return `InputPassword`
        }

        return `InputText`
    }

    formatFields(fields){
        const arr = fields.split(',')
        
        return arr.map(item => {
            
            const a = item.split(':')
            
            if(a[1] === `string`){
                return `<InputText 
                            placeholder="${changeCase.sentenceCase(a[0])}"
                            type="text"
                            name="${a[0]}"
                            id="${a[0]}"
                            onChange={this.onChangeInput}
                            value={formData.${a[0]}}/>`
            }

            if(a[1] === `password`){
                return `<InputPassword 
                            placeholder="${changeCase.sentenceCase(a[0])}"
                            name="${a[0]}"
                            id="${a[0]}"
                            onChange={this.onChangeInput}
                            value={formData.${a[0]}}/>`
            }

            if(a[1] === `text`){
                return `<InputTextArea 
                            placeholder="${changeCase.sentenceCase(a[0])}"
                            name="${a[0]}"
                            id="${a[0]}"
                            onChange={this.onChangeInput}
                            value={formData.${a[0]}}/>`
            }

            if(a[1] === `option`){

                const arrOptions = a[2].split('|')

                return `<Select 
                            placeholder="${changeCase.sentenceCase(a[0])}"
                            type="text"
                            name="${a[0]}"
                            id="${a[0]}"
                            onChange={this.onChangeInput}
                            value={formData.${a[0]}}>
                            ${arrOptions.map(opt => {
                                return `<Option value="${opt}">${opt}</Option>\r\n`
                            }).toString().replace(/,/g, '')}
                        </Select>`
            }
        });
    }

    formatComponentFields(fields){
        const arr = fields.split(',')
        
        return arr.map(item => {
            const a = item.split(':')
            return {
                name: a[0],
                placeholder: changeCase.sentenceCase(a[0]),
                type: this.mapFieldType(a[1] || 'InputText')
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
                this.mapFieldType(a[1] || 'InputText')
            ]

            if(a[1] === 'option'){
                newArr.push('Option')   
            }
        });

        return [...new Set( [...newArr] )]
    }

    process(){
        let template = null
        if(this.templatePath)
            template = fs.readFileSync(`${this.templatePath}/${this.templateDirectory}/${this.templateFile}.template`).toString()
        else
            template = fs.readFileSync(`${process.env.PWD}/${process.env.TEMPLATE_PATH}/${this.templateDirectory}/${this.templateFile}.template`).toString()
        
        
        return  mustache.render(template, {
            moduleName: this.modulename,
            moduleNameLowerCase: changeCase.lowerCase(this.modulename),
            reducer: changeCase.camelCase(this.modulename),
            componentToImport: this.componentToImport(this.formFields),
            fields: this.formatFields(this.formFields),
            componentFields: this.formatComponentFields(this.formFields),
            priorityField: this.formatComponentFields(this.formFields)[0]
        })
    }

    writeFinalFile(){
        const file = `${this.modulepath}/${this.finalDirectory}/${this.finalFile ? this.finalFile : modulename}.js`
        try{
            fs.writeFileSync(`${file}`, this.process(), {
                flag: 'wx'
            })
            return this.checkWriteIfSuccess()
        }catch(e){
            
            return { 
                success: false,
                message: `${file} File already exist`
             }
        }
    }

    make(filename = undefined){
        this.finalFile = filename
        
        if(this.checkIfComponentFolderexist()){
            return this.writeFinalFile()
        }
        
        mkdirp.sync(`${this.modulepath}/${this.finalDirectory}`)
        return this.writeFinalFile()
    }
}

module.exports = Generator