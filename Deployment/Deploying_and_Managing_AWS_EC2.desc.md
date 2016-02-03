# Expectations

This is an entire field of the industry.  You are not expected to be able to reproduce these steps from memory, or be able to deeply understand all the concepts by the end of this lesson. You are expected to understand the terminology so that you can read Amazon documentation or talk to a System Administrator about AWS.

# Objectives

1. <a href="#what-is-aws">Explain what is AWS</a>
2. <a href="#describe-ec2">Describe the AWS EC2 service</a>
3. <a href="#create-new-user">Create New Users</a>
3. <a href="#mfa">Secure connect to AWS with Multi-Factor Authentication</a>
4. <a href="#security-group">Create Security group for a web server</a>
5. <a href="#create-instance">Create a new EC2 Instance</a>
6. <a href="#connect">Connect to the EC2 Instance</a>
7. <a href="#patch">Patch the EC2 Instance</a>
8. <a href="#install-ruby">Install software needed for a server on the EC2 instance</a>
9. <a href="#upload_server">Upload the server software onto the Instance</a>

Yes, thnat is a lot of objectives, which is why you are not expected to memorize all of these steps. Rather this is a checklist that you can come back to whenever you need to work with EC2.

Lets get started, shall we?

# <span id="what-is-aws">What is AWS Anyways?</span>

AWS stands for Amazon Web Services, and is the term used to describe the suite of services that Amazon offers to developers. The most oft used services would be EC2, Elastic Beanstalk, and S3. We are concentrating on EC2 today, if you would like to learn more about the other services please look for the other learning experiences or look at the AWS documentation.

There is a lot of fear when it comes to AWS. A lot of companies look at the offered services and become afraid that they cannot afford them. This is both true and false. Managed innapropriately this is a real possiblitly. However done correctly AWS is a cheap way to have control over the server, and be able to scale to an unlimited number of users.

# <span id="describe-ec2">Okay, What is AWS EC2 Then?</span>

EC2 is a virtual computer running in the cloud.

What that means is that somewhere in one of the many server farms that Amazon hosts is a server that will create a virtual computer just for you. What virtual means in this case is that the server is a very powerful machine, but inside of it is a lot of small containers that are isolated from eachother. Each of these containers acts like they are a small computer all on their own. They aren't even aware of eachother.

The nice thing about this is that if that server suffers a hardware failure, your virtual computer will never notice, and it will be moved to another server, maybe not even in the same room or building!

Later we will see what the choices are for the type of virtual computer, and where they can be installed in the world.

# <span id="create-new-user">Connecting to the AWS Console Securely</span>

First things first, make sure that you have created an AWS account. If you haven't done this yet, then go to the <a href="http://aws.amazon.com">AWS Console</a> and create an account now.

The primary account used to sign into to AWS is called a root user. Just like the root user of a Mac or Linux computer it has the priviledges to do all the things, including seeing the financial parts of the console. Best practices suggest that a sub account be created for the Administrator (that is you if you created this account) or for any other role. We will do this through the Identity and Access Management Service, or IAM as it will be known as from now on.

1. Find the IAM service and click on it.
2. Click on Create new User
3. Create a user for yourself at this time.
4. You do not need to give yourself an access key as this user will not be accessing resources through S3 or any other REST API
5. Immediately edit the user that you just created by clicking on it
6. Assign a password for the user
7. Assingn the Administrator policy to the user

Something to note for this user, they will have to log in through a different url as the name itself is not tied directly to any one account. You can find this url in the dashboard of the IAM service.

# <span id="mfa">Signing Into AWS Console with Multi-Factor Authentication</span>

Once you have your users set up, it is important to configure Multi-Factor Authentication, or MFA as it is referred to in the AWS documentation. MFA is important, as it requires anybody logging into the console to know something (the password) and to have something (the MFA device). In this case the device will be your phone with Google Authenticator installed.

1. Install the Google Authenticator app on your phone.
2. In the IAM service, Activate MFA on your root account. Follow the instructions to get set up with Google Authenticator
3. Under users, edit your new user and add an MFA device.

# <span id="security-group">Create a EC2 Security Group</span>

The next step is to create a security group that will be applied to a EC2 instance. We have to make the security group first, as we will have to apply that security group when we launch the EC2 instance. That being said, once a security group has bee created and applied to an instance, it can be changed without having to destroy and recreating the instance.

Think of the security group as the firewall. It describes what services and ports are going to be available coming into your EC2 instance. By default everything is allowed out, and nothing is allowed in. we will be creating a security group that will allow http (port 80) and ssh (port 22) in.

1. Click on the EC2 service from the AWS console
2. Navigate to the Security Groups page (located on the left under Network & Security)
3. Create a new Security Group with the following information
	1. Name of _Web-Server_
	2. Give it a description along the lines of _Web server security group_
1. Under inbound traffic, add two rules
	1. Type is SSH, Source is anywhere
	2. Type is HTTP, Source is anywhere
	1. Type is TCP, Port is 3000, and Source is anywhere

