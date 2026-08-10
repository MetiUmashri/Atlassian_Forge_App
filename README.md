<<<<<<< HEAD
# Forge Hello World

This project contains a Forge app written in Javascript that logs ```Hello World!``` when an issue is created in Jira.

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app by editing the `src/index.jsx` file.

- Build and deploy your app by running:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:
```
forge tunnel
```

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

### Features to Implement
- If the ticket workflow status is in the "In Progress" & the Severity if "High" for more than 2 days - an email is sent to the scrum master of the project including the assignee
- Post completion of the Scrum provide an end-to-end report of the issues being addressed with necessary details of the issues being addressed (open to more suggestions for this feature)

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.
=======
# Atlassian_Forge_App
This app is designed to check how many days the jira ticket remained in the "Open" status.
>>>>>>> f80482684e2b274aef7f8b8ce09feb0cca2ec213
