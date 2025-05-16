resource "aws_elastic_beanstalk_application" "application" {
  name = "fastapi-backend"
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "fastapi-env"
  cname_prefix        = "arihantfastapi"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.0.1 running Python 3.11"

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }

  setting {
    namespace = "aws:elasticbeanstalk:container:python"
    name      = "WSGIPath"
    value     = "main:app"
  }
}
