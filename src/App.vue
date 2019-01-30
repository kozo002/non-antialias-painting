<template>
  <div id="app">
    <v-stage
      class="stage"
      ref="stage"
      :config="stageConfig"
    >
      <v-layer ref="paintingCanvas">
        <v-image
          v-if="canvas"
          :config="{
            image: canvas,
            x: 0,
            y: 0,
            width: stageConfig.width,
            height: stageConfig.height,
          }"
          @mouseover="handleStageMouseOver"
          @mouseout="handleStageMouseOut"
          @mousemove="handleStageMouseMove"
          @mousedown="handleStageMouseDown"
          @mouseup="handleStageMouseUp"
        />
        <v-arc
          :config="brushCursorConfig"
        />
      </v-layer>
    </v-stage>
    <div style="margin-bottom:100px">
      <label>
        <input
          type="radio"
          name="mode"
          :checked="currentMode === Mode.Brush"
          @change="handleBrushRadioButtonChange"
        />
        Brush
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          :checked="currentMode === Mode.Eraser"
          @change="handleEraserRadioButtonChange"
        />
        Eraser
      </label>
    </div>
    <div style="text-align:left">
      <input
        type="range"
        min="1"
        max="100"
        step="1"
        :value="size"
        @input="handleSizeChange"
      />
      {{size}}
    </div>
  </div>
</template>

<script>
import circle from './assets/11.gif'
import DynamicStampMaker from './DynamicStampMaker'

const Mode = {
  Brush: 'brush',
  Eraser: 'eraser'
}

function distanceBetween (point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
}
function angleBetween (point1, point2) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y)
}

export default {
  name: 'App',

  data: () => ({
    stageConfig: {},
    size: 11,
    brushCursorConfig: {
      fill: '#000000',
      strokeWidth: 0,
      x: 0,
      y: 0,
      perfectDrawEnabled: false,
      angle: 360
    },
    isMouseOver: false,
    Mode,
    currentMode: Mode.Brush,
    isPainting: false,
    beginningPosition: null,
    canvas: null,
    context: null,
    isSimple: false,
    isSimpleStamp: false
  }),

  created () {
    window.addEventListener('resize', this.handleWindowResize)

    this.exampleImage = new Image()
    this.exampleImage.src = circle

    this.canvas = document.createElement('canvas')
    this.canvas.width = window.innerWidth
    this.canvas.height = 500
    this.context = this.canvas.getContext('2d')

    this.stampMaker = new DynamicStampMaker()
  },

  mounted () {
    this.$nextTick(() => {
      this.handleWindowResize()
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  watch: {
    currentMode (currentMode) {
      if (!this.context) { return false }
      this.context.globalCompositeOperation = this.canvasOperation
    }
  },

  computed: {
    canvasOperation () {
      return this.currentMode === Mode.Brush
        ? 'source-over'
        : 'destination-out'
    }
  },

  methods: {
    handleWindowResize () {
      this.stageConfig = {
        ...this.stageConfig,
        width: window.innerWidth,
        height: 500
      }
    },

    handleStageMouseOver () {
      this.isMouseOver = true
    },

    handleStageMouseOut () {
      this.isMouseOver = false
      this.isPainting = false
    },

    handleStageMouseMove (e) {
      const halfSize = (this.size - (this.size % 2)) / 2
      const stage = this.$refs.stage.getStage()
      const position = stage.getPointerPosition()
      const innerRadius = halfSize - 1 < 0 ? 0 : halfSize - 1
      const size = { innerRadius, outerRadius: halfSize }
      this.brushCursorConfig = {
        ...this.brushCursorConfig,
        ...size,
        x: Math.round(position.x),
        y: Math.round(position.y)
      }

      if (!this.isPainting || !this.beginningPosition) { return false }

      if (this.isSimple) {
        this.context.imageSmoothingEnabled = false
        this.context.strokeStyle = '#000'
        this.context.lineWidth = this.size
        this.context.lineJoin = 'round'
        this.context.beginPath()
        const { x: startX, y: startY } = this.beginningPosition
        this.context.moveTo(startX, startY)
        const { x: destX, y: destY } = position
        this.context.lineTo(destX, destY)
        this.context.closePath()
        this.context.stroke()
      } else if (this.isSimpleStamp) {
        const x = position.x - halfSize
        const y = position.y - halfSize
        this.context.drawImage(this.exampleImage, Math.round(x), Math.round(y))
      } else {
        const dist = distanceBetween(this.beginningPosition, position)
        const angle = angleBetween(this.beginningPosition, position)
        const stamp = this.stampMaker.make({
          size: this.size
        })
        for (let i = 0; i < dist; i += 1) {
          const x = this.beginningPosition.x + (Math.sin(angle) * i) - halfSize
          const y = this.beginningPosition.y + (Math.cos(angle) * i) - halfSize
          this.context.drawImage(stamp, Math.round(x), Math.round(y))
        }
      }

      this.$refs.paintingCanvas.getStage().batchDraw()
      this.beginningPosition = position
    },

    handleBrushRadioButtonChange (e) {
      if (e.target.checked) {
        this.currentMode = Mode.Brush
      }
    },

    handleEraserRadioButtonChange (e) {
      if (e.target.checked) {
        this.currentMode = Mode.Eraser
      }
    },

    handleStageMouseDown () {
      this.isPainting = true
      this.beginningPosition = this.$refs.stage.getStage().getPointerPosition()
    },

    handleStageMouseUp () {
      this.isPainting = false
      this.beginningPosition = null
    },

    handleSizeChange (e) {
      this.size = parseInt(e.target.value)
      this.stampMaker.make({ size: this.size, color: '#000' })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #ddd;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.stage {
  background-color: #fff;
}
</style>
