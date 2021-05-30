default: help

help:
	@echo "   使用说明"
	@echo "   make new <module-name>  ---  创建新模块，例如 'make new button'"

new:
	node build/bin/new-module.js $(filter-out $@,$(MAKECMDGOALS))