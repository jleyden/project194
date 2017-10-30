![JOUL](https://i.imgur.com/OaZnPKD.png "Joul")


## A Currency and Marketplace based on reducing carbon emissions

It's hard to make everyday decisions with an awareness of your environmental impact. JOUL is a mobile platform to incentivize green decision-making through a carbon-based currency and market. Peform green actions to earn jouls. Use the marketplace to trade your jouls for things that you want. We are currently testing in the San Francsisco Bay Area.

### Demo

Playing around with Joul is easy! It is currently optimized for iOS devices. Just follow these two steps:

1. Download "Expo" on your mobile device
2. [Use Expo App to scan the QR Code linked here](https://expo.io/@jleyden/project194)

### Interface

#### Community
A news feed of all the latest events from the Joul Community (in development)

#### Actions

![Commute](https://i.imgur.com/78HuOZpl.jpg)

Do an eco-friendly action to score jouls! We are starting off with utilizing clean commutes, such as taking the bus or train to work!

#### Market
Use your jouls in the marketplace to buy something you want! Also, you can sell your goods for more jouls! (in development)

#### Profile
Look at all your recent actions!


### Run JOUL Locally

### Run JOUL Locally

Want to host the app locally for development and debugging? Here are the steps.

1. Clone the repository
2. [Install Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-tab)
3. Download "Expo" on your mobile device
4. In your console, run the following commands:
	* yarn
	* yarn start
5. Scan the QR code in the console

### Plan

#### Milestone 1 (10/9/2017)

##### Goal
Our goal for the first milestone is to have a mobile app with a functional user interface. The app will not be complete, but will provide the transportation tracking feature as well as a simple user profile. This is the first step in building our project because the app is the most visible aspect allowing us to get immediate feedback on our progress. As we go on to build the backend to include blockchain technology and carbon emission calculation and verification abilities, we will continue to add features to the app.
##### Deliverable
For the first milestone, our app will only have a primitive transportation tracking feature and a simple user profile. The tracking feature will be entail a map api and gps tracking abilities as well as a button that let’s the user signal the start of their trip. Methods of transportation supported by the tracking feature will include bart and bus for trips over a certain mileage. It is from these trips and that we will eventually calculate a user’s decrease in carbon emissions from transportation and reward currency. The user profile will only have the user’s name as well as a travel log. The travel log will contain all of the user’s previous trips. In the future, the currency gained from travel will be displayed in the user’s account and updated as the user continues to take the bart and the bus. This will require a backend user authentication service, as well as a database of users and their logs.
#### Metrics/Evaluation
Since we are creating a currency and paying people to take public transportation rather than drive, it is of the utmost importance that the system cannot be gamed. For this reason, we will base our evaluation for the first milestone on the accuracy of our transportation tracker. We will take trips on the bart and on public transportation and use the BART API and the AC Transit API to access the accuracy of the trip. We will be able to monitor the gps location where the user began the trip, the length of time the user was on the trip, the mileage travelled, and the gps location where the user ended the trip. We will compare each of these metrics to those that we gather manually while testing the app. The accuracy of these metrics will encompass our evaluation of the proficiency of the application.

#### Milestone 2 (10/30/2017)

For the second milestone, we plan to build out the verification process of the app. The verification process will have automatic and social aspects. For the automatic aspect, we plan to use the AC transit and Bart APIs to compare with the recorded trips of the user. For the social aspect, we plan on sending to verification packets (with path, map, maybe photo) to 3 random users. If they all individually agree, then the packet will be verified and the owner will receive credits. This will require a database, a lambda function, a notification service, and possibly other features on our AWS backend. We will also put all verified trips on a single database that will be visualized as a community log. In the front end, we will build out the verification interface and the community log interface, and try to refine other aesthetics.

#### Milestone 3 (11/27/2013)

For the third milestone, we'll be focusing on building out the features of the market. On the backend, this will require a database with all items currently on the market. Each item on the market should have a photo, title, description, price, and link to the profile of the seller. Distribution of items is up to the seller. Sellers are rated based on successful transactions. For the front-end, we would like nice menu of all available items with a search-bar on the top. For this milestone, we will also like to flesh out the rating system. People will get three ratings: Proportion of actions that are verified to be true, proportion of verifications that are true based on other verifications, and average seller rating. We will display these ratings, as well as a total aggregate rating, on the user’s profile to show how “trusted” they are in the community. 

#### Milestone 4 (12/12/2017)

For now, we would like to keep the fourth milestone mostly up in the air. We will try our hardest to get most of the features done by the third milestone (like it is planned above). We want to do this so we can start testing after the third milestone with users around the Bay Area (mostly Alameda County). We would like to promote the app, have users try it out, and improve the app based on the user’s experience. We may want some extra features to facilitate this iterative process, including a promotional website, a feedback feature, and some user tags on the app to track how users behave. We’ll also want to make some overarching metrics to track user retention and social impact. Lastly, we will probably run into maintenance and scalability issues at this point, so we will likely put a lot of time into that. 

