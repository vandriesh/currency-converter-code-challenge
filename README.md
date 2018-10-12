# Code Challenge - #2 - CurrencyConverter

## The assignment
Create a currency conversion application to help calculate what the amount is worth in another currency.

## API
To achieve that, you will consume [Nomics’ API](http://docs.nomics.com). You can [get a free API Key](https://p.nomics.com/cryptocurrency-bitcoin-api/).

## Required features

#### Currency Converter
Convert an amount from one currency to another.

* As a user, I want to enter the amount, the currency codes that I would like to convert from and to. Clicking on the opposite arrows icon will switch the values of the From and To fields. Clicking on the Convert button will show the conversion result and get the exchange rate history.
* Every conversion operation should be saved. The application should keep the conversion history. Without using a backend service, find out a way to store the history in case the user closes and opens the application again or refreshes the page.

#### View conversion history
* See the conversion history in a table.
* When the user hovers over a table row, the action buttons will show. The View button should take the user to the currency converter page and perform the conversion. The Delete from history button will delete the element from the history.

### Authentication
A user needs to authenticate in order to use the application. For simplicity, use the following users array:
```json
[
  {
    "username": "user1",
    "password": "pass1",
    "fullName": "John Doe"
  },
  {
    "username": "user2",
    "password": "pass2",
    "fullName": "Adam Smith"
  }
]
```

## Bonus features
### Exchange Rate History
See conversion history data and statistics from today to N previous days (7 days: default, 14 days, 30 days). When the user changes the duration from the dropdown, the history and statistics should be updated.

## Mock-ups
We have provided you with designs for all screens. The style guide contains information about the design like colors, typography and iconography.

* [Login](designs/login.png)
* [Currency Converter](designs/convert.png)
* [Conversion history](designs/conversion-history.png)
* [Styleguide](designs/styleguide.png)
* [Exchange rate history (Bonus)](designs/exchange-history-(BONUS).png)


## The assignment
#### Technology stack
Please use the following technologies:

* Angular (latest)
* SCSS/SASS/CSS/HTML
* Git version control (descriptive commit messages)
* BONUS - Follow the [Angular Styleguide](https://angular.io/guide/styleguide)
* BONUS - Angular Material (otherwise, any other UI framework that you feel comfortable working with)
* BONUS - Follow the [BEM](http://getbem.com/) methodology for CSS
