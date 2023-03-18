Feature: example.cypress.io
  Scenario: Adding a todo item to the list 
     Given the Todo List page is displayed
     When the customer types "Cucumber"
     And the customer adds the item
     Then a "Cucumber" is added to the list
  
  Scenario: Adding a todo item to the list3 
     Given the Todo List currently has an "Apple" added
   #   When the customer removes the item from the List
   #   Then the List not longer display that item


