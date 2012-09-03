hint:
	@./node_modules/.bin/jshint app/

less:
	@if [[ -f assets/css/bootstrap.compiled.css ]]; then rm assets/css/bootstrap.compiled.css; fi
	@./node_modules/.bin/lessc assets/css/bootstrap/less/bootstrap.less assets/css/bootstrap.css
	@cp -f assets/css/bootstrap/img/* assets/img/

test: hint
	@./node_modules/.bin/mocha

serve: less
	@if [[ $$(ps -ef | grep "node ./node_modules/.bin/serve" | grep -v grep | 	awk '{print $$2}') -gt 0 ]]; then \$(MAKE) serve-stop; fi
	@echo "Please open your browser at: http://localhost:3000/"
	@./node_modules/.bin/serve > /dev/null &

serve-stop:
	@kill $$(ps -ef | grep "node ./node_modules/.bin/serve" | grep -v grep | awk '{print $$2}')
