## Potential roadblocks:

- ssh key
- once they hit 5 apps they'll be asked for a credit card, but they will _not_ be charged.  You can hundreds of free apps, you just can't have more than 5 without a card

## Heroku Kickoff

**I do (< 30 min)**:

- Lecture on the basic overview / drawing of Github + Local Dev Machine + Heroku
- Lecture on SSH briefly
- Lecture on the concept of it being a git remote

**We do (1 hour)**:

- Install and setup heroku from docs
- Deploy your first app using a combination of their docs and this LE
- Create a simple simple node app (that says "hello world") and deploy it

## Assessment (not a lot of time)

Have students submit their URLs to some spreadsheet and go through and verify.

## CFUs - ~30 min

### Cold Call Questions:

- What does SSH stand for?
- What _is_ heroku? (a cloud-based web host, sits on top of AWS)
- How does Heroku know that your application is a Node application (instead of say, PHP)?
- Describe the role of the Procfile
- What does CD stand for? (continuous deployment)

### Whiteboard 

- In the command `git push heroku master`, what do you call `heroku`? (a remote)
- How would you list all git remotes (`git remote -v`)
- Of id_rsa and id_rsa.pub, which one do you keep private, and which one do you distribute?
