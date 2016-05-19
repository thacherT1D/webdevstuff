Login to your AWS Account

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/143/01-aws-dashboard.png)

---

Click "Launch Instance"

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/141/02-ec2-dashboard.png)

---

Select the Amazon Linux AMI

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/140/03-choose-image.png)

---

- Choose the t2 micro (free tier eligible)
- Click "Review and Launch"

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/142/04-choose-instance-type.png)

---

Click "Edit Security Groups"

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/150/05-review-launch.png)

---

Add a new rule to allow HTTP requests on port 80

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/146/06-configure-security-group.png)

---

Click "Launch"

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/144/08-launch-instance.png)

---

A popup will appear and you must do 3 things:

- Make sure "Create a new keypair" is selected
- Enter `aws-key` under "Key pair name"
- Click "Download Key Pair", which will download a file
- Click "Launch Instance"

NOTE: you'll need that downloaded file in order to access your instance.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/147/07-aws-key-pair.png)

---

Your instance is being provisioned.  It won't be available immediately, but click "View Instances" to see it.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/145/09-view-instances.png)

---

When the instance is ready the "Instance State" will turn green and say "running".

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/148/10-instance-page.png)

---

Click on your instance in the table.  You'll see properties appear below.

Pay particular attention to the "Public DNS" - that's the address where your web app will be available on the internet.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/149/10-public-dns.png)
