export AWS_ACCESS_KEY_ID=ASIAV3R3C7REKXNWPZYH
export AWS_SECRET_ACCESS_KEY=SfVS4A6hUBu3ZEFy8vuHIlKAYv8N0XTonwDkix75
export AWS_SESSION_TOKEN=FwoGZXIvYXdzEFoaDGwmMzyj4OOElO2hbCLAAcYa6oXgwVek4A1B6vjFgbdzBaZUL8TrbnomYSZ5d652h9ZgO+Y+UTYE0gYCcgNXXhykCNJWnG06vrcJy/tV/rYWbE/VH+XwtgaRLZi1krJ4wfW4TF7Qc8wxsARTuRVkSJyu9S1QI3jrGbaby3DhD0Z4FwWh7gP4rSqsCcZmEuHJGndS3rMP3/JoYlP/qxMvazlajdy8sdGzWw9xy8FssJm/YexYFcOfOWnwwGzuh/z2bk2uB8VVJZMp3HY4+svtqCi0v6amBjItb3h+GIWHxLG5Bc4aqfGm7laCIUmnmrS2bOzR0AIRQxw53q7yYHWTSCrnS+fQ
export AWS_DEFAULT_REGION=us-east-1
export AWS_ACCOUNT_ID=402777111624



echo "Creating environment file..."
ECR_REPO_URL=$(jq -r '.[] | select(.OutputKey=="ECRRepoURL") | .OutputValue' ./automation/cloud_formation/stack-outputs.json)
BucketURI=$(jq -r '.[] | select(.OutputKey=="BucketURI") | .OutputValue' ./automation/cloud_formation/stack-outputs.json)
bucket_name=$(echo $BucketURI | awk -F':::' '{print $2}')

rm -rf ./automation/lambdas/firebase-authorizer.zip
cd ./automation/lambdas/firebase-authorizer && zip -r ../firebase-authorizer.zip index.mjs node_modules/ && cd ../.. &
wait
aws s3 cp ./automation/lambdas/firebase-authorizer.zip s3://$bucket_name/


aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
touch ../../.env
echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" >> ../../.env
echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" >> ../../.env
echo "AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN" >> ../../.env
echo "AWS_REGION=$AWS_DEFAULT_REGION" >> ../../.env

docker build -t scanlingo-core-backend:latest . --no-cache
docker tag  scanlingo-core-backend:latest $ECR_REPO_URL:latest 
docker push $ECR_REPO_URL:latest
