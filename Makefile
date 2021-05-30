default: help

help:
	@echo "   使用说明"
	@echo "   make new <module-title> <module-cn-title>  ---  创建新模块，例如 'make new button 按钮模块'"

new:
	node build/bin/new-module.js $(filter-out $@,$(MAKECMDGOALS))
	node build/bin/modules-entry.js