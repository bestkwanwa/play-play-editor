# Home Decoration Editor - Phase Planning

**Last Updated**: 2025-11-17
**Project Type**: Home Decoration 3D Editor (家装行业编辑器)
**Target**: Production-ready web application for interior design

---

## 🎯 Project Overview

This is a **home decoration editor** built with Three.js and React Three Fiber, designed for the interior design industry. The goal is to create a production-ready tool that allows users to:

1. Draw floor plans (walls, doors, windows)
2. Apply materials (wall paint, flooring, ceiling)
3. Place furniture and decorations
4. Visualize and export the final design

**Learning Goals**: Deep dive into Three.js while building a real commercial product.

---

## 📐 Phase Breakdown

### ✅ Phase 1: Core Architecture (2-3 days) - CURRENT

**Goal**: Establish the foundation - type system, state management, and hooks.

**Why this first**: Before building any features, we need a solid architectural foundation that all future code will build upon.

**Key Deliverables**:

- TypeScript type definitions for all core entities
- Zustand stores for state management
- Custom React hooks for common operations
- Project directory structure

**Tasks**: See `editor-core-architecture-tasks.md` Phase 1

**Validation**:

- [ ] TypeScript compiles with zero errors
- [ ] All stores have proper typing
- [ ] Unit tests pass for stores and hooks
- [ ] No `any` types in codebase

**Discussion needed before starting**: ❌ None (already planned)

---

### 🔲 Phase 2: 3D Viewport Foundation (2-3 days)

**Goal**: Set up the 3D rendering environment with camera controls and basic helpers.

**Why this second**: We need a working 3D viewport before we can draw walls or place furniture. This provides the visual canvas for all future work.

**Key Deliverables**:

- React Three Fiber viewport component
- Camera controls (orbit, zoom, pan)
- Grid and axes helpers
- Performance monitoring

**High-Level Tasks**:

- Set up R3F Canvas with proper renderer configuration
- Implement camera controls (OrbitControls)
- Add grid helper and coordinate axes
- Add simple geometric primitives (cube, sphere) for testing
- Set up performance monitoring (FPS, draw calls)

**Validation**:

- [ ] Viewport renders at 60fps on empty scene
- [ ] Camera controls are smooth and intuitive
- [ ] Grid and axes are visible and aligned
- [ ] Can add test objects to verify 3D environment works

**Discussion needed before starting**: ✅ YES

- Camera setup (perspective vs orthographic for floor plan view?)
- Performance targets (what devices should we support?)
- Viewport layout (single view vs multi-view?)

---

### 🏗️ Phase 3: Wall Drawing System (5-7 days)

**Goal**: Enable users to draw floor plans by creating walls, adding doors/windows, and defining rooms.

**Why this third**: The floor plan is the foundation of any interior design. Without walls and rooms, we can't apply materials or place furniture.

**Key Deliverables**:

- 2D floor plan drawing tool (CAD-style point-and-click)
- Wall creation with thickness and height parameters
- Door and window placement on walls
- Room detection and naming
- 2D ↔ 3D conversion (floor plan to 3D walls)

**High-Level Tasks**:

- Implement 2D drawing canvas overlay
- Point-and-click wall drawing with snap features
- Wall parameter editing (thickness, height)
- Door and window insertion system
- Automatic room detection (closed polygons)
- Convert 2D floor plan to 3D extruded geometry
- CSG operations for door/window openings

**Validation**:

- [ ] Can draw walls by clicking points
- [ ] Walls snap to grid and other walls
- [ ] Can add doors and windows to walls
- [ ] Rooms are automatically detected
- [ ] 2D floor plan displays correctly in 3D
- [ ] Door/window openings are cut properly

**Discussion needed before starting**: ✅ YES - CRITICAL

- 2D drawing implementation (Canvas overlay vs pure 3D raycasting?)
- Wall representation (geometry approach, CSG library choice)
- Snapping system design (grid snap, endpoint snap, angle constraints)
- Door/window opening algorithm (CSG vs shader-based?)
- Performance considerations (how many walls before lag?)

