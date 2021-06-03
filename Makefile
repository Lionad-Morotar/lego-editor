default: help

help:
	@echo "   Documents & Usage"
	@echo "   make new <module-title> <module-cn-title>  ---  create a new module，eg. 'make new button button-cn-name'"

new-module:
	node build/module/new-module.js $(filter-out $@,$(MAKECMDGOALS))
	# gulp watch
	node build/module/modules-entry.js