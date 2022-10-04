import { test } from 'uvu'
import * as assert from 'uvu/assert'
import knuql from '../src/knuql'

const data = {
  cats: [
    {
      breed: 'Persian',
      name: 'Mittens',
      age: 3,
    },
    {
      breed: 'Siamese',
      name: 'Socks',
      age: 5,
    },
    {
      breed: 'Siamese',
      name: 'Athena',
      age: 2,
    },
  ],
}

test('Update a cat name', () => {
  const result = knuql('.cats[0].name = "Mittens II"', data)
  assert.equal(result.cats[0].name, 'Mittens II')
})

test('Update a cat age', () => {
  const result = knuql('.cats[0].age = 4', data)
  assert.equal(result.cats[0].age, 4)
})

test('Update all cats with breed Siamese', () => {
  const result = knuql('.cats[breed=Siamese].age = 6', data)
  assert.equal(result.cats[1].age, 6)
  assert.equal(result.cats[2].age, 6)
})

test('Update all cats with breed Siamese and name Athena', () => {
  const result = knuql('.cats[breed=Siamese][name=Athena].age = 3', data)
  assert.equal(result.cats[2].age, 3)
})

test('Update multiple values', () => {
  const result = knuql('.cats[0] += { "name": "Mittens II", "age": 4 }', data)
  assert.equal(result.cats[0].name, 'Mittens II')
  assert.equal(result.cats[0].age, 4)
})

test.run()
