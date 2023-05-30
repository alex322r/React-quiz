const API_URl = 'https://opentdb.com/api.php?amount=5'

export const getQuestions = async () => {
      
    try {
      const response = await fetch(API_URl)
      const json = await response.json()
      const questions = json.results
    console.log(questions)
      return questions?.map(question => question)
    } catch (e) {
      throw new Error('Error searching questions')
    }
  }