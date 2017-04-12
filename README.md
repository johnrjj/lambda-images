# Lambda-Images - in development

http://www.picdrop.surge.sh/

Hobby project when I get a few minutes here and there for March and April. 
Just wanted to make a image sharing service with less tracking data and freshen the ui.

Client uploads straight into S3 bucket via presigned urls, bypassing server.
S3 upload triggers event(s) to store metadata into dynamodb.
Everything is routed through API gateway for auth, rate limiting, and to abstract out Lambda. 

Uses React and Lambda for most of the heavy lifting. (LOVE both of these technologies).
