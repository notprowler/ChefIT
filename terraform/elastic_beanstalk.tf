resource "aws_elastic_beanstalk_application" "application" {
  name = "chefit-backend"
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "fastapi-env"
  cname_prefix        = "notprowlerfastapi"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.5.1 running Python 3.11"

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
