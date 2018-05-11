# Lunch cost calculator

This tool is used to calculate the cost of each lunch, based on various ingredients.

## Table of Contents

## Features

### Given a number person, select 1 or more recipes and get as output total price + grocery list

## Entities

### Ingredients

* name
* price ( optional )
* unit ( gr / lbs / ml / oz ) ( optional )

### Recipes

* name
* array of :
  * ingredient
  * quantity
  * unit ( immutable, free text if no unit given for the ingredients )
* number of person

## Parameters

* unit convertor

## Guidelines

* store for each ingredient a price/gr
* store for each couple ingredient/quantity of a recipe a count of gr ( converted from ingredient unit )
* persist list on firebase ( ? ) or indexDB
* printable visualisation of the grocery list
