config:
	bash ./automation/shell/config.sh

deploy-stack-I:
	bash ./automation/shell/build-cf-stack-1.sh

docker-build:
	bash ./automation/shell/docker-build.sh

deploy-stack-II:
	bash ./automation/shell/build-cf-stack-2.sh


