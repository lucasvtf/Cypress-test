# Cypress Test

<p align='center'>
<img width='500' src='/assets/cypress-test.gif'>
</p>

# Purpose
Write tests in Cypress for the page http://computer-database.gatling.io/computers.
To do the tests I decided to start with the basics which was testing the elements that appear on the screen, inputs, buttons. Then I started testing the "Add a new computer" screen, I did the tests to cover from the most basic tests to the edge cases  tests. For further testing I tested the main page filter and the edit and delete functionality on a computer.

# Node version: v.16.15.1

# Tests Summary
1. Test site Computer Database
  - Should render computer database homepage correctly
  - Should open Add a new computer page when user click on a button "Add a new computer"

2. Test Add a new computer
  - Should return to homepage when click on a button "Cancel"
  - Should all inputs be editable
  - Should add a new computer with sucess
  - Should add a new computer only with name
  - Should throw warning with no name
  - Should throw warning with wrong "Introduced" format date
  - Should throw warning with wrong "Introduced" value
  - Should throw warning with wrong "Discontinued" format date
  - Should throw warning with wrong "Discontinued" wrong value

3. Test Computer Database filter
  - Should Computer Database have a filter input and a button "Filter by name"
  - Should be possible to filter a computer
  - Should not possible to filter a computer when the user does not fill in the input "Filter by computer name..."

4. Test Edit and Delete a computer
  - Should be possible click on a computer and redirect to the computer page
  - Should be possible edit a computer
  - Should be possible delete a computer


# Step by step to run this project

## Clone the repository
```bash

git clone git@github.com:lucasvtf/Cypress-test.git 

```
## Enter the project folder
```bash

cd cypress-test

```
## Install the dependencies
```bash

npm install

``` 
## Running the tests

### To run on browser

 ```bash
 
 npm run cy:open
 
 ```
 
### To run on terminal

```bash

npm run cy:run

```
