# Install Node

In order for your server to serve your app, you need to have NodeJS installed.

You can find instructions for how to install it here:

https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora

On this platform, here are the commands you'll need to run:

```
curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -
sudo yum -y install nodejs
sudo yum install -y gcc-c++ make
```

Check that everything is working by running the following commands:

```
which node
node -v
which npm
npm -v
```

You should see something like:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/151/install-node.png)
