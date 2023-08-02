aws cloudformation deploy --template-file ./automation/cloud_formation/ec2_la_gw.json --stack-name CoreDeploymentStack --no-fail-on-empty-changeset --region us-east-1 --capabilities CAPABILITY_IAM
