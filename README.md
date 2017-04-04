# lambda-images - under development

Hobby project when I get a few minutes here and there for March and April. 
Just wanted to make a image sharing service with less tracking data and freshen the ui.

Client uploads straight into S3 bucket via presigned urls, bypassing server.
S3 upload triggers event(s) to store metadata into dynamodb.

uses react and lambda for most of the heavy lifting.
