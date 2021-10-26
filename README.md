# Login with React, Node.js/Express, Next.js and JWT

A simple login application

```
git clone https://github.com/niclasericsson/authorization.git
```

Then install with yarn:

```
yarn
```

Add a new config file called `service-account.json` (to use with the Firebase project) to the root folder:

```
{
    "type": "service_account",
    "project_id": "some-project-id",
    "private_key_id": "some-private-key-id",
    "private_key": "some-private-key",
    "client_email": "service-user@some-project.iam.gserviceaccount.com",
    "client_id": "1234567890",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/some-project.iam.gserviceaccount.com"
}

```

...and finally run the app:

```
GOOGLE_PROJECT_ID=<some-project-id> yarn run dev
```

Go to http://localhost:3000/. Enjoy!
