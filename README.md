
# Databricks Workspace by Terraform CDK

This repo builds Databricks Workspace and crendentials by Terraform CDK.

## Setup & Initial

- Install Terraform CDK

```
$ npm install -g cdktf-cli@latest
$ cdktf --version
```

- Install databricks provider

```
$ cdktf get
``` 

## Configurations

Setting your environments with `config.json`

```
{
  "prefix": "scottlwk",
  "workspace": {
    "accountId": "b78453e8-....",
    "username": "root@example.com",
    "password": "your-password",
    "host": "https://accounts.cloud.databricks.com"
  },
  "aws": {
    "region": "your-aws-region",
    "iamArn": "arn:aws:iam::0123456789:role/Databricks",
    "vpcId": "vpc-0123456",
    "privateSubnetIds": ["subnet-0123456","subnet-6543210"],
    "securityGroupId": "sg-0123456",
    "bucket": "your-bucket-name"
  }
}
```

## Deploy

```
$ cdktf plan
$ cdktf apply
```

