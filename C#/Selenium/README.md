# axe DevTools C# Basic API Example

An basic example project demonstrating how to use axe DevTools C#

## Prerequisites
- dotnet
- Selenium WebDriver for Chrome

## Clone Project

Follow these steps to clone and navigate to the directory:
1. Clone this repo from GitHub.
2. Open the project in your favourite editor.
3. Navigate from the root of the repo to this example with the following command:

```sh
cd C#/Selenium
```

## Set Up Workspace

To run this project, you have to first set up your artifactory credentials.

To do this, just store your username within an environmental variable named `ARTIFACTORY_USERNAME`
and your password within an environmental variable named `ARTIFACTORY_PASSWORD` 
**OR** replace the variables inside the nuget.config file with your username and password.

>**_NOTE:_**
>You need a valid license to use our APIs. For more information, see [Install from Deque’s Agora](https://docs.deque.com/devtools-html/4.0.0/en/node-pu-install-agora) page. After configuring the access to Deque's private registry, you can install the dependencies for this project.

Finally, add the axe-devtools-selenium package with the following command

```sh
dotnet add package axe-devtools-selenium
```

## Run Example
Use the following command to run the example:
```
dotnet run
```
