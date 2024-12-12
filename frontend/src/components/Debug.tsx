import materialsService from '../services/materialsService'
import projectsService from '../services/projectService'
import stockService from '../services/stockService'
import Button from './Button'
import Container from './Container'

const Debug = () => {
  const resetDatabase = async () => {
    try {
      await materialsService.removeAll()
      await stockService.removeAll()
      await projectsService.removeAll()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Button
        text="Reset Database"
        onClick={() => {
          void resetDatabase()
        }}
      />
    </Container>
  )
}

export default Debug
