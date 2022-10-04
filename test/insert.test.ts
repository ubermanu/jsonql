import { test } from 'uvu'
import * as assert from 'uvu/assert'
import knuql from '../src/knuql'

const data = {
  dogs: [
    {
      breed: 'Labrador',
      name: 'Rex',
      age: 3,
    },
    {
      breed: 'Poodle',
      name: 'Fido',
      age: 5,
    },
  ],
}

test('Insert a dog', () => {
  const result = knuql('.dogs += { breed: "Pug", name: "Puggy", age: 1 }', data)
  assert.equal(result.dogs[2], { breed: 'Pug', name: 'Puggy', age: 1 })
})

test('Insert many dogs', () => {
  const result = knuql('.dogs *= [{ breed: "Pug", name: "Puggy", age: 1 }, { breed: "Pug", name: "Puggy", age: 1 }]', data)
  assert.equal(result.dogs[2], { breed: 'Pug', name: 'Puggy', age: 1 })
  assert.equal(result.dogs[3], { breed: 'Pug', name: 'Puggy', age: 1 })
})

test.run()
