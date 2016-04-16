- Colt's Daily plan https://students.galvanize.com/cohorts/13/daily_plans/2015-06-15
- Colt's prework https://students.galvanize.com/cohorts/13/daily_plans/2015-06-12
- Cookies and sessions in rails https://students.galvanize.com/cohorts/13/daily_plans/2015-07-17
- https://students.galvanize.com/cohorts/14/daily_plans/2015-06-24
- https://students.galvanize.com/cohorts/14/daily_plans/2015-06-22
- Jeff's daily plan for cookies - https://students.galvanize.com/cohorts/14/daily_plans/2015-07-08
- 

### Cryptographic Hashing

Something fun we did in our class (g18) was have them watch the video and then brought the class back and asked these questions: 

1. what is a hash? 
    * hashing algorithm takes a string and outputs another string   
    * It's one way 
    * cannot be be reverse engineered 
    * Two same passwords will have the same hashes
2. Difference between an ecryption and a hash 
    * encryptions have a key that allows you to decrypt, hashes cannot be decrypted, instead one needs a look up table of words, hash all of those and then match the hashes 

*Discuss the common ways of guessing passwords: 
    1. Dictionary: words, phrases, common passwords 
    2. Brute force: every possible combination of characters in a given length ('aaaa', 'aaab', 'aaac')
    3. Master list someone has compiled in the dark web 
 
#####THEN    
***We had this site up [hashing and bcrypt](https://github.com/gSchool/bcrypt-practice)
AND [crack station](https://crackstation.net/)***

1. We looked at the crack station site and they were appalled by how you could just download the torrent to this and how someone had compiled a mastery list of hashes to compare
2. We used our site in the md5 section to start generating some hashes and plugged them into crackstation to show them how fast a un-salted hashed password can be found in plain text! This was AWESOME Really drove the 'WHY WE CARE" part home and got them super engaged and asking questions left and right! Here are some hashes to use if you're crunched on time: 
```
c11083b4b0a7743af748c85d343dfee9fbb8b2576c05f3a7f0d632b0926aadfc
08eac03b80adc33dc7d8fbe44b7c7b05d3a2c511166bdb43fcb710b03ba919e7
e4ba5cbd251c98e6cd1c23f126a3b81d8d8328abc95387229850952b3ef9f904
5206b8b8a996cf5320cb12ca91c7b790fba9f030408efe83ebb83548dc3007bd
```

#####THEN 
That was a perfect way to lead into Salts!

1. What is a salt? 
    * Randomly generated string of characters used to combine with password of user
    * ex: salt + password, salt + salt + password, salt + 'hello' + password 
2. What is the benefit of a slow hashing algorithm? 
    * More resource intensive to generate 
3. What is cryptographic hashing? 
    * Storing passwords in a database
    * help prevent further data breaches 
    * slow attackers down 

_Ended With_
Showing them both syncronous and asyncronous bcrypt code in the bcrypt repo, how it works and allowing them to break out and work that on their own! 