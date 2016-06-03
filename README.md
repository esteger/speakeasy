# Speakeasy

Speakeasy is an interactive imageboard built on Meteor and Angular. All data is pushed to the client in real time. Refreshing the browser is not necessary. 

## Storage

Images are stored and fetched using version 3 of the Imgur API. As such, Speakeasy's database footprint is very small.

## Motivation

Everything else on the internet is stupid.

## Installation

1. `cd speakeasy`
2. `npm install`
3. `meteor --settings settings.json`

To register a user, you will need to first set `var accessCode` in client/scripts/components/register.component.js

## Tests

Not a single unit test is performed durring the development of Speakeasy. 

## License

Don't just steal my shit. 