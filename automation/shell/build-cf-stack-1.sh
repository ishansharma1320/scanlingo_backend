aws cloudformation deploy --template-file ./automation/cloud_formation/ScanLingoPrimaryStack.json --stack-name ScanLingoPrimaryStack --no-fail-on-empty-changeset --region us-east-1
aws cloudformation describe-stacks --stack-name ScanLingoPrimaryStack --query "Stacks[0].Outputs" --region us-east-1 > ./automation/cloud_formation/stack-outputs.json