---

### 🎨 Phase 4: Material System (4-5 days)

**Goal**: Allow users to apply materials to walls, floors, and ceilings.

**Why this fourth**: Once we have rooms, the next logical step is to decorate them with materials. This brings the design to life visually.

**Key Deliverables**:

- Material library management system
- Wall material application (paint, wallpaper, tiles)
- Floor material application with tiling patterns
- Ceiling and molding materials
- Material preview and parameter adjustment

**High-Level Tasks**:

- Create material library structure
- Implement texture loading and management
- UV mapping for walls, floors, ceilings
- Material switcher UI
- Material property editor (color, scale, rotation)
- Support for different material types (solid color, texture, procedural)
- Baseboard and crown molding system

**Validation**:

- [ ] Can select and apply materials to surfaces
- [ ] Materials display correctly with proper scaling
- [ ] Material library is organized and searchable
- [ ] Can adjust material parameters in real-time
- [ ] Textures load efficiently without lag

**Discussion needed before starting**: ✅ YES

- Material source (where to get free textures? procedural generation?)
- UV mapping strategy for complex wall shapes
- Material library architecture (local storage vs cloud?)
- Performance optimization (texture compression, mipmaps)

---

### 🛋️ Phase 5: Furniture & Soft Decoration (5-7 days)

**Goal**: Enable placement and manipulation of furniture and decorative objects.

**Why this fifth**: With rooms and materials in place, we now add furniture to complete the interior design.

**Key Deliverables**:

- 3D model import system (GLTF/GLB)
- Furniture library with categories
- Furniture placement with transform controls
- Smart snapping (align to walls, other furniture)
- Furniture property editing (size, material, color)

**High-Level Tasks**:

- GLTF/GLB model loader
- Furniture library structure and organization
- Drag-and-drop placement system
- Transform gizmo integration
- Smart alignment and snapping
- Furniture scaling and material swapping
- Model optimization pipeline

**Validation**:

- [ ] Can import and display 3D furniture models
- [ ] Can place furniture by dragging into scene
- [ ] Transform controls work smoothly
- [ ] Furniture snaps to walls and grid
- [ ] Can adjust furniture properties
- [ ] Performance remains good with 20+ furniture items

**Discussion needed before starting**: ✅ YES

- Model source strategy (Sketchfab workflow, licensing)
- Model optimization (poly count limits, LOD system?)
- Material/color switching approach
- Snapping algorithm design
- Collision detection (prevent overlapping furniture?)

---

### ✨ Phase 6: Lighting, Decoration & Export (4-5 days)

**Goal**: Add final polish with lighting, decorative items, and export functionality.

**Why this last**: These are the finishing touches that make the scene production-ready and shareable.

**Key Deliverables**:

- Lighting system (ambient, point lights from fixtures)
- Decorative objects (lamps, curtains, artwork, plants)
- Day/night scene toggle
- 360° panorama view
- Scene export (GLTF, screenshots)
- Project save/load

**High-Level Tasks**:

- Implement dynamic lighting system
- Add light fixtures with actual light emission
- Decorative object library
- Camera path for 360° view
- Screenshot and panorama renderer
- Scene serialization and export
- Project file format design

**Validation**:

- [ ] Lighting looks realistic and adjustable
- [ ] Can place lamps that actually emit light
- [ ] 360° view works smoothly
- [ ] Can export scene as GLTF
- [ ] Can save and reload projects
- [ ] Exported files work in other 3D viewers

**Discussion needed before starting**: ✅ YES

- Lighting strategy (real-time vs baked, shadow quality)
- Panorama implementation approach
- Export format details
- Project file structure

---

## 📊 Timeline Estimate

