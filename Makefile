hint:
	@./node_modules/.bin/jshint app/

test: hint
	@./node_modules/.bin/mocha

serve:
	@if [[ $$(ps -ef | grep "node ./node_modules/.bin/serve" | grep -v grep | 	awk '{print $$2}') -gt 0 ]]; then \$(MAKE) server-stop; fi
	@./node_modules/.bin/serve > /dev/null &

serve-stop:
	@kill $$(ps -ef | grep "node ./node_modules/.bin/serve" | grep -v grep | awk '{print $$2}')
