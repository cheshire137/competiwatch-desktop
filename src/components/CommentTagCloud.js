import React, { Component } from 'react'
import './CommentTagCloud.css'

const maxFontSize = 38
const minFontSize = 16

class CommentTagCloud extends Component {
  normalizeWord = word => {
    return word.replace(/[,\-\])]$/g, '')
      .replace(/^[(\-[]/g, '')
  }

  getWordsList = () => {
    const { comments } = this.props
    const wordCounts = {}
    const words = []

    for (const comment of comments) {
      const commentWords = comment.split(/\s+/)

      for (const rawWord of commentWords) {
        const word = this.normalizeWord(rawWord)

        if (!(word in wordCounts)) {
          wordCounts[word] = 0
        }

        wordCounts[word]++
      }
    }

    for (const word in wordCounts) {
      words.push({ text: word, value: wordCounts[word] })
    }

    return words
  }

  render() {
    const words = this.getWordsList()
    if (words.length < 1) {
      return null
    }

    const { season } = this.props
    const wordCounts = words.map(data => data.value)
    const maxCount = Math.max(...wordCounts)
    const minCount = Math.min(...wordCounts)

    const fontSizeMapper = count => {
      const numerator = maxFontSize * (count - minCount)
      const denominator = maxCount - minCount
      return Math.ceil(numerator / denominator) + minFontSize
    }

    const wordStyle = count => {
      const fontSize = fontSizeMapper(count)
      return { fontSize: `${fontSize}px` }
    }

    return (
      <div>
        <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
          Comments
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="small-chart-container">
          {words.map(data => (
            <span key={data.text} style={wordStyle(data.value)}>
              {data.text}
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default CommentTagCloud