| Phase     | Duration       | Type                     |
| --------- | -------------- | ------------------------ |
| Phase 1   | 2-3 days       | Foundation               |
| Phase 2   | 2-3 days       | 3D Setup                 |
| Phase 3   | 5-7 days       | Core Feature (Walls)     |
| Phase 4   | 4-5 days       | Core Feature (Materials) |
| Phase 5   | 5-7 days       | Core Feature (Furniture) |
| Phase 6   | 4-5 days       | Polish & Export          |
| **Total** | **22-30 days** | Full-time development    |

---

## 🎓 Technical Discussion Points

### Before Each Phase Starts

We will have a **deep technical discussion** covering:

1. **Technical approach options** (2-3 different ways to implement)
2. **Pros and cons** of each approach
3. **Performance implications**
4. **Code architecture** for that phase
5. **Third-party libraries** to use (if any)
6. **Potential pitfalls** and how to avoid them
7. **Testing strategy** for that phase

**Example for Phase 3 (Wall Drawing)**:

- Should we use Canvas 2D overlay or pure 3D raycasting?
- Which CSG library (three-bvh-csg vs THREE-CSGMesh)?
- How to handle wall intersections?
- Snapping algorithm design
- Wall mesh generation approach

---

## 🚀 Feature Scope

### ✅ Implementing (from features.md)

**Basic Design**:

- ✅ Manual wall, door, window drawing
- ✅ Adjust room dimensions and ceiling height

**Hard Decoration**:

- ✅ Wall materials (paint, wallpaper, panels, tiles)
- ✅ Floor materials (wood, tile, carpet)
- ✅ Ceiling design
- ✅ Baseboards and crown molding

**Soft Decoration**:

- ✅ Furniture library with adjustable properties
- ✅ Intelligent placement and alignment
- ✅ Lights, curtains, carpets
- ✅ Artwork, plants, decorations
- ✅ Appliances

**Rendering & Display**:

- ✅ 720° panorama view

### ❌ Not Implementing (Out of Scope)

- ❌ AI floor plan recognition (image processing)
- ❌ Brand furniture models (licensing required)
- ❌ 10-second rendering / 4K rendering (needs render farm)
- ❌ VR mode (requires VR hardware support)
- ❌ AI design generation (requires trained models)
- ❌ Bill of materials / pricing (needs backend)
- ❌ CAD construction drawings (different domain)
- ❌ Multi-user collaboration (needs backend/websocket)
- ❌ Custom furniture designer (too specialized)
- ❌ Tile layout calculator (too specialized)

---

## 📚 Resources to Gather

### 3D Models (Furniture)

- Sketchfab (Creative Commons models)
- Poly Pizza
- Quaternius (CC0 models)
- Free3D
- TurboSquid (free section)

### Textures (Materials)

- Poly Haven (CC0 textures)
- Textures.com (free tier)
- 3D Textures (free)
- Procedural generation (Three.js shaders)

### Reference Projects

- Planner 5D (commercial product)
- Roomstyler 3D (similar tool)
- Three.js examples (for technical patterns)

---

## 🔄 Process for Each Phase

1. **Pre-Phase Discussion** (30-60 min)
   - Review phase goals
   - Discuss technical approaches
   - Make architectural decisions
   - Choose libraries/tools
   - Define success criteria

2. **Implementation** (phase duration)
   - Follow TDD where applicable
   - Commit frequently
   - Test as you build
   - Update documentation

3. **Phase Completion**
   - Run validation checklist
   - Fix any critical bugs
   - Update TODO.md
   - Document learnings
   - Prepare for next phase discussion

---

## 💡 Philosophy

> "This is a learning project with production standards. We learn deeply by building something real that could be deployed."

**Principles**:

- 🎯 **Pragmatic over perfect**: Ship working features, refine later
- 🧪 **Test what matters**: Focus on critical paths, not 100% coverage
- 📖 **Document decisions**: Record why we chose approach A over B
- 🚀 **Performance conscious**: Always measure, optimize bottlenecks
- 🎨 **User-focused**: Build what interior designers actually need

---

**Next Step**: Complete Phase 1, then have deep technical discussion before Phase 2.
