#!/usr/bin/env node

/**
 * Module dependencies.
 */
const program = require('commander');
const changeCase = require('change-case')
const  chalk = require('chalk');

const ActionsGenerator = require('./generators/Actions')
const ActionTypesGenerator = require('./generators/ActionTypes')
const ReducerGenerator = require('./generators/Reducer')
const RouterGenerator = require('./generators/Router')
const MainGenerator = require('./generators/Main')
const AddGenerator = require('./generators/Add')
const EditGenerator = require('./generators/Edit')
const InputTextGenerator = require('./generators/InputText')
const InputTextAreaGenerator = require('./generators/InputTextArea')
const ButtonGenerator = require('./generators/Button')

const TableGenerator = require('./generators/Table')
const TbodyGenerator = require('./generators/Tbody')
const TrGenerator = require('./generators/Tr')
const TdGenerator = require('./generators/Td')

program
	.version('0.1.0')
	.usage('[options] <modulename> <modulepath>')
  	.arguments('<modulename> <modulepath>')
  	.option('-f, --fields <fields>', 'Fields for form')
  	.action((name, path) => {
		modulename = changeCase.pascalCase(name);
		modulepath = path
 	})
  .parse(process.argv);
	
if(typeof modulepath === 'undefined' || typeof modulename === 'undefined'){
	console.log(chalk.redBright('Arguments required'))
	process.exit(1);
}

const arrContainers = {
	Actions: {
		Klas: ActionsGenerator,
		filename: 'actions'
	},
	ActionTypes: {
		Klas: ActionTypesGenerator,
		filename: 'actionTypes'
	},
	Reducer: {
		Klas: ReducerGenerator,
		filename: 'reducer'
	},
	Router: {
		Klas: RouterGenerator,
		filename: 'index'
	},
	Main: {
		Klas: MainGenerator,
		filename: 'Main'
	},
	Add: {
		Klas: AddGenerator,
		filename: 'Add',
	},
	Edit: {
		Klas: EditGenerator,
		filename: 'Edit',
	},
	InpuText: {
		Klas: InputTextGenerator,
		filename: 'InputText',
	},
	InpuTextArea: {
		Klas: InputTextAreaGenerator,
		filename: 'InputTextArea',
	},
	Button: {
		Klas: ButtonGenerator,
		filename: 'Button',
	},
	Table: {
		Klas: TableGenerator,
		filename: 'Table',
	},
	Tbody: {
		Klas: TbodyGenerator,
		filename: 'Tbody',
	},
	Tr: {
		Klas: TrGenerator,
		filename: 'Tr',
	},
	Td: {
		Klas: TdGenerator,
		filename: 'Td',
	}
}

Object.keys(arrContainers).forEach(key => {
	const Klas = new arrContainers[key].Klas(modulename, modulepath)
	
	if(program.fields){
		Klas.fields = program.fields
	}

	if(Klas.checkComponentTemplateExist()){
		if(Klas.make(arrContainers[key].filename))
			console.log(chalk.greenBright(`${key} successfully created`))
		else
			console.log(chalk.redBright(`${key} creation failed`))
	}
	else{
		console.log(chalk.redBright(`${key} template doesnt exist`))
	}
})






