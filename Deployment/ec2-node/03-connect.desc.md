# Connect to your instance

## Copy your AWS key

Make sure you are cd'd into the `ec2-node-deployment` directory (_not_ the `simple-app` directory).

When you configured your instance, you downloaded a file named `aws-key.pem`.  It's probably in your downloads folder. To make your life a little easier, copy that file into the `ec2-node-deployment` directory:

```
mv ~/Downloads/aws-key.pem .
```

<div class="alert alert-warning">
  NOTE: the project already excludes all `.pem` files, so it's safe to copy there.

  If you are doing this yourself, you'll need to ensure that your key is never added to git.
</div>

## Set the permissions

In order for you to be able to use this key, it needs to have the correct file permissions.  Set the correct permissions with:

```
chmod 400 aws-key.pem
```

## Find out how to connect

Back in the AWS console click on Actions > Connect

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/156/11-connect.png)

---

You'll see a popup that gives you instructions on how to connect:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/157/12-ssh-instructions.png)

Look at the example near the bottom - you can copy and paste this command to get into your instance.  For example:

```
ssh -i aws-key.pem ec2-user@ec2-52-34-214-90.us-west-2.compute.amazonaws.com
```

You should see:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/152/aws-ssh-connect.png)


## Update your packages

When you login you'll probably see that some packages are outdated.  Before moving forward, take a moment to update them all.

```
sudo yum -y update
```
