import {
  DualViewportLayout,
  TestPrimitives,
  EditorLayout,
  Toolbar,
  ToolbarGroup,
  Sidebar,
  IconButton,
  Button,
  Panel,
  Separator,
} from './components'
import './App.css'

function App() {
  return (
    <div className="dark w-full h-full">
      <EditorLayout
        showPerf={true}
        rightSidebarWidth={320}
        toolbar={
          <Toolbar>
            <ToolbarGroup>
              <IconButton
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                }
                tooltip="Menu"
              />
              <IconButton
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                }
                tooltip="Select"
                active={true}
              />
              <IconButton
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                }
                tooltip="Wall"
              />
            </ToolbarGroup>

            <Separator orientation="vertical" />

            <ToolbarGroup>
              <IconButton
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                }
                tooltip="Undo"
              />
              <IconButton
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 10H11a8 8 0 00-8 8v2m18-10l-6-6m6 6l-6 6"
                    />
                  </svg>
                }
                tooltip="Redo"
              />
            </ToolbarGroup>
          </Toolbar>
        }
        leftSidebar={
          <Sidebar position="left" width={280}>
            <div className="py-2 space-y-2">
              <Panel title="Tools">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 font-normal"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                  Select Tool
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 font-normal"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                  Draw Wall
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 font-normal"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                  Add Door
                </Button>
              </Panel>

              <Panel title="Layers">
                <div className="text-xs text-gray-500 px-3 py-2">No layers yet</div>
              </Panel>
            </div>
          </Sidebar>
        }
        rightSidebar={
          <Sidebar position="right" width={320}>
            <div className="py-2 space-y-2">
              <Panel title="Properties">
                <div className="space-y-3 px-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-purple-500"
                      placeholder="Enter name..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Type</label>
                    <div className="text-sm text-gray-400">None selected</div>
                  </div>
                </div>
              </Panel>

              <Panel title="Materials">
                <div className="text-xs text-gray-500 px-3 py-2">
                  Select an object to edit materials
                </div>
              </Panel>
            </div>
          </Sidebar>
        }
      >
        <DualViewportLayout initialMode="3D">
          <TestPrimitives />
        </DualViewportLayout>
      </EditorLayout>
    </div>
  )
}

export default App
