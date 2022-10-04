import { test } from 'uvu'
import * as assert from 'uvu/assert'
import knuql from '../src/knuql'

const data = {
  movies: [
    {
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 9.3,
    },
    {
      title: 'The Godfather',
      year: 1972,
      rating: 9.2,
    },
    {
      title: 'The Godfather: Part II',
      year: 1974,
      rating: 9.0,
    },
  ],
}

test('Delete a movie', () => {
  const result = knuql('.movies -= .movies[0]', data)
  assert.equal(result.movies[0], { title: 'The Godfather', year: 1972, rating: 9.2 })
})

test('Delete multiple movies', () => {
  const result = knuql('.movies /= .movies[0, 1]', data)
  assert.equal(result.movies[0], { title: 'The Godfather: Part II', year: 1974, rating: 9 })
})

test.run()
