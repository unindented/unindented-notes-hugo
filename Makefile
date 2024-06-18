FUSE_VERSION := 6.6.2
KATEX_VERSION := 0.16.10

STATIC_JS_DIR := static/js

FUSE_DIR := $(STATIC_JS_DIR)/fuse-v$(FUSE_VERSION)
KATEX_DIR := $(STATIC_JS_DIR)/katex-v$(KATEX_VERSION)

.PHONY: fuse
fuse:
	@mkdir -p $(FUSE_DIR)
	@curl -Lo $(FUSE_DIR)/fuse.min.js https://cdn.jsdelivr.net/npm/fuse.js@$(FUSE_VERSION)/dist/fuse.esm.min.js
	@echo
	@echo "Finished downloading Fuse.js!"

.PHONY: katex
katex:
	@curl -Lo $(STATIC_JS_DIR)/katex.zip https://github.com/KaTeX/KaTeX/releases/download/v$(KATEX_VERSION)/katex.zip
	@unzip -d $(STATIC_JS_DIR) $(STATIC_JS_DIR)/katex.zip
	@rm $(STATIC_JS_DIR)/katex.zip
	@mv $(STATIC_JS_DIR)/katex $(KATEX_DIR)
	@cd $(KATEX_DIR) && npx rollup -c ../../../rollup.katex.mjs
	@rm -rf $(KATEX_DIR)/contrib
	@find $(KATEX_DIR) -depth 1 -type f -not \( -name 'katex.min.mjs' -or -name 'katex.min.css' \) -delete
	@echo
	@echo "Finished downloading KaTeX!"
