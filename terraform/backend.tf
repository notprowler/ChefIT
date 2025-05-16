terraform {
  backend "s3" {
    bucket = "terraform-state-fastapi"
    key    = "fastapi/terraform.tfstate"
    region = "us-east-1"
  }
}
