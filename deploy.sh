zip -r "chefit-backend-$1.zip" ./backend

aws s3 cp "flaskbb_deploy-$1.zip" s3://flaskbbapp

aws elasticbeanstalk create-application-version \
            --application-name chefit-backend \
            --version-label "ver-$1" \
            --source-bundle S3Bucket=terraform-state-chefit-notprowler,S3Key=fastapi/fastapi-app.zip

          aws elasticbeanstalk update-environment \
            --environment-name fastapi-env \
            --version-label "ver-$1"
