terraform {
  backend "s3" {
    bucket = "terraform-state-chefit-notprowler"
    key    = "fastapi/terraform.tfstate"
    region = "us-east-1"
  }
}
