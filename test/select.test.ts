import { test } from 'uvu'
import * as assert from 'uvu/assert'
import knuql from '../src/knuql'

const data = {
  cars: [
    {
      brand: 'Ford',
      model: 'Mustang',
      year: 1969,
    },
    {
      brand: 'Ford',
      model: 'F-150',
      year: 2015,
    },
    {
      brand: 'Dodge',
      model: 'Charger',
      year: 1970,
    },
  ],
}

test('Select all the data', () => {
  const result = knuql('.', data)
  assert.equal(result, data)
})

test('Select all the cars', () => {
  const result = knuql('.cars', data)
  assert.equal(result, data.cars)
})

test('Select the first car', () => {
  const result = knuql('.cars[0]', data)
  assert.equal(result, data.cars[0])
})

test('Select the first car brand', () => {
  const result = knuql('.cars[0].brand', data)
  assert.equal(result, data.cars[0].brand)
})

test('Select the last car', () => {
  const result = knuql('.cars[-1]', data)
  assert.equal(result, data.cars[data.cars.length - 1])
})

test('Select all cars with brand Ford', () => {
  const result = knuql('.cars[brand=Ford]', data)
  assert.equal(result, [data.cars[0], data.cars[1]])
})

test('Select all cars with brand Ford and model Mustang', () => {
  const result = knuql('.cars[brand=Ford][model=Mustang]', data)
  assert.equal(result, [data.cars[0]])
})

test('Select all cars with a year greater than 1970', () => {
  const result = knuql('.cars[year>1970]', data)
  assert.equal(result, [data.cars[1]])
})

test('Select all car brands', () => {
  const result = knuql('.cars[].brand', data)
  assert.equal(result, ['Ford', 'Ford', 'Dodge'])
})

test('Select all car brands and models', () => {
  const result = knuql('.cars[].brand, .cars[].model', data)
  assert.equal(result, ['Ford', 'Mustang', 'Ford', 'F-150', 'Dodge', 'Charger'])
})

test.run()
