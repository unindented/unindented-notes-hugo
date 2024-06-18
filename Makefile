# ######################################################################
# # KATEX BUNDLING                                                     #
# ######################################################################

KATEX_VERSION := 0.16.11

JS_DIR := assets/js
KATEX_DIR := $(JS_DIR)/katex-v$(KATEX_VERSION)

.PHONY: katex
katex:
	@curl -Lo $(JS_DIR)/katex.zip https://github.com/KaTeX/KaTeX/releases/download/v$(KATEX_VERSION)/katex.zip
	@unzip -d $(JS_DIR) $(JS_DIR)/katex.zip
	@rm $(JS_DIR)/katex.zip
	@mv $(JS_DIR)/katex $(KATEX_DIR)
	@cd $(KATEX_DIR) && npx rollup -c ../../../rollup.katex.mjs
	@rm -rf $(KATEX_DIR)/contrib
	@find $(KATEX_DIR) -depth 1 -type f -not \( -name 'katex.min.mjs' -or -name 'katex.min.css' \) -delete
	@echo
	@echo "Finished downloading KaTeX!"

# ######################################################################
# # FILE COMPRESSION                                                   #
# ######################################################################

PUBLIC_DIR := public

COMPRESSIBLE_EXTENSIONS := css html ics js json mjs svg webmanifest xml

COMPRESSIBLE_FIND_INCLUDE := $(subst =, ,$(subst $(eval) , -o ,$(patsubst %,-iname='*.%',$(COMPRESSIBLE_EXTENSIONS))))
COMPRESSIBLE_FILES := $(shell find $(PUBLIC_DIR) -type f \( $(COMPRESSIBLE_FIND_INCLUDE) \) 2> /dev/null)
COMPRESSIBLE_FILES_BROTLI := $(addsuffix .br, $(COMPRESSIBLE_FILES))
COMPRESSIBLE_FILES_GZIP := $(addsuffix .gz, $(COMPRESSIBLE_FILES))

.PHONY: compress
compress: compress-brotli compress-gzip

compress-brotli: $(COMPRESSIBLE_FILES_BROTLI)
	@echo
	@echo "Finished compressing files with Brotli!"

compress-gzip: $(COMPRESSIBLE_FILES_GZIP)
	@echo
	@echo "Finished compressing files with Gzip!"

$(PUBLIC_DIR)/%.br: $(PUBLIC_DIR)/%
	@brotli -f -o $@ $<
	@touch $@
	@printf "."

$(PUBLIC_DIR)/%.gz: $(PUBLIC_DIR)/%
	@gzip -f -k $<
	@touch $@
	@printf "."