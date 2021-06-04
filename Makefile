default: help

help:
	@echo "   Documents & Usage"
	@echo "   make module <module-title> <module-cn-title>  ---  create a new module，eg. 'make new button button-cn-name'"
	@echo "   make modules-entry  ---  regenerate components.js in wox-mouldes"

# 创建新模块（创建后之后，需要补全以下模块的 meta.json）
module:
	node build/module/new-module.js $(filter-out $@,$(MAKECMDGOALS))

# 重新生成模块入口文件（通常在补全 meta.json 后调用）
modules-entry:
	node build/module/modules-entry.js