This will make it so that we can connect to our web server from the browser once we have some code running. It will also allow us to connect our terminal to the instance via SSH so that we can install software and set up our code.

# <span id="create-instance">Creating an EC2 Instance</span>

Now it is time to spin up a new EC2 instance. This can be done from the Instances window under _Instances_.

1. Click **Launch Instance**
2. You will be presented with a list of Operating Systems (OS from now on) to choose from. For this example we are going to choose Amazon Linux (free tier) at the top of the list.
3. Next you get to choose the type of virtual hardware that your OS will run on. To stay free we will be choosing the t2.micro tier
4. Then we get to configure the instance. We will not be changing anything here, so just continue on
5. To adding storage. We will not need to change the defaults here either, so again, continue on to
6. Tagging, where we can set key value pairs for giving metadata information about the instance. In this case we are going to have a name, owner, and purpose tags.
7. The next window is where we apply the security group that we created earlier to this new instance. When you have it selected, and verify that it is applying the rules that you want it to apply, click the **Review and Launch** button
8. This is your last chance to change things before you commit Amazon to creating your virtual computer in the cloud. when you are ready, click the **Launch** button to get started.
9. You will be asked to create a key pair. This is so that you can securely connect to the instance via SSH. Give it a name and then download the key pair.
10. Once you have launched the instance, you can navigate back to the instances window to see the progress. When it turns green, the instance is good to go.

# <span id="connect">Connect to Your EC2 Instance</span>

Now it is time to SSH into your new instance and begin setting it up for production. To do so, we are going to need the key pair that you downloaded in the last section. I saved it into a folder _.ssh_ in my home directory and called it awskeypair.pem.

1. Change the permissions on the key pair file with the command **chmod 400 <filename>**. In my case that means that I use the command **chmod 400 ~/.ssh/awskeypair.pem**
1. Select your instance and click the **connect** button.
2. You will be given instructions on how to connect to the server via SSH. I will use the command **ssh -i ~/.ssh/awskeypair.pem ec2-user@52.35.129.64 to connect to the server.
3. You will be asked if you want to store the special key pair from your new instance. Press y to store that so you don't get the same message over and over again every time you connect.

# <span id="patch">Patch the EC2 Instance</span>

The first thing that you may notice after connecting to the EC2 instance is the nifty EC2 logo. Immediately after that you should pay attention to the line **3 package(s) needed for security, out of 8 available**. This line indicates that updates, some of them security related, need to be applied to the instance. This should be done immediately after an instance is created, and ongoing through the future.

1. Run the command **sudo yum update**. This will begin updating all of the packages that need to be updated.
2. Press **y** when asked to authorize the updates
3. In the future you can make the update process go faster by using the command **sudo yum -y update** which will not ask you if you want to apply the updates, but rather automatically type y in for you.

Applying these updates regularly is important as they often fix problems that a hacker can use to disrupt your server. I recommend checking for updates at least once per month if not more often.

# <span id="install-ruby">Install software needed for a server on the EC2 instance</span>

Great, you have a virtual computer, but it isn't really doing much for you. Let's change that by installing the software needed to run your server code. Now Ruby is installed by default, however the version installed is ruby 2.0. We need version 2.2 for our project.

In this case we are going to run a small Ruby on Rails project to display a simple hello from EC2 message on the browser. This means that we need to install Ruby and Rails.

1. Install the compilers and supporting libraries needed to build rails with the command **sudo yum -y groupinstall "Development Tools"**.
1. Install the libraries that we will need to compile rails with the command **sudo yum -y install zlib-devel sqlite-devel**.
1. Run the command **sudo yum -y install ruby22** to install ruby version 2.2. If you would like to use ruby 2.1, then install _ruby21_.
1. Install the ruby development tools with the command **sudo yum -y install ruby22-rdoc ruby22-devel**.
1. Next we need to install rails with the command **sudo gem2.2 install rails --no-ri --no-rdoc**
1. One last thing. Rails needs a JavaScript runtime in order to run some of the coffeescript and uglify tasks. The best runtime to use is NodeJs. Unfortunately we will need to install NodeJs from source.
	1. Download NodeJs with the command **curl https://nodejs.org/dist/v4.2.3/node-v4.2.3.tar.xz > node-v4.2.3.tar.xz**
	1. Unpack the file you downloaded with the command **tar xvf node-v4.2.3.tar.xz**. This will unpack the compressed file into a folder called node-v4.2.3
	1. Change directories into the _node-v4.2.3_ directory and run the command ./configure
	1. Run the command **make**. this can take a while as NodeJs is compiled.
	1. Finally, install node with the command **sudo make install**

# <span id="upload_server>Upload the server software onto the Instance</span>

Now that we have a server with ruby and rails on it, we need our code so that we can run our server. One way to do this is to use git.

1. Clone your code repository with the **git clone** command.
1. Install the gems that will be needed to run the server by changing directories into your server and running the **bundle** command
1. Run the server with the command **rails s -b 0.0.0.0**

Now you can navigate to the ip address and port that was given to you when you when you SSHed into the computer.
