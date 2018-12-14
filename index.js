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
const InformationGenerator = require('./generators/Information')
const ListingGenerator = require('./generators/Listing')

const InputTextGenerator = require('./generators/InputText')
const InputPasswordGenerator = require('./generators/InputPassword')
const InputTextAreaGenerator = require('./generators/InputTextArea')
const ButtonGenerator = require('./generators/Button')

const TableGenerator = require('./generators/Table')
const TbodyGenerator = require('./generators/Tbody')
const TrGenerator = require('./generators/Tr')
const TdGenerator = require('./generators/Td')

const SelectGenerator = require('./generators/Select')
const OptionGenerator = require('./generators/Option')

const RequestGenerator = require('./generators/Request')
const SagaGenerator = require('./generators/Saga')

program
	.version('0.1.0')
	.usage('[options] <modulename> [modulepath]')
  	.arguments('<modulename> [modulepath]')
	.option('-f, --fields <fields>', 'Fields for form')
	.option('-t, --templatepath <templatepath>', 'Path for custom template')
  	.action((name, path) => {
		modulename = changeCase.pascalCase(name);
		modulepath = path
 	})
  .parse(process.argv);
	
if(typeof modulename === 'undefined'){
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
	},
	Select: {
		Klas: SelectGenerator,
		filename: 'Select',
	},
	Option: {
		Klas: OptionGenerator,
		filename: 'Option',
	},
	InputPassword: {
		Klas: InputPasswordGenerator,
		filename: 'InputPassword',
	},
	Information: {
		Klas: InformationGenerator,
		filename: 'Information'
	},
	Listing: {
		Klas: ListingGenerator,
		filename: 'Listing'
	},
	Request: {
		Klas: RequestGenerator,
		filename: 'request'
	},
	Saga: {
		Klas: SagaGenerator,
		filename: 'saga'
	}
}

Object.keys(arrContainers).forEach(key => {
	
	
	const Klas = new arrContainers[key].Klas(modulename, modulepath !== undefined ? modulepath : process.env.MODULE_PATH)
	
	if(program.fields){
		Klas.fields = program.fields
	}
	
	if(program.templatepath){
		Klas.setTemplatePath = program.templatepath
	}

	if(Klas.checkComponentTemplateExist()){
		const writeFile = Klas.make(arrContainers[key].filename)
		if(writeFile.success)
			console.log(chalk.greenBright(writeFile.message))
		else
			console.log(chalk.redBright(writeFile.message))
	}
	else{
		console.log(chalk.redBright(`${key} template doesnt exist`))
	}
})






