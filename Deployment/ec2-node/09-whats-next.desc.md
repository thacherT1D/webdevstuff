# What's Next?

## Start on boot

Right now if you reboot your instance, your node app doesn't start automatically.  Add a quick service to make it start when the instance boots:

http://stackoverflow.com/questions/11275870/how-can-i-automatically-start-a-node-js-application-in-amazon-linux-ami-on-aws

## Log rotation

Your applications logs are stored in files on disk.  If you let your app run long enough, the log files will fill your entire server, and it'll eventually crash.

To solve that, configure log rotation with `logrotate`

http://www.thegeekstuff.com/2010/07/logrotate-examples/

## Who watches forever?

If a node process goes down, `forever` will restart it.  But what happens if a forever process fails?  There are other tools such as `monit` that can help with that.

## What if nginx / the whole instance goes down?

Install tools like Nagios or AWS Cloud Watch to get alerts when things go down.

## Consider pm2

As an alternative, consider https://github.com/Unitech/pm2
