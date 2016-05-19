# Deploying a NodeJS Application to EC2

**Standard** - Deploy an app to EC2 and compare and contrast the AWS core philosophy with Heroku and Cloud Foundry and pre-cloud era

**Objectives**

By the end of this series of articles, you should be able to view a Node app that you've deployed that is setup like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/163/nginx-forever-postgres.png)

## Why would you ever do this?

With the advent of services like Heroku and Cloud Foundry developers have to know less and less about the mechanics of what's on a server, so why would you want to deploy your own app to EC2 like this?

It's unlikely you'll deploy a production app of any consequence exactly like this.  However, going through the exercise of deploying will give you a greater appreciation for what's happening under the hood, and will give you a glimpse into the world of system administration / devops.  If you have fun doing this, you may even consider a career in devops - it's a strange and beautiful world, and lucrative to boot :)

## Steps

1. Launch an EC2 instance on AWS
1. Setup the example app locally (to make sure it's working)
1. Connect to your EC2 Instance
1. Install NodeJS
1. Install PostgreSQL
1. Deploy your code and run it with `forever`
1. Install nginx
1. Turn your instance off once you are done
