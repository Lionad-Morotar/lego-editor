default: help

help:
	@echo "   Documents & Usage"
	@echo "   make new <module-title> <module-cn-title>  ---  create a new module，eg. 'make new button button-cn-name'"

new:
	node build/bin/new-module.js $(filter-out $@,$(MAKECMDGOALS))
	# gulp watch
	node build/bin/modules-entry.js