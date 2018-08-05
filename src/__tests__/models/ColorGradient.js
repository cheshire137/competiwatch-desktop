import ColorGradient from '../../models/ColorGradient'

it('returns an array of RGB colors between given color range', () => {
  const colors = [[178, 212, 132], [102, 189, 125]]
  const stepCount = 3
  const gradient = new ColorGradient(colors, stepCount)
  const result = gradient.rgb()
  expect(result.length).toBe(stepCount + 1)
  expect(result[0]).toEqual(colors[0])
  expect(result[stepCount]).toEqual(colors[1])
})
