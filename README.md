[![Twitter Follow](https://img.shields.io/twitter/follow/3boxdb.svg?style=for-the-badge&label=Twitter)](https://twitter.com/3boxdb)
[![Discord](https://img.shields.io/discord/484729862368526356.svg?style=for-the-badge)](https://discordapp.com/invite/Z3f3Cxy)
[![CircleCI](https://img.shields.io/circleci/project/github/uport-project/3box-js.svg?style=for-the-badge)](https://circleci.com/gh/uport-project/3box-dapp) [![Greenkeeper badge](https://badges.greenkeeper.io/3box/3box-dapp.svg)](https://greenkeeper.io/)

# 3Box Profiles Application
This is the home of the [3Box Profiles Application](https://3box.io), which is deployed at https://3box.io and works on all standard web3-compatible browsers. The 3Box Profiles Application is built on [3Box](https://github.com/3box/3box) and allows users to:
* create a social web3 profile, which they can use to sign in to [Ethereum](https://github.com/ethereum/web3.js) applications
* store and manage their information on [IPFS](https://github.com/ipfs/ipfs), in [OrbitDB](https://github.com/orbitdb/welcome) instances
* verify their Github and Twitter social accounts for use throughout the web3 dapp ecosystem
* view their unified, integrated Ethereum and 3Box activity feed

### Getting Started
* New users [create a profile](https://3box.io/create)
* Existing users [sign in to your profile](https://3box.io)
* Experiencing an issue? [Report it here](https://github.com/uport-project/3box-dapp/issues/new)
* Want to contribute? Read our [contributor's guide](https://github.com/3box)

For an overview of 3Box and all of our components, check out the [main 3Box project repo](https://github.com/3box/3box).

# Functionality
## Social Profiles
The primary feature of the 3Box Profiles App is that it allows Ethereum users to create a shareable social profile for their Ethereum account. 3Box profiles consist of various public and private information saved by the user and other applications (with the user's consent). 

#### Public Profile
Public profiles are available for all to see. The 3Box Profiles App allows users to add a name, image, description, emoji, twitter, and github to their public profile. Applications can save additional information to the user's public profile as well, such as public group affiliations. Public profiles are available for all to query using the getProfile() method in the 3Box.js API, even without the user's consent – since the information is public.

#### Private Profile
Private profiles consist of encrypted data and are only made available to applications that the user approves. The 3Box Profiles App offers users the ability save email and birthday to their private profile, however applications can save additional information there as well.

## Activity Feed
User activity feeds display a simple, unified view on a user's activity across all Ethereum networks and Box. The 3Box activity feed relies on the `3box-js` getProfile() method and the MetaMask contract metadata library to replace hexadecimal Ethereum addresses with more user-friendly information.

## Verifications
The 3Box Profiles Application allows users to verify certain important profile attributes so others can be more confident in the information that users claim about themselves. Twitter and Github handles are verified and saved to the public profile, and  emails are verified and saved to the private profile. The code for verifications can be found at [`3box-verifications`](https://github.com/3box/3box-verifications), and verifications follow decentralized identity (DID) standards proposed by the decentralized identity foundation (DIF).

# Technical Components

## 3Box.js
The 3Box Profiles App uses the [3Box.js API (`3box-js`)](https://github.com/3box/3box-js) for all interactions with the 3Box user data network, including setting, getting, and removing information.

## 3Box Verifications
The Profiles App relies on the [`3box-verifications`](https://github.com/3box/3box-verifications) library to issue and verify Github, Twitter, and Email claims.

## 3Box Activity
The activity feed populates 3Box activity using [`3box-js`](https://github.com/3box/3box-js) and Ethereum activity using the [`3box-activity`](https://github.com) library. The `3box-activity` library is a wrapper on the Etherscan API.
