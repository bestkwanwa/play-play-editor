import { DualViewportLayout, TestPrimitives } from './components'
import './App.css'

function App() {
  return (
    <DualViewportLayout initialMode="3D" showPerf={true}>
      <TestPrimitives />
    </DualViewportLayout>
  )
}

export default App
